import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HuyThuPhiContext = createContext<IHuyThuPhiContext | null>(null);

export interface IHuyThuPhiContext {
  viewYeuCauThanhToanVisible: boolean;
  setViewYeuCauThanhToanVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cancelYeuCauThanhToanVisible: boolean;
  setCancelYeuCauThanhToanVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  refundYeuCauThanhToanVisible: boolean;
  setRefundYeuCauThanhToanVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  payYeuCauThanhToanVisible: boolean;
  setPayYeuCauThanhToanVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIds: React.Key[];
  setSelectedIds: React.Dispatch<React.SetStateAction<React.Key[]>>;
}

export const useHuyThuPhiContext = () => {
  const context = useContext(HuyThuPhiContext);
  if (!context)
    throw new Error(
      "HuyThuPhiContext must be used inside HuyThuPhiContext.Provider"
    );
  return context;
};

export const HuyThuPhiProvider = ({ children }: IWithChildren) => {
  const [viewYeuCauThanhToanVisible, setViewYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [cancelYeuCauThanhToanVisible, setCancelYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [refundYeuCauThanhToanVisible, setRefundYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [payYeuCauThanhToanVisible, setPayYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  return (
    <HuyThuPhiContext.Provider
      value={{
        viewYeuCauThanhToanVisible,
        setViewYeuCauThanhToanVisible,
        selectedIds,
        setSelectedIds,
        cancelYeuCauThanhToanVisible,
        setCancelYeuCauThanhToanVisible,
        payYeuCauThanhToanVisible,
        setPayYeuCauThanhToanVisible,
        refundYeuCauThanhToanVisible,
        setRefundYeuCauThanhToanVisible,
      }}
    >
      {children}
    </HuyThuPhiContext.Provider>
  );
};
