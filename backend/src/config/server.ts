import express, { Express } from "express";
import log from "@utils/logger";
import routes from "../routes/v1/index.route";
import setupSwagger from "./swagger";
import cors from "cors";

export const getServerPort = () => {
  if (process.env.PORT) {
    return parseInt(process.env.PORT);
  }

  log.error("PORT is not defined in the environment");
  throw new Error("PORT is not defined in the environment");
};

const createServer = (port?: number) => {
  const app: Express = express();

  if (port) {
    setupSwagger(app, port);
  }

  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:5173"],
    })
  );

  app.use("/v1", routes);

  return app;
};

export default createServer;
