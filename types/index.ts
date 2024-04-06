/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import type { Document } from "mongoose";

export interface IStandardResponse<T> {
  error: {
    statusCode: number;
    message: string;
  } | null;
  result: T | null;
}

export interface IResource extends Document {
  name: string;
  rolePermissionsMap: {
    [key: string]: string[];
  };
}
