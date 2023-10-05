import { useEffect, useState } from "react";
import validateForm from "../../utils/validateForm";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, postDriver } from "../../redux/actions";

export default function Form() {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const allTeams = useSelector((state) => state.allTeams);
  const dispatch = useDispatch();

  const [driver, setDriver] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: [],
  });
  const [errors, setErrors] = useState({});

  const handleDisabled = () => {
    if (errors) {
      for (let error in errors) {
        if (errors[error] !== "") return true;
      }
    }
    return false;
  };

  function handleChange(event) {
    setDriver({ ...driver, [event.target.name]: event.target.value });
    setErrors(
      validateForm({ ...driver, [event.target.name]: event.target.value })
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTeams = selectedTeams.map((team) => team.name);
    setDriver({ ...driver, [driver.teams]: newTeams });
    //console.log(newTeams);
    dispatch(postDriver(driver));
    console.log(driver);
    console.log(driver.teams);
  };

  const handleSelected = (event) => {
    const teamId = event.target.value;
    const selectTeam = allTeams.find((team) => teamId === team.id);
    setSelectedTeams([...selectedTeams, selectTeam]);
  };

  const handleRemoveTeam = (teamId) => {
    setSelectedTeams(selectedTeams.filter((team) => team.id !== teamId));
  };

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  return (
    <div>
      <h1>PRUEBA DE PAGINA FORM</h1>
      <form onSubmit={handleSubmit}>
        <h2>INGRESAR DATOS DEL CORREDOR</h2>
        <label>Nombre:</label>
        <input
          name="forename"
          placeholder="Ingrese un nombre..."
          type="text"
          onChange={handleChange}
        />
        <span>{errors.forename}</span>
        <br />
        <label>Apellido:</label>
        <input
          name="surname"
          placeholder="Ingrese un apellido..."
          type="text"
          onChange={handleChange}
        />
        <span>{errors.surname}</span>
        <br />
        <label>Nacionalidad:</label>
        <input
          name="nationality"
          placeholder="Ingrese la nacionalidad..."
          type="text"
          onChange={handleChange}
        />
        <span>{errors.nationality}</span>
        <br />
        <label>Imagen:</label>
        <input name="image" type="file" onChange={handleChange} />
        <span>{errors.image}</span>
        <br />
        <label>Fecha de Nacimiento:</label>
        <input name="dob" type="date" onChange={handleChange} />
        <span>{errors.dob}</span>
        <br />
        <label>Descripcion:</label>
        <input
          name="description"
          placeholder="Ingrese una breve descripcion..."
          type="text"
          onChange={handleChange}
        />
        <span>{errors.description}</span>
        <br />
        <label>Escuderias:</label>
        {/* {console.log(allTeams)} */}
        <select onChange={handleSelected} name="teams">
          <option disabled selected>
            Seleccionar minimo un equipo
          </option>
          {allTeams?.map((team) => {
            return <option value={team.id}>{team.name}</option>;
          })}
        </select>
        <div>
          {selectedTeams.map((team) => {
            return (
              <div>
                <span>{team.name}</span>
                <button
                  onClick={() => {
                    handleRemoveTeam(team.id);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
        <span>{errors.teams}</span>
        <button type="submit" disabled={handleDisabled()}>
          SUBIR
        </button>
      </form>
    </div>
  );
}
