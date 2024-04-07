import Resource from "../models/resource";
import type { IResource, IStandardResponse } from "../../types";
import { ROLES } from "../utils/constants";

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

export const updateResourceService = async (
  resourceName: string,
  role: string,
  permissions: string[]
): Promise<IStandardResponse<any>> => {
  try {
    const resourceRecord = await Resource.findOne({ name: resourceName });

    if (resourceRecord === null) {
      return {
        error: {
          statusCode: 500,
          message: "No resource found with the given name"
        },
        result: null
      };
    }

    if (!ROLES.includes(role)) {
      return {
        error: {
          statusCode: 400,
          message: "Invalid Role"
        },
        result: null
      };
    }

    const rolePermissionsMap = resourceRecord.rolePermissionsMap;
    const newRolePermissionsMap = {
      ...rolePermissionsMap,
      [role]: permissions
    };

    const updatedRecord = await Resource.updateOne(
      { name: resourceName },
      {
        $set: { rolePermissionsMap: newRolePermissionsMap }
      }
    );

    return {
      error: null,
      result: updatedRecord
    };
  } catch (err) {
    return {
      error: {
        statusCode: 500,
        message: "Could not update the requested resource"
      },
      result: null
    };
  }
};
