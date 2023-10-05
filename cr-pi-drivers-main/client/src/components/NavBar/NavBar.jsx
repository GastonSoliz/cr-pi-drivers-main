import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  return (
    <div>
      <Link to="/home">
        <button>HOME</button>
      </Link>
      <Link to="/form">
        <button>FORM</button>
      </Link>
      <Link to="/detail">
        <button>DETAIL</button>
      </Link>
      <SearchBar />
    </div>
  );
}
