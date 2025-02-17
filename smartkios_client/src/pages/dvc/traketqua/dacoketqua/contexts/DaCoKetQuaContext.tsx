import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaCoKetQuaContext = createContext<IDaCoKetQuaContext | null>(null);

export interface IDaCoKetQuaContext {}

export const useDaCoKetQuaContext = () => {
  const context = useContext(DaCoKetQuaContext);
  if (!context)
    throw new Error(
      "DaCoKetQuaContext must be used inside DaCoKetQuaContext.Provider"
    );
  return context;
};

export const DaCoKetQuaProvider = ({ children }: IWithChildren) => {
  return (
    <DaCoKetQuaContext.Provider value={{}}>
      {children}
    </DaCoKetQuaContext.Provider>
  );
};
