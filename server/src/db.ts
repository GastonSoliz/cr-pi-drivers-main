require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_POSTGRE_URL } = process.env;
import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

export const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`,
  {
    logging: false,
    native: false,
  }
);

// export const sequelize = new Sequelize(
//   DB_POSTGRE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`,
//   {
//     logging: false,
//     native: false,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   }
// );

const basename = path.basename(__filename);

const modelDefiners: any[] = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

export const { Driver, Team } = sequelize.models;

Driver.belongsToMany(Team, {
  through: "driver_team",
  as: "teams",
});
Team.belongsToMany(Driver, {
  through: "driver_team",
  as: "teams",
});

export const conn = sequelize;
