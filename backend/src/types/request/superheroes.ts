export type GetSuperheroesRequestType = {
  query: {
    sortByHumility: "ascending" | "descending";
  };
};

export type CreateSuperheroRequestType = {
  body: {
    name: string;
    superpower: string;
    humilityScore: number;
  };
};
