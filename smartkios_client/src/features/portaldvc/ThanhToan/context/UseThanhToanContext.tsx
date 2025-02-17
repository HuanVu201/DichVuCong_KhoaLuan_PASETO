import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { ISearchYeuCauThanhToanPortal } from "../models/YeuCauThanhToanPortal";

const ThanhToanContext = createContext<IThanhToanContext | null>(null);

export interface IThanhToanContext {
  maYeuCauThanhToan: string;
  setMaYeuCauThanhToan: React.Dispatch<React.SetStateAction<string>>;
}

export const UseThanhToanContext = () => {
  const context = useContext(ThanhToanContext);
  if (!context)
    throw new Error(
      "ThanhToanContext must be used inside ThanhToanContext.Provider"
    );
  return context;
};

export const ThanhToanProvider = ({ children }: IWithChildren) => {
  const [maYeuCauThanhToan, setMaYeuCauThanhToan] = useState<string>("");
  return (
    <ThanhToanContext.Provider
      value={{
        maYeuCauThanhToan,
        setMaYeuCauThanhToan,
      }}
    >
      {children}
    </ThanhToanContext.Provider>
  );
};
