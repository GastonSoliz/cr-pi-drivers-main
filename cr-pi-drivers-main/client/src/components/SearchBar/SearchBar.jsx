import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDriverByName } from "../../redux/actions";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  function onSearch() {
    dispatch(getDriverByName(name));
  }

  return (
    <div className={style.searchBarContainer}>
      <input
        placeholder="Ingresar un nombre..."
        type="search"
        onChange={handleChange}
      />
      <button onClick={onSearch}>BUSCAR</button>
    </div>
  );
}
