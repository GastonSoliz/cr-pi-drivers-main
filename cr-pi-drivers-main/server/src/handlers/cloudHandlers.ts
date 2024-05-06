import { Request, Response } from "express";
import { cloudController } from "../controllers/cloudControllers";

export const cloudHandler = async (req: Request, res: Response) => {
  const { img } = req.body;
  //console.log(req.file);
  //console.log("img", img);
  try {
    const cloudInfo = await cloudController(img);
    res.status(200).json(cloudInfo);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
