import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaTraKqQuaBCCIContext = createContext<IDaTraKqQuaBCCIContext | null>(
  null
);

export interface IDaTraKqQuaBCCIContext {}

export const useDaTraKqQuaBCCIContext = () => {
  const context = useContext(DaTraKqQuaBCCIContext);
  if (!context)
    throw new Error(
      "DaTraKqQuaBCCIContext must be used inside DaTraKqQuaBCCIContext.Provider"
    );
  return context;
};

export const DaTraKqQuaBCCIProvider = ({ children }: IWithChildren) => {
  return (
    <DaTraKqQuaBCCIContext.Provider value={{}}>
      {children}
    </DaTraKqQuaBCCIContext.Provider>
  );
};
