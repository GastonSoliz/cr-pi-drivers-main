import axios from "axios";
import { Dispatch } from "redux";

type Team = {
  id: number;
  name: string;
};

type Driver = {
  id?: number;
  birthdate: string;
  description: string;
  image: string;
  name: string;
  nationality: string;
  surname: string;
  //DECIDIR SI AL FINAL TEAM VIENE COMO STRING O ARRAY
  teams: string;
};

const URL: string = "http://localhost:3001/";

export function getTeams() {
  const endpoint: string = `${URL}teams`;
  return async (dispatch: Dispatch) => {
    const { data } = await axios.get<Team[]>(endpoint);
    return dispatch({ type: "GET_TEAMS", payload: data });
  };
}

export function getDriverByName(name: string) {
  const endpoint: string = `${URL}drivers?name=${name}`;
  return async (dispatch: Dispatch) => {
    const { data } = await axios.get<Driver[] | Driver>(endpoint);
    return dispatch({ type: "GET_DRIVER_BY_NAME", payload: data });
  };
}

export function getDriverById(id: number) {
  const endpoint: string = `${URL}drivers/${id}`;
  return async (dispatch: Dispatch) => {
    const { data } = await axios.get<Driver>(endpoint);
    if (data) {
      return dispatch({ type: "GET_DRIVER_BY_ID", payload: data });
    }
  };
}

export function getDrivers() {
  const endpoint: string = `${URL}drivers`;
  return async (dispatch: Dispatch) => {
    const { data } = await axios.get<Driver[]>(endpoint);
    return dispatch({ type: "GET_DRIVERS", payload: data });
  };
}

export function postDriver(driver: Driver) {
  const endpoint: string = `${URL}drivers`;
  return async (dispatch: Dispatch) => {
    const { data } = await axios.post<Driver>(endpoint, driver);
    return dispatch({ type: "POST_DRIVER", payload: data });
  };
}

//FIJARSE SI FUNCONA ESTE ENDPOINT
export function deleteDriver(id: number) {
  const endpoint: string = `${URL}drivers/${id}`;
  return async (dispatch: Dispatch) => {
    await axios.delete<Driver>(endpoint);
    return dispatch({ type: "DELETE_DRIVER", payload: id });
  };
}

//QUE DEBERIA PONER EN EL GENERCO DEL AXIOS.PUT?
export function updateDriver(driver: Driver, id: number) {
  const endpoint: string = `${URL}drivers/${id}`;
  return async (dispatch: Dispatch) => {
    const { data } = await axios.put(endpoint, driver);
    return dispatch({ type: "UPDATE_DRIVER", payload: data });
  };
}

export function sortOrigin(origin_id: string) {
  return { type: "SORT_ORIGIN", payload: origin_id };
}

export function sortDate(date: string) {
  return { type: "SORT_DATE", payload: date };
}

export function sortName(name: string) {
  return { type: "SORT_NAME", payload: name };
}

export function sortTeam(team: string) {
  return { type: "SORT_TEAM", payload: team };
}

export function cleanDetail() {
  return { type: "CLEAN_DETAIL", payload: null };
}
