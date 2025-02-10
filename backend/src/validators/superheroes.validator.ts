import { RequestHandler } from "express";
import { body, query } from "express-validator";
import { handleValidationErrors } from "src/middleware/error.middleware";

export const validateGetSuperheroes: RequestHandler[] = [
  query("sortByHumility")
    .optional()
    .isIn(["ascending", "descending"])
    .withMessage("The 'sortByHumility' parameter must be either 'ascending' or 'descending'."),
  handleValidationErrors,
];

export const validateCreateSuperhero: RequestHandler[] = [
  body("name")
    .notEmpty()
    .withMessage("The 'name' parameter is required.")
    .isString()
    .withMessage("The 'name' parameter must be a string."),
  body("superpower")
    .notEmpty()
    .withMessage("The 'superpower' parameter is required.")
    .isString()
    .withMessage("The 'superpower' parameter must be a string."),
  body("humilityScore")
    .notEmpty()
    .withMessage("The 'humilityScore' parameter is required.")
    .isInt({ min: 1, max: 10 })
    .withMessage("The 'humilityScore' parameter must be an integer between 1 and 10."),
  handleValidationErrors,
];
