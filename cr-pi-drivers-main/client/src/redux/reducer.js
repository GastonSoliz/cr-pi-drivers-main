const initialState = {
  allDrivers: [],
  filteredDrivers: [],
  driverDetail: [],
  driverName: [],
  allTeams: [],
};

export default function rootReducer(state = initialState, action) {
  let previousFilters;
  let filteredDrivers;
  let copyDrivers;
  const regExUUID =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  const regExID = /^\d+(\.\d+)?$/;
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
      return { ...state, driverName: action.payload };
    case "POST_DRIVER":
      return { ...state, allDrivers: [...state.allDrivers, action.payload] };
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
      // previousFilters = state.filteredDrivers;
      // filteredDrivers.filter((driver) =>
      //   filterOriginDriversRaw.includes(driver)
      // );
      // return { ...state, filteredDrivers };
      //console.log("SORT_ORIGIN:", state.filteredDrivers);
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
      // previousFilters = state.filteredDrivers;
      // filteredDrivers = previousFilters.filter((driver) =>
      //   filterDateDriversRaw.includes(driver)
      // );
      // return { ...state, filteredDrivers };

      console.log("SORT_DATE:", filterDateDriversRaw);
      return { ...state, filteredDrivers: filterDateDriversRaw };
    case "SORT_TEAM":
      copyDrivers = [...state.allDrivers];
      let filterTeamDriversRaw;
      if (action.payload === "NONE") {
        filterTeamDriversRaw = copyDrivers;
      } else {
        filterTeamDriversRaw = copyDrivers.filter((driver) => {
          // Verifica si driver.teams está definido y no es null antes de dividirlo
          const teams = driver.teams
            ? driver.teams.split(",").map((teamName) => teamName.trim())
            : [];
          return teams.length > 0 && teams.includes(action.payload);
        });
      }
      return { ...state, filteredDrivers: filterTeamDriversRaw };

    default:
      return { ...state };
  }
}
