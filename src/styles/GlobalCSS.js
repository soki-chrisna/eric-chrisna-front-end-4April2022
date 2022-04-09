import { commonStyles } from "../utils/_common";
// import { formStyles } from "./utilities/_form";

const GlobalCSS = ({ children }) => {
  commonStyles();
  // formStyles();

  return children;
};

export default GlobalCSS;