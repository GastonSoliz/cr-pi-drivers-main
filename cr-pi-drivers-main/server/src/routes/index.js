const { Router } = require("express");
const {
  getDriverById,
  getDrivers,
  getDriversByName,
  postDrivers,
} = require("../handlers/driversHandlers");
const getTeams = require("../handlers/teamsHandlers");

const router = Router();

const validateDriver = (req, res, next) => {
  const { name, surname, description, image, nationality, birthdate, teams } =
    req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!surname) return res.status(400).json({ error: "Missing surname" });
  if (!description)
    return res.status(400).json({ error: "Missing description" });
  if (!image) return res.status(400).json({ error: "Missing image" });
  if (!nationality)
    return res.status(400).json({ error: "Missing nationality" });
  if (!birthdate) return res.status(400).json({ error: "Missing birthdate" });
  if (!teams) return res.status(400).json({ error: "Missing teams" });
  next();
};

router.get("/drivers", getDrivers);
router.get("/drivers/:idDriver", getDriverById);
//router.get("/drivers/", getDriversByName);
router.post("/drivers", validateDriver, postDrivers);
router.get("/teams", getTeams);

module.exports = router;
