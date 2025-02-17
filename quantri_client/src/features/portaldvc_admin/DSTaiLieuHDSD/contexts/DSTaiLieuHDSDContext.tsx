import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";
import { ISearchDSTaiLieuHDSD } from "../models";
const DSTaiLieuHDSDContext =
  createContext<IDSTaiLieuHDSDContext | null>(null);
export interface IDSTaiLieuHDSDContext {
  DSTaiLieuHDSDId: string | undefined;
  setDSTaiLieuHDSDId: React.Dispatch<React.SetStateAction<string | undefined>>;
  DSTaiLieuHDSDVisible: boolean;
  setDSTaiLieuHDSDVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useDSTaiLieuHDSDContext = () => {
  const context = useContext(DSTaiLieuHDSDContext);
  if (!context)
    throw new Error(
      "DSTaiLieuHDSDContext must be used inside DSTaiLieuHDSDContext.Provider"
    );
  return context;
};

export const DSTaiLieuHDSDProvider = ({ children }: IWithChildren) => {
  const [DSTaiLieuHDSDId, setDSTaiLieuHDSDId] = useState<string | undefined>("");
  const [DSTaiLieuHDSDVisible, setDSTaiLieuHDSDVisible] = useState<boolean>(false);

  return (
    <DSTaiLieuHDSDContext.Provider value={{DSTaiLieuHDSDId,setDSTaiLieuHDSDId,DSTaiLieuHDSDVisible,setDSTaiLieuHDSDVisible}}
    >
      {children}
    </DSTaiLieuHDSDContext.Provider>
  );
};
