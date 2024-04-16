import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { useDispatch } from "react-redux";
import { deleteDriver } from "../../redux/actions";
import React from "react";
import { DriverError, State } from "../../types/types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface CardProps {
  driver: DriverError;
}

export default function Card({ driver }: CardProps) {
  const dispatch: ThunkDispatch<State, any, AnyAction> = useDispatch();

  function handleClose(id: number): void {
    dispatch(deleteDriver(id));
  }

  return (
    <div className="card" style={{ width: "18rem" }}>
      {typeof driver.id !== "number" ? (
        <button onClick={() => handleClose(driver.id)}>❌</button>
      ) : (
        ""
      )}
      <img
        src={driver.image}
        className="card-img-top"
        alt="Imagen corredor"
        style={{ objectFit: "cover", height: "300px" }}
      />
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
