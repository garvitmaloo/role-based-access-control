import Product from "../models/product";
import type { IProduct, IStandardResponse } from "../../types";

export const fetchAllProductsService = async (): Promise<
  IStandardResponse<IProduct[]>
> => {
  try {
    const allProducts = await Product.find();
    return {
      error: null,
      result: allProducts
    };
  } catch (err) {
    return {
      error: {
        statusCode: 500,
        message: "Failed to fetch all products"
      },
      result: null
    };
  }
};
