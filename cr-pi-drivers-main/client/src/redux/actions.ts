import axios from "axios";
import { Dispatch } from "redux";
import { Team, Driver, Action } from "../types/types";

// type Action =
//   | { type: "GET_TEAMS"; payload: Team[] }
//   //[{Driver}]
//   | { type: "GET_DRIVER_BY_NAME"; payload: Driver[] | Driver }
//   | { type: "GET_DRIVER_BY_ID"; payload: Driver }
//   | { type: "GET_DRIVERS"; payload: Driver[] }
//   //{newDriver:{Driver}} deberia ir todo de la misma manera... sino lo hace... ARREGLAR TODO EL PROYECTO
//   //Si no, es quilombo de tipo de datos
//   | { type: "POST_DRIVER"; payload: Driver }
//   | { type: "DELETE_DRIVER"; payload: number }
//   | { type: "UPDATE_DRIVER"; payload: Driver }
//   | { type: "SORT_ORIGIN"; payload: string }
//   | { type: "SORT_DATE"; payload: string }
//   //Falta implementar
//   | { type: "SORT_NAME"; payload: string }
//   | { type: "SORT_TEAM"; payload: string }
//   | { type: "CLEAN_DETAIL"; payload: null };

const URL: string = "http://localhost:3001/";

export function getTeams() {
  const endpoint: string = `${URL}teams`;
  return async (dispatch: Dispatch<Action>) => {
    const { data } = await axios.get<Team[]>(endpoint);
    return dispatch({ type: "GET_TEAMS", payload: data });
  };
}

export function getDriverByName(name: string) {
  const endpoint: string = `${URL}drivers?name=${name}`;
  return async (dispatch: Dispatch<Action>) => {
    const { data } = await axios.get<Driver[] | Driver>(endpoint);
    return dispatch({ type: "GET_DRIVER_BY_NAME", payload: data });
  };
}

export function getDriverById(id: number | string) {
  const endpoint: string = `${URL}drivers/${id}`;
  return async (dispatch: Dispatch<Action>) => {
    const { data } = await axios.get<Driver>(endpoint);
    if (data) {
      return dispatch({ type: "GET_DRIVER_BY_ID", payload: data });
    }
  };
}

export function getDrivers() {
  const endpoint: string = `${URL}drivers`;
  return async (dispatch: Dispatch<Action>) => {
    const { data } = await axios.get<Driver[]>(endpoint);
    return dispatch({ type: "GET_DRIVERS", payload: data });
  };
}

export function postDriver(driver: Driver) {
  const endpoint: string = `${URL}drivers`;
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: "POST_DRIVER_REQUEST", payload: "Solicitud en proceso" });
    try {
      const { data } = await axios.post<Driver>(endpoint, driver);
      dispatch({ type: "POST_DRIVER_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "POST_DRIVER_FAILURE", payload: "Solicitud fallida" });
    }
  };
}

export function deleteDriver(id: string) {
  const endpoint: string = `${URL}drivers/${id}`;
  return async (dispatch: Dispatch<Action>) => {
    await axios.delete(endpoint);
    return dispatch({ type: "DELETE_DRIVER", payload: id });
  };
}

export function updateDriver(
  driver: Driver,
  id: string
): (dispatch: Dispatch<Action>) => Promise<void> {
  const endpoint: string = `${URL}drivers/${id}`;
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: "UPDATE_DRIVER_REQUEST",
      payload: "Solicitud en proceso",
    });
    try {
      const { data } = await axios.put(endpoint, driver);
      dispatch({ type: "UPDATE_DRIVER_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "UPDATE_DRIVER_FAILURE", payload: "Solicitud fallida" });
    }
  };
}

export function sortOrigin(origin_id: string): Action {
  return { type: "SORT_ORIGIN", payload: origin_id };
}

export function sortDate(date: string): Action {
  return { type: "SORT_DATE", payload: date };
}

export function sortName(name: string): Action {
  return { type: "SORT_NAME", payload: name };
}

export function sortTeam(team: string): Action {
  return { type: "SORT_TEAM", payload: team };
}

export function cleanDetail(): Action {
  return { type: "CLEAN_DETAIL", payload: null };
}

export function validateCaptcha(token) {
  const endpoint: string = `${URL}captcha`;
  console.log("lo que llega al action:", token);
  return async (dispatch: Dispatch) => {
    const { data } = await axios.post(endpoint, token);
    console.log("devuelve el back: ", data);
    dispatch({ type: "VALIDATE_CAPTCHA", payload: data });
  };
}
