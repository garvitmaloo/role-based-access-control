import type { NextFunction, Request, Response } from "express";
import Resource from "../models/resource";
import type { IResource } from "../../types";
import { ROLES } from "../utils/constants";

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const role: string = req.body.role; // user role will be extracted from token cookie
  const resourceName = req.originalUrl.slice(5).split("/")[0]; // slice to remove /api/
  const requestMethod = req.method;

  if (!ROLES.includes(role)) {
    res.statusCode = 400;
    next(new Error("Invalid role"));
    return;
  }

  const resourceDetails: IResource | null = await Resource.findOne({
    name: resourceName
  });

  if (resourceDetails === null) {
    res.statusCode = 404;
    next(new Error("Could not find the resource you requested"));
    return;
  }

  const allPermissionsForRole: string[] =
    resourceDetails.rolePermissionsMap[role];

  if (
    allPermissionsForRole[0] !== "*" &&
    !allPermissionsForRole.includes(requestMethod)
  ) {
    res.statusCode = 403;
    next(new Error("You are not authorized for this action"));
    return;
  }

  next();
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const role: string = req.body.role;

  if (role !== "admin") {
    res.statusCode = 403;
    next(new Error("Only admin is authorized for this action"));
    return;
  }

  next();
};
