import React, { useContext } from "react";
import Data from "./MainContext";

const Testing = () => {
  const data = useContext(Data);

  return <>{console.log(data)}</>;
};

export default Testing;
