//const server = require("./src/server");
//const { conn } = require("./src/db.js");
import server from "./src/server";
import { conn } from "./src/db";
const PORT: number = 3001;

conn
  .sync({ force: false })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error: Error) => console.error(error));
