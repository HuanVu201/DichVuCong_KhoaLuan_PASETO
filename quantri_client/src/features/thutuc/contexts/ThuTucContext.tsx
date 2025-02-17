import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import {
  INguoiTiepNhanThuTuc,
  ISearchThuTucTheoBaoCaoTongHop,
  IThuTuc,
} from "../models";
import { ISearchDonVi } from "@/features/donvi/models";

const ThuTucContext = createContext<IThuTucContext | null>(null);

export interface IThuTucContext {
  thuTucId: string | undefined;
  setThuTucId: React.Dispatch<React.SetStateAction<string | undefined>>;
  maThuTuc: string | undefined;
  setMaThuTuc: React.Dispatch<React.SetStateAction<string | undefined>>;

  tenThuTuc: string | undefined;
  setTenThuTuc: React.Dispatch<React.SetStateAction<string | undefined>>;

  thuTucModalVisible: boolean;
  setThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  dongBoThuTucModalVisible: boolean;
  setDongBoThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  phiLePhiModalVisible: boolean;
  setPhiLePhiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  ketQuaThuTucModalVisible: boolean;
  setKetQuaThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  addCanBoTiepNhanModalVisible: boolean;
  setAddCanBoTiepNhanModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  updateMucDoModalVisible: boolean;
  setUpdateMucDoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  truongHopThuTucModalVisible: boolean;
  setTruongHopThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  donViThuTucModalVisible: boolean;
  setDonViThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  thuTucTheoBaoCaoTongHopModalVisible: boolean;
  setThuTucTheoBaoCaoTongHopModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  chonDonViThuTucModelVisible: boolean;
  setChonDonViThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  selectedThuTucs: IThuTuc[];
  setSelectedThuTucs: React.Dispatch<React.SetStateAction<IThuTuc[]>>;

  selectedNguoiTiepNhanThuTucs: INguoiTiepNhanThuTuc[];
  setSelectedNguoiTiepNhanThuTucs: React.Dispatch<
    React.SetStateAction<INguoiTiepNhanThuTuc[]>
  >;

  searchDonViParams: ISearchDonVi;
  setSearchDonViParams: React.Dispatch<React.SetStateAction<ISearchDonVi>>;

  searchThuTucTheoBaoCaoTongHopParams: ISearchThuTucTheoBaoCaoTongHop;
  setSearchThuTucTheoBaoCaoTongHopParams: React.Dispatch<
    React.SetStateAction<ISearchThuTucTheoBaoCaoTongHop>
  >;
}

export const useThuTucContext = () => {
  const context = useContext(ThuTucContext);
  if (!context)
    throw new Error("ThuTucContext must be used inside ThuTucContext.Provider");
  return context;
};

export const ThuTucProvider = ({ children }: IWithChildren) => {
  const [thuTucId, setThuTucId] = useState<string>();
  const [maThuTuc, setMaThuTuc] = useState<string>();
  const [tenThuTuc, setTenThuTuc] = useState<string>();
  const [thuTucModalVisible, setThuTucModalVisible] = useState<boolean>(false);
  const [dongBoThuTucModalVisible, setDongBoThuTucModalVisible] = useState<boolean>(false);
  const [phiLePhiModalVisible, setPhiLePhiModalVisible] =
    useState<boolean>(false);
  const [truongHopThuTucModalVisible, setTruongHopThuTucModalVisible] =
    useState<boolean>(false);
  const [donViThuTucModalVisible, setDonViThuTucModalVisible] =
    useState<boolean>(false);
  const [addCanBoTiepNhanModalVisible, setAddCanBoTiepNhanModalVisible] =
    useState<boolean>(false);
  const [updateMucDoModalVisible, setUpdateMucDoModalVisible] =
    useState<boolean>(false);
  const [chonDonViThuTucModelVisible, setChonDonViThuTucModalVisible] =
    useState<boolean>(false);
  const [ketQuaThuTucModalVisible, setKetQuaThuTucModalVisible] =
    useState<boolean>(false);
  const [selectedThuTucs, setSelectedThuTucs] = useState<IThuTuc[]>([]);
  const [selectedNguoiTiepNhanThuTucs, setSelectedNguoiTiepNhanThuTucs] =
    useState<INguoiTiepNhanThuTuc[]>([]);
  const [
    thuTucTheoBaoCaoTongHopModalVisible,
    setThuTucTheoBaoCaoTongHopModalVisible,
  ] = useState<boolean>(false);
  const [searchDonViParams, setSearchDonViParams] = useState<ISearchDonVi>({
    pageNumber: 1,
    pageSize: 50,
    type: "don-vi",
  });
  const [
    searchThuTucTheoBaoCaoTongHopParams,
    setSearchThuTucTheoBaoCaoTongHopParams,
  ] = useState<ISearchThuTucTheoBaoCaoTongHop>({
    pageNumber: 1,
    pageSize: 20,
  });
  return (
    <ThuTucContext.Provider
      value={{
        maThuTuc,
        setMaThuTuc,
        dongBoThuTucModalVisible,
        setDongBoThuTucModalVisible,
        ketQuaThuTucModalVisible,
        setKetQuaThuTucModalVisible,
        thuTucId,
        setThuTucId,
        tenThuTuc,
        setTenThuTuc,
        thuTucModalVisible,
        setThuTucModalVisible,
        truongHopThuTucModalVisible,
        setTruongHopThuTucModalVisible,
        phiLePhiModalVisible,
        setPhiLePhiModalVisible,
        donViThuTucModalVisible,
        setDonViThuTucModalVisible,
        chonDonViThuTucModelVisible,
        setChonDonViThuTucModalVisible,
        selectedThuTucs,
        setSelectedThuTucs,
        searchDonViParams,
        setSearchDonViParams,
        addCanBoTiepNhanModalVisible,
        setAddCanBoTiepNhanModalVisible,
        selectedNguoiTiepNhanThuTucs,
        setSelectedNguoiTiepNhanThuTucs,
        updateMucDoModalVisible,
        setUpdateMucDoModalVisible,
        searchThuTucTheoBaoCaoTongHopParams,
        setSearchThuTucTheoBaoCaoTongHopParams,
        thuTucTheoBaoCaoTongHopModalVisible,
        setThuTucTheoBaoCaoTongHopModalVisible,
      }}
    >
      {children}
    </ThuTucContext.Provider>
  );
};
