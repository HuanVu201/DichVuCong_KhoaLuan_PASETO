import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ChoTraKetQuaContext = createContext<IChoTraKetQuaContext | null>(null);

export interface IChoTraKetQuaContext {}

export const useChoTraKetQuaContext = () => {
  const context = useContext(ChoTraKetQuaContext);
  if (!context)
    throw new Error(
      "ChoTraKetQuaContext must be used inside ChoTraKetQuaContext.Provider"
    );
  return context;
};

export const ChoTraKetQuaProvider = ({ children }: IWithChildren) => {
  return (
    <ChoTraKetQuaContext.Provider value={{}}>
      {children}
    </ChoTraKetQuaContext.Provider>
  );
};
