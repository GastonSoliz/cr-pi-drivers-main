const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
// const { getAllTeams } = require("./controllers/teamControllers");

// getAllTeams()
//   .then((result) => {
//     console.log(result); // Puedes imprimir un mensaje de éxito si lo deseas
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

module.exports = server;
