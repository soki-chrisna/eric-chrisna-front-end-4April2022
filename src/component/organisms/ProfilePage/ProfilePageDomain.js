import { collection, getDoc, doc } from "firebase/firestore";
import UserProfileService from "../../../api/services/UserProfileService";
import { db } from "../../../firebase-config";
import moment from 'moment';
import { toDateTime } from '../../../utils/date';

// export const currentUserProfileID = "pg9wefMNwiB1S9u8IGfT";

export const getUserProfile = async (userprofileID = "") => {
    try {
      const userProfileRef = doc(db, "users", userprofileID);
      const userProfileData = await getDoc(userProfileRef);

      return userProfileData.data();
    } catch (error) {
      throw Error(error);
    }
};

export const updateUserProfile = async (userprofileID = "") => {
    try {
      const userProfileRef = collection(db, "users")
      const respone = await UserProfileService.getUserProfileByI;
      return respone;
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
