import { commonStyles } from "../utils/_common";

const GlobalCSS = ({ children }) => {
  commonStyles();

  return children;
};

export default GlobalCSS;