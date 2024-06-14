import { Response } from "express";
import { cloudController } from "../controllers/cloudControllers";

export const cloudHandler = async (img: Buffer) => {
  //const { img } = req.body;
  //console.log(req.file);
  console.log("llega al cloud: ", img);
  //console.log("llega al cloudHandler: ", img);
  try {
    const cloudInfo = await cloudController(img);
    console.log("envio de controller: ", cloudInfo);
    //res.status(200).json(cloudInfo);
    return cloudInfo;
  } catch (error) {
    //res.status(500).json({ error: (error as Error).message });
    throw error;
  }
};
