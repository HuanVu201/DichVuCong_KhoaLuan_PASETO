import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";
import { ISearchHoiDap } from "../../../portaldvc/HoiDap/models";
const HoiDapContext =
  createContext<IHoiDapContext | null>(null);
export interface IHoiDapContext {
  hoiDapId: string | undefined;
  sethoiDapId: React.Dispatch<React.SetStateAction<string | undefined>>;
  hoiDapVisible: boolean;
  setHoiDapVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useHoiDapContext = () => {
  const context = useContext(HoiDapContext);
  if (!context)
    throw new Error(
      "HoiDapContext must be used inside HoiDapContext.Provider"
    );
  return context;
};

export const HoiDapProvider = ({ children }: IWithChildren) => {
  const [hoiDapId, sethoiDapId] = useState<string>();
  const [hoiDapVisible, setHoiDapVisible] = useState<boolean>(false)
  return (
    <HoiDapContext.Provider
      value={{ hoiDapId, sethoiDapId, hoiDapVisible, setHoiDapVisible }}
    >
      {children}
    </HoiDapContext.Provider>
  );
};
