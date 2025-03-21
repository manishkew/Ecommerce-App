import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h6 className="text-center">
        Copyright © {new Date().getFullYear()} Ecommerce App. All rights
        reserved.
      </h6>
      <p className="text-center mt-3">
        <Link to="/about">About Us</Link> |{" "}
        <Link to="/contact">Contact Us</Link> | 
        <Link to="/Policy">Privacy Policy</Link> {" "}
      </p>
    </div>
  );
};

export default Footer;
