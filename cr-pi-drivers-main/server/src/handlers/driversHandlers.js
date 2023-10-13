const {
  createDriver,
  getDriverId,
  searchDriversByName,
  getAllDrivers,
  deleteDriverId,
  updateDriverId,
} = require("../controllers/driverControllers");

const getDrivers = async (req, res) => {
  try {
    let { name } = req.query;
    const drivers = name
      ? await searchDriversByName(name)
      : await getAllDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDriverById = async (req, res) => {
  const { idDriver } = req.params;
  const source = isNaN(idDriver) ? "bdd" : "api";
  try {
    const driver = await getDriverId(idDriver, source);
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postDrivers = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};

const deleteDriver = async (req, res) => {
  const { idDriver } = req.params;
  try {
    const driver = await deleteDriverId(idDriver);
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDriver = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDrivers,
  getDriverById,
  postDrivers,
  deleteDriver,
  updateDriver,
};
