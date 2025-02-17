import { ISearchBaoCaoThuTuc } from "@/features/baocaotonghop/model";
import { ISearchHoSoTheoBaoCaoTongHopParams } from "@/features/hoso/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoTheoBaoCaoTongHopContext =
  createContext<IHoSoTheoBaoCaoTongHopContext | null>(null);

export interface IHoSoTheoBaoCaoTongHopContext {
  searchParams: ISearchHoSoTheoBaoCaoTongHopParams;
  setSearchParams: React.Dispatch<
    React.SetStateAction<ISearchHoSoTheoBaoCaoTongHopParams>
  >;
  searchThongKeHoSoTiepNhan: ISearchHoSoTheoBaoCaoTongHopParams;
  setsearchThongKeHoSoTiepNhan: React.Dispatch<
    React.SetStateAction<ISearchHoSoTheoBaoCaoTongHopParams>
  >;
  searchThongKeTheoDoiTrangThaiHS: ISearchHoSoTheoBaoCaoTongHopParams;
  setsearchThongKeTheoDoiTrangThaiHS: React.Dispatch<
    React.SetStateAction<ISearchHoSoTheoBaoCaoTongHopParams>
  >;
  hoSoTheoBaoCaoTongHopModalVisible: boolean;
  setHoSoTheoBaoCaoTongHopModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  hoSoTiepNhanBuuChinhModalVisible: boolean;
  setHoSoTiepNhanBuuChinhModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  thongKeTheoDoiTrangThaiHoSoModalVisible: boolean;
  setThongKeTheoDoiTrangThaiHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  thongKeHoSoTrongNgayModalVisible: boolean;
  setThongKeHoSoTrongNgayModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  theoDoiHoSoKhongDuocTiepNhanModalVisible: boolean;
  setTheoDoiHoSoKhongDuocTiepNhanModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  thongKeHSLTModalVisible: boolean;
  setThongKeHSLTModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  searchThongKeHoSoLienThong: ISearchHoSoTheoBaoCaoTongHopParams;
  setsearchThongKeHoSoLienThong: React.Dispatch<
    React.SetStateAction<ISearchHoSoTheoBaoCaoTongHopParams>
  >;
  searchThongKeHoSoTrongNgay : ISearchHoSoTheoBaoCaoTongHopParams;
  setSearchThongKeHoSoTrongNgay : React.Dispatch<
    React.SetStateAction<ISearchHoSoTheoBaoCaoTongHopParams>
  >;
  searchTheoDoiHoSoKhongDuocTiepNhan : ISearchHoSoTheoBaoCaoTongHopParams;
  setSearchTheoDoiHoSoKhongDuocTiepNhan : React.Dispatch<
    React.SetStateAction<ISearchHoSoTheoBaoCaoTongHopParams>
  >;
}

export const useHoSoTheoBaoCaoTongHopContext = () => {
  const context = useContext(HoSoTheoBaoCaoTongHopContext);
  if (!context)
    throw new Error(
      "HoSoTheoBaoCaoTongHopContext must be used inside HoSoTheoBaoCaoTongHopContext.Provider"
    );
  return context;
};

export const HoSoTheoBaoCaoTongHopProvider = ({ children }: IWithChildren) => {
  const [
    hoSoTheoBaoCaoTongHopModalVisible,
    setHoSoTheoBaoCaoTongHopModalVisible,
  ] = useState<boolean>(false);
  const [
    hoSoTiepNhanBuuChinhModalVisible,
    setHoSoTiepNhanBuuChinhModalVisible,
  ] = useState<boolean>(false);
  const [
    thongKeTheoDoiTrangThaiHoSoModalVisible,
    setThongKeTheoDoiTrangThaiHoSoModalVisible,
  ] = useState<boolean>(false);
  const [
    thongKeHoSoTrongNgayModalVisible,
    setThongKeHoSoTrongNgayModalVisible,
  ] = useState<boolean>(false);
  const [
    theoDoiHoSoKhongDuocTiepNhanModalVisible,
    setTheoDoiHoSoKhongDuocTiepNhanModalVisible,
  ] = useState<boolean>(false);
  const [
    thongKeHSLTModalVisible,
    setThongKeHSLTModalVisible,
  ] = useState<boolean>(false);
  const [searchParams, setSearchParams] =
    useState<ISearchHoSoTheoBaoCaoTongHopParams>({
      pageNumber: 1,
      pageSize: 5000,
    });
  const [searchThongKeHoSoTiepNhan, setsearchThongKeHoSoTiepNhan] =
    useState<ISearchHoSoTheoBaoCaoTongHopParams>({
      pageNumber: 1,
      pageSize: 5000,
    });
    const [searchThongKeTheoDoiTrangThaiHS, setsearchThongKeTheoDoiTrangThaiHS] =
    useState<ISearchHoSoTheoBaoCaoTongHopParams>({
      pageNumber: 1,
      pageSize: 20,
    });
    const [searchThongKeHoSoLienThong, setsearchThongKeHoSoLienThong] =
    useState<ISearchHoSoTheoBaoCaoTongHopParams>({
      pageNumber: 1,
      pageSize: 5000,
    });
    const [searchThongKeHoSoTrongNgay, setSearchThongKeHoSoTrongNgay] =
    useState<ISearchHoSoTheoBaoCaoTongHopParams>({
      pageNumber: 1,
      pageSize: 5000,
    });
    const [searchTheoDoiHoSoKhongDuocTiepNhan, setSearchTheoDoiHoSoKhongDuocTiepNhan] =
    useState<ISearchHoSoTheoBaoCaoTongHopParams>({
      pageNumber: 1,
      pageSize: 5000,
    });
  // thêm các hàm search cho các tabs ở đây
  return (
    <HoSoTheoBaoCaoTongHopContext.Provider
      value={{
        searchTheoDoiHoSoKhongDuocTiepNhan,
        setSearchTheoDoiHoSoKhongDuocTiepNhan,
        theoDoiHoSoKhongDuocTiepNhanModalVisible,
        setTheoDoiHoSoKhongDuocTiepNhanModalVisible,
        searchThongKeHoSoTrongNgay,
        setSearchThongKeHoSoTrongNgay,
        thongKeHoSoTrongNgayModalVisible,
        setThongKeHoSoTrongNgayModalVisible,
        searchThongKeTheoDoiTrangThaiHS,
        setsearchThongKeTheoDoiTrangThaiHS,
        thongKeTheoDoiTrangThaiHoSoModalVisible,
        setThongKeTheoDoiTrangThaiHoSoModalVisible,
        searchThongKeHoSoLienThong,
        setsearchThongKeHoSoLienThong,
        thongKeHSLTModalVisible,
        setThongKeHSLTModalVisible,
        hoSoTiepNhanBuuChinhModalVisible,
        setHoSoTiepNhanBuuChinhModalVisible,
        searchParams,
        searchThongKeHoSoTiepNhan,
        setsearchThongKeHoSoTiepNhan,
        setSearchParams,
        hoSoTheoBaoCaoTongHopModalVisible,
        setHoSoTheoBaoCaoTongHopModalVisible,
      }}
    >
      {children}
    </HoSoTheoBaoCaoTongHopContext.Provider>
  );
};
