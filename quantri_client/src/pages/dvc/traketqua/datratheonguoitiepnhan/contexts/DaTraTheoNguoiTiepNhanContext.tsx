import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaTraTheoNguoiTiepNhanContext =
  createContext<IDaTraTheoNguoiTiepNhanContext | null>(null);

export interface IDaTraTheoNguoiTiepNhanContext {}

export const useDaTraTheoNguoiTiepNhanContext = () => {
  const context = useContext(DaTraTheoNguoiTiepNhanContext);
  if (!context)
    throw new Error(
      "DaTraTheoNguoiTiepNhanContext must be used inside DaTraTheoNguoiTiepNhanContext.Provider"
    );
  return context;
};

export const DaTraTheoNguoiTiepNhanProvider = ({ children }: IWithChildren) => {
  return (
    <DaTraTheoNguoiTiepNhanContext.Provider value={{}}>
      {children}
    </DaTraTheoNguoiTiepNhanContext.Provider>
  );
};
