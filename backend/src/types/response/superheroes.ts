import { PaginationResponseType, StandardResponseType } from "./types";

export type GetSuperheroesResponseType = StandardResponseType<
  {
    superheores: {
      id: string;
      name: string;
      superpower: string;
      humilityScore: number;
    }[];
  } & PaginationResponseType
>;

export type CreateSuperheroResponseType = StandardResponseType<{
  superhero: {
    id: string;
    name: string;
    superpower: string;
    humilityScore: number;
  };
}>;
