import type { Request, Response, NextFunction } from "express";

import { fetchAllResources } from "../service/resources";

export const getAllResources = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const response = await fetchAllResources();

  if (response.error !== null) {
    res.statusCode = response.error.statusCode;
    next(new Error(response.error.message));
  }

  res.status(200).json(response);
};
