import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";
import { ISearchCauHoiPhoBien } from "../models";
const CauHoiPhoBienContext =
  createContext<ICauHoiPhoBienContext | null>(null);
export interface ICauHoiPhoBienContext {
  CauHoiPhoBienId: string | undefined;
  setCauHoiPhoBienId: React.Dispatch<React.SetStateAction<string | undefined>>;
  CauHoiPhoBienVisible: boolean;
  setCauHoiPhoBienVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useCauHoiPhoBienContext = () => {
  const context = useContext(CauHoiPhoBienContext);
  if (!context)
    throw new Error(
      "CauHoiPhoBienContext must be used inside CauHoiPhoBienContext.Provider"
    );
  return context;
};

export const CauHoiPhoBienProvider = ({ children }: IWithChildren) => {
  const [CauHoiPhoBienId, setCauHoiPhoBienId] = useState<string | undefined>("");
  const [CauHoiPhoBienVisible, setCauHoiPhoBienVisible] = useState<boolean>(false);

  return (
    <CauHoiPhoBienContext.Provider value={{CauHoiPhoBienId,setCauHoiPhoBienId,CauHoiPhoBienVisible,setCauHoiPhoBienVisible}}
    >
      {children}
    </CauHoiPhoBienContext.Provider>
  );
};
