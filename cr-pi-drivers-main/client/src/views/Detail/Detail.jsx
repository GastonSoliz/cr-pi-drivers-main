import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getDriverById } from "../../redux/actions";
import { useParams } from "react-router-dom";

export default function Detail() {
  const driver = useSelector((state) => state.driverDetail);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDriverById(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch]);

  console.log(driver);

  return (
    <div>
      <h1>PRUEBA DE PAGINA DETAIL</h1>
      {/* {console.log(driver)} */}
      <p>ID:{driver.id}</p>
      <img src={driver.image} alt="Imagen corredor" />
      <h2>Nombre: {driver.name}</h2>
      <h2>Apellido:{driver.surname}</h2>
      <p>Nacionalidad: {driver.nationality}</p>
      <p>Descripcion:{driver.description}</p>
      <p>Fecha de nacimiento:{driver.birthdate}</p>
      Teams:
      <ul>
        {driver.teams?.map((team) => (
          <li>{team.name}</li>
        ))}
      </ul>
      {/* Teams:{driver.teams} */}
    </div>
  );
}
