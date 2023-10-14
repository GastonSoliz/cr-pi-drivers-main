const axios = require("axios");
const { Team } = require("../db");
const URL = "http://localhost:5000/drivers/";

const getAllTeams = async () => {
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
