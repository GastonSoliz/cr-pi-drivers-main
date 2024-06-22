import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import {
  getDriverById,
  getDrivers,
  postDrivers,
  deleteDriver,
  updateDriver,
} from "../handlers/driversHandlers";
import getTeams from "../handlers/teamsHandlers";
import { validateCaptchaHandler } from "../handlers/captchaHandlers";
import { cloudHandler } from "../handlers/cloudHandlers";

const router = Router();

const validateDriver = (req: Request, res: Response, next: NextFunction) => {
  const { name, surname, description, image, nationality, birthdate, teams } =
    req.body;
  if (!name) return res.status(400).json({ error: "FALTA EL NOMBRE" });
  if (!surname) return res.status(400).json({ error: "FALTA EL APELLIDO" });
  if (!description)
    return res.status(400).json({ error: "FALTA LA DESCRIPCION" });
  if (!image)
    if (!req.file) return res.status(400).json({ error: "FALTA LA IMAGEN" });
  if (!nationality)
    return res.status(400).json({ error: "FALTA LA NACIONALIDAD" });
  if (!birthdate)
    return res.status(400).json({ error: "FALTA EL AÑO DE NACIMIENTO" });
  if (teams.length === 0)
    return res.status(400).json({ error: "FALTAN LOS EQUIPOS" });
  next();
};

const upload = multer();

router.get("/drivers", getDrivers);
router.get("/drivers/:idDriver", getDriverById);
//router.post("/drivers", upload.single("image"), postDrivers);
router.post("/drivers", upload.single("image"), validateDriver, postDrivers);
router.get("/teams", getTeams);
router.delete("/drivers/:idDriver", deleteDriver);
router.put(
  "/drivers/:idDriver",
  upload.single("image"),
  validateDriver,
  updateDriver
);
router.post("/captcha", validateCaptchaHandler);

export default router;
