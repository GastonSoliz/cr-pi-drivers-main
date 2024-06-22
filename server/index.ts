import server from "./src/server";
import { conn } from "./src/db";
const { SERVER_PORT } = process.env;

conn
  .sync({ force: false })
  .then(() => {
    server.listen(SERVER_PORT, () => {
      console.log(`Server listening on port ${SERVER_PORT}`);
    });
  })
  .catch((error: Error) => console.error(error));
