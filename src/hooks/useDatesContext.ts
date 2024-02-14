import { useContext } from "react";
import { DatesContext } from "../contexts/DatesContext";

export const useDatesContext = () => {
  const context = useContext(DatesContext);

  if (!context) throw Error("DatesContext error");

  return context;
};
