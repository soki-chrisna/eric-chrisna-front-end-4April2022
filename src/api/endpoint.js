import { config } from "utils/process";

const MAIN_URL = config.api.url;

export default {
  GET_PROFILE: `${MAIN_URL}/user-profile`,
};
