export const isObject = (obj: unknown): obj is {} => {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
};

export const isObjectEmpty = (obj: {}) => {
  return Object.keys(obj).length === 0;
};
