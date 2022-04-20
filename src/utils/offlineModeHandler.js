export const setDeferredSavedData = (valuesToBeSaved) => {
  let deferredData;
  let stringifiedDeferredData;
  const existingDeferredSaveData = localStorage.getItem("deferredSaveData");
  if (existingDeferredSaveData) {
    deferredData = JSON.parse(existingDeferredSaveData);
    deferredData.push(valuesToBeSaved);
  } else {
    deferredData = [valuesToBeSaved];
  }

  stringifiedDeferredData = JSON.stringify(deferredData);
  localStorage.setItem("deferredSaveData", stringifiedDeferredData);
};
