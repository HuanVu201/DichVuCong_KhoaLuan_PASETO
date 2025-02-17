import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const TheoDoiDaChuyenTraKqContext =
  createContext<ITheoDoiDaChuyenTraKqContext | null>(null);

export interface ITheoDoiDaChuyenTraKqContext {}

export const useTheoDoiDaChuyenTraKqContext = () => {
  const context = useContext(TheoDoiDaChuyenTraKqContext);
  if (!context)
    throw new Error(
      "TheoDoiDaChuyenTraKqContext must be used inside TheoDoiDaChuyenTraKqContext.Provider"
    );
  return context;
};

export const TheoDoiDaChuyenTraKqProvider = ({ children }: IWithChildren) => {
  return (
    <TheoDoiDaChuyenTraKqContext.Provider value={{}}>
      {children}
    </TheoDoiDaChuyenTraKqContext.Provider>
  );
};
