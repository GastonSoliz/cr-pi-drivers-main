const { Router } = require("express");
const {
  getDriverById,
  getDrivers,
  getDriversByName,
  postDrivers,
  deleteDriver,
  updateDriver,
} = require("../handlers/driversHandlers");
const getTeams = require("../handlers/teamsHandlers");

const router = Router();

const validateDriver = (req, res, next) => {
  const { name, surname, description, image, nationality, birthdate, teams } =
    req.body;
  if (!name) return res.status(400).json({ error: "FALTA EL NOMBRE" });
  if (!surname) return res.status(400).json({ error: "FALTA EL APELLIDO" });
  if (!description)
    return res.status(400).json({ error: "FALTA LA DESCRIPCION" });
  if (!image) return res.status(400).json({ error: "FALTA LA IMAGEN" });
  if (!nationality)
    return res.status(400).json({ error: "FALTA LA NACIONALIDAD" });
  if (!birthdate)
    return res.status(400).json({ error: "FALTA EL AÑO DE NACIMIENTO" });
  if (teams.length === 0)
    return res.status(400).json({ error: "FALTAN LOS EQUIPOS" });
  next();
};

router.get("/drivers", getDrivers);
router.get("/drivers/:idDriver", getDriverById);
//router.get("/drivers/", getDriversByName);
router.post("/drivers", validateDriver, postDrivers);
router.get("/teams", getTeams);
router.delete("/drivers/:idDriver", deleteDriver);
router.put("/drivers/:idDriver", validateDriver, updateDriver);

module.exports = router;
