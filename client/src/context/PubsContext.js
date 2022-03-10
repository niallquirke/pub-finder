import React, { useState, createContext } from "react";

export const PubsContext = createContext();

export const PubContextProvider = (props) => {
  const [pubs, setPubs] = useState([]);
  const [selectedPub, setSelectedPub] = useState(null);

  const addPub = (pub) => {
    pub.review_count = 0;
    setPubs([...pubs, pub]);
  };

  const removePub = (id) => {
    setPubs(
      pubs.filter((pub) => {
        return pub.id !== id;
      })
    );
  };

  return (
    <PubsContext.Provider
      value={{ pubs, setPubs, addPub, removePub, selectedPub, setSelectedPub }}
    >
      {props.children}
    </PubsContext.Provider>
  );
};
