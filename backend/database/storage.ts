import { StorageType } from "./types";

// Here would normally be the database schema
// Included some dummy data for testing purposes
const storage: StorageType = {
  superheroes: [
    {
      id: "p9z4vhr8dvhi0hpp1dmqzjtt",
      name: "Superman",
      superpower: "Strength",
      humilityScore: 9,
    },
    {
      id: "q3h9rklaeb112xlou8url4tr",
      name: "Hulk",
      superpower: "Durability",
      humilityScore: 6,
    },
    {
      id: "u04v3svb0nuwfh77rceux2aj",
      name: "Sonic",
      superpower: "Speed",
      humilityScore: 5,
    },
    {
      id: "t9cb7wfgdnqijpz2bcnebiqx",
      name: "Iron Man",
      superpower: "Agility",
      humilityScore: 2,
    },
    {
      id: "aocaqa5z8ixz71g1786tqps2",
      name: "Batman",
      superpower: "Strength",
      humilityScore: 2,
    },
    {
      id: "qf2u4mr2euie8j53kufu7g9y",
      name: "Groot",
      superpower: "Regeneration",
      humilityScore: 1,
    },
    {
      id: "uw1akgm6iyf704mcqnwmlcyk",
      name: "Spiderman",
      superpower: "Agility",
      humilityScore: 1,
    },
  ],
};

export default storage;
