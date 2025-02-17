import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { IHoSo } from "../models";

const ButtonActionContext = createContext<IButtonActionContext | null>(null);

export interface IButtonActionContext {
  selectedHoSos: React.Key[];
  setSelectedHoSos: React.Dispatch<React.SetStateAction<React.Key[]>>;
  selectedHoSoKeyByTHTTs: string[];
  setSelectedHoSoKeyByTHTTs: React.Dispatch<React.SetStateAction<string[]>>;

  selectedHoSo: IHoSo | undefined;
  setSelectedHoSo: React.Dispatch<React.SetStateAction<IHoSo | undefined>>;

  selectedInfoHoSos: IHoSo[] | undefined;
  setSelectedInfoHoSo: React.Dispatch<React.SetStateAction<IHoSo[] | undefined>>;

  chiTietHoSoModalVisible: boolean;
  setChiTietHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  guiLienThongLLTPModalVisible: boolean;
  setGuiLienThongLLTPModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inTiepNhanNhieuHoSoModalVisible: boolean;
  setInTiepNhanNhieuHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  ghiChuViTriHoSoModalVisible: boolean;
  setGhiChuViTriHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  banGiaoKetQuaModalVisible: boolean;
  setBanGiaoKetQuaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  bienNhanKetQuaModalVisible: boolean;
  setBienNhanKetQuaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  traKetQuaNhieuHoSoModalVisible: boolean;
  setTraKetQuaNhieuHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  traKetQuaModalVisible: boolean;
  setTraKetQuaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  traKetQuaHCCHuyenXaModalVisible: boolean;
  setTraKetQuaHCCHuyenXaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  traKetQuaHCCModalVisible: boolean;
  setTraKetQuaHCCModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  traKetQuaVaThuLaiBanGocModalVisible: boolean;
  setTraKetQuaVaThuLaiBanGocModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  danhGiaHoSoModalVisible: boolean;
  setDanhGiaHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  themMoiTiepNhanHoSoModalVisible: boolean;
  setThemMoiTiepNhanHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  chuyenBuocXuLyModalVisible: boolean;
  setChuyenBuocXuLyModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  chuyenBuocXuLyChungThucModalVisible: boolean;
  setChuyenBuocXuLyChungThucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;


  yeuCauThanhToanLLTPModalVisible: boolean;
  setYeuCauThanhToanLLTPModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  suaHoSoModalVisible: boolean;
  setSuaHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  capNhatKetQuaXuLyHoSoModalVisible: boolean;
  setCapNhatKetQuaXuLyHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  capNhatKetQuaXuLyNhieuHoSoModalVisible: boolean;
  setCapNhatKetQuaXuLyNhieuHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  themNguoiTiepNhanHoSoModalVisible: boolean;
  setThemNguoiTiepNhanHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  thayDoiTruongHopXuLyModalVisible: boolean;
  setThayDoiTruongHopXuLyModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  yeuCauThanhToanModalVisible: boolean;
  setYeuCauThanhToanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  yeuCauThanhToanVaXacNhanKqModalVisible: boolean;
  setYeuCauThanhToanVaXacNhanKqModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  xoaHoSoModalVisible: boolean;
  setXoaHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  traLaiBuocTruocModalVisible: boolean;
  setTraLaiBuocTruocModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  chuyenNoiBoModalVisible: boolean;
  setChuyenNoiBoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  ketThucModalVisible: boolean;
  setKetThucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  traKetQuaVaDanhGiaHaiLongModalVisible: boolean;
  setTraKetQuaVaDanhGiaHaiLongModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  danhGiaHaiLongModalVisible: boolean;
  setDanhGiaHaiLongModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  xacNhanKetQuaModalVisible: boolean;
  setXacNhanKetQuaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  xacNhanTraLaiXinRutModalVisible: boolean;
  setXacNhanTraLaiXinRutModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  xacNhanBoSungModalVisible: boolean;
  setXacNhanBoSungModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  chuyenTraKqHCCModalVisible: boolean;
  setChuyenTraKqHCCModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  thuHoiChuyenTraKqModalVisible: boolean;
  setThuHoiChuyenTraKqModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  thuHoiHoSoModalVisible: boolean;
  setThuHoiHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  yeuCauMotCuaBoSungModalVisible: boolean;
  setYeuCauMotCuaBoSungModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  capNhatBoSungHoSoModalVisible: boolean;
  setCapNhatBoSungHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  chuyenBuocNhanhHoSoModalVisible: boolean;
  setChuyenBuocNhanhHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  yeuCauCongDanBoSungHoSoModalVisible: boolean;
  setYeuCauCongDanBoSungHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  tiepNhanHoSoTrucTuyenHoSoModalVisible: boolean;
  setTiepNhanHoSoTrucTuyenModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inPhieuTiepNhanHoSoModalVisible: boolean;
  setInPhieuTiepNhanHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  inPhieuTiepNhanHoSoChungThucModalVisible: boolean;
  setInPhieuTiepNhanHoSoChungThucModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  lienThongHeThongLLTPHoSoModalVisible: boolean;
  setLienThongHeThongLLTPHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  lienThongBTPHoSoModalVisible: boolean;
  setLienThongBTPHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  lienThongDangKyKetHonHoSoModalVisible: boolean;
  setLienThongDangKyKetHonHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inDanhSachHoSoModalVisible: boolean;
  setInDanhSachHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inPhieuHuongDanModalVisible: boolean;
  setInPhieuHuongDanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inHuongDanNopTrucTiepModalVisible: boolean;
  setInHuongDanNopTrucTiepModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inPhieuKiemSoatModalVisible: boolean;
  setInPhieuKiemSoatModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inPhieuTiepNhanChungThucModalVisible: boolean;
  setInPhieuTiepNhanChungThucModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inPhieuTuChoiModalVisible: boolean;
  setInPhieuTuChoiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  tuChoiTiepNhanHoSoTrucTuyenModalVisible: boolean;
  setTuChoiTiepNhanHoSoTrucTuyenModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  traBoSungModalVisible: boolean;
  setTraBoSungModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  hoanThanhBoSungModalVisible: boolean;
  setHoanThanhBoSungModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  traKetQuaChungThucVaDanhGiaHaiLongModalVisible: boolean;
  setTraKetQuaChungThucVaDanhGiaHaiLongModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  khongTiepNhanHoSoBoSungQuaHanModalVisible: boolean;
  setKhongTiepNhanHoSoBoSungQuaHanModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  datLaiHanXuLyModalVisible: boolean;
  setDatLaiHanXuLyModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  datLaiQuyTrinhXuLyModalVisible: boolean;
  setDatLaiQuyTrinhXuLyModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  chonTepTuThanhPhanHoSoVisible: boolean;
  setChonTepTuThanhPhanHoSoVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  adminCapNhatHoSoModalVisible: boolean;
  setAdminCapNhatHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  scanHoSoModalVisible: boolean;
  setScanHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  scanKetQuaModalVisible: boolean;
  setScanKetQuaModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  themMoiHoSoDienTuModalVisible: boolean;
  setThemMoiHoSoDienTuModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  adminCapNhatThanhPhanHoSoModalVisible: boolean;
  setAdminCapNhatThanhPhanHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  chuyenPhiDiaGioiModalVisible: boolean;
  setChuyenPhiDiaGioiModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  tiepNhanHoSoChungThucModalVisible: boolean;
  setTiepNhanHoSoChungThucModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  themMoiHoSoChungThucModalVisible: boolean;
  setThemMoiHoSoChungThucModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  kySoChungThucModalVisible: boolean;
  setKySoChungThucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  capSoModalVisible: boolean;
  setCapSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dongDauModalVisible: boolean;
  setDongDauModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  capSoVaDongDauModalVisible: boolean;
  setCapSoVaDongDauModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  duThaoBoSungHoSoModalVisible: boolean;
  setDuThaoBoSungHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  duThaoTraLaiXinRutHoSoModalVisible: boolean;
  setDuThaoTraLaiXinRutHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  duyetThongQuaDuThaoModalVisible: boolean;
  setDuyetThongQuaDuThaoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  tuChoiDuThaoModalVisible: boolean;
  setTuChoiDuThaoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  yeuCauBCCILayKetQuaModalVisible: boolean;
  setYeuCauBCCILayKetQuaModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  xacNhanVaYeuCauBCCILayKetQuaModalVisible: boolean;
  setXacNhanVaYeuCauBCCILayKetQuaModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  yeuCauThanhToanChungThucModalVisible: boolean;
  setYeuCauThanhToanChungThucModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  ketThucHoSoTBKMModalVisible: boolean;
  setKetThucHoSoTBKMModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  datLaiNhieuHoSoQuaHanModalVisible: boolean;
  setDatLaiNhieuHoSoQuaHanModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  dangKyNhanKetQuaBCCIModalVisible: boolean;
  setDangKyNhanKetQuaBCCIModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  traKetQuaChungThucModalVisible: boolean;
  setTraKetQuaChungThucModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  yeuCauThanhToanNhieuHoSosModalVisible: boolean;
  setYeuCauThanhToanNhieuHoSosModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  selectedDanhSachHoSos: IHoSo[];
  setSelectedDanhSachHoSos: React.Dispatch<React.SetStateAction<IHoSo[]>>;
  duThaoXinLoiHoSoModalVisible: boolean;
  setDuThaoXinLoiHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  thuHoiHoSoDaTraKetQuaModalVisible: boolean;
  setThuHoiHoSoDaTraKetQuaModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  chuyenBuocXuLyNhieuHoSoModalVisible: boolean;
  setChuyenBuocXuLyNhieuHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  thuHoiMaVanDonBuuDienModalVisible: boolean;
  setThuHoiMaVanDonBuuDienModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  yeuCauBCCILayKetQuaWithoutItemCodeModalVisible: boolean;
  setYeuCauBCCILayKetQuaWithoutItemCodeModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  yeuCauBCCILayKetQuaNhieuHoSoModalVisible: boolean;
  setYeuCauBCCILayKetQuaNhieuHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  thuHoiDangKyNhanKqQuaBCCIModalVisible: boolean;
  setThuHoiDangKyNhanKqQuaBCCIModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  traLaiXinRutKhongTrinhKyHoSoModalVisible: boolean;
  setTraLaiXinRutKhongTrinhKyHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  xuatQuaTrinhXuLyHoSoModalVisible: boolean;
  setXuatQuaTrinhXuLyHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  ketThucXuLyNhieuHoSoModalVisible: boolean;
  setKetThucXuLyNhieuHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  themMoiHoSoPhiDiaGioiModalVisible: boolean;
  setThemMoiHoSoPhiDiaGioiModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  traCuuBTPHoSoModalVisible: boolean;
  setTraCuuBTPHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  fakeTuChoiBTPHoSoModalVisible: boolean;
  setFakeTuChoiBTPHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  thuHoiQuyetDinhLLTPModalVisible: boolean;
  setThuHoiQuyetDinhLLTPModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  tiepNhanGuiVBDLISModalVisible: boolean;
  setTiepNhanGuiVBDLISModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  boSungHoSoGuiVBDLISModalVisible: boolean;
  setBoSungHoSoGuiVBDLISModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  guiPhiDiaGioiModalVisible: boolean;
  setGuiPhiDiaGioiModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  thucHienNghiaVuTaiChinhVBDLISModalVisible: boolean;
  setThucHienNghiaVuTaiChinhVBDLISModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  chamSoHoaModal: boolean;
  setChamSoHoaModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  xuatExcelHoSoTheoDoiModal: boolean;
  setXuatExcelHoSoTheoDoiModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}


export const useButtonActionContext = () => {
  const context = useContext(ButtonActionContext);
  if (!context)
    throw new Error(
      "ButtonActionContext must be used inside ButtonActionContext.Provider"
    );
  return context;
};
export const ButtonActionProvider = ({ children }: IWithChildren) => {
  const [
    yeuCauThanhToanChungThucModalVisible,
    setYeuCauThanhToanChungThucModalVisible,
  ] = useState<boolean>(false);
  const [traKetQuaChungThucModalVisible, setTraKetQuaChungThucModalVisible] =
    useState<boolean>(false);
  const [chamSoHoaModal, setChamSoHoaModal] =
    useState<boolean>(false);
  const [
    traLaiXinRutKhongTrinhKyHoSoModalVisible,
    setTraLaiXinRutKhongTrinhKyHoSoModalVisible,
  ] = useState<boolean>(false);
  const [
    duThaoTraLaiXinRutHoSoModalVisible,
    setDuThaoTraLaiXinRutHoSoModalVisible,
  ] = useState<boolean>(false);
  const [
    duyetThongQuaDuThaoModalVisible,
    setDuyetThongQuaDuThaoModalVisible,
  ] = useState<boolean>(false);
  const [
    tuChoiDuThaoModalVisible,
    setTuChoiDuThaoModalVisible,
  ] = useState<boolean>(false);
  const [duThaoBoSungHoSoModalVisible, setDuThaoBoSungHoSoModalVisible] =
    useState<boolean>(false);
  const [ketThucHoSoTBKMModalVisible, setKetThucHoSoTBKMModalVisible] =
    useState<boolean>(false);
  const [scanHoSoModalVisible, setScanHoSoModalVisible] =
    useState<boolean>(false);
  const [scanKetQuaModalVisible, setScanKetQuaModalVisible] =
    useState<boolean>(false);
  const [themMoiHoSoDienTuModalVisible, setThemMoiHoSoDienTuModalVisible] =
    useState<boolean>(false);
  const [datLaiNhieuHoSoQuaHanModalVisible, setDatLaiNhieuHoSoQuaHanModalVisible] =
    useState<boolean>(false);
  const [kySoChungThucModalVisible, setKySoChungThucModalVisible] =
    useState<boolean>(false);
  const [adminCapNhatThanhPhanHoSoModalVisible, setAdminCapNhatThanhPhanHoSoModalVisible] =
    useState<boolean>(false);
  const [capSoModalVisible, setCapSoModalVisible] = useState<boolean>(false);
  const [dongDauModalVisible, setDongDauModalVisible] =
    useState<boolean>(false);
  const [capSoVaDongDauModalVisible, setCapSoVaDongDauModalVisible] =
    useState<boolean>(false);
  const [themMoiTiepNhanHoSoModalVisible, setThemMoiTiepNhanHoSoModalVisible] =
    useState<boolean>(false);
  const [
    thuHoiHoSoDaTraKetQuaModalVisible,
    setThuHoiHoSoDaTraKetQuaModalVisible,
  ] = useState<boolean>(false);
  const [
    themMoiHoSoChungThucModalVisible,
    setThemMoiHoSoChungThucModalVisible,
  ] = useState<boolean>(false);
  const [
    tiepNhanHoSoChungThucModalVisible,
    setTiepNhanHoSoChungThucModalVisible,
  ] = useState<boolean>(false);
  const [chonTepTuThanhPhanHoSoVisible, setChonTepTuThanhPhanHoSoVisible] =
    useState<boolean>(false);

  const [chuyenBuocXuLyModalVisible, setChuyenBuocXuLyModalVisible] =
    useState<boolean>(false);
  const [suaHoSoModalVisible, setSuaHoSoModalVisible] =
    useState<boolean>(false);
  const [
    capNhatKetQuaXuLyHoSoModalVisible,
    setCapNhatKetQuaXuLyHoSoModalVisible,
  ] = useState<boolean>(false);
  const [
    capNhatKetQuaXuLyNhieuHoSoModalVisible,
    setCapNhatKetQuaXuLyNhieuHoSoModalVisible,
  ] = useState<boolean>(false);
  const [chiTietHoSoModalVisible, setChiTietHoSoModalVisible] =
    useState<boolean>(false);
  const [inTiepNhanNhieuHoSoModalVisible, setInTiepNhanNhieuHoSoModalVisible] =
    useState<boolean>(false);
  const [traKetQuaNhieuHoSoModalVisible, setTraKetQuaNhieuHoSoModalVisible] =
    useState<boolean>(false);
  const [ghiChuViTriHoSoModalVisible, setGhiChuViTriHoSoModalVisible] =
    useState<boolean>(false);
  const [banGiaoKetQuaModalVisible, setBanGiaoKetQuaModalVisible] =
    useState<boolean>(false);
  const [bienNhanKetQuaModalVisible, setBienNhanKetQuaModalVisible] =
    useState<boolean>(false);
  const [traKetQuaHCCHuyenXaModalVisible, setTraKetQuaHCCHuyenXaModalVisible] =
    useState<boolean>(false);
  const [traKetQuaHCCModalVisible, setTraKetQuaHCCModalVisible] =
    useState<boolean>(false);
  const [
    traKetQuaVaThuLaiBanGocModalVisible,
    setTraKetQuaVaThuLaiBanGocModalVisible,
  ] = useState<boolean>(false);
  const [danhGiaHoSoModalVisible, setDanhGiaHoSoModalVisible] =
    useState<boolean>(false);
  const [
    themNguoiTiepNhanHoSoModalVisible,
    setThemNguoiTiepNhanHoSoModalVisible,
  ] = useState<boolean>(false);
  const [
    thayDoiTruongHopXuLyModalVisible,
    setThayDoiTruongHopXuLyModalVisible,
  ] = useState<boolean>(false);
  const [yeuCauThanhToanModalVisible, setYeuCauThanhToanModalVisible] =
    useState<boolean>(false);
  const [
    yeuCauThanhToanNhieuHoSosModalVisible,
    setYeuCauThanhToanNhieuHoSosModalVisible,
  ] = useState<boolean>(false);
  const [
    yeuCauThanhToanVaXacNhanKqModalVisible,
    setYeuCauThanhToanVaXacNhanKqModalVisible,
  ] = useState<boolean>(false);
  const [xoaHoSoModalVisible, setXoaHoSoModalVisible] =
    useState<boolean>(false);
  const [traLaiBuocTruocModalVisible, setTraLaiBuocTruocModalVisible] =
    useState<boolean>(false);
  const [chuyenNoiBoModalVisible, setChuyenNoiBoModalVisible] =
    useState<boolean>(false);
  const [ketThucModalVisible, setKetThucModalVisible] =
    useState<boolean>(false);
  const [traKetQuaModalVisible, setTraKetQuaModalVisible] =
    useState<boolean>(false);
  const [xacNhanKetQuaModalVisible, setXacNhanKetQuaModalVisible] =
    useState<boolean>(false);
  const [thuHoiHoSoModalVisible, setThuHoiHoSoModalVisible] =
    useState<boolean>(false);
  const [yeuCauMotCuaBoSungModalVisible, setYeuCauMotCuaBoSungModalVisible] =
    useState<boolean>(false);
  const [capNhatBoSungHoSoModalVisible, setCapNhatBoSungHoSoModalVisible] =
    useState<boolean>(false);
  const [chuyenBuocNhanhHoSoModalVisible, setChuyenBuocNhanhHoSoModalVisible] =
    useState<boolean>(false);
  const [
    yeuCauCongDanBoSungHoSoModalVisible,
    setYeuCauCongDanBoSungHoSoModalVisible,
  ] = useState<boolean>(false);
  const [
    tiepNhanHoSoTrucTuyenHoSoModalVisible,
    setTiepNhanHoSoTrucTuyenModalVisible,
  ] = useState<boolean>(false);
  const [inPhieuTiepNhanHoSoModalVisible, setInPhieuTiepNhanHoSoModalVisible] =
    useState<boolean>(false);
  const [inDanhSachHoSoModalVisible, setInDanhSachHoSoModalVisible] =
    useState<boolean>(false);
  const [inPhieuHuongDanModalVisible, setInPhieuHuongDanModalVisible] =
    useState<boolean>(false);
  const [inHuongDanNopTrucTiepModalVisible, setInHuongDanNopTrucTiepModalVisible] =
    useState<boolean>(false);
  const [inPhieuKiemSoatModalVisible, setInPhieuKiemSoatModalVisible] =
    useState<boolean>(false);
  const [
    inPhieuTiepNhanChungThucModalVisible,
    setInPhieuTiepNhanChungThucModalVisible,
  ] = useState<boolean>(false);
  const [inPhieuTuChoiModalVisible, setInPhieuTuChoiModalVisible] =
    useState<boolean>(false);
  const [
    tuChoiTiepNhanHoSoTrucTuyenModalVisible,
    setTuChoiTiepNhanHoSoTrucTuyenModalVisible,
  ] = useState<boolean>(false);
  const [
    traKetQuaVaDanhGiaHaiLongModalVisible,
    setTraKetQuaVaDanhGiaHaiLongModalVisible,
  ] = useState<boolean>(false);
  const [danhGiaHaiLongModalVisible, setDanhGiaHaiLongModalVisible] =
    useState<boolean>(false);
  const [
    traKetQuaChungThucVaDanhGiaHaiLongModalVisible,
    setTraKetQuaChungThucVaDanhGiaHaiLongModalVisible,
  ] = useState<boolean>(false);
  const [traBoSungModalVisible, setTraBoSungModalVisible] =
    useState<boolean>(false);
  const [datLaiHanXuLyModalVisible, setDatLaiHanXuLyModalVisible] =
    useState<boolean>(false);
  const [selectedHoSos, setSelectedHoSos] = useState<React.Key[]>([]);
  const [selectedHoSoKeyByTHTTs, setSelectedHoSoKeyByTHTTs] = useState<string[]>([]);
  const [selectedHoSo, setSelectedHoSo] = useState<IHoSo>();
  const [selectedInfoHoSos, setSelectedInfoHoSo] = useState<IHoSo[] | undefined>();
  const [selectedDanhSachHoSos, setSelectedDanhSachHoSos] = useState<IHoSo[]>(
    []
  );
  const [hoanThanhBoSungModalVisible, setHoanThanhBoSungModalVisible] =
    useState<boolean>(false);
  const [
    khongTiepNhanHoSoBoSungQuaHanModalVisible,
    setKhongTiepNhanHoSoBoSungQuaHanModalVisible,
  ] = useState<boolean>(false);
  const [datLaiQuyTrinhXuLyModalVisible, setDatLaiQuyTrinhXuLyModalVisible] =
    useState<boolean>(false);
  const [adminCapNhatHoSoModalVisible, setAdminCapNhatHoSoModalVisible] =
    useState<boolean>(false);
  const [
    lienThongHeThongLLTPHoSoModalVisible,
    setLienThongHeThongLLTPHoSoModalVisible,
  ] = useState<boolean>(false);
  const [chuyenTraKqHCCModalVisible, setChuyenTraKqHCCModalVisible] =
    useState<boolean>(false);
  const [thuHoiChuyenTraKqModalVisible, setThuHoiChuyenTraKqModalVisible] =
    useState<boolean>(false);
  const [chuyenPhiDiaGioiModalVisible, setChuyenPhiDiaGioiModalVisible] =
    useState<boolean>(false);
  const [yeuCauBCCILayKetQuaModalVisible, setYeuCauBCCILayKetQuaModalVisible] =
    useState<boolean>(false);
  const [yeuCauBCCILayKetQuaWithoutItemCodeModalVisible, setYeuCauBCCILayKetQuaWithoutItemCodeModalVisible] =
    useState<boolean>(false);
  const [yeuCauBCCILayKetQuaNhieuHoSoModalVisible, setYeuCauBCCILayKetQuaNhieuHoSoModalVisible] =
    useState<boolean>(false);
  const [thuHoiDangKyNhanKqQuaBCCIModalVisible, setThuHoiDangKyNhanKqQuaBCCIModalVisible] =
    useState<boolean>(false);
  const [thuHoiMaVanDonBuuDienModalVisible, setThuHoiMaVanDonBuuDienModalVisible] =
    useState<boolean>(false);
  const [
    xacNhanVaYeuCauBCCILayKetQuaModalVisible,
    setXacNhanVaYeuCauBCCILayKetQuaModalVisible,
  ] = useState<boolean>(false);
  const [
    dangKyNhanKetQuaBCCIModalVisible,
    setDangKyNhanKetQuaBCCIModalVisible,
  ] = useState<boolean>(false);

  const [yeuCauThanhToanLLTPModalVisible, setYeuCauThanhToanLLTPModalVisible] =
    useState<boolean>(false);
  const [
    inPhieuTiepNhanHoSoChungThucModalVisible,
    setInPhieuTiepNhanHoSoChungThucModalVisible,
  ] = useState<boolean>(false);
  const [duThaoXinLoiHoSoModalVisible, setDuThaoXinLoiHoSoModalVisible] =
    useState<boolean>(false);
  const [xacNhanTraLaiXinRutModalVisible, setXacNhanTraLaiXinRutModalVisible] =
    useState<boolean>(false);
  const [xacNhanBoSungModalVisible, setXacNhanBoSungModalVisible] =
    useState<boolean>(false);
  const [chuyenBuocXuLyNhieuHoSoModalVisible, setChuyenBuocXuLyNhieuHoSoModalVisible] =
    useState<boolean>(false);
  const [lienThongBTPHoSoModalVisible, setLienThongBTPHoSoModalVisible] =
    useState<boolean>(false);
  const [xuatQuaTrinhXuLyHoSoModalVisible, setXuatQuaTrinhXuLyHoSoModalVisible] =
    useState<boolean>(false);
  const [ketThucXuLyNhieuHoSoModalVisible, setKetThucXuLyNhieuHoSoModalVisible] =
    useState<boolean>(false);
  const [themMoiHoSoPhiDiaGioiModalVisible, setThemMoiHoSoPhiDiaGioiModalVisible] =
    useState<boolean>(false);
  const [traCuuBTPHoSoModalVisible, setTraCuuBTPHoSoModalVisible] =
    useState<boolean>(false);
  const [fakeTuChoiBTPHoSoModalVisible, setFakeTuChoiBTPHoSoModalVisible] =
    useState<boolean>(false);
  const [guiLienThongLLTPModalVisible, setGuiLienThongLLTPModalVisible] =
    useState<boolean>(false);
  const [thuHoiQuyetDinhLLTPModalVisible, setThuHoiQuyetDinhLLTPModalVisible] =
    useState<boolean>(false);
  const [tiepNhanGuiVBDLISModalVisible, setTiepNhanGuiVBDLISModalVisible] =
    useState<boolean>(false);
  const [boSungHoSoGuiVBDLISModalVisible, setBoSungHoSoGuiVBDLISModalVisible] =
    useState<boolean>(false);
  const [thucHienNghiaVuTaiChinhVBDLISModalVisible, setThucHienNghiaVuTaiChinhVBDLISModalVisible] =
    useState<boolean>(false);
  const [chuyenBuocXuLyChungThucModalVisible, setChuyenBuocXuLyChungThucModalVisible] =
    useState<boolean>(false);
  const [guiPhiDiaGioiModalVisible, setGuiPhiDiaGioiModalVisible] =
    useState<boolean>(false);
  const [lienThongDangKyKetHonHoSoModalVisible, setLienThongDangKyKetHonHoSoModalVisible] =
    useState<boolean>(false);
  const [xuatExcelHoSoTheoDoiModal, setXuatExcelHoSoTheoDoiModal] =
    useState<boolean>(false);
  return (
    <ButtonActionContext.Provider
      value={{
        lienThongDangKyKetHonHoSoModalVisible,
        setLienThongDangKyKetHonHoSoModalVisible,
        chamSoHoaModal,
        setChamSoHoaModal,
        scanHoSoModalVisible,
        setScanHoSoModalVisible,
        scanKetQuaModalVisible,
        setScanKetQuaModalVisible,
        themMoiHoSoDienTuModalVisible,
        setThemMoiHoSoDienTuModalVisible,
        guiPhiDiaGioiModalVisible,
        setGuiPhiDiaGioiModalVisible,
        chuyenBuocXuLyChungThucModalVisible,
        setChuyenBuocXuLyChungThucModalVisible,
        thuHoiQuyetDinhLLTPModalVisible,
        setThuHoiQuyetDinhLLTPModalVisible,
        guiLienThongLLTPModalVisible,
        setGuiLienThongLLTPModalVisible,
        datLaiNhieuHoSoQuaHanModalVisible,
        setDatLaiNhieuHoSoQuaHanModalVisible,
        fakeTuChoiBTPHoSoModalVisible,
        setFakeTuChoiBTPHoSoModalVisible,
        traCuuBTPHoSoModalVisible,
        setTraCuuBTPHoSoModalVisible,
        themMoiHoSoPhiDiaGioiModalVisible,
        setThemMoiHoSoPhiDiaGioiModalVisible,
        traLaiXinRutKhongTrinhKyHoSoModalVisible,
        setTraLaiXinRutKhongTrinhKyHoSoModalVisible,
        lienThongBTPHoSoModalVisible,
        setLienThongBTPHoSoModalVisible,
        adminCapNhatThanhPhanHoSoModalVisible,
        setAdminCapNhatThanhPhanHoSoModalVisible,
        ketThucHoSoTBKMModalVisible,
        setKetThucHoSoTBKMModalVisible,
        chuyenBuocXuLyNhieuHoSoModalVisible,
        setChuyenBuocXuLyNhieuHoSoModalVisible,
        duThaoXinLoiHoSoModalVisible,
        setDuThaoXinLoiHoSoModalVisible,
        thuHoiHoSoDaTraKetQuaModalVisible,
        setThuHoiHoSoDaTraKetQuaModalVisible,
        traKetQuaChungThucVaDanhGiaHaiLongModalVisible,
        setTraKetQuaChungThucVaDanhGiaHaiLongModalVisible,
        inPhieuTiepNhanHoSoChungThucModalVisible,
        setInPhieuTiepNhanHoSoChungThucModalVisible,
        yeuCauThanhToanLLTPModalVisible,
        setYeuCauThanhToanLLTPModalVisible,
        traKetQuaChungThucModalVisible,
        setTraKetQuaChungThucModalVisible,
        capSoVaDongDauModalVisible,
        setCapSoVaDongDauModalVisible,
        yeuCauThanhToanChungThucModalVisible,
        setYeuCauThanhToanChungThucModalVisible,
        danhGiaHaiLongModalVisible,
        setDanhGiaHaiLongModalVisible,
        duThaoTraLaiXinRutHoSoModalVisible,
        setDuThaoTraLaiXinRutHoSoModalVisible,
        duyetThongQuaDuThaoModalVisible,
        setDuyetThongQuaDuThaoModalVisible,
        tuChoiDuThaoModalVisible,
        setTuChoiDuThaoModalVisible,
        duThaoBoSungHoSoModalVisible,
        setDuThaoBoSungHoSoModalVisible,
        capSoModalVisible,
        setCapSoModalVisible,
        dongDauModalVisible,
        setDongDauModalVisible,
        kySoChungThucModalVisible,
        setKySoChungThucModalVisible,
        themMoiHoSoChungThucModalVisible,
        setThemMoiHoSoChungThucModalVisible,
        tiepNhanHoSoChungThucModalVisible,
        setTiepNhanHoSoChungThucModalVisible,
        lienThongHeThongLLTPHoSoModalVisible,
        setLienThongHeThongLLTPHoSoModalVisible,
        chonTepTuThanhPhanHoSoVisible,
        setChonTepTuThanhPhanHoSoVisible,
        khongTiepNhanHoSoBoSungQuaHanModalVisible,
        setKhongTiepNhanHoSoBoSungQuaHanModalVisible,
        themMoiTiepNhanHoSoModalVisible,
        setThemMoiTiepNhanHoSoModalVisible,
        chuyenBuocXuLyModalVisible,
        setChuyenBuocXuLyModalVisible,
        suaHoSoModalVisible,
        setSuaHoSoModalVisible,
        capNhatKetQuaXuLyHoSoModalVisible,
        setCapNhatKetQuaXuLyHoSoModalVisible,
        capNhatKetQuaXuLyNhieuHoSoModalVisible,
        setCapNhatKetQuaXuLyNhieuHoSoModalVisible,
        chiTietHoSoModalVisible,
        setChiTietHoSoModalVisible,
        inTiepNhanNhieuHoSoModalVisible,
        setInTiepNhanNhieuHoSoModalVisible,
        traKetQuaNhieuHoSoModalVisible,
        setTraKetQuaNhieuHoSoModalVisible,
        ghiChuViTriHoSoModalVisible,
        setGhiChuViTriHoSoModalVisible,
        banGiaoKetQuaModalVisible,
        setBanGiaoKetQuaModalVisible,
        bienNhanKetQuaModalVisible,
        setBienNhanKetQuaModalVisible,
        traKetQuaModalVisible,
        setTraKetQuaModalVisible,
        traKetQuaHCCHuyenXaModalVisible,
        setTraKetQuaHCCHuyenXaModalVisible,
        traKetQuaHCCModalVisible,
        setTraKetQuaHCCModalVisible,
        traKetQuaVaThuLaiBanGocModalVisible,
        setTraKetQuaVaThuLaiBanGocModalVisible,
        danhGiaHoSoModalVisible,
        setDanhGiaHoSoModalVisible,
        selectedHoSos,
        setSelectedHoSos,
        selectedHoSo,
        selectedHoSoKeyByTHTTs,
        setSelectedHoSoKeyByTHTTs,
        setSelectedHoSo,
        selectedInfoHoSos,
        setSelectedInfoHoSo,
        themNguoiTiepNhanHoSoModalVisible,
        setThemNguoiTiepNhanHoSoModalVisible,
        thayDoiTruongHopXuLyModalVisible,
        setThayDoiTruongHopXuLyModalVisible,
        yeuCauThanhToanModalVisible,
        setYeuCauThanhToanModalVisible,
        xoaHoSoModalVisible,
        setXoaHoSoModalVisible,
        traLaiBuocTruocModalVisible,
        setTraLaiBuocTruocModalVisible,
        chuyenNoiBoModalVisible,
        setChuyenNoiBoModalVisible,
        ketThucModalVisible,
        setKetThucModalVisible,
        traKetQuaVaDanhGiaHaiLongModalVisible,
        setTraKetQuaVaDanhGiaHaiLongModalVisible,
        xacNhanKetQuaModalVisible,
        setXacNhanKetQuaModalVisible,
        chuyenTraKqHCCModalVisible,
        setChuyenTraKqHCCModalVisible,
        thuHoiHoSoModalVisible,
        setThuHoiHoSoModalVisible,
        yeuCauMotCuaBoSungModalVisible,
        setYeuCauMotCuaBoSungModalVisible,
        capNhatBoSungHoSoModalVisible,
        setCapNhatBoSungHoSoModalVisible,
        chuyenBuocNhanhHoSoModalVisible,
        setChuyenBuocNhanhHoSoModalVisible,
        yeuCauCongDanBoSungHoSoModalVisible,
        setYeuCauCongDanBoSungHoSoModalVisible,
        tiepNhanHoSoTrucTuyenHoSoModalVisible,
        setTiepNhanHoSoTrucTuyenModalVisible,
        inPhieuTiepNhanHoSoModalVisible,
        setInPhieuTiepNhanHoSoModalVisible,
        traBoSungModalVisible,
        setTraBoSungModalVisible,
        hoanThanhBoSungModalVisible,
        setHoanThanhBoSungModalVisible,
        inDanhSachHoSoModalVisible,
        setInDanhSachHoSoModalVisible,
        inPhieuHuongDanModalVisible,
        setInPhieuHuongDanModalVisible,
        inHuongDanNopTrucTiepModalVisible,
        setInHuongDanNopTrucTiepModalVisible,
        inPhieuKiemSoatModalVisible,
        setInPhieuKiemSoatModalVisible,
        inPhieuTiepNhanChungThucModalVisible,
        setInPhieuTiepNhanChungThucModalVisible,
        inPhieuTuChoiModalVisible,
        setInPhieuTuChoiModalVisible,
        tuChoiTiepNhanHoSoTrucTuyenModalVisible,
        setTuChoiTiepNhanHoSoTrucTuyenModalVisible,
        datLaiHanXuLyModalVisible,
        setDatLaiHanXuLyModalVisible,
        datLaiQuyTrinhXuLyModalVisible,
        setDatLaiQuyTrinhXuLyModalVisible,
        adminCapNhatHoSoModalVisible,
        setAdminCapNhatHoSoModalVisible,
        thuHoiChuyenTraKqModalVisible,
        setThuHoiChuyenTraKqModalVisible,
        chuyenPhiDiaGioiModalVisible,
        setChuyenPhiDiaGioiModalVisible,
        yeuCauThanhToanVaXacNhanKqModalVisible,
        setYeuCauThanhToanVaXacNhanKqModalVisible,
        yeuCauBCCILayKetQuaModalVisible,
        setYeuCauBCCILayKetQuaModalVisible,
        xacNhanVaYeuCauBCCILayKetQuaModalVisible,
        setXacNhanVaYeuCauBCCILayKetQuaModalVisible,
        dangKyNhanKetQuaBCCIModalVisible,
        setDangKyNhanKetQuaBCCIModalVisible,
        yeuCauThanhToanNhieuHoSosModalVisible,
        setYeuCauThanhToanNhieuHoSosModalVisible,
        selectedDanhSachHoSos,
        setSelectedDanhSachHoSos,
        xacNhanTraLaiXinRutModalVisible,
        setXacNhanTraLaiXinRutModalVisible,

        xacNhanBoSungModalVisible,
        setXacNhanBoSungModalVisible,
        thuHoiMaVanDonBuuDienModalVisible,
        setThuHoiMaVanDonBuuDienModalVisible,
        yeuCauBCCILayKetQuaWithoutItemCodeModalVisible,
        setYeuCauBCCILayKetQuaWithoutItemCodeModalVisible,
        thuHoiDangKyNhanKqQuaBCCIModalVisible,
        setThuHoiDangKyNhanKqQuaBCCIModalVisible,
        yeuCauBCCILayKetQuaNhieuHoSoModalVisible,
        setYeuCauBCCILayKetQuaNhieuHoSoModalVisible,
        xuatQuaTrinhXuLyHoSoModalVisible,
        setXuatQuaTrinhXuLyHoSoModalVisible,
        ketThucXuLyNhieuHoSoModalVisible,
        setKetThucXuLyNhieuHoSoModalVisible,
        tiepNhanGuiVBDLISModalVisible,
        setTiepNhanGuiVBDLISModalVisible,
        boSungHoSoGuiVBDLISModalVisible,
        setBoSungHoSoGuiVBDLISModalVisible,
        thucHienNghiaVuTaiChinhVBDLISModalVisible,
        setThucHienNghiaVuTaiChinhVBDLISModalVisible,
        xuatExcelHoSoTheoDoiModal, setXuatExcelHoSoTheoDoiModal
      }}
    >
      {children}
    </ButtonActionContext.Provider>
  );
};
