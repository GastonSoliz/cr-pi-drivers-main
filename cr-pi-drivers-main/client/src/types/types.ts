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
};
