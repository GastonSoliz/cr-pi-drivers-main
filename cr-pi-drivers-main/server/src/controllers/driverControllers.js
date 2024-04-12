const axios = require("axios");
const { Driver, Team } = require("../db");
const URL = "http://localhost:5000/drivers/";
const default_image =
  "https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg";

const cleanArray = (arr) =>
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

const createDriver = async (
  name,
  surname,
  description,
  image,
  nationality,
  birthdate,
  teams
) => {
  const newDriver = await Driver.create({
    name,
    surname,
    description,
    image,
    nationality,
    birthdate,
  });

  for (let i = 0; i < teams.length; i++) {
    const teamName = await Team.findOne({ where: { name: teams[i].name } });
    await newDriver.addTeam(teamName);
  }

  return { newDriver };
};

const getDriverId = async (id, source) => {
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
      .map((teamName) => ({ name: teamName }));
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

const getAllDrivers = async () => {
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

  const dbDrivers = dbDriversRaw.map((driver) => {
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

const searchDriversByName = async (name) => {
  let dbDrivers = await Driver.findAll({ where: { name: name } });
  let apiDriversRaw = (await axios.get(URL)).data;
  let apiDrivers = cleanArray(apiDriversRaw);
  let apiFiltered = apiDrivers.filter((elem) => elem.name === name);

  let allDrivers = dbDrivers.concat(apiFiltered);
  if (allDrivers.length === 0) {
    name = name.toLowerCase();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    dbDrivers = await Driver.findAll({ where: { name: name } });
    apiDriversRaw = (await axios.get(URL)).data;
    apiDrivers = cleanArray(apiDriversRaw);
    apiFiltered = apiDrivers.filter((elem) => elem.name === name);

    allDrivers = dbDrivers.concat(apiFiltered);
    if (allDrivers.length === 0) {
      throw new Error("NO EXISTE NINGUN CONDUCTOR CON ESE NOMBRE");
    } else {
      return allDrivers.slice(0, 15);
    }
  } else {
    return allDrivers.slice(0, 15);
  }
};

const deleteDriverId = async (id) => {
  const dbDriver = await Driver.findByPk(id);
  if (dbDriver) {
    Driver.destroy({ where: { id: id } });
    return dbDriver;
  } else throw new Error("NO SE ENCONTRO EL DRIVER CON ESE ID");
};

const updateDriverId = async (
  idDriver,
  name,
  surname,
  description,
  image,
  nationality,
  birthdate,
  teams
) => {
  const driverToUpdate = await Driver.findByPk(idDriver);

  const updateData = {};

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
    updateData.dob = birthdate;
  }
  if (nationality) {
    updateData.nationality = nationality;
  }
  if (image) {
    updateData.url = image;
  }
  if (description) {
    updateData.description = description;
  }

  if (driverToUpdate) {
    const dbDriverUpdate = await driverToUpdate.update(updateData);
    if (teams && teams.length > 0) {
      const currentTeams = await driverToUpdate.getTeams();
      const teamsToAdd = teams.filter((newTeam) => {
        return !currentTeams.some(
          (currentTeam) => currentTeam.name === newTeam.name
        );
      });
      console.log("teamsToAdd:", teamsToAdd);

      const teamsToRemoveNames = currentTeams
        .filter(
          (currentTeam) =>
            !teams.some((newTeam) => newTeam.name === currentTeam.name)
        )
        .map((team) => team.name);
      console.log("teamsOut", teamsToRemoveNames);

      // if (teamsToAdd.length > 0) {
      //   const teamsToAddInstances = await Team.findAll({
      //     where: {
      //       name: teamsToAdd,
      //     },
      //   });
      //   await driverToUpdate.addTeams(teamsToAddInstances);
      // }
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

module.exports = {
  createDriver,
  getDriverId,
  getAllDrivers,
  searchDriversByName,
  deleteDriverId,
  updateDriverId,
};
