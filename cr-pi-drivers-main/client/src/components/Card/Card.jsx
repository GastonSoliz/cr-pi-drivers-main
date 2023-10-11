import { Link, useLocation, useParams } from "react-router-dom";
import style from "./Card.module.css";

export default function Card({ driver }) {
  return (
    <div className={style.cardContainer}>
      <div className={style.imageContainer}>
        <Link to={`/detail/${driver.id}`}>
          <img src={driver.image} alt="Imagen corredor" />
        </Link>
      </div>
      <div className={style.textContainer}>
        <p>Nombre:</p>
        <h2>{driver.name}</h2>
        <p>Apellido:</p>
        <h2>{driver.surname}</h2>
      </div>
    </div>
  );
}
