import { isObject } from "./objects";
import { isString } from "./strings";

// The normalizeError function takes an unknown error and returns an Error object.
export const normalizeError = (error: unknown): Error => {
  if (isString(error)) {
    return new Error(error);
  } else if (error instanceof Error) {
    return error;
  } else if (isObject(error) && error.hasOwnProperty("message")) {
    return new Error((error as { message: string }).message);
  } else {
    return new Error("Unknown error type");
  }
};
