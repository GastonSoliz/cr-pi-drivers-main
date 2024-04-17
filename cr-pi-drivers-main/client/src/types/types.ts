export type Team = {
  id?: number;
  name: string;
};

export type Driver = {
  id?: number;
  birthdate: string;
  description: string;
  image: string;
  name: string;
  nationality: string;
  surname: string;
  teams: Team[];
};

export type DriverError = {
  id?: number;
  birthdate?: string;
  description?: string;
  image?: string;
  name?: string;
  nationality?: string;
  surname?: string;
  teams?: string;
};

export type State = {
  allDrivers: Driver[];
  filteredDrivers: Driver[] | Driver;
  driverDetail: Driver | null;
  allTeams: Team[];
  msj: string | null;
};

export type Action =
  | { type: "GET_TEAMS"; payload: Team[] }
  //[{Driver}]
  | { type: "GET_DRIVER_BY_NAME"; payload: Driver[] | Driver }
  | { type: "GET_DRIVER_BY_ID"; payload: Driver }
  | { type: "GET_DRIVERS"; payload: Driver[] }
  //{newDriver:{Driver}} deberia ir todo de la misma manera... sino lo hace... ARREGLAR TODO EL PROYECTO
  //Si no, es quilombo de tipo de datos
  | { type: "POST_DRIVER_REQUEST"; payload: string }
  | { type: "POST_DRIVER_SUCCESS"; payload: Driver }
  | { type: "POST_DRIVER_FAILURE"; payload: string }
  | { type: "DELETE_DRIVER"; payload: number }
  | { type: "UPDATE_DRIVER"; payload: Driver }
  | { type: "SORT_ORIGIN"; payload: string }
  | { type: "SORT_DATE"; payload: string }
  //Falta implementar
  | { type: "SORT_NAME"; payload: string }
  | { type: "SORT_TEAM"; payload: string }
  | { type: "CLEAN_DETAIL"; payload: null };
