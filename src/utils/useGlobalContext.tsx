import { useContext } from "react";
import { GlobalContext } from "../context/global";

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
