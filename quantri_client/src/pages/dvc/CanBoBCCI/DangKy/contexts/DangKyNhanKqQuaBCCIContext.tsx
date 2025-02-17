import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DangKyNhanKqQuaBCCIContext =
  createContext<IDangKyNhanKqQuaBCCIContext | null>(null);

export interface IDangKyNhanKqQuaBCCIContext {}

export const useDangKyNhanKqQuaBCCIContext = () => {
  const context = useContext(DangKyNhanKqQuaBCCIContext);
  if (!context)
    throw new Error(
      "DangKyNhanKqQuaBCCIContext must be used inside DangKyNhanKqQuaBCCIContext.Provider"
    );
  return context;
};

export const DangKyNhanKqQuaBCCIProvider = ({ children }: IWithChildren) => {
  return (
    <DangKyNhanKqQuaBCCIContext.Provider value={{}}>
      {children}
    </DangKyNhanKqQuaBCCIContext.Provider>
  );
};
