import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import "../styles/pages/landing.css";
import logoImg from "../images/logo.svg";

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <div className="logotipo">
          <img src={logoImg} alt="Donate Device" />
          <p>Donate Device</p>
        </div>

        <main>
          <h1>Doe seu dispositivo usado.</h1>
          <p>Mãos que doam amor, nunca ficam vazias!</p>
        </main>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;
