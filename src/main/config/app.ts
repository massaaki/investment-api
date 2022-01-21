import express from "express";

import createConnection from "@/infra/database-adapters/typeorm-adapters/typeorm-configs/typeorm-connection";
import setupMiddlewares from "./setup/setup-middlewares";
import setupRoutes from "./setup/setup-routes";

createConnection();
const app = express();
setupMiddlewares(app);
setupRoutes(app);

export default app;
