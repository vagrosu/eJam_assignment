export type StorageType = {
  superheroes: SuperheroType[];
};

export type SuperheroType = {
  id: string;
  name: string;
  superpower: string;
  humilityScore: number;
};
