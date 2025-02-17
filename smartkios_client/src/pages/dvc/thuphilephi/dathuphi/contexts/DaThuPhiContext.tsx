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

  viewBienLaiThanhToanVisible: boolean;
  setViewBienLaiThanhToanVisible: React.Dispatch<React.SetStateAction<boolean>>;

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
  const [searchBienLaiThanhToanParams, setSearchBienLaiThanhToanParams] =
    useState<IGetBienLaiThanhToan>({
      loaiPhi: "",
      idYeuCauThanhToan: "",
    });
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
      }}
    >
      {children}
    </DaThuPhiContext.Provider>
  );
};
