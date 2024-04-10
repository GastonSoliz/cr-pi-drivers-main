import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import React from "react";

export default function NavBar() {
  return (
    <div className={style.NavBarContainer}>
      <div className={style.buttonsContainer}>
        <Link to="/home">
          <button>HOME</button>
        </Link>
        <Link to="/form">
          <button>FORM</button>
        </Link>
      </div>
      <SearchBar />
    </div>
  );
}
