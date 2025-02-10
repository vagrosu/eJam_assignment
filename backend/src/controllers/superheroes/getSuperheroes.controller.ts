import { normalizeError } from "@utils/errors";
import log from "@utils/logger";
import { standardResponse } from "@utils/responses";
import { Response } from "express";
import SuperheroesService from "src/services/superheroes.service";
import { GetSuperheroesRequestType } from "src/types/request/superheroes";
import { RequestWithQuery } from "src/types/request/types";

export const getSuperheroes = async (req: RequestWithQuery<GetSuperheroesRequestType["query"]>, res: Response) => {
  try {
    const { sortByHumility } = req.query;
    const { skip, take, page, pageSize } = req.pagination!;

    const superheroes = SuperheroesService.getSuperheroes({ sortByHumility, skip, take });
    const superheroesCount = SuperheroesService.getSuperheroesCount();
    res.status(200).json(
      standardResponse({
        isSuccess: true,
        res,
        data: {
          superheroes: superheroes,
          pagination: {
            page,
            pageSize,
            total: superheroesCount,
          },
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
