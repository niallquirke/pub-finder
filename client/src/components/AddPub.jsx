import React, { useContext, useState } from "react";
import PubAPI from "../apis/PubAPI";
import { PubsContext } from "../context/PubsContext";

const AddPub = () => {
  const { addPub } = useContext(PubsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await PubAPI.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addPub(res.data.data.pub);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-4">
      <form>
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
                className="form-control"
              />
            </div>
            <div className="col">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                placeholder="Location"
                className="form-control"
              />
            </div>
            <div className="col">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                type="text"
                className="form-select"
              >
                <option disabled>Price Range</option>
                <option value="1">€</option>
                <option value="2">€€</option>
                <option value="3">€€€</option>
                <option value="4">€€€€</option>
                <option value="5">€€€€€</option>
              </select>
            </div>
          </div>
          <div className="ms-4">
            <button
              type="submit"
              className="col btn btn-primary"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPub;
