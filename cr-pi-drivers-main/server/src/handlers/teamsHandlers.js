const { getAllTeams } = require("../controllers/teamControllers");

const getTeams = async (req, res) => {
  const results = await getAllTeams();
  res.status(200).json(results);
};

module.exports = getTeams;
