import { useDispatch, useSelector } from "react-redux";
import {
  getDrivers,
  getTeams,
  sortDate,
  sortOrigin,
  sortTeam,
} from "../../redux/actions.ts";
import CardList from "../../components/CardList/CardList";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import style from "./Home.module.css";
import React from "react";

type Driver = {
  birthdate: string;
  description: string;
  id: number;
  image: string;
  name: string;
  nationality: string;
  surname: string;
  teams: string;
};

type Team = {
  id: number;
  name: string;
};

type someTeams = Team[];
type someDrivers = Driver[];

export default function Home() {
  const dispatch = useDispatch();

  const allDrivers: someDrivers = useSelector((state) => state.filteredDrivers);
  const allTeams: someTeams = useSelector((state) => state.allTeams);
  //const allDrivers = useSelector((state) => state.allDrivers);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const driversPerPage: number = 9;

  const startIndex: number = (currentPage - 1) * driversPerPage;
  const endIndex: number = startIndex + driversPerPage;

  const currentDrivers: someDrivers = allDrivers?.slice(startIndex, endIndex);
  const totalPages: number = Math.ceil(allDrivers.length / driversPerPage);

  function pageHandler(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function handleOrigin(event) {
    dispatch(sortOrigin(event.target.value));
  }

  function handleDate(event) {
    dispatch(sortDate(event.target.value));
  }

  function handleTeams(event) {
    dispatch(sortTeam(event.target.value));
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
          <option value="DESCENDENTE">DESCENDENTE</option>
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
      <div className={style.cardListContainer}>
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
