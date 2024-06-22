const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

import router from "./routes/index";

const morgan = require("morgan");
const cors = require("cors");

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

export default server;
