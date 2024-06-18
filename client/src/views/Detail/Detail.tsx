import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getDriverById } from "../../redux/actions";
import { useParams } from "react-router-dom";
//import style from "./Detail.module.css";
import React from "react";
import { Driver, State } from "../../types/types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export default function Detail() {
  const [showMore, setShowMore] = useState<boolean>(false);

  const driver: Driver | null = useSelector(
    (state: State) => state.driverDetail
  );
  const msj: string | null = useSelector((state: State) => state.msjDetail);

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
    <>
      {msj === "Solicitud en proceso" && (
        <div className="d-flex justify-content-center mt-4 gap-4">
          <img
            src="/loading.gif"
            alt="Cargando..."
            className="img-fluid"
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />
          <span>Cargando conductor...</span>
        </div>
      )}
      {msj === "Solicitud exitosa" && (
        <div className="container mt-4">
          <div className="row justify-content-center align-items-center">
            {typeof driver?.image === "string" && (
              <img
                src={driver?.image}
                alt="Imagen corredor"
                className="col-md-4"
              />
            )}
            <div className="col-md-6 border bg-light p-4">
              <p>ID: {driver?.id}</p>
              <p>Nombre: {driver?.name}</p>
              <p>Apellido: {driver?.surname}</p>
              <p>Nacionalidad: {driver?.nationality}</p>
              <div className="mb-3">
                <p className="mb-0">Descripcion:</p>
                <div className="descriptionContainer">
                  <p className={`mb-0 ${showMore ? "" : "text-truncate"}`}>
                    {driver?.description ? driver?.description : "-"}
                  </p>
                  {driver?.description && driver?.description.length > 100 && (
                    <button className="btn btn-link" onClick={handleShowMore}>
                      {showMore ? "Mostrar menos" : "Leer más"}
                    </button>
                  )}
                </div>
              </div>
              <p>Fecha de nacimiento: {driver?.birthdate}</p>
              <ul className="list-unstyled">
                <li>Teams:</li>
                {driver?.teams.map((team, index) => (
                  <li key={index}>{team.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {msj === "Solicitud fallida" && (
        <span className="text-danger">
          Hubo un error al cargar los conductores...
        </span>
      )}
    </>
  );
}
