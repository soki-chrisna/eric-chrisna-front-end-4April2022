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

  // const dateObject = toDateTime(enteredStartDate);
  return moment(enteredStartDate, "M/D/YYYY H:mm").valueOf();
};
export const getStartDateValue = (startDateValue) => {
  if (!startDateValue) return null;

  const dateObject = toDateTime(startDateValue);
  // return moment(enteredStartDate, "M/D/YYYY H:mm").valueOf();
  return dateObject;
};

export const geEndDate = (userEndDate) => {
  if (!userEndDate) return "";

  const dateObject = toDateTime(userEndDate);
  return moment(dateObject).format('DD MMM, YYYY');
};
