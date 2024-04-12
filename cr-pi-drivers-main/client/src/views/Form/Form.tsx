import { useEffect, useState } from "react";
import validateForm from "../../utils/validateForm.ts";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, postDriver } from "../../redux/actions.ts";
import style from "./Form.module.css";
import React from "react";
import { Team, Driver, DriverError, State } from "../../types/types.ts";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export default function Form() {
  const allTeams: Team[] = useSelector((state: State) => state.allTeams);
  const dispatch: ThunkDispatch<State, any, AnyAction> = useDispatch();

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

  function handleTeamChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const teamsName: string = event.target.value;
    const isChecked: boolean = event.target.checked;

    let updateDriver: Team[];

    if (driver && driver.teams) {
      if (isChecked) {
        updateDriver = [...driver.teams, { name: teamsName }];
      } else {
        updateDriver = driver.teams.filter((team) => team.name !== teamsName);
      }

      setDriver({ ...driver, teams: updateDriver });
      setErrors(validateForm({ ...driver, teams: updateDriver }));
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    dispatch(postDriver(driver));
  }

  useEffect(() => {
    dispatch(getTeams());
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
                  checked={driver.teams?.some((t) => t.name === team.name)}
                  onChange={handleTeamChange}
                />
                {team.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className={style.buttonContainer}>
        <button type="submit" disabled={handleDisabled()}>
          SUBIR
        </button>
      </div>
    </form>
  );
}
