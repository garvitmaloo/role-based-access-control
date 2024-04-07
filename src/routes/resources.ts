/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { getAllResources, patchUpdateResource } from "../controllers/resources";
import { isAdmin } from "../middleware/authorization";

const resourcesRouter = Router();

resourcesRouter.get("/", getAllResources);

resourcesRouter.patch("/:resourceName", isAdmin, patchUpdateResource);

export { resourcesRouter };
