import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDriverById, getTeams, updateDriver } from "../../redux/actions.ts";
import { useParams } from "react-router-dom";
import validateForm from "../../utils/validateForm.ts";
import style from "./Edit.module.css";
import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Team, Driver, DriverError, State } from "../../types/types.ts";

export default function Edit() {
  const allTeams: Team[] = useSelector((state: State) => state.allTeams);
  const driver: Driver = useSelector((state) => state.driverDetail);
  const msj: string | null = useSelector((state: State) => state.msjUpdate);

  const [errors, setErrors] = useState<DriverError>({});

  const [formData, setFormData] = useState<Driver>({
    name: driver?.name,
    surname: driver?.surname,
    nationality: driver?.nationality,
    image: driver?.image,
    birthdate: driver?.birthdate,
    description: driver?.description,
    teams: driver?.teams,
  });

  const { id } = useParams();
  const dispatch: ThunkDispatch<State, any, AnyAction> = useDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors(
      validateForm({ ...formData, [event.target.name]: event.target.value })
    );
  }

  function handleTeamChange(event: React.ChangeEvent<HTMLInputElement>) {
    const teamName: string = event.target.value;
    const isChecked: boolean = event.target.checked;

    let updatedTeams: Team[];

    if (isChecked) {
      updatedTeams = [...formData.teams, { name: teamName }];
    } else {
      updatedTeams = formData.teams.filter((team) => team.name !== teamName);
    }

    setFormData({ ...formData, teams: updatedTeams });
    setErrors(validateForm({ ...formData, teams: updatedTeams }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (typeof id === "string") {
      dispatch(updateDriver(formData, id));
    }
  }

  useEffect(() => {
    dispatch(getTeams());
    if (id) {
      dispatch(getDriverById(id));
    }
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
        teams: driver.teams,
      });
    }
  }, [driver, dispatch]);

  useEffect(() => {
    return setFormData({
      name: "",
      surname: "",
      nationality: "",
      image: "",
      birthdate: "",
      description: "",
      teams: [],
    });
  }, []);

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Nombre:
          </label>
          <input
            id="name"
            name="name"
            className="form-control"
            placeholder="Ingrese un nombre..."
            type="text"
            onChange={handleChange}
            value={formData.name}
          />
          <span className="text-danger">{errors.name}</span>
        </div>
        <div className="col-md-6">
          <label htmlFor="surname" className="form-label">
            Apellido:
          </label>
          <input
            id="surname"
            name="surname"
            className="form-control"
            placeholder="Ingrese un apellido..."
            type="text"
            onChange={handleChange}
            value={formData.surname}
          />
          <span className="text-danger">{errors.surname}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="nationality" className="form-label">
            Nacionalidad:
          </label>
          <input
            id="nationality"
            name="nationality"
            className="form-control"
            placeholder="Ingrese la nacionalidad..."
            type="text"
            onChange={handleChange}
            value={formData.nationality}
          />
          <span className="text-danger">{errors.nationality}</span>
        </div>
        <div className="col-md-6">
          <label htmlFor="image" className="form-label">
            Imagen:
          </label>
          <input
            id="image"
            name="image"
            className="form-control"
            type="file"
            onChange={handleChange}
          />
          <input
            name="image"
            className="form-control mt-2"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="Ingrese una URL..."
          />
          <span className="text-danger">{errors.image}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="birthdate" className="form-label">
            Fecha de nacimiento:
          </label>
          <input
            id="birthdate"
            name="birthdate"
            className="form-control"
            type="date"
            onChange={handleChange}
            value={formData.birthdate}
          />
          <span className="text-danger">{errors.birthdate}</span>
        </div>
        <div className="col-md-6">
          <label htmlFor="description" className="form-label">
            Descripcion:
          </label>
          <input
            id="description"
            name="description"
            className="form-control"
            type="text"
            onChange={handleChange}
            value={formData.description}
            placeholder="Ingrese una breve descripcion..."
          />
          <span className="text-danger">{errors.description}</span>
        </div>
      </div>
      <div className="mb-3 row mt-4">
        <label className="col-sm-2 col-form-label">Escuderias:</label>
        <div className="col-sm-10">
          {allTeams?.map((team) => (
            <div key={team.id} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="teams"
                value={team.name}
                checked={formData.teams?.some((t) => t.name === team.name)}
                onChange={handleTeamChange}
              />
              <label className="form-check-label">{team.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <button type="submit" className="btn btn-primary">
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
              El conductor ha sido editado correctamente
            </span>
          )}
          {msj === "Solicitud fallida" && (
            <span className="text-danger">
              Hubo un error al editar al conductor
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
