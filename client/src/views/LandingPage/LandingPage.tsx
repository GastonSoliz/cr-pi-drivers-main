import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
import React from "react";

export default function LandingPage() {
  return (
    <div className={style.landingPageContainer}>
      <h1 className="display-4">BIENVENIDO A MI DRIVERS APP!</h1>
      <Link to="/home">
        <button className="btn btn-primary mt-3">HOME</button>
      </Link>
    </div>
  );
}
