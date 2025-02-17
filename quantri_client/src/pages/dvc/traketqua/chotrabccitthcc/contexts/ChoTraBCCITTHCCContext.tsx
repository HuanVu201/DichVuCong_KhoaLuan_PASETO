import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ChoTraBCCITTHCCContext = createContext<IChoTraBCCITTHCCContext | null>(
  null
);

export interface IChoTraBCCITTHCCContext {}

export const useChoTraBCCITTHCCContext = () => {
  const context = useContext(ChoTraBCCITTHCCContext);
  if (!context)
    throw new Error(
      "ChoTraBCCITTHCCContext must be used inside ChoTraBCCITTHCCContext.Provider"
    );
  return context;
};

export const ChoTraBCCITTHCCProvider = ({ children }: IWithChildren) => {
  return (
    <ChoTraBCCITTHCCContext.Provider value={{}}>
      {children}
    </ChoTraBCCITTHCCContext.Provider>
  );
};
