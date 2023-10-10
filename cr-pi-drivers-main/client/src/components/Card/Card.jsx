import { Link, useLocation, useParams } from "react-router-dom";

export default function Card({ driver }) {
  return (
    <div>
      <Link to={`/detail/${driver.id}`}>
        <img src={driver.image} alt="Imagen corredor" />
      </Link>
      <h2>Nombre: {driver.name}</h2>
      <p>Apellido:{driver.surname}</p>
    </div>
  );
}
