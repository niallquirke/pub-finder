import React, { useContext, useEffect, useState } from "react";
import PubAPI from "../apis/PubAPI";
import { PubsContext } from "../context/PubsContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const PubList = (props) => {
  const { pubs, setPubs, removePub } = useContext(PubsContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [modalPub, setModalPub] = useState({
    name: "",
    location: "",
    priceRange: 1,
  });
  const [newName, setNewName] = useState(modalPub.name);
  const [newLocation, setNewLocation] = useState(modalPub.location);
  const [newPriceRange, setNewPriceRange] = useState(modalPub.priceRange);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await PubAPI("/");
        setPubs(res.data.data.pubs);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await PubAPI.delete(`/${id}`);
      removePub(id);
    } catch (err) {
      console.error(err);
    }
  };

  const openUpdateModal = (e, pub) => {
    e.stopPropagation();
    setNewName(pub.name);
    setNewLocation(pub.location);
    setNewPriceRange(pub.price_range);
    setModalPub(pub);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => setShowUpdateModal(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await PubAPI.put(`/${modalPub.id}`, {
        name: newName,
        location: newLocation,
        priceRange: newPriceRange,
      });
      closeUpdateModal();
      window.location.reload();
    } catch (err) {
      console.error(err);
      closeUpdateModal();
    }
  };

  const handlePubSelect = (id) => {
    navigate(`/pubs/${id}`);
  };

  const renderRating = (pub) => {
    if (pub.review_count === "0") {
      return <p className="text-warning">0 Reviews</p>;
    } else {
      return (
        <p className="text-warning">
          <StarRating rating={pub.avg_rating} /> ({pub.review_count})
        </p>
      );
    }
  };

  return (
    <>
      <div className="list-group">
        <table className="table table-hover">
          <thead>
            <tr className="primary">
              <th scope="col">Pub</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Rating</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {pubs &&
              pubs.map((pub) => {
                return (
                  <tr key={pub.id} onClick={() => handlePubSelect(pub.id)}>
                    <td>
                      <a href="">{pub.name}</a>
                    </td>
                    <td>{pub.location}</td>
                    <td>{"€".repeat(pub.price_range)}</td>
                    <td>{renderRating(pub)}</td>
                    <td>
                      <button
                        onClick={(e) => openUpdateModal(e, pub)}
                        type="button"
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e) => handleDelete(e, pub.id)}
                        type="button"
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal show={showUpdateModal} onHide={closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update {modalPub.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="newName">Name</label>
              <input
                id="newName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                type="text"
                className="form-control mb-2"
              />
              <label htmlFor="newLocation">Location</label>
              <input
                id="newLocation"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                type="text"
                className="form-control mb-2"
              />
              <label htmlFor="newPriceRange">Price Range</label>
              <select
                id="newPriceRange"
                value={newPriceRange}
                onChange={(e) => setNewPriceRange(e.target.value)}
                type="text"
                className="form-select"
              >
                <option value="1">€</option>
                <option value="2">€€</option>
                <option value="3">€€€</option>
                <option value="4">€€€€</option>
                <option value="5">€€€€€</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PubList;
