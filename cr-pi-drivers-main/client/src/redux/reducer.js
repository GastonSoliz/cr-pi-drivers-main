const initialState = {
  allDrivers: [],
  driverDetail: [],
  driverName: [],
  allTeams: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DRIVERS":
      return { ...state, allDrivers: action.payload };
    case "GET_DRIVER_BY_ID":
      return { ...state, driverDetail: action.payload };
    case "GET_DRIVER_BY_NAME":
      return { ...state, allDrivers: action.payload };
    case "POST_DRIVER":
      return { ...state, allDrivers: [...state.allDrivers, action.payload] };
    case "CLEAN_DETAIL":
      return { ...state, driverDetail: action.payload };
    case "GET_TEAMS":
      return { ...state, allTeams: action.payload };
    default:
      return { ...state };
  }
}
