import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
import React from "react";

export default function LandingPage() {
  return (
    <div className={style.landingPageContainer}>
      <h1>BIENVENIDO A MI DRIVERS APP!</h1>
      <Link to="/home">
        <button>HOME</button>
      </Link>
    </div>
  );
}
