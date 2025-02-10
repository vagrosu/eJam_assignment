import { isObjectEmpty } from "@utils/objects";
import { standardResponse } from "@utils/responses";
import { NextFunction, Request, Response } from "express";
import validationResultFormatter from "src/validators/validationResultFormatter";

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResultFormatter(req);
  if (!isObjectEmpty(errors)) {
    res.status(400).json(standardResponse({ isSuccess: false, res, message: "Validation error", errors }));
    return;
  }

  next();
};
