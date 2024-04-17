import axios from "axios";
import { Drivers, Teams } from "../types/types";
const { Team } = require("../db");

const URL: string = "http://localhost:5000/drivers/";

const getAllTeams = async (): Promise<Teams[] | null> => {
  let AllTeams: Teams[] = await Team.findAll();

  if (!AllTeams.length) {
    const apiDrivers = (await axios.get(URL)).data;

    let allTeamsRaw = apiDrivers.map((driver: Drivers) =>
      driver.teams != null ? driver.teams : "unknown"
    );

    allTeamsRaw = allTeamsRaw
      .map((team_name: string) => team_name.split(","))
      .flat();
    allTeamsRaw = allTeamsRaw.map((name: string) => name.trim());
    let AllTeams = [...new Set(allTeamsRaw)];

    AllTeams = AllTeams.map((name) => {
      return { name };
    });

    await Team.bulkCreate(AllTeams);
  }

  return AllTeams;
};

export default getAllTeams;
