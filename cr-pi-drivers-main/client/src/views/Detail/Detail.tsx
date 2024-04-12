import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getDriverById } from "../../redux/actions.ts";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import React from "react";
import { Driver, State } from "../../types/types.ts";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export default function Detail() {
  const [showMore, setShowMore] = useState<boolean>(false);

  const driver: Driver = useSelector((state) => state.driverDetail);

  const dispatch: ThunkDispatch<State, any, AnyAction> = useDispatch();

  const { id } = useParams();

  function handleShowMore(): void {
    setShowMore(!showMore);
  }

  useEffect(() => {
    if (id) {
      dispatch(getDriverById(id));
    }
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch]);

  return (
    <div className={style.detailContainer}>
      <img src={driver?.image} alt="Imagen corredor" />
      <div className={style.textContainer}>
        <p>ID: {driver?.id}</p>
        <p>Nombre: {driver?.name}</p>
        <p>Apellido: {driver?.surname}</p>
        <p>Nacionalidad: {driver?.nationality}</p>
        <div className={style.descriptionContainer}>
          <label className={showMore ? style.show : ""}>
            Descripcion: {driver?.description ? driver?.description : "-"}
          </label>
          {driver?.description.length > 100 && (
            <button onClick={handleShowMore}>
              {showMore ? "Mostrar menos" : "Leer más"}
            </button>
          )}
        </div>
        <p>Fecha de nacimiento: {driver?.birthdate}</p>

        <ul>
          Teams:
          {driver?.teams.map((team) => (
            <li key={team.id}>{team.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
