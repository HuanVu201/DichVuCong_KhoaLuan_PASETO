import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IGetBienLaiThanhToan } from "@/pages/dvc/bienlaithanhtoan/models/IBienLaiThanhToan";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DaThuPhiContext = createContext<IDaThuPhiContext | null>(null);

export interface IDaThuPhiContext {
  viewYeuCauThanhToanVisible: boolean;
  setViewYeuCauThanhToanVisible: React.Dispatch<React.SetStateAction<boolean>>;

  cancelYeuCauThanhToanVisible: boolean;
  setCancelYeuCauThanhToanVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  payYeuCauThanhToanVisible: boolean;
  setPayYeuCauThanhToanVisible: React.Dispatch<React.SetStateAction<boolean>>;
  reInitBienLaiPhiVisible: boolean;
  setReInitBienLaiPhiVisible: React.Dispatch<React.SetStateAction<boolean>>;
  reInitBienLaiLePhiVisible: boolean;
  setReInitBienLaiLePhiVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updateBienLaiPhiVisible: boolean;
  setUpdateBienLaiPhiVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updateBienLaiLePhiVisible: boolean;
  setUpdateBienLaiLePhiVisible: React.Dispatch<React.SetStateAction<boolean>>;
  viewBienLaiThanhToanVisible: boolean;
  setViewBienLaiThanhToanVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refundYeuCauThanhToanVisible: boolean;
  setRefundYeuCauThanhToanVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  viewBienLaiPaymentPlatform: boolean;
  setViewBienLaiPaymentPlatform: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  selectedMaGiaoDich: string | undefined;
  setSelectedMaGiaoDich: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  searchBienLaiThanhToanParams: IGetBienLaiThanhToan;
  setSearchBienLaiThanhToanParams: React.Dispatch<
    React.SetStateAction<IGetBienLaiThanhToan>
  >;
  selectedIds: React.Key[];
  setSelectedIds: React.Dispatch<React.SetStateAction<React.Key[]>>;
}

export const useDaThuPhiContext = () => {
  const context = useContext(DaThuPhiContext);
  if (!context)
    throw new Error(
      "DaThuPhiContext must be used inside DaThuPhiContext.Provider"
    );
  return context;
};

export const DaThuPhiProvider = ({ children }: IWithChildren) => {
  const [viewYeuCauThanhToanVisible, setViewYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [cancelYeuCauThanhToanVisible, setCancelYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [payYeuCauThanhToanVisible, setPayYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [viewBienLaiThanhToanVisible, setViewBienLaiThanhToanVisible] =
    useState<boolean>(false);

  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  const [selectedMaGiaoDich, setSelectedMaGiaoDich] = useState<string | undefined>();
  const [searchBienLaiThanhToanParams, setSearchBienLaiThanhToanParams] =
    useState<IGetBienLaiThanhToan>({
      loaiPhi: "",
      idYeuCauThanhToan: "",
    });
  const [refundYeuCauThanhToanVisible, setRefundYeuCauThanhToanVisible] =
    useState<boolean>(false);
  const [reInitBienLaiPhiVisible, setReInitBienLaiPhiVisible] =
    useState<boolean>(false);
  const [reInitBienLaiLePhiVisible, setReInitBienLaiLePhiVisible] =
    useState<boolean>(false);
  const [updateBienLaiPhiVisible, setUpdateBienLaiPhiVisible] =
    useState<boolean>(false);
  const [updateBienLaiLePhiVisible, setUpdateBienLaiLePhiVisible] =
    useState<boolean>(false);
  const [viewBienLaiPaymentPlatform, setViewBienLaiPaymentPlatform] =
    useState<boolean>(false);
  return (
    <DaThuPhiContext.Provider
      value={{
        viewYeuCauThanhToanVisible,
        setViewYeuCauThanhToanVisible,
        selectedIds,
        setSelectedIds,
        cancelYeuCauThanhToanVisible,
        setCancelYeuCauThanhToanVisible,
        payYeuCauThanhToanVisible,
        setPayYeuCauThanhToanVisible,
        viewBienLaiThanhToanVisible,
        setViewBienLaiThanhToanVisible,
        searchBienLaiThanhToanParams,
        setSearchBienLaiThanhToanParams,
        refundYeuCauThanhToanVisible,
        setRefundYeuCauThanhToanVisible,
        reInitBienLaiPhiVisible,
        setReInitBienLaiPhiVisible,
        updateBienLaiPhiVisible,
        setUpdateBienLaiPhiVisible,
        updateBienLaiLePhiVisible,
        setUpdateBienLaiLePhiVisible,
        reInitBienLaiLePhiVisible,
        setReInitBienLaiLePhiVisible,
        viewBienLaiPaymentPlatform,
        setViewBienLaiPaymentPlatform,
        selectedMaGiaoDich,
        setSelectedMaGiaoDich,
      }}
    >
      {children}
    </DaThuPhiContext.Provider>
  );
};
