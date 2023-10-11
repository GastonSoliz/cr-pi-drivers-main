import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDriverByName } from "../../redux/actions";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const driverName = useSelector((state) => state.driverName);
  let allDrivers = useSelector((state) => state.allDrivers);

  function handleChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  function onSearch() {
    dispatch(getDriverByName(name));
  }

  useEffect(() => {
    console.log(driverName);
  }, [driverName]);

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
