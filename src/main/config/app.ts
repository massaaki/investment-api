import express from "express";

import setupMiddlewares from "./setup/setup-middlewares";
import setupRoutes from "./setup/setup-routes";
import setupApolloServer from "./setup/setup-apollo-server";

const app = express();
setupMiddlewares(app);
setupApolloServer(app);
setupRoutes(app);

export default app;
