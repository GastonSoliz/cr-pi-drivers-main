import { validateCaptcha } from "../controllers/captchaControllers";
import { Request, Response } from "express";

export const validateCaptchaHandler = async (req: Request, res: Response) => {
  const { token } = req.body;
  console.log("llega al back:", token);
  try {
    const captchaInfo = await validateCaptcha(token);
    res.status(200).json(captchaInfo);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
