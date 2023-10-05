const {
  createDriver,
  getDriverId,
  searchDriversByName,
  getAllDrivers,
} = require("../controllers/driverControllers");

const getDrivers = async (req, res) => {
  let { name } = req.query;
  const drivers = name
    ? await searchDriversByName(name)
    : await getAllDrivers();
  res.status(200).json(drivers);
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

// const getDriversByName = async (req, res) => {
//   const { name } = req.query;
//   const driversByName = await get15DriversByName(name);
//   res.status(200).json(`${name}`);
// };

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

module.exports = {
  getDrivers,
  getDriverById,
  // getDriversByName,
  postDrivers,
};
