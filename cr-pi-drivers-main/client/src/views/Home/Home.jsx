import { useDispatch, useSelector } from "react-redux";
import {
  getDrivers,
  getTeams,
  sortDate,
  sortOrigin,
  sortTeam,
} from "../../redux/actions";
import CardList from "../../components/CardList/CardList";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  const driverName = useSelector((state) => state.driverName);
  const allDrivers = useSelector((state) => state.filteredDrivers);
  const allTeams = useSelector((state) => state.allTeams);
  //const allDrivers = useSelector((state) => state.allDrivers);

  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 9;

  const startIndex = (currentPage - 1) * driversPerPage;
  const endIndex = startIndex + driversPerPage;

  const currentDrivers = allDrivers?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allDrivers.length / driversPerPage);

  function pageHandler(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleOrigin(event) {
    dispatch(sortOrigin(event.target.value));
  }

  function handleDate(event) {
    dispatch(sortDate(event.target.value));
    //console.log("HOME-DATE:", allDrivers);
  }

  function handleTeams(event) {
    dispatch(sortTeam(event.target.value));
    //console.log("HOME-TEAM:", allDrivers);
  }

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <div>
      <div className={style.selectsContainer}>
        <select onChange={handleOrigin} defaultValue="ALL">
          <option value="ALL">ALL</option>
          <option value="ID">API</option>
          <option value="BDD">BDD</option>
        </select>
        <select onChange={handleDate}>
          <option value="NONE">AÑO</option>
          <option value="ASCENDENTE">ASCENDENTE</option>
          <option value="DESCENDENTE">DESCENDEN TE</option>
        </select>
        <select onChange={handleTeams}>
          <option value="NONE">EQUIPOS</option>
          {allTeams?.map((team) => {
            return (
              <option value={team.name} key={team.id}>
                {team.name}
              </option>
            );
          })}
        </select>
      </div>
      {driverName.length > 0 && (
        <div className={style.cardListContainer}>
          <h2>Drivers buscados por name:</h2>
          <CardList allDrivers={driverName} />
        </div>
      )}
      <div className={style.cardListContainer}>
        <h2>Todos los drivers:</h2>
        <CardList allDrivers={currentDrivers} />
      </div>
      <Pagination
        page={pageHandler}
        total={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}
