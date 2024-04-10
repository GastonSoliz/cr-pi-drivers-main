import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDriverByName } from "../../redux/actions.ts";
import style from "./SearchBar.module.css";
import React from "react";

export default function SearchBar() {
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setName(event.target.value);
  }

  function onSearch(): void {
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
