import { Link, useLocation, useParams } from "react-router-dom";
import style from "./Card.module.css";
import { useDispatch } from "react-redux";
import { deleteDriver } from "../../redux/actions";

export default function Card({ driver }) {
  const dispatch = useDispatch();

  function handleClose(id) {
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
