import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ChoXacNhanTraKqChuaThuPhiContext =
  createContext<IChoXacNhanTraKqChuaThuPhiContext | null>(null);

export interface IChoXacNhanTraKqChuaThuPhiContext {}

export const useChoXacNhanTraKqChuaThuPhiContext = () => {
  const context = useContext(ChoXacNhanTraKqChuaThuPhiContext);
  if (!context)
    throw new Error(
      "ChoXacNhanTraKqChuaThuPhiContext must be used inside ChoXacNhanTraKqChuaThuPhiContext.Provider"
    );
  return context;
};

export const ChoXacNhanTraKqChuaThuPhiProvider = ({
  children,
}: IWithChildren) => {
  return (
    <ChoXacNhanTraKqChuaThuPhiContext.Provider value={{}}>
      {children}
    </ChoXacNhanTraKqChuaThuPhiContext.Provider>
  );
};
