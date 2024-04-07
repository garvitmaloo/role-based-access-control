import type { Request, Response, NextFunction } from "express";

import { fetchAllResources, updateResourceService } from "../service/resources";

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

export const patchUpdateResource = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const resourceName: string = req.params.resourceName;
  const roleUpdate: string = req.body.forRole;
  const newPermissions: string[] = req.body.newPermissions;

  const updateResourceResult = await updateResourceService(
    resourceName,
    roleUpdate,
    newPermissions
  );

  if (updateResourceResult.error !== null) {
    res.statusCode = updateResourceResult.error.statusCode;
    next(new Error(updateResourceResult.error.message));
    return;
  }

  res.status(200).json(updateResourceResult);
};
