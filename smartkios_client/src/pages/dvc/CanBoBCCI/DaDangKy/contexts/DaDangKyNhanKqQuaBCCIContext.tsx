import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaDangKyNhanKqQuaBCCIContext =
  createContext<IDaDangKyNhanKqQuaBCCIContext | null>(null);

export interface IDaDangKyNhanKqQuaBCCIContext {}

export const useDaDangKyNhanKqQuaBCCIContext = () => {
  const context = useContext(DaDangKyNhanKqQuaBCCIContext);
  if (!context)
    throw new Error(
      "DaDangKyNhanKqQuaBCCIContext must be used inside DaDangKyNhanKqQuaBCCIContext.Provider"
    );
  return context;
};

export const DaDangKyNhanKqQuaBCCIProvider = ({ children }: IWithChildren) => {
  return (
    <DaDangKyNhanKqQuaBCCIContext.Provider value={{}}>
      {children}
    </DaDangKyNhanKqQuaBCCIContext.Provider>
  );
};
