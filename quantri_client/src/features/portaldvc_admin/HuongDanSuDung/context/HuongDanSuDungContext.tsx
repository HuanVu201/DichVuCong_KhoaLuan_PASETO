import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";
import { ISearchHuongDanSuDung } from "../models";
const HuongDanSuDungContext =
  createContext<IHuongDanSuDungContext | null>(null);
export interface IHuongDanSuDungContext {
  huongDanSuDungId: string | undefined;
  setHuongDanSuDungId: React.Dispatch<React.SetStateAction<string | undefined>>;
  huongDanSuDungVisible: boolean;
  setHuongDanSuDungVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useHuongDanSuDungContext = () => {
  const context = useContext(HuongDanSuDungContext);
  if (!context)
    throw new Error(
      "HuongDanSuDungContext must be used inside HuongDanSuDungContext.Provider"
    );
  return context;
};

export const HuongDanSuDungProvider = ({ children }: IWithChildren) => {
  const [huongDanSuDungId, setHuongDanSuDungId] = useState<string | undefined>("");
  const [huongDanSuDungVisible, setHuongDanSuDungVisible] = useState<boolean>(false);

  return (
    <HuongDanSuDungContext.Provider value={{huongDanSuDungId,setHuongDanSuDungId,huongDanSuDungVisible,setHuongDanSuDungVisible}}
    >
      {children}
    </HuongDanSuDungContext.Provider>
  );
};
