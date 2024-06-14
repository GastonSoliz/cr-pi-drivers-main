import { useEffect, useState } from "react";
import validateForm from "../../utils/validateForm.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanPost,
  getTeams,
  postDriver,
  validateCaptcha,
} from "../../redux/actions.ts";
//import style from "./Form.module.css";
import React from "react";
import { Team, Driver, DriverError, State } from "../../types/types.ts";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import ReCAPTCHA from "react-google-recaptcha";

export default function Form() {
  const allTeams: Team[] = useSelector((state: State) => state.allTeams);
  const dispatch: ThunkDispatch<State, any, AnyAction> = useDispatch();
  const msj: string | null = useSelector((state: State) => state.msjPost);
  const msjCaptcha: boolean = useSelector(
    (state: State) => state.captchaRequest
  );
  const [eState, setEState] = useState(true);

  const [driver, setDriver] = useState<Driver>({
    name: "",
    surname: "",
    nationality: "",
    image: "",
    birthdate: "",
    description: "",
    teams: [],
  });

  console.log("msj: ", msj);

  const [errors, setErrors] = useState<DriverError>({});

  function handleDisabled() {
    const hasError = Object.keys(errors).length > 0;
    setEState(hasError);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setDriver({ ...driver, image: files[0] });
      setErrors(validateForm({ ...driver, image: files[0] }));
    } else {
      setDriver({ ...driver, image: "" });
      setErrors(validateForm({ ...driver, image: "" }));
    }
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target.name !== "teams") {
      setDriver({ ...driver, [event.target.name]: event.target.value });
      setErrors(
        validateForm({ ...driver, [event.target.name]: event.target.value })
      );
    }
    handleDisabled();
  }

  function handleTeams(event: React.ChangeEvent<HTMLSelectElement>): void {
    const teamName: string = event.target.value;
    let updateTeams: Team[] = [...driver.teams];
    let isSelected: boolean = updateTeams.some(
      (team) => team.name === teamName
    );

    if (!isSelected) {
      updateTeams.push({ name: teamName });
    }

    setDriver({ ...driver, teams: updateTeams });
    setErrors(validateForm({ ...driver, teams: updateTeams }));
    handleDisabled();
  }
  function handleTeamClose(teamName: string): void {
    const updateTeams: Team[] = driver.teams.filter(
      (team) => team.name !== teamName
    );
    setDriver({ ...driver, teams: updateTeams });
    setErrors(validateForm({ ...driver, teams: updateTeams }));
    handleDisabled();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData();
    for (const key in driver) {
      if (key === "teams") {
        formData.append(key, JSON.stringify(driver[key])); // Convertir teams a cadena JSON
      } else {
        formData.append(key, driver[key]);
      }
    }

    dispatch(postDriver(formData));
  }

  function handleCaptcha(value: string) {
    const token = { token: value };
    dispatch(validateCaptcha(token));
  }

  useEffect(() => {
    dispatch(getTeams());
    return () => {
      dispatch(cleanPost());
    };
  }, []);

  useEffect(() => {
    const hasError = Object.keys(errors).length > 0 || !msjCaptcha;
    setEState(hasError);
  }, [errors, msjCaptcha]);

  console.log("eState: ", eState);
  console.log("errors: ", errors);

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
            onChange={handleImageUpload}
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
          <select className="form-select" onChange={handleTeams}>
            <option value="NONE">Seleccione equipos</option>
            {allTeams?.map((team, index) => (
              <option value={team.name} key={index}>
                {team.name}
              </option>
            ))}
          </select>
          <span className="text-danger">{errors.teams}</span>
          {driver.teams?.map((team, index) => (
            <div
              key={index}
              className="rounded-pill bg-light p-2 m-2 d-inline-block"
            >
              <span>{team.name}</span>
              <button
                className="btn btn-outline-danger btn-sm rounded-circle"
                type="button"
                onClick={() => handleTeamClose(team.name)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-10  offset-sm-2">
          {msjCaptcha ? null : (
            <span className="text-success">
              Asegurate de validar el captcha!
            </span>
          )}{" "}
          <ReCAPTCHA
            sitekey="6Le368MpAAAAAFK8yYYtnzY30wUnZzmLdkNIDEWo"
            onChange={handleCaptcha}
          ></ReCAPTCHA>
          <button
            type="submit"
            className="btn btn-primary me-2"
            // disabled={eState || !msjCaptcha}
          >
            SUBIR
          </button>
          {msj === "Solicitud en proceso" && (
            <div className="alert alert-secondary d-flex align-items-center gap-4">
              <img
                src="/loading.gif"
                className="img-fluid"
                alt="Cargando..."
                style={{ maxWidth: "50px", maxHeight: "50px" }}
              />
              <p className="m-0">Cargando...</p>
            </div>
          )}
          {msj === null && (
            <span className="alert alert-success">
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
