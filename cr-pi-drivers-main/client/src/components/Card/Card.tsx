import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { useDispatch } from "react-redux";
import { deleteDriver } from "../../redux/actions";
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

interface CardProps {
  driver: Driver;
}

export default function Card({ driver }: CardProps) {
  const dispatch = useDispatch();

  //Tener en cuenta si funciona deleteDriver, sino modificar en el action
  function handleClose(id: number): void {
    dispatch(deleteDriver(id));
  }

  return (
    <div className={style.cardContainer}>
      <div className={style.imageContainer}>
        {typeof driver.id !== "number" ? (
          <button onClick={() => handleClose(driver.id)}>❌</button>
        ) : (
          ""
        )}
        <img src={driver.image} alt="Imagen corredor" />
      </div>
      <div className={style.noImageContainer}>
        <div className={style.textContainer}>
          <p>Nombre:</p>
          <h2>{driver.name}</h2>
          <p>Apellido:</p>
          <h2>{driver.surname}</h2>
        </div>
        <div className={style.buttonContainer}>
          <Link to={`/detail/${driver.id}`}>
            <button>MAS INFO</button>
          </Link>
          {typeof driver.id !== "number" ? (
            <Link to={`/edit/${driver.id}`}>
              <button>EDITAR</button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
