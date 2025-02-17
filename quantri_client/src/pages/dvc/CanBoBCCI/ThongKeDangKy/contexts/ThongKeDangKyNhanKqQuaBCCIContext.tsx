import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ThongKeDangKyNhanKqQuaBCCIContext =
  createContext<IThongKeDangKyNhanKqQuaBCCIContext | null>(null);

export interface IThongKeDangKyNhanKqQuaBCCIContext {}

export const useThongKeDangKyNhanKqQuaBCCIContext = () => {
  const context = useContext(ThongKeDangKyNhanKqQuaBCCIContext);
  if (!context)
    throw new Error(
      "ThongKeDangKyNhanKqQuaBCCIContext must be used inside ThongKeDangKyNhanKqQuaBCCIContext.Provider"
    );
  return context;
};

export const ThongKeDangKyNhanKqQuaBCCIProvider = ({ children }: IWithChildren) => {
  return (
    <ThongKeDangKyNhanKqQuaBCCIContext.Provider value={{}}>
      {children}
    </ThongKeDangKyNhanKqQuaBCCIContext.Provider>
  );
};
