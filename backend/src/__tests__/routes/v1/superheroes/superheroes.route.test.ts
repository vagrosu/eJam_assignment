import storage from "database/storage";
import createServer from "src/config/server";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";

const seedStorageWithSuperheroes = () => {
  const superheroes = [
    {
      id: "p9z4vhr8dvhi0hpp1dmqzjtt",
      name: "Superman",
      superpower: "Strength",
      humilityScore: 3,
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
      humilityScore: 10,
    },
    {
      id: "t9cb7wfgdnqijpz2bcnebiqx",
      name: "Iron Man",
      superpower: "Agility",
      humilityScore: 8,
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
      humilityScore: 2,
    },
  ];

  storage.superheroes = superheroes;
};

describe("/v1/superheroes", () => {
  let agent: InstanceType<typeof TestAgent>;

  beforeEach(() => {
    agent = supertest.agent(createServer());
    seedStorageWithSuperheroes();
  });

  describe("GET /", () => {
    it("should return 200 and the list of superheroes", async () => {
      // arrange
      const pageSize = 10;
      const page = 1;

      // act
      const res = await agent.get("/v1/superheroes").query({ pageSize, page });

      // assert
      expect(res.status).toBe(200);
      expect(res.body.isSuccess).toBe(true);
      expect(res.body.data.pagination.total).toBe(storage.superheroes.length);
      expect(res.body.data.superheroes.length).toBeLessThanOrEqual(pageSize);
      expect(res.body.data.superheroes).toEqual(storage.superheroes.slice(0, pageSize));
    });

    it("should return 200 and the list of superheroes with a custom page and page size", async () => {
      // arrange
      const pageSize = 3;
      const page = 2;

      // act
      const res = await agent.get("/v1/superheroes").query({ pageSize, page });

      // assert
      expect(res.status).toBe(200);
      expect(res.body.isSuccess).toBe(true);
      expect(res.body.data.pagination.total).toBe(storage.superheroes.length);
      expect(res.body.data.superheroes.length).toBeLessThanOrEqual(pageSize);
      expect(res.body.data.superheroes).toEqual(storage.superheroes.slice(pageSize, pageSize * page));
    });

    it("should return 200 and the list of superheroes sorted by humility score in ascending order", async () => {
      // arrange
      const pageSize = 10;
      const page = 1;

      // act
      const res = await agent.get("/v1/superheroes").query({ pageSize, page, sortByHumility: "ascending" });

      // assert
      expect(res.status).toBe(200);
      expect(res.body.isSuccess).toBe(true);
      expect(res.body.data.pagination.total).toBe(storage.superheroes.length);
      expect(res.body.data.superheroes.length).toBeLessThanOrEqual(pageSize);
      expect(res.body.data.superheroes).toEqual(
        storage.superheroes.sort((a, b) => a.humilityScore - b.humilityScore).slice(0, pageSize)
      );
    });

    it("should return 200 and the list of superheroes sorted by humility score in descending order", async () => {
      // arrange
      const pageSize = 10;
      const page = 1;

      // act
      const res = await agent.get("/v1/superheroes").query({ pageSize, page, sortByHumility: "descending" });

      // assert
      expect(res.status).toBe(200);
      expect(res.body.isSuccess).toBe(true);
      expect(res.body.data.pagination.total).toBe(storage.superheroes.length);
      expect(res.body.data.superheroes.length).toBeLessThanOrEqual(pageSize);
      expect(res.body.data.superheroes).toEqual(
        storage.superheroes.sort((a, b) => b.humilityScore - a.humilityScore).slice(0, pageSize)
      );
    });

    it("should return 200 and the list of superheroes sorted by humility score in ascending order with custom pagination", async () => {
      // arrange
      const pageSize = 2;
      const page = 2;

      // act
      const res = await agent.get("/v1/superheroes").query({ pageSize, page, sortByHumility: "ascending" });

      // assert
      expect(res.status).toBe(200);
      expect(res.body.isSuccess).toBe(true);
      expect(res.body.data.pagination.total).toBe(storage.superheroes.length);
      expect(res.body.data.superheroes.length).toBeLessThanOrEqual(pageSize);
      expect(res.body.data.superheroes).toEqual(
        storage.superheroes.sort((a, b) => a.humilityScore - b.humilityScore).slice(pageSize, pageSize * page)
      );
    });

    it("should return 400 when sortByHumility is an invalid value", async () => {
      // arrange
      const pageSize = 10;
      const page = 1;

      // act
      const res = await agent.get("/v1/superheroes").query({ pageSize, page, sortByHumility: "invalid" });

      // assert
      expect(res.status).toBe(400);
      expect(res.body.isSuccess).toBe(false);
      expect(res.body.message).toBe("Validation error");
      expect(res.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "sortByHumility",
            message: "The 'sortByHumility' parameter must be either 'ascending' or 'descending'.",
          }),
        ])
      );
    });
  });
});
