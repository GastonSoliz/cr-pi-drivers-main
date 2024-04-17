import { Team, DriverError, State, Action } from "../types/types";

const initialState: State = {
  allDrivers: [],
  filteredDrivers: [],
  driverDetail: null,
  allTeams: [],
  msj: null,
};

const regExUUID: RegExp =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
const regExID: RegExp = /^\d+(\.\d+)?$/;

export default function rootReducer(
  state: State = initialState,
  action: Action
): State {
  // let previousFilters;
  // let filteredDrivers;
  let copyDrivers: DriverError[];
  switch (action.type) {
    case "GET_DRIVERS":
      return {
        ...state,
        allDrivers: action.payload,
        filteredDrivers: action.payload,
      };
    case "GET_DRIVER_BY_ID":
      return { ...state, driverDetail: action.payload };
    case "GET_DRIVER_BY_NAME":
      return { ...state, filteredDrivers: action.payload };
    case "POST_DRIVER_REQUEST":
      return {
        ...state,
        msj: action.payload,
      };
    case "POST_DRIVER_SUCCESS":
      return {
        ...state,
        allDrivers: [...state.allDrivers, action.payload],
        msj: "Solicitud exitosa",
      };
    case "POST_DRIVER_FAILURE":
      return {
        ...state,
        msj: action.payload,
      };
    case "DELETE_DRIVER":
      return {
        ...state,
        allDrivers: [
          ...state.allDrivers.filter((driver) => driver.id === action.payload),
        ],
      };
    case "UPDATE_DRIVER":
      return {
        ...state,
        allDrivers: [
          ...state.allDrivers.map((driver) =>
            driver.id === action.payload.id ? action.payload : driver
          ),
        ],
      };
    case "CLEAN_DETAIL":
      return { ...state, driverDetail: action.payload };
    case "GET_TEAMS":
      return { ...state, allTeams: action.payload };
    case "SORT_ORIGIN":
      copyDrivers = [...state.allDrivers];
      let filterOriginDriversRaw: DriverError[];
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
      let filterDateDriversRaw: DriverError[] = [];
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
      let filterTeamDriversRaw: DriverError[] = [];
      if (action.payload === "NONE") {
        filterTeamDriversRaw = copyDrivers;
      } else {
        filterTeamDriversRaw = copyDrivers.filter((driver) => {
          if (regExUUID.test(driver.id?.toString() ?? "")) {
            //FALTA DEFINIR COMO VIENE TEAMS
            const teams = driver.teams || [];
            const teamNames = teams.map((team) => team.name.trim());

            return teamNames.includes(action.payload);
          } else if (regExID.test(driver.id?.toString() ?? "")) {
            const teams = driver.teams
              ? driver.teams.split(",").map((teamName) => teamName.trim())
              : [];
            return teams.length > 0 && teams.includes(action.payload);
          }
          //backup por si no entra al if?
          // return false;
        });
      }
      return { ...state, filteredDrivers: filterTeamDriversRaw };
    default:
      return { ...state };
  }
}
