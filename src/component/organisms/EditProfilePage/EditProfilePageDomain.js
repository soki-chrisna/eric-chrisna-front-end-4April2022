import React from "react";
import { useNavigate  } from "react-router-dom";
import { getDoc, doc, updateDoc, enableIndexedDbPersistence } from "firebase/firestore";
import { db } from "../../../firebase-config";
import moment from 'moment';
import { toDateTime } from '../../../utils/date';
import { ConfirmationNumber } from "@material-ui/icons";
import { history } from "../../../utils/history";
import { redirectTo } from "../../../utils/url";
import { setDeferredSavedData } from "../../../utils/offlineModeHandler";
import { INTERNET_CONNECTION_ONLINE, INTERNET_CONNECTION_OFFLINE } from "../../../constants/internetConnection";

export const currentUserProfileID = "pg9wefMNwiB1S9u8IGfT";

export const getUserProfile = async (userprofileID = "") => {
    try {
      const userProfileRef = doc(db, "users", currentUserProfileID);
      const userProfileData = await getDoc(userProfileRef);

      return userProfileData.data();
    } catch (error) {
      throw Error(error);
    }
};

export const updateUserProfile = async (updatedUserProfileValues, userprofileID = "", online = true) => {
  if (!online) {
    setDeferredSavedData(updatedUserProfileValues);
    return;
  }

  try {
    const userDoc = doc(db, "users", userprofileID);
    await updateDoc(userDoc, updatedUserProfileValues);
  } catch (error) {
    throw Error(error);
  }
};

export const geFormattedStartDate = (enteredStartDate) => {
  if (!enteredStartDate) return "";

  return moment(enteredStartDate, "M/D/YYYY H:mm").valueOf();
};

export const getSecondsToDateValue = (dateValueInSeconds) => {
  if (!dateValueInSeconds) return null;

  const dateObject = toDateTime(dateValueInSeconds);
  return dateObject;
};

export const prepareSwitchesToggleState = (userProfileData, callback) => {
  let switchesValue = Object.entries(userProfileData).filter((userProfileDataArray) => {
    return userProfileDataArray[0].match(/shouldShow/);
  });
  switchesValue = switchesValue.reduce((obj, cur) => (
    {...obj, [cur[0]]: cur[1]}
  ), {});

  callback(switchesValue);
};

export const validateAge = (errors, ageFieldValue) => {
  let ageErrorMessage = "";
  const age = +ageFieldValue;

  const enteredAgeIsNotANumber = isNaN(age);

  if (age > 150) {
    ageErrorMessage = "No human can live eternal."
  } else  if (age < 0) {
    ageErrorMessage =  "Age can not less than 0."
  } else if (enteredAgeIsNotANumber) {
    ageErrorMessage =   "Age can not contain other than number."
  }

  if (ageErrorMessage) {
    errors.age = ageErrorMessage;
  }
};

export const validateWorkExperienceDate = (workStartDate, workEndDate) => {
  const startDate = geFormattedStartDate(workStartDate);
  const endDate = geFormattedStartDate(workEndDate);

  if (startDate > endDate) {
    return "Start Date can not be more than End date"
  }

  return "";
};

export const onDiscardClickedHandler = (fieldIsTouched) => (event) => {
  if (fieldIsTouched) {
    window.confirm("You are about to leave the page with some fields are modified. Proceed to discard and go back ?");
  };

  redirectTo("/");
};

export const handleConnection = (setConnected) => {
  const internetConnection = navigator.onLine ? INTERNET_CONNECTION_ONLINE : INTERNET_CONNECTION_OFFLINE;
  if (internetConnection === INTERNET_CONNECTION_OFFLINE) {
    return setConnected(false);
  }
  return setConnected(true);
};
 