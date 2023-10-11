import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";

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
        <Link to="/detail">
          <button>DETAIL</button>
        </Link>
      </div>
      <SearchBar />
    </div>
  );
}
