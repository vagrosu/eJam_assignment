import log from "@utils/logger";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { version } from "../../package.json";
import { SuperheroesDocs } from "src/routes/v1/superheroes/superheroes.route";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Humble Superhero API",
      version: version,
    },
    paths: {
      ...SuperheroesDocs.getDocs(),
    },
  },
  apis: ["src/routes/v1/**/*.ts"],
};

const specs = swaggerJSDoc(options);

export default (app: Express, port: number) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
  log.info(`Swagger is running at ${process.env.URL}:${port}/docs`);
};
