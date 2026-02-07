import http from "http";
import { App, PORT } from "./api/config/expressSetup";
// import { sequelize } from "./api/config/sequelize"; // No longer needed here

const server = http.createServer(new App().app);

server.listen(PORT, () => { // Removed 'async' since 'await' is gone
  console.info(`Server running on port ${PORT}`);
  
  // The database connection/sync logic has been moved to expressSetup.ts
  // and is executed as part of `new App()`.
});