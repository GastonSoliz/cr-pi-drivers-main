import { useEffect, useState } from "react";
import validateForm from "../../utils/validateForm.ts";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, postDriver } from "../../redux/actions.ts";
//import style from "./Form.module.css";
import React from "react";
import { Team, Driver, DriverError, State } from "../../types/types.ts";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export default function Form() {
  const allTeams: Team[] = useSelector((state: State) => state.allTeams);
  const dispatch: ThunkDispatch<State, any, AnyAction> = useDispatch();
  const msj: string | null = useSelector((state: State) => state.msjPost);

  const [driver, setDriver] = useState<Driver>({
    name: "",
    surname: "",
    nationality: "",
    image: "",
    birthdate: "",
    description: "",
    teams: [],
  });

  const [errors, setErrors] = useState<DriverError>({});

  function handleDisabled(): boolean {
    if (errors) {
      for (const error in errors) {
        if (errors[error as keyof DriverError] !== "") return true;
      }
    }
    return false;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target.name !== "teams") {
      setDriver({ ...driver, [event.target.name]: event.target.value });
      setErrors(
        validateForm({ ...driver, [event.target.name]: event.target.value })
      );
    }
  }

  // function handleTeamChange(event: React.ChangeEvent<HTMLInputElement>): void {
  //   const teamsName: string = event.target.value;
  //   const isChecked: boolean = event.target.checked;

  //   let updateDriver: Team[];

  //   if (driver && driver.teams) {
  //     if (isChecked) {
  //       updateDriver = [...driver.teams, { name: teamsName }];
  //     } else {
  //       updateDriver = driver.teams.filter((team) => team.name !== teamsName);
  //     }

  //     setDriver({ ...driver, teams: updateDriver });
  //     setErrors(validateForm({ ...driver, teams: updateDriver }));
  //   }
  // }

  function handleTeams(event: React.ChangeEvent<HTMLSelectElement>): void {
    // const teamName: string = event.target.value;
    // let isSelected: boolean = false;
    // let updateTeams: Team[] = [];
    // console.log(isSelected);
    // if (updateTeams.length > 0) {
    //   isSelected = updateTeams.some((team) => team.name === teamName);
    //   console.log("prueba:", isSelected);
    // }
    // if (!isSelected) {
    //   updateTeams = [...driver.teams, { name: teamName }];
    // }

    // console.log(updateTeams);
    // setDriver({ ...driver, teams: updateTeams });
    // setErrors(validateForm({ ...driver, teams: updateTeams }));
    const teamName: string = event.target.value;
    let updateTeams: Team[] = [...driver.teams]; // Copia los equipos actuales del conductor
    let isSelected: boolean = updateTeams.some(
      (team) => team.name === teamName
    ); // Verifica si el equipo ya está en la lista

    console.log(isSelected);

    if (!isSelected) {
      updateTeams.push({ name: teamName }); // Agrega el nuevo equipo solo si no está en la lista
    }

    console.log(updateTeams);

    setDriver({ ...driver, teams: updateTeams }); // Actualiza el estado del conductor
    setErrors(validateForm({ ...driver, teams: updateTeams }));
  }
  function handleTeamClose(teamName: string): void {
    const updateTeams: Team[] = driver.teams.filter(
      (team) => team.name !== teamName
    );
    setDriver({ ...driver, teams: updateTeams });
    setErrors(validateForm({ ...driver, teams: updateTeams }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    dispatch(postDriver(driver));
  }

  useEffect(() => {
    dispatch(getTeams());
  }, [driver]);

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3 row">
        <h2 className="col">INGRESAR DATOS DEL CORREDOR</h2>
      </div>
      <div className="mb-3 row">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Nombre:
        </label>
        <div className="col-sm-4">
          <input
            id="name"
            name="name"
            className="form-control"
            placeholder="Ingrese un nombre..."
            type="text"
            onChange={handleChange}
          />
          <span className="text-danger">{errors.name}</span>
        </div>
        <label htmlFor="surname" className="col-sm-2 col-form-label">
          Apellido:
        </label>
        <div className="col-sm-4">
          <input
            id="surname"
            name="surname"
            className="form-control"
            placeholder="Ingrese un apellido..."
            type="text"
            onChange={handleChange}
          />
          <span className="text-danger">{errors.surname}</span>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="nationality" className="col-sm-2 col-form-label">
          Nacionalidad:
        </label>
        <div className="col-sm-4">
          <input
            id="nationality"
            name="nationality"
            className="form-control"
            placeholder="Ingrese la nacionalidad..."
            type="text"
            onChange={handleChange}
          />
          <span className="text-danger">{errors.nationality}</span>
        </div>
        <label htmlFor="image" className="col-sm-2 col-form-label">
          Imagen:
        </label>
        <div className="col-sm-4">
          <input
            id="image"
            name="image"
            className="form-control"
            type="file"
            onChange={handleChange}
          />
          <input
            name="image"
            className="form-control mt-1"
            type="url"
            onChange={handleChange}
            placeholder="Ingrese una URL..."
          />
          <span className="text-danger">{errors.image}</span>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="birthdate" className="col-sm-2 col-form-label">
          Fecha de Nacimiento:
        </label>
        <div className="col-sm-4">
          <input
            id="birthdate"
            name="birthdate"
            className="form-control"
            type="date"
            onChange={handleChange}
          />
          <span className="text-danger">{errors.birthdate}</span>
        </div>
        <label htmlFor="description" className="col-sm-2 col-form-label">
          Descripcion:
        </label>
        <div className="col-sm-4">
          <input
            id="description"
            name="description"
            className="form-control"
            placeholder="Ingrese una breve descripcion..."
            type="text"
            onChange={handleChange}
          />
          <span className="text-danger">{errors.description}</span>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="teams" className="col-sm-2 col-form-label">
          Escuderías:
        </label>
        <div className="col-sm-10">
          {/* {allTeams?.map((team) => (
            <div key={team.id} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="teams"
                value={team.name}
                checked={driver.teams?.some((t) => t.name === team.name)}
                onChange={handleTeamChange}
              />
              <label className="form-check-label">{team.name}</label>
            </div>
          ))} */}
          <select className="form-select" onChange={handleTeams}>
            <option value="NONE">Seleccione equipos</option>
            {allTeams?.map((team) => (
              <option value={team.name} key={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <span className="text-danger">{errors.teams}</span>
          {driver.teams?.map((team) => (
            <div>
              <span>{team.name}</span>
              <button type="button" onClick={() => handleTeamClose(team.name)}>
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-10 offset-sm-2">
          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={handleDisabled()}
          >
            SUBIR
          </button>

          {msj === "Solicitud en proceso" && (
            <img
              src="../../../public/loading.gif"
              className="img-fluid"
              alt="Cargando..."
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          )}
          {msj === "Solicitud exitosa" && (
            <span className="text-success">
              El conductor ha sido creado correctamente
            </span>
          )}
          {msj === "Solicitud fallida" && (
            <span className="text-danger">
              Hubo un error al crear un conductor
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
