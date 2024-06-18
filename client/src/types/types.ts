export type Team = {
  id?: number;
  name: string;
};

export type Driver = {
  id?: number | string;
  birthdate: string;
  description: string;
  image: File | string;
  name: string;
  nationality: string;
  surname: string;
  teams: Team[];
};

export type DriverError = {
  id?: number | string;
  birthdate?: string;
  description?: string;
  image?: string;
  name?: string;
  nationality?: string;
  surname?: string;
  teams?: string;
};

export interface Token {
  token: string | null;
}

export type State = {
  allDrivers: Driver[];
  filteredDrivers: Driver[] | Driver;
  driverDetail: Driver | null;
  allTeams: Team[];
  msjDrivers: string | null;
  msjPost: string | null;
  msjUpdate: string | null;
  msjDelete: string | null;
  msjDetail: string | null;
  captchaRequest: boolean;
};

interface CaptchaRequest {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export type Action =
  | { type: "GET_TEAMS"; payload: Team[] }
  | { type: "GET_DRIVER_BY_NAME"; payload: Driver[] | Driver }
  | { type: "GET_DRIVERID_REQUEST"; payload: string }
  | { type: "GET_DRIVERID_SUCCESS"; payload: Driver }
  | { type: "GET_DRIVERID_FAILURE"; payload: string }
  | { type: "GET_DRIVERS_REQUEST"; payload: string }
  | { type: "GET_DRIVERS_SUCCESS"; payload: Driver[] }
  | { type: "GET_DRIVERS_FAILURE"; payload: string }
  | { type: "POST_DRIVER_REQUEST"; payload: string }
  | { type: "POST_DRIVER_SUCCESS"; payload: Driver }
  | { type: "POST_DRIVER_FAILURE"; payload: string }
  | { type: "DELETE_DRIVER_REQUEST"; payload: string }
  | { type: "DELETE_DRIVER_SUCCESS"; payload: string }
  | { type: "DELETE_DRIVER_FAILURE"; payload: string }
  | { type: "UPDATE_DRIVER_REQUEST"; payload: string }
  | { type: "UPDATE_DRIVER_SUCCESS"; payload: Driver }
  | { type: "UPDATE_DRIVER_FAILURE"; payload: string }
  | { type: "SORT_ORIGIN"; payload: string }
  | { type: "SORT_DATE"; payload: string }
  | { type: "SORT_NAME"; payload: string }
  | { type: "SORT_TEAM"; payload: string }
  | { type: "CLEAN_DETAIL"; payload: null }
  | { type: "VALIDATE_CAPTCHA"; payload: CaptchaRequest }
  | { type: "CLEAN_POST"; payload: null }
  | { type: "CLEAN_UPDATE"; payload: null }
  | { type: "CLEAN_DELETE"; payload: null };
