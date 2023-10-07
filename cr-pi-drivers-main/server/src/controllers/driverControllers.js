const axios = require("axios");
const { Driver, Team } = require("../db");
const { Op } = require("sequelize");
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
    const teamName = await Team.findOne({ where: { name: teams[i] } });
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
            through: { attributes: [] },
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
  const dbDrivers = await Driver.findAll();

  const apiDriversRaw = (await axios.get(URL)).data;

  const apiDrivers = cleanArray(apiDriversRaw);

  return [...dbDrivers, ...apiDrivers];
};

const searchDriversByName = async (name) => {
  name = name.toLowerCase();
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const dbDrivers = await Driver.findAll({ where: { name: name } });

  const apiDriversRaw = (await axios.get(URL)).data;
  const apiDrivers = cleanArray(apiDriversRaw);
  const apiFiltered = apiDrivers.filter((elem) => elem.name === name);

  const allDrivers = dbDrivers.concat(apiFiltered);

  if (allDrivers.length > 0) {
    const limitedDrivers = allDrivers.slice(0, 15);

    return limitedDrivers;
  } else return "NO EXISTE NINGUN CONDUCTOR CON ESE NOMBRE";
};

// const get15DriversByName = async (name) => {
//   const dbDrivers = await Driver.findAll({ where: { name: name } });

//   const apiDriversRaw = (await axios.get(URL)).data;

//   const apiDrivers = cleanArray(apiDriversRaw);
//   const apiFiltered = apiDrivers.filter((elem) => elem.name === name);

//   return [...dbDrivers, ...apiFiltered];
// };

module.exports = {
  createDriver,
  getDriverId,
  getAllDrivers,
  searchDriversByName,
};
