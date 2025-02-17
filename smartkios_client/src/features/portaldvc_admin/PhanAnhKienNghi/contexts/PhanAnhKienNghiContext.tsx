import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";
import { ISearchPhanAnhKienNghi } from "../../../portaldvc/PhanAnhKienNghi/models";
const PhanAnhKienNghiContext =
  createContext<IPhanAnhKienNghiContext | null>(null);
export interface IPhanAnhKienNghiContext {
  PhanAnhKienNghiId: string | undefined;
  setPhanAnhKienNghiId: React.Dispatch<React.SetStateAction<string | undefined>>;
  PhanAnhKienNghiVisible: boolean;
  setPhanAnhKienNghiVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const usePhanAnhKienNghiContext = () => {
  const context = useContext(PhanAnhKienNghiContext);
  if (!context)
    throw new Error(
      "PhanAnhKienNghiContext must be used inside PhanAnhKienNghiContext.Provider"
    );
  return context;
};

export const PhanAnhKienNghiProvider = ({ children }: IWithChildren) => {
  const [PhanAnhKienNghiId, setPhanAnhKienNghiId] = useState<string>();
  const [PhanAnhKienNghiVisible, setPhanAnhKienNghiVisible] = useState<boolean>(false)
  return (
    <PhanAnhKienNghiContext.Provider
      value={{ PhanAnhKienNghiId, setPhanAnhKienNghiId, PhanAnhKienNghiVisible, setPhanAnhKienNghiVisible }}
    >
      {children}
    </PhanAnhKienNghiContext.Provider>
  );
};
