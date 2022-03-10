import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PubAPI from "../apis/PubAPI";
import { PubsContext } from "../context/PubsContext";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const PubPage = () => {
  const { id } = useParams();
  const { selectedPub, setSelectedPub } = useContext(PubsContext);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const res = await PubAPI.get(`/${id}`);
        setSelectedPub(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData(id);
  }, []);

  return (
    <div>
      {selectedPub && (
        <>
          <h1 className="display-1 font-weight-light text-center">
            {selectedPub.pub.name}
          </h1>
          <div className="text-center mb-3">
            <StarRating rating={selectedPub.pub.avg_rating} />
          </div>
          <Reviews reviews={selectedPub.reviews} />
          <AddReview />
        </>
      )}
    </div>
  );
};

export default PubPage;
