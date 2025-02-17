import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoLienThongContext = createContext<IHoSoLienThongContext | null>(null);

export interface IHoSoLienThongContext {}

export const useHoSoLienThongContext = () => {
  const context = useContext(HoSoLienThongContext);
  if (!context)
    throw new Error(
      "HoSoLienThongContext must be used inside HoSoLienThongContext.Provider"
    );
  return context;
};

export const HoSoLienThongProvider = ({ children }: IWithChildren) => {
  return (
    <HoSoLienThongContext.Provider value={{}}>
      {children}
    </HoSoLienThongContext.Provider>
  );
};
