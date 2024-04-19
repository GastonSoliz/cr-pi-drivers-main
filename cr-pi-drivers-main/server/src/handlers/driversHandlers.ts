import {
  createDriver,
  getDriverId,
  searchDriversByName,
  getAllDrivers,
  deleteDriverId,
  updateDriverId,
} from "../controllers/driverControllers";
import { Request, Response } from "express";

export const getDrivers = async (req: Request, res: Response) => {
  try {
    let { name } = req.query;
    const drivers = name
      ? await searchDriversByName(name)
      : await getAllDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getDriverById = async (req: Request, res: Response) => {
  const { idDriver } = req.params;
  console.log("ACA", idDriver);

  const source = isNaN(parseInt(idDriver)) ? "bdd" : "api";
  try {
    const driver = await getDriverId(idDriver, source);
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const postDrivers = async (req: Request, res: Response) => {
  const { name, surname, description, image, nationality, birthdate, teams } =
    req.body;
  try {
    const newDriver = await createDriver(
      name,
      surname,
      description,
      image,
      nationality,
      birthdate,
      teams
    );
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteDriver = async (req: Request, res: Response) => {
  const { idDriver } = req.params;
  try {
    const driver = await deleteDriverId(idDriver);
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateDriver = async (req: Request, res: Response) => {
  const { idDriver } = req.params;
  const { name, surname, description, image, nationality, birthdate, teams } =
    req.body;
  try {
    const newDriver = await updateDriverId(
      idDriver,
      name,
      surname,
      description,
      image,
      nationality,
      birthdate,
      teams
    );
    res.status(200).json(newDriver);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// module.exports = {
//   getDrivers,
//   getDriverById,
//   postDrivers,
//   deleteDriver,
//   updateDriver,
// };
