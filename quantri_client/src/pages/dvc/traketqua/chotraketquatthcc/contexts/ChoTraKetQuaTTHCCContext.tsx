import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ChoTraKetQuaTTHCCContext =
  createContext<IChoTraKetQuaTTHCCContext | null>(null);

export interface IChoTraKetQuaTTHCCContext {}

export const useChoTraKetQuaTTHCCContext = () => {
  const context = useContext(ChoTraKetQuaTTHCCContext);
  if (!context)
    throw new Error(
      "ChoTraKetQuaTTHCCContext must be used inside ChoTraKetQuaTTHCCContext.Provider"
    );
  return context;
};

export const ChoTraKetQuaTTHCCProvider = ({ children }: IWithChildren) => {
  return (
    <ChoTraKetQuaTTHCCContext.Provider value={{}}>
      {children}
    </ChoTraKetQuaTTHCCContext.Provider>
  );
};
