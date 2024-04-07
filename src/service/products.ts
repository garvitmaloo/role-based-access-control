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

export const createNewProductService = async (
  name: string,
  price: number
): Promise<IStandardResponse<IProduct>> => {
  try {
    const product = new Product({
      name,
      price
    });

    const newProduct = await product.save();

    return {
      error: null,
      result: newProduct
    };
  } catch (err) {
    return {
      error: {
        statusCode: 500,
        message: "Could not create a new product"
      },
      result: null
    };
  }
};
