/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { isAuthorized } from "../middleware/authorization";
import {
  deleteProductController,
  getAllProductsController,
  patchUpdateProductController,
  postCreateProductController
} from "../controllers/products";

const productsRouter = Router();

productsRouter.get("/", isAuthorized, getAllProductsController);

// GET BY ID Route

productsRouter.post("/new", isAuthorized, postCreateProductController);

productsRouter.patch("/", isAuthorized, patchUpdateProductController);

productsRouter.delete("/", isAuthorized, deleteProductController);

export { productsRouter };
