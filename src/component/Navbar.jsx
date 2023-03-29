import React from "react";

import HomePage from "../Pages/HomePage";
import History from "../Pages/History";
import CardPage from "../Pages/CardPage";

import "../Stylesheets/styles.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Redirect from "./Redirect";

const Navbar = () => {
  return (
    <>
      <BrowserRouter>
        <div className="navbar">
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/history">
            <button>History</button>
          </Link>
        </div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/history" element={<History />} />
          <Route exact path="/:bucketName" element={<CardPage />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Navbar;
