import { useState } from "react";

const useInternetConnection = () => {
  const [connected, setConnected] = useState(true);
  return { connected, setConnected };
};

export default useInternetConnection;