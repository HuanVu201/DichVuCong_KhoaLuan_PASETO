import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaTraTTHCCContext = createContext<IDaTraTTHCCContext | null>(null);

export interface IDaTraTTHCCContext {}

export const useDaTraTTHCCContext = () => {
  const context = useContext(DaTraTTHCCContext);
  if (!context)
    throw new Error(
      "DaTraTTHCCContext must be used inside DaTraTTHCCContext.Provider"
    );
  return context;
};

export const DaTraTTHCCProvider = ({ children }: IWithChildren) => {
  return (
    <DaTraTTHCCContext.Provider value={{}}>
      {children}
    </DaTraTTHCCContext.Provider>
  );
};
