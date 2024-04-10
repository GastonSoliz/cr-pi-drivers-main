import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDriverById, getTeams, updateDriver } from "../../redux/actions.ts";
import { useParams } from "react-router-dom";
import validateForm from "../../utils/validateForm.ts";
import style from "./Edit.module.css";
import React from "react";

type Team = {
  id: number;
  name: string;
};

type someTeams = Team[];

type Driver = {
  birthdate: string;
  description: string;
  image: string;
  name: string;
  nationality: string;
  surname: string;
  teams: someTeams;
};

type DriverError = {
  birthdate?: string;
  description?: string;
  image?: string;
  name?: string;
  nationality?: string;
  surname?: string;
  teams?: string;
};

export default function Edit() {
  const allTeams: someTeams = useSelector((state) => state.allTeams);
  let driver: Driver = useSelector((state) => state.driverDetail);
  const [errors, setErrors] = useState<DriverError>({});

  const initialSelectedTeams: string[] = driver?.teams.map(
    (team: Team) => team.name
  );
  //ARREGLAR TIPOS ENTRE ESTOS DOS...
  const [formData, setFormData] = useState({
    name: driver?.name,
    surname: driver?.surname,
    nationality: driver?.nationality,
    image: driver?.image,
    birthdate: driver?.birthdate,
    description: driver?.description,
    teams: initialSelectedTeams,
  });

  const { id } = useParams();
  const dispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors(
      validateForm({ ...formData, [event.target.name]: event.target.value })
    );
  }

  function handleTeamChange(event: React.ChangeEvent<HTMLInputElement>) {
    const teamName: string = event.target.value;
    const isChecked: boolean = event.target.checked;

    let updatedTeams: string[];

    if (isChecked) {
      updatedTeams = [...formData.teams, teamName];
    } else {
      updatedTeams = formData.teams.filter((team) => team !== teamName);
    }

    setFormData({ ...formData, teams: updatedTeams });
    setErrors(validateForm({ ...formData, teams: updatedTeams }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(updateDriver(formData, id));
  }

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  useEffect(() => {
    if (driver?.name) {
      setFormData({
        name: driver.name,
        surname: driver.surname,
        nationality: driver.nationality,
        image: driver.image,
        birthdate: driver.birthdate,
        description: driver.description,
        teams: initialSelectedTeams || [],
      });
    } else dispatch(getDriverById(id));
  }, [driver, dispatch]);

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
