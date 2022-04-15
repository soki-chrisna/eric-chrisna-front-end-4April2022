import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import UserProfileService from "../../../api/services/UserProfileService";
import { db } from "../../../firebase-config";
import moment from 'moment';
import { toDateTime } from '../../../utils/date';

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

export const updateUserProfile = async (userprofileID = "", updatedUserProfileValues) => {
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

// export const prepareStartDateToSecondsValue = (userProfileUpdatedValues) => {
//   userProfileUpdatedValues.startDate = 
// };
export const prepareSwitchesToggleState = (userProfileData, callback) => {
  let switchesValue = Object.entries(userProfileData).filter((userProfileDataArray) => {
    return userProfileDataArray[0].match(/shouldShow/);
  });
  switchesValue = switchesValue.reduce((obj, cur) => (
    {...obj, [cur[0]]: cur[1]}
  ), {});

  callback(switchesValue);
};