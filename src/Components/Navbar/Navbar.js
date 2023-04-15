import React, { useEffect, useState } from "react";
import logo from "../../logo.png";
import avatar from "../../avatar.png";
import "./Navbar.css";

function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 100) {
          handleShow(true);
        } else handleShow(false);
      });
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img className="nav_logo" src={logo} alt="Netflix_logo" />
      <img className="nav_avatar" src={avatar} alt="Avatar_logo" />
    </div>
  );
}

export default Navbar;
