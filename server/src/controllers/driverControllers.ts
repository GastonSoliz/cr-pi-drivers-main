import axios from "axios";
import { DriverNative, Drivers, Teams } from "../types/types";
import { cloudHandler } from "../handlers/cloudHandlers";
import { Op } from "sequelize";
const { Driver, Team } = require("../db");
const URL: string = "http://localhost:5000/drivers/";
const default_image: string =
  "https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg";
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

export const cleanArray = (arr: DriverNative[]) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name.forename,
      surname: elem.name.surname,
      description: elem.description,
      image: elem.image.url ? elem.image.url : default_image,
      nationality: elem.nationality,
      birthdate: elem.dob,
      teams: elem.teams,
    };
  });

export const createDriver = async (
  name: string,
  surname: string,
  description: string,
  image: Buffer | string,
  nationality: string,
  birthdate: string,
  teams: Teams[]
) => {
  if (Buffer.isBuffer(image)) {
    const url_image: any = await cloudHandler(image);
    image = url_image.secure_url;
  }

  const newDriver = await Driver.create({
    name,
    surname,
    description,
    image,
    nationality,
    birthdate,
  });

  if (typeof teams === "string") {
    teams = JSON.parse(teams);
  }
  for (let i = 0; i < teams.length; i++) {
    const teamName = await Team.findOne({ where: { name: teams[i].name } });
    await newDriver.addTeam(teamName);
  }

  return newDriver;
};

export const getDriverId = async (id: number | string, source: string) => {
  const driver =
    source === "api"
      ? (await axios.get(URL + id)).data
      : await Driver.findByPk(id, {
          include: {
            model: Team,
            as: "teams",
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });

  if (source === "api") {
    const teamObjects = driver.teams
      .split(",")
      .map((teamName: string) => ({ name: teamName }));
    return {
      id: driver.id,
      name: driver.name.forename,
      surname: driver.name.surname,
      description: driver.description,
      image: driver.image.url ? driver.image.url : default_image,
      nationality: driver.nationality,
      birthdate: driver.dob,
      teams: teamObjects,
    };
  } else {
    return driver;
  }
};

export const getAllDrivers = async () => {
  const dbDriversRaw = await Driver.findAll({
    include: {
      model: Team,
      as: "teams",
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const dbDrivers = dbDriversRaw.map((driver: Drivers) => {
    const teamsString = driver.teams.map((team) => team.name).join(", ");
    return {
      id: driver.id,
      name: driver.name,
      surname: driver.surname,
      description: driver.description,
      image: driver.image,
      nationality: driver.nationality,
      birthdate: driver.birthdate,
      teams: teamsString,
    };
  });

  const apiDriversRaw = (await axios.get(URL)).data;

  const apiDrivers = cleanArray(apiDriversRaw);

  return [...dbDrivers, ...apiDrivers];
};

export const searchDriversByName = async (name: string) => {
  const dbDrivers = await Driver.findAll({
    where: { name: { [Op.like]: `%${name}%` } },
  });
  const apiDriversRaw = (await axios.get(URL)).data;
  const apiDrivers = cleanArray(apiDriversRaw);
  let apiFiltered = apiDrivers.filter(
    (elem) =>
      elem.name.toLowerCase().includes(name.toLowerCase()) ||
      elem.surname.toLowerCase().includes(name.toLowerCase())
  );

  let allDrivers = dbDrivers.concat(apiFiltered);
  if (allDrivers.length === 0) {
    throw new Error("No existe ningun conductor con ese nombre");
  } else {
    return allDrivers;
  }
};

export const deleteDriverId = async (id: string) => {
  const dbDriver = await Driver.findByPk(id);
  if (dbDriver) {
    Driver.destroy({ where: { id: id } });
    return dbDriver;
  } else throw new Error("NO SE ENCONTRO EL DRIVER CON ESE ID");
};

export const updateDriverId = async (
  idDriver: number | string,
  name: string,
  surname: string,
  description: string,
  image: string,
  nationality: string,
  birthdate: string,
  teams: Teams[]
) => {
  const driverToUpdate = await Driver.findByPk(idDriver);
  if (Buffer.isBuffer(image)) {
    const url_image: any = await cloudHandler(image);
    image = url_image.secure_url;
  }
  const updateData: Drivers = {
    name: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    birthdate: "",
    teams: [],
  };

  if (name) {
    updateData.name = name;
  }
  if (surname) {
    updateData.surname = surname;
  }
  if (image) {
    updateData.image = image;
  }
  if (birthdate) {
    updateData.birthdate = birthdate;
  }
  if (nationality) {
    updateData.nationality = nationality;
  }
  if (image) {
    updateData.image = image;
  }
  if (description) {
    updateData.description = description;
  }

  if (typeof teams === "string") {
    teams = JSON.parse(teams);
  }

  if (driverToUpdate) {
    const dbDriverUpdate = await driverToUpdate.update(updateData);
    if (teams && teams.length > 0) {
      const currentTeams = await driverToUpdate.getTeams();
      const teamsToAdd = teams.filter((newTeam) => {
        return !currentTeams.some(
          (currentTeam: Teams) => currentTeam.name === newTeam.name
        );
      });

      const teamsToRemoveNames = currentTeams
        .filter(
          (currentTeam: Teams) =>
            !teams.some((newTeam) => newTeam.name === currentTeam.name)
        )
        .map((team: Teams) => team.name);

      if (teamsToAdd.length > 0) {
        teamsToAdd.map(async (team) => {
          const teamsToAddInstances = await Team.findAll({
            where: {
              name: team.name,
            },
          });
          await driverToUpdate.addTeams(teamsToAddInstances);
        });
      }

      if (teamsToRemoveNames.length > 0) {
        const teamsToRemoveInstances = await Team.findAll({
          where: {
            name: teamsToRemoveNames,
          },
        });
        await driverToUpdate.removeTeams(teamsToRemoveInstances);
      }
    }
    return dbDriverUpdate;
  } else throw new Error("NO SE ENCONTRO EL DRIVER CON ESE ID");
};
