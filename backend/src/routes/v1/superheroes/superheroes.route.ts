import { jsonRequestBody, paginationQueryParams, SwaggerDocsManager } from "@utils/swaggerDocs";
import { addPagination } from "./../../../middleware/pagination.middleware";
import { Router } from "express";
import { getSuperheroes } from "src/controllers/superheroes/getSuperheroes.controller";
import { validateCreateSuperhero, validateGetSuperheroes } from "src/validators/superheroes.validator";
import { createSuperhero } from "src/controllers/superheroes/createSuperhero.controller";

const router = Router();
const SuperheroesDocs = new SwaggerDocsManager();

router.get("/", addPagination, validateGetSuperheroes, getSuperheroes);
SuperheroesDocs.add({
  "/v1/superheroes": {
    get: {
      summary: "Get all superheroes",
      tags: ["Superheroes"],
      parameters: [
        {
          in: "query",
          name: "sortByHumility",
          required: false,
          schema: {
            type: "string",
            enum: ["ascending", "descending"],
          },
          description: "Sort the superheroes by humility.",
        },
        ...paginationQueryParams,
      ],
      responses: {
        200: {
          description: "Success",
        },
        400: {
          description: "Invalid parameters",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
});

router.post("/", validateCreateSuperhero, createSuperhero);
SuperheroesDocs.add({
  "/v1/superheroes": {
    post: {
      summary: "Create a superhero",
      tags: ["Superheroes"],
      requestBody: jsonRequestBody({
        name: {
          type: "string",
          isRequired: true,
        },
        superpower: {
          type: "string",
          isRequired: true,
        },
        humilityScore: {
          type: "number",
          isRequired: true,
        },
      }),
      responses: {
        201: {
          description: "Created",
        },
        400: {
          description: "Invalid parameters",
        },
        409: {
          description: "Superhero already exists",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
});

export { SuperheroesDocs };
export default router;
