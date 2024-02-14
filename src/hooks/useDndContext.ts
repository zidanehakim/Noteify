import { useContext } from "react";
import { DndContext } from "../contexts/DndContext";

export const useDndContext = () => {
  const context = useContext(DndContext);

  if (!context) throw Error("AuthContext error");

  return context;
};
