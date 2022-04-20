import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

import { DEFERRED_SAVE_DATA_ITEM_KEY } from '../constants/offline';

export const setDeferredSavedData = (valuesToBeSaved) => {
  let deferredData;
  let stringifiedDeferredData;
  const existingDeferredSaveData = localStorage.getItem(DEFERRED_SAVE_DATA_ITEM_KEY);
  if (existingDeferredSaveData) {
    deferredData = JSON.parse(existingDeferredSaveData);
    deferredData.push(valuesToBeSaved);
  } else {
    deferredData = [valuesToBeSaved];
  }

  stringifiedDeferredData = JSON.stringify(deferredData);
  localStorage.setItem(DEFERRED_SAVE_DATA_ITEM_KEY, stringifiedDeferredData);
};

export const saveDeferredData = async (userProfileID) => {
  const deferredSaveData = localStorage.getItem(DEFERRED_SAVE_DATA_ITEM_KEY);
  if (deferredSaveData) {
    const userDoc = doc(db, "users", userProfileID);

    const doSave = async (parsedDeferredSaveDataKey) => {
      try {
        await updateDoc(userDoc, parsedDeferredSaveDataKey);
      } catch (error) {
        throw Error(error);
      }
    }; 

    const parsedDeferredSaveData = JSON.parse(deferredSaveData);
    parsedDeferredSaveData.forEach(doSave);
  }
};

export const clearDeferredSaveData = (itemKey) => {
  localStorage.removeItem(itemKey);
};
