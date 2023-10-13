import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDriverById, getTeams, updateDriver } from "../../redux/actions";
import { useParams } from "react-router-dom";
import validateForm from "../../utils/validateForm";
import style from "./Edit.module.css";

export default function Edit() {
  const allTeams = useSelector((state) => state.allTeams);
  let driver = useSelector((state) => state.driverDetail);
  const [errors, setErrors] = useState({});
  const initialSelectedTeams = driver.teams?.map((team) => team.name);
  const [formData, setFormData] = useState({
    name: driver.name,
    surname: driver.surname,
    nationality: driver.nationality,
    image: driver.image,
    birthdate: driver.birthdate,
    description: driver.description,
    teams: initialSelectedTeams,
  });

  const { id } = useParams();
  const dispatch = useDispatch();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors(
      validateForm({ ...formData, [event.target.name]: event.target.value })
    );
  }

  function handleTeamChange(event) {
    const teamName = event.target.value;
    const isChecked = event.target.checked;

    let updatedTeams;

    if (isChecked) {
      updatedTeams = [...formData.teams, teamName];
    } else {
      updatedTeams = formData.teams.filter((team) => team !== teamName);
    }

    setFormData({ ...formData, teams: updatedTeams });
    setErrors(validateForm({ ...formData, teams: updatedTeams }));
    //console.log("EQUIPOS:", updatedTeams);
  }

  function handleSubmit(event) {
    event.preventDefault();
    //console.log("ESTO SE SUBE: ", formData, id);
    dispatch(updateDriver(formData, id));
  }

  useEffect(() => {
    dispatch(getDriverById(id));
    dispatch(getTeams());
  }, []);

  console.log("FORM-DATA:", formData);
  return (
    <form className={style.formContainer} onSubmit={handleSubmit}>
      <div className={style.textContainer}>
        <label>Nombre:</label>
        <input
          name="name"
          placeholder="Ingrese un nombre..."
          type="text"
          onChange={handleChange}
          value={formData.name}
        />
        <span>{errors.name}</span>
        <br />
        <label>Apellido:</label>
        <input
          name="surname"
          placeholder="Ingrese un apellido..."
          type="text"
          onChange={handleChange}
          value={formData.surname}
        />
        <span>{errors.surname}</span>
        <br />
        <label>Nacionalidad:</label>
        <input
          name="nationality"
          placeholder="Ingrese la nacionalidad..."
          type="text"
          onChange={handleChange}
          value={formData.nationality}
        />
        <span>{errors.nationality}</span>
        <br />
        <label>Imagen:</label>
        <input name="image" type="file" onChange={handleChange} />
        <input
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
        />
        <span>{errors.image}</span>
        <br />
        <label>Fecha de nacimiento:</label>
        <input
          name="birthdate"
          type="date"
          onChange={handleChange}
          value={formData.birthdate}
        />
        <span>{errors.birthdate}</span>
        <br />
        <label>Descripcion</label>
        <input
          name="description"
          type="text"
          onChange={handleChange}
          value={formData.description}
        />
        <span>{errors.description}</span>
        <br />
      </div>
      <div className={style.teamsContainer}>
        <label>Escuderias:</label>
        <div className={style.formSelect}>
          {allTeams?.map((team) => (
            <div key={team.id}>
              <label>
                <input
                  type="checkbox"
                  name="teams"
                  value={team.name}
                  checked={formData.teams?.includes(team.name)}
                  onChange={handleTeamChange}
                ></input>
                {team.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className={style.buttonContainer}>
        <button type="submit">SUBIR</button>
      </div>
    </form>
  );
}
