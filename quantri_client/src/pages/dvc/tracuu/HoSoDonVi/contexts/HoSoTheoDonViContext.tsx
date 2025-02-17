import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoTheoDonViContext = createContext<IHoSoTheoDonViContext | null>(null);

export interface IHoSoTheoDonViContext {}

export const useHoSoTheoDonViContext = () => {
  const context = useContext(HoSoTheoDonViContext);
  if (!context)
    throw new Error(
      "HoSoTheoDonViContext must be used inside HoSoTheoDonViContext.Provider"
    );
  return context;
};

export const HoSoTheoDonViProvider = ({ children }: IWithChildren) => {
  return (
    <HoSoTheoDonViContext.Provider value={{}}>
      {children}
    </HoSoTheoDonViContext.Provider>
  );
};
