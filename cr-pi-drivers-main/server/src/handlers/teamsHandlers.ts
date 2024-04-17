import  getAllTeams  from "../controllers/teamControllers";
import { Request, Response } from "express";

const getTeams = async (req: Request, res: Response) => {
  const results = await getAllTeams();
  res.status(200).json(results);
};

export default getTeams;
