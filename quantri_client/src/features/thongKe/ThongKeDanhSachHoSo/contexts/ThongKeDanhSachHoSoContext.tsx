import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ThongKeDanhSachHoSoContext =
  createContext<IThongKeDanhSachHoSoContext | null>(null);

export interface IThongKeDanhSachHoSoContext {}

export const useThongKeDanhSachHoSoContext = () => {
  const context = useContext(ThongKeDanhSachHoSoContext);
  if (!context)
    throw new Error(
      "ThongKeDanhSachHoSoContext must be used inside ThongKeDanhSachHoSoContext.Provider"
    );
  return context;
};

export const ThongKeDanhSachHoSoProvider = ({ children }: IWithChildren) => {
  return (
    <ThongKeDanhSachHoSoContext.Provider value={{}}>
      {children}
    </ThongKeDanhSachHoSoContext.Provider>
  );
};
