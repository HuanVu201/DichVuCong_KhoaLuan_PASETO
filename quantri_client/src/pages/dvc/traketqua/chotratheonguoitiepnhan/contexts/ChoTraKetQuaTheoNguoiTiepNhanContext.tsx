import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ChoTraKetQuaTheoNguoiTiepNhanContext =
  createContext<IChoTraKetQuaTheoNguoiTiepNhanContext | null>(null);

export interface IChoTraKetQuaTheoNguoiTiepNhanContext {}

export const useChoTraKetQuaTheoNguoiTiepNhanContext = () => {
  const context = useContext(ChoTraKetQuaTheoNguoiTiepNhanContext);
  if (!context)
    throw new Error(
      "ChoTraKetQuaTheoNguoiTiepNhanContext must be used inside ChoTraKetQuaTheoNguoiTiepNhanContext.Provider"
    );
  return context;
};

export const ChoTraKetQuaTheoNguoiTiepNhanProvider = ({
  children,
}: IWithChildren) => {
  return (
    <ChoTraKetQuaTheoNguoiTiepNhanContext.Provider value={{}}>
      {children}
    </ChoTraKetQuaTheoNguoiTiepNhanContext.Provider>
  );
};
