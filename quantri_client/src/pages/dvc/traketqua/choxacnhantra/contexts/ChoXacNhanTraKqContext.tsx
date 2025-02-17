import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ChoXacNhanTraKqContext = createContext<IChoXacNhanTraKqContext | null>(
  null
);

export interface IChoXacNhanTraKqContext {}

export const useChoXacNhanTraKqContext = () => {
  const context = useContext(ChoXacNhanTraKqContext);
  if (!context)
    throw new Error(
      "ChoXacNhanTraKqContext must be used inside ChoXacNhanTraKqContext.Provider"
    );
  return context;
};

export const ChoXacNhanTraKqProvider = ({ children }: IWithChildren) => {
  return (
    <ChoXacNhanTraKqContext.Provider value={{}}>
      {children}
    </ChoXacNhanTraKqContext.Provider>
  );
};
