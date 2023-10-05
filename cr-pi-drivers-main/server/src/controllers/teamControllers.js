const axios = require("axios");
const { Team } = require("../db");
const { getAllDrivers } = require("./driverControllers");
const URL = "http://localhost:5000/drivers/";

// const apiDriverCleaner = (dataApi) => {
//   let drivers = dataApi.data;

//   const teams = drivers.map((dr) => dr.name.forename);
//   return teams;
// };

// const createTeams = async (name) => {
//   const createTeams = await Team.create(name);
//   // lo crea en la base de datos
//   return createTeams;
// };

const getAllTeams = async () => {
  //   return await axios
  //     .get(URL)
  //     .then((dataApi) => apiDriverCleaner(dataApi))
  //     .then((teams) => {
  //       teams.forEach((teamsName) => {
  //         createTeams({ name: teamsName });
  //       });
  //       return "Temperaments of the API saved in the database";
  //     });

  // const dbTeams = await Team.findAll();
  // const cleanTeams = new Set();

  // if (dbTeams.length === 0) {
  //   const allDrivers = [];
  //   const apiData = (await axios.get("http://localhost:5000/drivers")).data;
  //   apiData.map((driver) => allDrivers.push(driver.teams));

  //   apiData.forEach((driver) => {
  //     if (driver.teams) {
  //       // {teams:"reanult, ferrari"} --> [reanult],[ferrari]...
  //       const teamsArr = driver.teams.split(",").map((elem) => elem.trim()); // Divide y elimina espacios
  //       teamsArr.forEach((teamName) => {
  //         cleanTeams.add(teamName); // Agrega el team y no permite que se repita
  //       });
  //     }
  //   });
  // }
  // const teamsOK = Array.from(cleanTeams).map((nombre) => ({
  //   name: nombre,
  // }));
  // await Team.bulkCreate(teamsOK);
  //return dbTeams;

  // const dbTeams = await Team.findAll();
  // const cleanTeams = new Set();

  // if (dbTeams.length === 0) {
  //   const allDrivers = [];
  //   const apiDrivers = (await axios.get(URL)).data;
  //   apiDrivers.map((driver) => allDrivers.push(driver.teams));

  //   apiDrivers.forEach((driver) => {
  //     if (driver.teams) {
  //       const allTeamsRaw = driver.teams
  //         .split(",")
  //         .map((element) => element.trim());
  //       //console.log(allTeamsRaw);
  //       allTeamsRaw.forEach((teamName) => {
  //         cleanTeams.add(teamName);

  //       });
  //     }
  //   });
  // }
  // const allTeams = cleanTeams.map((teamName) => ({ name: teamName }));
  // await Team.bulkCreate(allTeams);

  // const apiTeamsRaw = (await axios.get(URL)).data;

  // apiTeamsRaw.forEach((driver) => {
  //   if (driver.teams) {
  //     let teamsAll = driver.teams.split();
  //     teamsAll.forEach(async (driverTeam) => {
  //       await Team.findOrCreate({ where: { name: driverTeam } });
  //     });
  //   }
  // });

  // const teamAll = await Team.findAll();

  let AllTeams = await Team.findAll();

  if (!AllTeams.length) {
    const apiDrivers = (await axios.get(URL)).data;

    let allTeamsRaw = apiDrivers.map((driver) =>
      driver.teams != null ? driver.teams : "unknown"
    );

    allTeamsRaw = allTeamsRaw.map((team_name) => team_name.split(",")).flat();
    allTeamsRaw = allTeamsRaw.map((name) => name.trim());
    let AllTeams = [...new Set(allTeamsRaw)];

    AllTeams = AllTeams.map((name) => {
      return { name };
    });

    await Team.bulkCreate(AllTeams);
  }

  return AllTeams;
};

module.exports = { getAllTeams };
