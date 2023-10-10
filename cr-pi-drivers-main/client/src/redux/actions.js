import axios from "axios";

const URL = "http://localhost:3001/";

export function getTeams() {
  const endpoint = `${URL}teams`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    return dispatch({ type: "GET_TEAMS", payload: data });
  };
}

export function getDriverByName(name) {
  const endpoint = `${URL}drivers?name=${name}`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    return dispatch({ type: "GET_DRIVER_BY_NAME", payload: data });
  };
}

export function getDriverById(id) {
  const endpoint = `${URL}drivers/${id}`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    if (data) {
      return dispatch({ type: "GET_DRIVER_BY_ID", payload: data });
    }
  };
}

export function getDrivers() {
  const endpoint = `${URL}drivers`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    return dispatch({ type: "GET_DRIVERS", payload: data });
  };
}

export function postDriver(driver) {
  const endpoint = `${URL}drivers`;
  return async (dispatch) => {
    const { data } = await axios.post(endpoint, driver);
    return dispatch({ type: "POST_DRIVER", payload: data });
  };
}

export function sortOrigin(origin_id) {
  return { type: "SORT_ORIGIN", payload: origin_id };
}

export function sortDate(date) {
  return { type: "SORT_DATE", payload: date };
}

export function sortName(name) {
  return { type: "SORT_NAME", payload: name };
}

export function sortTeam(team) {
  return { type: "SORT_TEAM", payload: team };
}

export function cleanDetail() {
  return { type: "CLEAN_DETAIL", payload: [] };
}
