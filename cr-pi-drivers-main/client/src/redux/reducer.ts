type Team = {
  id: number;
  name: string;
};

type Driver = {
  birthdate: string;
  description: string;
  image: string;
  name: string;
  nationality: string;
  surname: string;
  teams: string;
};

type someTeams = Team[];
type someDrivers = Driver[];

const initialState = {
  allDrivers: [],
  filteredDrivers: [],
  driverDetail: [],
  allTeams: [],
};

type Action =
  | { type: "GET_TEAMS"; payload: someTeams }
  //[{Driver}]
  | { type: "GET_DRIVER_BY_NAME"; payload: Driver }
  | { type: "GET_DRIVER_BY_ID"; payload: Driver }
  | { type: "GET_DRIVERS"; payload: someDrivers }
  //{newDriver:{Driver}} deberia ir todo de la misma manera... sino lo hace... ARREGLAR TODO EL PROYECTO
  //Si no, es quilombo de tipo de datos
  | { type: "POST_DRIVER"; payload: Driver }
  | { type: "DELETE_DRIVER"; payload: number }
  | { type: "UPDATE_DRIVER"; payload: Driver }
  | { type: "SORT_ORIGIN"; payload: number }
  | { type: "SORT_DATE"; payload: string }
  //Falta implementar
  | { type: "SORT_NAME"; payload: string }
  | { type: "SORT_TEAM"; payload: string }
  | { type: "CLEAN_DETAIL"; payload: null };

const regExUUID: RegExp =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
const regExID: RegExp = /^\d+(\.\d+)?$/;

export default function rootReducer(state = initialState, action: Action) {
  let previousFilters;
  let filteredDrivers;
  let copyDrivers;
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
    case "POST_DRIVER":
      return {
        ...state,
        allDrivers: [...state.allDrivers, action.payload],
      };
    case "DELETE_DRIVER":
      return {
        ...state,
        allDrivers: [
          ...state.allDrivers.filter(
            (driver) => driver.id === action.payload.id
          ),
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
      let filterOriginDriversRaw;
      if (action.payload === "ID") {
        filterOriginDriversRaw = copyDrivers.filter((driver) =>
          regExID.test(driver.id)
        );
      } else if (action.payload === "BDD") {
        filterOriginDriversRaw = copyDrivers.filter((driver) =>
          regExUUID.test(driver.id)
        );
      } else {
        filterOriginDriversRaw = state.allDrivers;
      }
      return { ...state, filteredDrivers: filterOriginDriversRaw };

    case "SORT_DATE":
      copyDrivers = [...state.allDrivers];
      let filterDateDriversRaw;
      if (action.payload === "ASCENDENTE") {
        filterDateDriversRaw = copyDrivers.sort((a, b) => {
          const dateA = new Date(a.birthdate);
          const dateB = new Date(b.birthdate);
          return dateA - dateB;
        });
      } else if (action.payload === "DESCENDENTE") {
        filterDateDriversRaw = copyDrivers.sort((a, b) => {
          const dateA = new Date(a.birthdate);
          const dateB = new Date(b.birthdate);
          return dateB - dateA;
        });
      } else if (action.payload === "NONE") {
        filterDateDriversRaw = state.allDrivers;
      }
      console.log("SORT_DATE:", filterDateDriversRaw);
      return { ...state, filteredDrivers: filterDateDriversRaw };
    case "SORT_TEAM":
      copyDrivers = [...state.allDrivers];
      let filterTeamDriversRaw;
      if (action.payload === "NONE") {
        filterTeamDriversRaw = copyDrivers;
      } else {
        filterTeamDriversRaw = copyDrivers.filter((driver) => {
          if (regExUUID.test(driver.id)) {
            const teams = driver.teams || [];
            const teamNames = teams.map((team) => team.name.trim());

            return teamNames.includes(action.payload);
          } else if (regExID.test(driver.id)) {
            const teams = driver.teams
              ? driver.teams.split(",").map((teamName) => teamName.trim())
              : [];
            return teams.length > 0 && teams.includes(action.payload);
          }
        });
      }
      return { ...state, filteredDrivers: filterTeamDriversRaw };
    default:
      return { ...state };
  }
}
