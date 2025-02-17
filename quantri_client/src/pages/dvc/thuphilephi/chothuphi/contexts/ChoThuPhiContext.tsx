import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IGetBienLaiThanhToan } from "@/pages/dvc/bienlaithanhtoan/models/IBienLaiThanhToan";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ChoThuPhiContext = createContext<IChoThuPhiContext | null>(null);

export interface IChoThuPhiContext {
  viewBienLaiPaymentPlatform: boolean;
  setViewBienLaiPaymentPlatform: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  viewYeuCauThanhToanVisible: boolean;
  setViewYeuCauThanhToanVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cancelYeuCauThanhToanVisible: boolean;
  setCancelYeuCauThanhToanVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  payYeuCauThanhToanVisible: boolean;
  setPayYeuCauThanhToanVisible: React.Dispatch<React.SetStateAction<boolean>>;
  payNhieuYeuCauThanhToanVisible: boolean;
  setPayNhieuYeuCauThanhToansVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIds: React.Key[];
  setSelectedIds: React.Dispatch<React.SetStateAction<React.Key[]>>;
  yeuCauThuSauVisible: boolean;
  setPayYeuCauThuSauVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editYeuCauThanhToanVisible: boolean;
  setEditYeuCauThanhToanVisible: React.Dispatch<React.SetStateAction<boolean>>;
  viewBienLaiThanhToanVisible: boolean;
  setViewBienLaiThanhToanVisible: React.Dispatch<React.SetStateAction<boolean>>;
  searchBienLaiThanhToanParams: IGetBienLaiThanhToan;
  setSearchBienLaiThanhToanParams: React.Dispatch<
    React.SetStateAction<IGetBienLaiThanhToan>
  >;
  selectedMaGiaoDich: string | undefined;
  setSelectedMaGiaoDich: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export const useChoThuPhiContext = () => {
  const context = useContext(ChoThuPhiContext);
  if (!context)
    throw new Error(
      "ChoThuPhiContext must be used inside ChoThuPhiContext.Provider"
    );
  return context;
};

export const ChoThuPhiProvider = ({ children }: IWithChildren) => {
  const [viewYeuCauThanhToanVisible, setViewYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [cancelYeuCauThanhToanVisible, setCancelYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [viewBienLaiThanhToanVisible, setViewBienLaiThanhToanVisible] =
    useState<boolean>(false);

  const [payYeuCauThanhToanVisible, setPayYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [payNhieuYeuCauThanhToanVisible, setPayNhieuYeuCauThanhToansVisible] =
    useState<boolean>(false);
  const [editYeuCauThanhToanVisible, setEditYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [yeuCauThuSauVisible, setPayYeuCauThuSauVisible] =
    useState<boolean>(false);
  const [selectedMaGiaoDich, setSelectedMaGiaoDich] = useState<string | undefined>();
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  const [searchBienLaiThanhToanParams, setSearchBienLaiThanhToanParams] =
    useState<IGetBienLaiThanhToan>({
      loaiPhi: "",
      idYeuCauThanhToan: "",
    });
  const [viewBienLaiPaymentPlatform, setViewBienLaiPaymentPlatform] =
    useState<boolean>(false);
  return (
    <ChoThuPhiContext.Provider
      value={{
        viewYeuCauThanhToanVisible,
        setViewYeuCauThanhToanVisible,
        selectedIds,
        setSelectedIds,
        cancelYeuCauThanhToanVisible,
        setCancelYeuCauThanhToanVisible,
        payYeuCauThanhToanVisible,
        setPayYeuCauThanhToanVisible,
        yeuCauThuSauVisible,
        setPayYeuCauThuSauVisible,
        editYeuCauThanhToanVisible,
        setEditYeuCauThanhToanVisible,
        payNhieuYeuCauThanhToanVisible,
        setPayNhieuYeuCauThanhToansVisible,
        viewBienLaiThanhToanVisible, setViewBienLaiThanhToanVisible,
        searchBienLaiThanhToanParams, setSearchBienLaiThanhToanParams,
        selectedMaGiaoDich,
        setSelectedMaGiaoDich,
        viewBienLaiPaymentPlatform,
        setViewBienLaiPaymentPlatform
      }}
    >
      {children}
    </ChoThuPhiContext.Provider>
  );
};
