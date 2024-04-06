import Resource from "../models/resource";
import type { IResource, IStandardResponse } from "../../types";

export const fetchAllResources = async (): Promise<
  IStandardResponse<IResource[]>
> => {
  try {
    const allResources = await Resource.find();

    return {
      error: null,
      result: allResources
    };
  } catch (err) {
    return {
      error: {
        statusCode: 500,
        message: (err as Error).message
      },
      result: null
    };
  }
};
