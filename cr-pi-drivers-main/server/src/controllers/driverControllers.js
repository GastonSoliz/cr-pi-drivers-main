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

  //await newDriver.setTeams(teamsN);

  // const teams_arr = teams.split(",");
  // for (let i = 0; i < teams_arr.length; i++) {
  //   let newTeam = await Team.findOne({ where: { name: teams_arr[i] } });
  //   if (newTeam) {
  //     await newDriver.addTeam(newTeam);
  //   } else {
  //     newTeam = await Team.create({ name: teams_arr[i] });
  //     await newDriver.addTeam(newTeam);
  //   }
  // }

  // let newTeam = await Team.findOne({ where: { name: teams } });
  // if (newTeam) {
  //   await newDriver.addTeam(newTeam);
  // } else {
  //   newTeam = await Team.create({ name: teams });
  //   await newDriver.addTeam(newTeam);
  // }

  //const newTeam = await Team.findOrCreate({ where: { name: teams } });

  for (let i = 0; i < teams.length; i++) {
    const teamName = await Team.findOne({ where: { name: teams[i] } });
    await newDriver.addTeam(teamName);
  }
  //const newTeam = await Team.findAll({ where: { name: teams } });
  //newDriver.addTeam(newTeam);

  return "SE CREO EL USUARIO";
};

const getDriverId = async (id, source) => {
  const driver =
    source === "api"
      ? (await axios.get(URL + id)).data
      : await Driver.findByPk(id, {
          include: {
            model: Team,
            attributes: ["name"],
            through: { attributes: [] },
          },
        });
  if (source === "api")
    return {
      id: driver.id,
      name: driver.name.forename,
      surname: driver.name.surname,
      description: driver.description,
      image: driver.image.url ? driver.image.url : default_image,
      nationality: driver.nationality,
      birthdate: driver.dob,
      teams: driver.teams,
    };
  else return driver;
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
