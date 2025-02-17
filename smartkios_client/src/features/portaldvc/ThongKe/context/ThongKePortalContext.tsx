import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";

interface IThongKeXaPhuong {
  catalog?: string,
  groupCode?: string
}

const ThongKePortalContext =
  createContext<IThongKeContext | null>(null);


export interface IThongKeContext {
  catalogSearchPortal: string | null;
  setCatalogSearchPortal: React.Dispatch<React.SetStateAction<string | null>>;
  thongKeXaPhuong: IThongKeXaPhuong | undefined;
  setThongKeXaPhuong: React.Dispatch<React.SetStateAction<IThongKeXaPhuong | undefined>>;
}


export const useThongKePortalContext = () => {
  const context = useContext(ThongKePortalContext);
  if (!context)
    throw new Error(
      "ThongKePortalContext must be used inside ThongKePortalContext.Provider"
    );
  return context;
};


export const ThongKePortalProvider = ({ children }: IWithChildren) => {
  const [catalogSearchPortal, setCatalogSearchPortal] = useState<string | null>("");
  const [thongKeXaPhuong, setThongKeXaPhuong] = useState<IThongKeXaPhuong>();

  return (
    <ThongKePortalContext.Provider
      value={{
        catalogSearchPortal, setCatalogSearchPortal,
        thongKeXaPhuong, setThongKeXaPhuong,
      }}
    >
      {children}
    </ThongKePortalContext.Provider>
  );
};
