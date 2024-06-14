import { Link } from "react-router-dom";
//import style from "./Card.module.css";
import { useDispatch } from "react-redux";
import { cleanDelete, deleteDriver } from "../../redux/actions";
import React from "react";
import { DriverError, State } from "../../types/types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface CardProps {
  driver: DriverError;
}

export default function Card({ driver }: CardProps) {
  const dispatch: ThunkDispatch<State, any, AnyAction> = useDispatch();

  function handleClose(id: string): void {
    dispatch(deleteDriver(id));
    setTimeout(() => {
      dispatch(cleanDelete());
    }, 4000);
  }

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className={`position-relative`} style={{ height: "300px" }}>
        {typeof driver.id !== "number" ? (
          <button
            className={`position-absolute top-0 start-0`}
            onClick={() => handleClose(driver.id as string)}
          >
            ❌
          </button>
        ) : (
          ""
        )}
        <img
          src={driver.image}
          className="card-img-top"
          alt="Imagen corredor"
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{driver.name}</h5>
        <p className="card-text">{driver.surname}</p>
        <div className="d-grid gap-2">
          <Link to={`/detail/${driver.id}`} className="btn btn-primary">
            MAS INFO
          </Link>
          {typeof driver.id !== "number" && (
            <Link to={`/edit/${driver.id}`} className="btn btn-secondary">
              EDITAR
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
