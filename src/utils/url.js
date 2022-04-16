import { history } from "./history";

export const redirectTo = (url) => {
  history.push(url);
  window.location.reload();
}