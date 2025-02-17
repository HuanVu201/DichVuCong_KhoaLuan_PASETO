import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const TruongHopThuTucContext = createContext<ITruongHopThuTucContext | null>(
  null
);

export interface ITruongHopThuTucContext {
  truongHopThuTucId: string | undefined;
  setTruongHopThuTucId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  truongHopThuTucModalVisible: boolean;
  setTruongHopThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  eFormModalVisible: boolean;
  setEFormModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  ngayLamViecNgayModalVisible: boolean;
  setNgayLamViecNgayModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  eFormModalKetQuaVisible: boolean;
  setEFormModalKetQuaVisible: React.Dispatch<React.SetStateAction<boolean>>;


  flowModalVisible: boolean;
  setFlowModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  addNodeModalVisible: boolean;
  setAddNodeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  editStartModalVisible: boolean;
  setEditStartModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  edgeId: string | undefined;
  setEdgeId: React.Dispatch<React.SetStateAction<string | undefined>>;
  edgeLabel: string | undefined;
  setEdgeLabel: React.Dispatch<React.SetStateAction<string | undefined>>;
  changeEdgeModalVisible: boolean;
  setChangeEdgeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  quyTrinhId: string | undefined;
  setQuyTrinhId: React.Dispatch<React.SetStateAction<string | undefined>>;

  selectedDonViThucHienRieng: ICoCauToChuc[];
  setSelectedDonViThucHienRieng: React.Dispatch<
    React.SetStateAction<ICoCauToChuc[]>
  >;


  selectDonViThucHienRiengModalVisible: boolean;
  setSelectDonViThucHienRiengModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  
  confirmCopyTHTTVisible: boolean;
  setConfirmCopyTHTTVisible: React.Dispatch<React.SetStateAction<boolean>>;
  
  confirmCopyTPTTVisible: boolean;
  setConfirmCopyTPTTVisible: React.Dispatch<React.SetStateAction<boolean>>;
 
  maTHTTVisible:  string | undefined;
  setMaTHTTVisible: React.Dispatch<
  React.SetStateAction<string | undefined>>;

  confirmDeleteTHTTVisible:  boolean;
  setConfirmDeleteTHTTVisible: React.Dispatch<React.SetStateAction<boolean>>;

}

export const useTruongHopThuTucContext = () => {
  const context = useContext(TruongHopThuTucContext);
  if (!context)
    throw new Error(
      "TruongHopThuTucContext must be used inside TruongHopThuTucContext.Provider"
    );
  return context;
};

export const TruongHopThuTucProvider = ({ children }: IWithChildren) => {
  const [truongHopThuTucId, setTruongHopThuTucId] = useState<string>();
  const [truongHopThuTucModalVisible, setTruongHopThuTucModalVisible] =
    useState<boolean>(false);
  const [eFormModalVisible, setEFormModalVisible] = useState<boolean>(false);
  const [ngayLamViecNgayModalVisible, setNgayLamViecNgayModalVisible] = useState<boolean>(false);
  const [eFormModalKetQuaVisible, setEFormModalKetQuaVisible] = useState<boolean>(false);
  const [flowModalVisible, setFlowModalVisible] = useState<boolean>(false);
  const [addNodeModalVisible, setAddNodeModalVisible] =
    useState<boolean>(false);
  const [editStartModalVisible, setEditStartModalVisible] =
    useState<boolean>(false);
  const [edgeId, setEdgeId] = useState<string>();
  const [edgeLabel, setEdgeLabel] = useState<string>();
  const [changeEdgeModalVisible, setChangeEdgeModalVisible] =
    useState<boolean>(false);
  const [quyTrinhId, setQuyTrinhId] = useState<string>();
  const [selectedDonViThucHienRieng, setSelectedDonViThucHienRieng] = useState<
    ICoCauToChuc[]
  >([]);
  const [confirmCopyTHTTVisible, setConfirmCopyTHTTVisible] = useState<boolean>(false);
  const [confirmCopyTPTTVisible, setConfirmCopyTPTTVisible] = useState<boolean>(false);
  const [maTHTTVisible, setMaTHTTVisible] = useState<string>();
  const [confirmDeleteTHTTVisible, setConfirmDeleteTHTTVisible] = useState<boolean>(false);
  const [
    selectDonViThucHienRiengModalVisible,
    setSelectDonViThucHienRiengModalVisible,
  ] = useState<boolean>(false);
  return (
    <TruongHopThuTucContext.Provider
      value={{
        ngayLamViecNgayModalVisible,
        setNgayLamViecNgayModalVisible,
        editStartModalVisible,
        setEditStartModalVisible,
        eFormModalKetQuaVisible,
        setEFormModalKetQuaVisible,
        truongHopThuTucId,
        setTruongHopThuTucId,
        confirmCopyTHTTVisible,
        setConfirmCopyTHTTVisible,
        confirmCopyTPTTVisible,
        setConfirmCopyTPTTVisible,
        maTHTTVisible,
        setMaTHTTVisible,
        confirmDeleteTHTTVisible,
        setConfirmDeleteTHTTVisible,
        truongHopThuTucModalVisible,
        setTruongHopThuTucModalVisible,
        eFormModalVisible,
        setEFormModalVisible,
        flowModalVisible,
        setFlowModalVisible,
        addNodeModalVisible,
        setAddNodeModalVisible,
        edgeId,
        setEdgeId,
        edgeLabel,
        setEdgeLabel,
        changeEdgeModalVisible,
        setChangeEdgeModalVisible,
        quyTrinhId,
        setQuyTrinhId,
        selectedDonViThucHienRieng,
        setSelectedDonViThucHienRieng,
        selectDonViThucHienRiengModalVisible,
        setSelectDonViThucHienRiengModalVisible,
      }}
    >
      {children}
    </TruongHopThuTucContext.Provider>
  );
};
