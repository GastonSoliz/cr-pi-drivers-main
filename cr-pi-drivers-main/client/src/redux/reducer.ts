import { DriverError, State, Action, Driver } from "../types/types";

const initialState: State = {
  allDrivers: [],
  filteredDrivers: [],
  driverDetail: null,
  allTeams: [],
  msjDrivers: null,
  msjPost: null,
  msjUpdate: null,
  captchaRequest: false,
};

const regExUUID: RegExp =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
const regExID: RegExp = /^\d+(\.\d+)?$/;

export default function rootReducer(
  state: State = initialState,
  action: Action
): State {
  let copyDrivers: Driver[];
  switch (action.type) {
    case "GET_DRIVERS_REQUEST":
      return { ...state, msjDrivers: action.payload };
    case "GET_DRIVERS_SUCCESS":
      return {
        ...state,
        allDrivers: action.payload,
        filteredDrivers: action.payload,
        msjDrivers: "Solicitud exitosa",
      };
    case "GET_DRIVERS_FAILURE":
      return {
        ...state,
        msjDrivers: action.payload,
      };
    case "GET_DRIVER_BY_ID":
      return { ...state, driverDetail: action.payload };
    case "GET_DRIVER_BY_NAME":
      return { ...state, filteredDrivers: action.payload };
    case "POST_DRIVER_REQUEST":
      return {
        ...state,
        msjPost: action.payload,
      };
    case "POST_DRIVER_SUCCESS":
      return {
        ...state,
        allDrivers: [...state.allDrivers, action.payload],
        msjPost: "Solicitud exitosa",
      };
    case "POST_DRIVER_FAILURE":
      return {
        ...state,
        msjPost: action.payload,
      };
    case "DELETE_DRIVER":
      return {
        ...state,
        filteredDrivers: [
          ...state.filteredDrivers.filter(
            (driver: Driver) => driver.id !== action.payload
          ),
        ],
      };
    case "UPDATE_DRIVER_REQUEST":
      return {
        ...state,
        msjUpdate: action.payload,
      };
    case "UPDATE_DRIVER_SUCCESS":
      return {
        ...state,
        allDrivers: [
          ...state.allDrivers.map((driver) =>
            driver.id === action.payload.id ? action.payload : driver
          ),
        ],
        msjUpdate: "Solicitud exitosa",
      };
    case "UPDATE_DRIVER_FAILURE":
      return {
        ...state,
        msjUpdate: action.payload,
      };
    case "CLEAN_DETAIL":
      return { ...state, driverDetail: action.payload };
    case "GET_TEAMS":
      return { ...state, allTeams: action.payload };
    case "SORT_ORIGIN":
      copyDrivers = [...state.allDrivers];
      let filterOriginDriversRaw: Driver[];
      if (action.payload === "ID") {
        filterOriginDriversRaw = copyDrivers.filter((driver) =>
          regExID.test(driver.id?.toString() ?? "")
        );
      } else if (action.payload === "BDD") {
        filterOriginDriversRaw = copyDrivers.filter((driver) =>
          regExUUID.test(driver.id?.toString() ?? "")
        );
      } else {
        filterOriginDriversRaw = state.allDrivers;
      }
      return { ...state, filteredDrivers: filterOriginDriversRaw };

    case "SORT_DATE":
      copyDrivers = [...state.allDrivers];
      let filterDateDriversRaw: Driver[] = [];
      if (action.payload === "ASCENDENTE") {
        filterDateDriversRaw = copyDrivers.sort((a, b) => {
          const dateA = new Date(a.birthdate ?? "").getTime();
          const dateB = new Date(b.birthdate ?? "").getTime();
          return dateA - dateB;
        });
      } else if (action.payload === "DESCENDENTE") {
        filterDateDriversRaw = copyDrivers.sort((a, b) => {
          const dateA = new Date(a.birthdate ?? "").getTime();
          const dateB = new Date(b.birthdate ?? "").getTime();
          return dateB - dateA;
        });
      } else if (action.payload === "NONE") {
        filterDateDriversRaw = state.allDrivers;
      }
      return { ...state, filteredDrivers: filterDateDriversRaw };
    case "SORT_TEAM":
      copyDrivers = [...state.allDrivers];
      let filterTeamDriversRaw: Driver[] = [];
      if (action.payload === "NONE") {
        filterTeamDriversRaw = copyDrivers;
      } else {
        console.log("lo que hay: ", action.payload);
        filterTeamDriversRaw = copyDrivers.filter((driver) => {
          console.log(driver.teams);
          return driver.teams?.includes(action.payload);
        });
      }
      return { ...state, filteredDrivers: filterTeamDriversRaw };
    case "VALIDATE_CAPTCHA":
      if (action.payload.success) {
        return { ...state, captchaRequest: true };
      } else return { ...state, captchaRequest: false };
    default:
      return { ...state };
  }
}
