import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaHoanPhiContext = createContext<IDaHoanPhiContext | null>(null);

export interface IDaHoanPhiContext {
  yeuCauLaiYeuCauThanhToanVisible: boolean;
  setYeuCauLaiYeuCauThanhToanVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  selectedIds: React.Key[];
  setSelectedIds: React.Dispatch<React.SetStateAction<React.Key[]>>;
}

export const useDaHoanPhiContext = () => {
  const context = useContext(DaHoanPhiContext);
  if (!context)
    throw new Error(
      "DaHoanPhiContext must be used inside DaHoanPhiContext.Provider"
    );
  return context;
};

export const DaHoanPhiProvider = ({ children }: IWithChildren) => {
  const [yeuCauLaiYeuCauThanhToanVisible, setYeuCauLaiYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  return (
    <DaHoanPhiContext.Provider
      value={{
        yeuCauLaiYeuCauThanhToanVisible,
        setYeuCauLaiYeuCauThanhToanVisible,
        selectedIds,
        setSelectedIds,
      }}
    >
      {children}
    </DaHoanPhiContext.Provider>
  );
};
