import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mb-3 g-3">
        {reviews.map((review) => {
          return (
            <div key={review.id} className="col">
              <div className="card text-dark bg-light px-0">
                <div className="card-header bg-primary text-white d-flex justify-content-between">
                  <span>{review.name}</span>
                  <span>
                    <StarRating rating={review.rating} />
                  </span>
                </div>
                <div className="card-body">
                  <p>{review.review}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Reviews;
