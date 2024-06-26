import type { Request, Response, NextFunction } from "express";
import {
  createNewProductService,
  deleteProductService,
  fetchAllProductsService
} from "../service/products";

export const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const allProducts = await fetchAllProductsService();

  if (allProducts.error !== null) {
    res.statusCode = allProducts.error.statusCode;
    next(new Error(allProducts.error.message));
    return;
  }

  res.status(200).json(allProducts);
};

export const postCreateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const name: string = req.body.name;
  const price: number = req.body.price;

  const createNewProductResponse = await createNewProductService(name, price);

  if (createNewProductResponse.error !== null) {
    res.statusCode = createNewProductResponse.error.statusCode;
    next(new Error(createNewProductResponse.error.message));
    return;
  }

  res.status(201).json(createNewProductResponse);
};

// Skipping this functionality
export const patchUpdateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const productId: string = req.params.productId;
  const deleteProductResponse = await deleteProductService(productId);

  if (deleteProductResponse.error !== null) {
    res.statusCode = deleteProductResponse.error.statusCode;
    next(new Error(deleteProductResponse.error.message));
    return;
  }

  res.status(200).json(deleteProductResponse);
};
