import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import moment from 'moment';
import { toDateTime } from '../../../utils/date';

export const getUserProfile = async (userprofileID = "") => {
    try {
      const userProfileRef = doc(db, "users", userprofileID);
      const userProfileData = await getDoc(userProfileRef);

      return userProfileData.data();
    } catch (error) {
      throw Error(error);
    }
};

export const getStartDate = (userStartDate) => {
  if (!userStartDate) return "";

  const dateObject = toDateTime(userStartDate);
  return moment(dateObject).format('DD MMM, YYYY');
};

export const geEndDate = (userEndDate) => {
  if (!userEndDate) return "";

  const dateObject = toDateTime(userEndDate);
  return moment(dateObject).format('DD MMM, YYYY');
};
