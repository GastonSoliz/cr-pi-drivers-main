export type Teams = {
  id?: number;
  name: string;
};

export type Drivers = {
  id?: number;
  birthdate: string;
  description: string;
  image: string;
  name: string;
  nationality: string;
  surname: string;
  teams: Teams[];
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

interface Name {
  forename: string;
  surname: string;
}
interface Image {
  url: string;
  imageby: string;
}

export type DriverNative = {
  id: number;
  driverRef: string;
  number: number;
  code: string;
  name: Name;
  image: Image;
  dob: string;
  nationality: string;
  url: string;
  teams: string;
  description: string;
};
