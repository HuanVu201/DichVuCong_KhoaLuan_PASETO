import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const CongDanDangKyNhanKqQuaBCCIContext =
  createContext<ICongDanDangKyNhanKqQuaBCCIContext | null>(null);

export interface ICongDanDangKyNhanKqQuaBCCIContext {}

export const useCongDanDangKyNhanKqQuaBCCIContext = () => {
  const context = useContext(CongDanDangKyNhanKqQuaBCCIContext);
  if (!context)
    throw new Error(
      "CongDanDangKyNhanKqQuaBCCIContext must be used inside CongDanDangKyNhanKqQuaBCCIContext.Provider"
    );
  return context;
};

export const CongDanDangKyNhanKqQuaBCCIProvider = ({ children }: IWithChildren) => {
  return (
    <CongDanDangKyNhanKqQuaBCCIContext.Provider value={{}}>
      {children}
    </CongDanDangKyNhanKqQuaBCCIContext.Provider>
  );
};
