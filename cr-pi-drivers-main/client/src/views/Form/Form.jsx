import { useEffect, useState } from "react";
import validateForm from "../../utils/validateForm";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, postDriver } from "../../redux/actions";
import style from "./Form.module.css";

export default function Form() {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const allTeams = useSelector((state) => state.allTeams);
  const dispatch = useDispatch();

  const [driver, setDriver] = useState({
    name: "",
    surname: "",
    nationality: "",
    image: "",
    birthdate: "",
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
    if (event.target.name !== "teams") {
      setDriver({ ...driver, [event.target.name]: event.target.value });
      setErrors(
        validateForm({ ...driver, [event.target.name]: event.target.value })
      );
    }
    // } else {
    //   if (!selectedTeams.includes(event.target.value)) {
    //     setSelectedTeams([...selectedTeams, event.target.value]);

    //     setDriver({ ...driver, teams: selectedTeams });
    //     setErrors(
    //       validateForm({
    //         ...driver,
    //         teams: selectedTeams,
    //       })
    //     );
    //   }
    // }
  }

  // function handleChange(event) {
  //   const { name, value, type, checked } = event.target;

  //   setDriver((prevDriver) => {
  //     if (type === "checkbox") {
  //       return {
  //         ...prevDriver,
  //         teams: checked
  //           ? [...prevDriver.teams, value]
  //           : prevDriver.teams.filter((team) => team !== value),
  //       };
  //     } else {
  //       return {
  //         ...prevDriver,
  //         [name]: value,
  //       };
  //     }
  //   });

  //   setErrors((prevErrors) => {
  //     if (type === "checkbox") {
  //       return {
  //         ...prevErrors,
  //         teams: validateForm({ ...driver, teams: driver.teams }),
  //       };
  //     } else {
  //       return {
  //         ...prevErrors,
  //         [name]: validateForm({ ...driver, [name]: value }),
  //       };
  //     }
  //   });
  // }

  const handleTeamChange = (event) => {
    const teamsName = event.target.value;
    const isCheked = event.target.checked;

    let updateDriver;

    if (isCheked) {
      updateDriver = [...driver.teams, teamsName];
    } else {
      updateDriver = driver.teams.filter((team) => team !== teamsName);
    }

    setDriver({ ...driver, teams: updateDriver });
    setErrors(validateForm({ ...driver, [event.target.name]: updateDriver }));
    console.log(updateDriver);
  };

  // function handleTeamsChange(name, value) {
  //   return driver.teams.includes(value)
  //     ? driver.teams.filter((team) => team !== value)
  //     : [...driver.teams, value];
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(driver);
    dispatch(postDriver(driver));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   //    console.log(driver);
  //   let newTeams = selectedTeams?.map((team) => team.name);
  //   //newTeams = newTeams.join(",");
  //   console.log(newTeams);
  //   setDriver({ ...driver, teams: newTeams });
  //   setErrors(
  //     validateForm({ ...driver, [event.target.name]: event.target.value })
  //   );

  //   dispatch(postDriver(driver));
  // };

  // const handleSelected = (event) => {
  //   const teamId = event.target.value;
  //   const selectTeam = allTeams.find((team) => teamId === team.id);
  //   setSelectedTeams([...selectedTeams, selectTeam]);
  // };

  const handleRemoveTeam = (teamName) => {
    setSelectedTeams(selectedTeams.filter((team) => team !== teamName));
    setDriver({ ...driver, teams: selectedTeams });
    setErrors(
      validateForm({
        ...driver,
        teams: selectedTeams,
      })
    );
  };

  useEffect(() => {
    dispatch(getTeams());
    console.log(driver);
  }, [driver]);

  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <div className={style.textContainer}>
        <h2>INGRESAR DATOS DEL CORREDOR</h2>
        <label>Nombre:</label>
        <input
          name="name"
          placeholder="Ingrese un nombre..."
          type="text"
          onChange={handleChange}
        />
        <span>{errors.name}</span>
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
        <input
          name="image"
          type="url"
          onChange={handleChange}
          placeholder="Ingrese una URL..."
        />
        <span>{errors.image}</span>
        <br />
        <label>Fecha de Nacimiento:</label>
        <input name="birthdate" type="date" onChange={handleChange} />
        <span>{errors.birthdate}</span>
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
        {/* <label>Escuderias:</label>

        <div className={style.formSelect}>
          <select onChange={handleChange} name="teams">
            <option disabled selected>
              Seleccionar minimo un equipo
            </option>
            {allTeams?.map((team) => {
              return <option key={team.id}>{team.name}</option>;
            })}
          </select>
          <div className={style.selectedTeams}>
            {selectedTeams.map((team) => {
              return (
                <div key={team.id} className={style.selectTeam}>
                  <p>{team}</p>
                  <button
                    onClick={() => {
                      handleRemoveTeam(team);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <span>{errors.teams}</span>
        </div> */}
      </div>
      <div className={style.teamsContainer}>
        <label>Escuderias:</label>
        <span>{errors.teams}</span>
        <div className={style.formSelect}>
          {allTeams?.map((team) => (
            <div key={team.id}>
              <label>
                <input
                  type="checkbox"
                  name="teams"
                  value={team.name}
                  checked={driver.teams.includes(team.name)}
                  onChange={handleTeamChange}
                />
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
