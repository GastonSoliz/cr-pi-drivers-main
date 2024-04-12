import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDriverByName } from "../../redux/actions.ts";
import style from "./SearchBar.module.css";
import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { State } from "../../types/types.ts";

export default function SearchBar() {
  const [name, setName] = useState<string>("");
  const dispatch: ThunkDispatch<State, any, AnyAction> = useDispatch();

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
