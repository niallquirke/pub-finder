import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import PubPage from "./routes/PubPage";
import { PubContextProvider } from "./context/PubsContext";

const App = () => {
  return (
    <PubContextProvider>
      <div className="container" style={{ maxWidth: "1000px" }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pubs/:id" element={<PubPage />} />
          </Routes>
        </Router>
      </div>
    </PubContextProvider>
  );
};

export default App;
