/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { getAllResources } from "../controllers/resources";

const resourcesRouter = Router();

resourcesRouter.get("/", getAllResources);

export { resourcesRouter };
