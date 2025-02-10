import { createId } from "@paralleldrive/cuid2";
import storage from "../../database/storage";
import { SuperheroType } from "database/types";

type GetSuperheroesProps = {
  sortByHumility?: "ascending" | "descending";
  skip?: number;
  take?: number;
};
type CreateSuperheroProps = {
  name: string;
  superpower: string;
  humilityScore: number;
};

export default class SuperheroesService {
  static getSuperheroByName(name: string) {
    return storage.superheroes.find((superhero) => superhero.name === name);
  }

  static getSuperheroes({ sortByHumility, skip, take }: GetSuperheroesProps) {
    let superheroes: SuperheroType[] = [...storage.superheroes];

    if (sortByHumility) {
      superheroes = superheroes.sort((a, b) => {
        if (sortByHumility === "ascending") {
          return a.humilityScore - b.humilityScore;
        } else {
          return b.humilityScore - a.humilityScore;
        }
      });
    }

    if (skip != null && take != null) {
      superheroes = superheroes.slice(skip, skip + take);
    }

    return superheroes;
  }

  static getSuperheroesCount() {
    return storage.superheroes.length;
  }

  static createSuperhero({ name, superpower, humilityScore }: CreateSuperheroProps) {
    const newSuperhero: SuperheroType = {
      id: createId(),
      name,
      superpower,
      humilityScore,
    };
    storage.superheroes.push(newSuperhero);

    return newSuperhero;
  }
}
