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
//import style from "./Home.module.css";
import React from "react";
import { DriverError, State, Team } from "../../types/types.ts";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";

export default function Home() {
  const dispatch: ThunkDispatch<State, any, AnyAction> = useDispatch();

  const allDrivers: DriverError[] = useSelector(
    (state) => state.filteredDrivers
  );
  const allTeams: Team[] = useSelector((state: State) => state.allTeams);
  //const allDrivers = useSelector((state) => state.allDrivers);
  const msj: string | null = useSelector((state: State) => state.msjDrivers);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const driversPerPage: number = 9;

  const startIndex: number = (currentPage - 1) * driversPerPage;
  const endIndex: number = startIndex + driversPerPage;

  const currentDrivers: DriverError[] = allDrivers?.slice(startIndex, endIndex);
  const totalPages: number = Math.ceil(allDrivers.length / driversPerPage);

  function pageHandler(pageNumber: number): void {
    setCurrentPage(pageNumber);
  }

  function handleOrigin(event: React.ChangeEvent<HTMLSelectElement>): void {
    dispatch(sortOrigin(event.target.value));
  }

  function handleDate(event: React.ChangeEvent<HTMLSelectElement>): void {
    dispatch(sortDate(event.target.value));
  }

  function handleTeams(event: React.ChangeEvent<HTMLSelectElement>): void {
    dispatch(sortTeam(event.target.value));
  }

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <div className="row mb-6">
        <div className="col-md-1">
          <select
            className="form-select"
            onChange={handleOrigin}
            defaultValue="ALL"
          >
            <option value="ALL">ALL</option>
            <option value="ID">API</option>
            <option value="BDD">BDD</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" onChange={handleDate}>
            <option value="NONE">AÑO</option>
            <option value="ASCENDENTE">ASCENDENTE</option>
            <option value="DESCENDENTE">DESCENDENTE</option>
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-select" onChange={handleTeams}>
            <option value="NONE">EQUIPOS</option>
            {allTeams?.map((team) => (
              <option value={team.name} key={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <SearchBar />
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        {msj === "Solicitud en proceso" && (
          <div>
            <img
              src="/loading.gif"
              alt="Cargando..."
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
            <span>Cargando conductores...</span>
          </div>
        )}

        {msj === "Solicitud fallida" && (
          <span className="text-danger">
            Hubo un error al cargar los conductores...
          </span>
        )}
      </div>

      <CardList allDrivers={currentDrivers} />
      <Pagination
        page={pageHandler}
        total={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}
