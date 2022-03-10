import React, { useContext, useState } from "react";
import ReviewAPI from "../apis/ReviewAPI";
import { PubsContext } from "../context/PubsContext";

const AddReview = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("rating");
  const [review, setReview] = useState("");
  const { selectedPub } = useContext(PubsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await ReviewAPI.post("/", {
        name,
        pub_id: selectedPub.pub.id,
        rating,
        review,
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="px-4 py-3 mt-4 mb-2 border rounded">
        <form className="row gy-2">
          <legend>Add a Review</legend>
          <div className="col-8">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              className="form-control"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="col-4">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              className="form-select"
              onChange={(e) => {
                setRating(e.target.value);
              }}
            >
              <option value="rating" disabled>
                ...
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-12 mb-1">
            <div className="form-group">
              <label htmlFor="review">Review</label>
              <textarea
                id="review"
                type="text"
                value={review}
                className="form-control"
                onChange={(e) => {
                  setReview(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-12 d-flex flex-row-reverse">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddReview;
