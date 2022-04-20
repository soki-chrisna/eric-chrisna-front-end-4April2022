export const each = (objects, callbackFunction) => {
  Object.entries(objects).forEach(([key, value]) => callbackFunction(key, value));
};