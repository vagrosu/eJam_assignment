import { Router } from "express";
import superheroesRouter from "./superheroes/superheroes.route";

const router = Router();

router.use("/superheroes", superheroesRouter);

export default router;
