import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HuongDanNopHoSoContext = createContext<IHuongDanNopHoSoContext | null>(
  null
);

export interface IHuongDanNopHoSoContext {
  selectedHuongDanNopHoSoId: string | undefined;
  setSelectedHuongDanNopHoSoId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  huongDanNopHoSoModalVisible: boolean;
  setHuongDanNopHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  xuatPhieuHuongDanNopHoSoModalVisible: boolean;
  setXuatPhieuHuongDanNopHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  xuatPhieuTuChoiModalVisible: boolean;
  setXuatPhieuTuChoiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useHuongDanNopHoSoContext = () => {
  const context = useContext(HuongDanNopHoSoContext);
  if (!context)
    throw new Error(
      "HuongDanNopHoSoContext must be used inside HuongDanNopHoSoContext.Provider"
    );
  return context;
};

export const HuongDanNopHoSoProvider = ({ children }: IWithChildren) => {
  const [selectedHuongDanNopHoSoId, setSelectedHuongDanNopHoSoId] =
    useState<string>();
  const [huongDanNopHoSoModalVisible, setHuongDanNopHoSoModalVisible] =
    useState<boolean>(false);
  const [xuatPhieuHuongDanNopHoSoModalVisible, setXuatPhieuHuongDanNopHoSoModalVisible] =
    useState<boolean>(false);
  const [xuatPhieuTuChoiModalVisible, setXuatPhieuTuChoiModalVisible] =
    useState<boolean>(false);
  // thêm các hàm search cho các tabs ở đây
  return (
    <HuongDanNopHoSoContext.Provider
      value={{
        selectedHuongDanNopHoSoId,
        setSelectedHuongDanNopHoSoId,
        huongDanNopHoSoModalVisible,
        setHuongDanNopHoSoModalVisible,
        xuatPhieuHuongDanNopHoSoModalVisible, setXuatPhieuHuongDanNopHoSoModalVisible,
        xuatPhieuTuChoiModalVisible, setXuatPhieuTuChoiModalVisible
      }}
    >
      {children}
    </HuongDanNopHoSoContext.Provider>
  );
};
