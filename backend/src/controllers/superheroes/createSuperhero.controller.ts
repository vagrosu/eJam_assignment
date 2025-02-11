import { normalizeError } from "@utils/errors";
import log from "@utils/logger";
import { standardResponse } from "@utils/responses";
import { RequestWithBody } from "src/types/request/types";
import { Response } from "express";
import { CreateSuperheroRequestType } from "src/types/request/superheroes";
import SuperheroesService from "src/services/superheroes.service";
import { CreateSuperheroResponseType } from "src/types/response/superheroes";

export const createSuperhero = async (
  req: RequestWithBody<CreateSuperheroRequestType["body"]>,
  res: Response<CreateSuperheroResponseType>
) => {
  try {
    const { name, superpower, humilityScore } = req.body;

    // Check if superhero already exists
    const existingSuperhero = SuperheroesService.getSuperheroByName(name);
    if (existingSuperhero) {
      res.status(409).json(standardResponse({ isSuccess: false, res, message: "Superhero already exists" }));
      return;
    }

    const newSuperhero = SuperheroesService.createSuperhero({ name, superpower, humilityScore });
    res.status(201).json(
      standardResponse({
        isSuccess: true,
        res,
        data: {
          superhero: newSuperhero,
        },
      })
    );
  } catch (error: any) {
    log.error(error, req);
    res
      .status(500)
      .json(standardResponse({ isSuccess: false, res, message: "Something went wrong", errors: normalizeError(error) }));
  }
};
