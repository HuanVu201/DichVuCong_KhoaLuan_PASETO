import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ButtonActionContext = createContext<IButtonActionContext | null>(null);

export interface IButtonActionContext {
  selectedHoSos: React.Key[];
  setSelectedHoSos: React.Dispatch<React.SetStateAction<React.Key[]>>;

  chiTietHoSoModalVisible: boolean;
  setChiTietHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  danhGiaHoSoModalVisible: boolean;
  setDanhGiaHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  themMoiTiepNhanHoSoModalVisible: boolean;
  setThemMoiTiepNhanHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  chuyenBuocXuLyModalVisible: boolean;
  setChuyenBuocXuLyModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  suaHoSoModalVisible: boolean;
  setSuaHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  capNhatKetQuaXuLyHoSoModalVisible: boolean;
  setCapNhatKetQuaXuLyHoSoModalVisible: React.Dispatch<
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

  traKetQuaModalVisible: boolean;
  setTraKetQuaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  traKetQuaVaDanhGiaHaiLongModalVisible: boolean;
  setTraKetQuaVaDanhGiaHaiLongModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  danhGiaHaiLongModalVisible: boolean;
  setDanhGiaHaiLongModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  xacNhanKetQuaModalVisible: boolean;
  setXacNhanKetQuaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

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
  lienThongHeThongLLTPHoSoModalVisible: boolean;
  setLienThongHeThongLLTPHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inBaoCao06aModalVisible: boolean;
  setInBaoCao06aModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inBaoCao07bModalVisible: boolean;
  setInBaoCao07bModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inBaoCaoCacDonViModalVisible: boolean;
  setInBaoCaoCacDonViModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inBaoCaoCacDonViChiTietModalVisible: boolean;
  setInBaoCaoCacDonViChiTietModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inBaoCaoLoaiHinhModalVisible: boolean;
  setInBaoCaoLoaiHinhModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inBaoCaoQuyModalVisible: boolean;
  setInBaoCaoQuyModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inBaoCaoSuHaiLongModalVisible: boolean;
  setInBaoCaoSuHaiLongModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inBaoCaoTheoThuTucModalVisible: boolean;
  setInBaoCaoTheoThuTucModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inBaoCaoTiepNhanLinhVucModalVisible: boolean;
  setInBaoCaoTiepNhanLinhVucModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inBaoCaoTiepNhanTheoDoiModalVisible: boolean;
  setInBaoCaoTiepNhanTheoDoiModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inBaoCaoTongHopDungHanModalVisible: boolean;
  setInBaoCaoTongHopDungHanModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inBaoCaoTongHopQuaHanModalVisible: boolean;
  setInBaoCaoTongHopQuaHanModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inBaoCaoTongHopTiepNhanModalVisible: boolean;
  setInBaoCaoTongHopTiepNhanModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inBaoCaoXuLyLinhVucModalVisible: boolean;
  setInBaoCaoXuLyLinhVucModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inDanhSachHoSoModalVisible: boolean;
  setInDanhSachHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inDanhSachHoSo67134ModalVisible: boolean;
  setInDanhSachHoSo67134ModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inDanhSachHoSoChungModalVisible: boolean;
  setInDanhSachHoSoChungModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inDanhSachHoSoLISTModalVisible: boolean;
  setInDanhSachHoSoLISTModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inDanhSachHoSoLISTTrongKyModalVisible: boolean;
  setInDanhSachHoSoLISTTrongKyModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inDanhSachHoSoLTModalVisible: boolean;
  setInDanhSachHoSoLTModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inDanhSachHoSoTrongKyModalVisible: boolean;
  setInDanhSachHoSoTrongKyModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inDanhSachLePhiHoSoModalVisible: boolean;
  setInDanhSachLePhiHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inGiayCNDKKinhDoanhModalVisible: boolean;
  setInGiayCNDKKinhDoanhModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inGiayPhepKinhDoanhModalVisible: boolean;
  setInGiayPhepKinhDoanhModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inPhieuBanGiaoModalVisible: boolean;
  setInPhieuBanGiaoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inPhieuBienNhanKetQuaModalVisible: boolean;
  setInPhieuBienNhanKetQuaModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inPhieuGopYModalVisible: boolean;
  setInPhieuGopYModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inPhieuHuongDanModalVisible: boolean;
  setInPhieuHuongDanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inPhieuKiemSoatModalVisible: boolean;
  setInPhieuKiemSoatModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inPhieuThuLePhiModalVisible: boolean;
  setInPhieuThuLePhiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inPhieuTiepNhanChungThucModalVisible: boolean;
  setInPhieuTiepNhanChungThucModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inPhieuTuChoiModalVisible: boolean;
  setInPhieuTuChoiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inPhieuXinLoiModalVisible: boolean;
  setInPhieuXinLoiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inQuaTrinhXuLyModalVisible: boolean;
  setInQuaTrinhXuLyModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inThongKeDiaBanModalVisible: boolean;
  setInThongKeDiaBanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  inThongKeHoSoTiepNhanBuuChinhModalVisible: boolean;
  setInThongKeHoSoTiepNhanBuuChinhModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  inThongKeThuTucPhatSinhHoSoBCCIModalVisible: boolean;
  setInThongKeThuTucPhatSinhHoSoBCCIModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  tuChoiTiepNhanHoSoTrucTuyenModalVisible: boolean;
  setTuChoiTiepNhanHoSoTrucTuyenModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  traBoSungModalVisible: boolean;
  setTraBoSungModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  hoanThanhBoSungModalVisible: boolean;
  setHoanThanhBoSungModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

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
  dangKyNhanKetQuaBCCIModalVisible: boolean;
  setDangKyNhanKetQuaBCCIModalVisible: React.Dispatch<
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
  const [
    duThaoTraLaiXinRutHoSoModalVisible,
    setDuThaoTraLaiXinRutHoSoModalVisible,
  ] = useState<boolean>(false);
  const [duThaoBoSungHoSoModalVisible, setDuThaoBoSungHoSoModalVisible] =
    useState<boolean>(false);
  const [kySoChungThucModalVisible, setKySoChungThucModalVisible] =
    useState<boolean>(false);
  const [capSoModalVisible, setCapSoModalVisible] = useState<boolean>(false);
  const [dongDauModalVisible, setDongDauModalVisible] =
    useState<boolean>(false);
  const [capSoVaDongDauModalVisible, setCapSoVaDongDauModalVisible] =
    useState<boolean>(false);
  const [themMoiTiepNhanHoSoModalVisible, setThemMoiTiepNhanHoSoModalVisible] =
    useState<boolean>(false);
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
  const [chiTietHoSoModalVisible, setChiTietHoSoModalVisible] =
    useState<boolean>(false);
  const [danhGiaHoSoModalVisible, setDanhGiaHoSoModalVisible] =
    useState<boolean>(false);
  const [
    thayDoiTruongHopXuLyModalVisible,
    setThayDoiTruongHopXuLyModalVisible,
  ] = useState<boolean>(false);
  const [yeuCauThanhToanModalVisible, setYeuCauThanhToanModalVisible] =
    useState<boolean>(false);
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
  const [inBaoCao06aModalVisible, setInBaoCao06aModalVisible] =
    useState<boolean>(false);
  const [inBaoCao07bModalVisible, setInBaoCao07bModalVisible] =
    useState<boolean>(false);
  const [inBaoCaoCacDonViModalVisible, setInBaoCaoCacDonViModalVisible] =
    useState<boolean>(false);
  const [
    inBaoCaoCacDonViChiTietModalVisible,
    setInBaoCaoCacDonViChiTietModalVisible,
  ] = useState<boolean>(false);
  const [inBaoCaoLoaiHinhModalVisible, setInBaoCaoLoaiHinhModalVisible] =
    useState<boolean>(false);
  const [inBaoCaoQuyModalVisible, setInBaoCaoQuyModalVisible] =
    useState<boolean>(false);
  const [inBaoCaoSuHaiLongModalVisible, setInBaoCaoSuHaiLongModalVisible] =
    useState<boolean>(false);
  const [inBaoCaoTheoThuTucModalVisible, setInBaoCaoTheoThuTucModalVisible] =
    useState<boolean>(false);
  const [
    inBaoCaoTiepNhanLinhVucModalVisible,
    setInBaoCaoTiepNhanLinhVucModalVisible,
  ] = useState<boolean>(false);
  const [
    inBaoCaoTiepNhanTheoDoiModalVisible,
    setInBaoCaoTiepNhanTheoDoiModalVisible,
  ] = useState<boolean>(false);
  const [
    inBaoCaoTongHopDungHanModalVisible,
    setInBaoCaoTongHopDungHanModalVisible,
  ] = useState<boolean>(false);
  const [
    inBaoCaoTongHopQuaHanModalVisible,
    setInBaoCaoTongHopQuaHanModalVisible,
  ] = useState<boolean>(false);
  const [
    inBaoCaoTongHopTiepNhanModalVisible,
    setInBaoCaoTongHopTiepNhanModalVisible,
  ] = useState<boolean>(false);
  const [inBaoCaoXuLyLinhVucModalVisible, setInBaoCaoXuLyLinhVucModalVisible] =
    useState<boolean>(false);
  const [inDanhSachHoSoModalVisible, setInDanhSachHoSoModalVisible] =
    useState<boolean>(false);
  const [inDanhSachHoSo67134ModalVisible, setInDanhSachHoSo67134ModalVisible] =
    useState<boolean>(false);
  const [inDanhSachHoSoChungModalVisible, setInDanhSachHoSoChungModalVisible] =
    useState<boolean>(false);
  const [inDanhSachHoSoLISTModalVisible, setInDanhSachHoSoLISTModalVisible] =
    useState<boolean>(false);
  const [
    inDanhSachHoSoLISTTrongKyModalVisible,
    setInDanhSachHoSoLISTTrongKyModalVisible,
  ] = useState<boolean>(false);
  const [inDanhSachHoSoLTModalVisible, setInDanhSachHoSoLTModalVisible] =
    useState<boolean>(false);
  const [
    inDanhSachHoSoTrongKyModalVisible,
    setInDanhSachHoSoTrongKyModalVisible,
  ] = useState<boolean>(false);
  const [inDanhSachLePhiHoSoModalVisible, setInDanhSachLePhiHoSoModalVisible] =
    useState<boolean>(false);
  const [inGiayCNDKKinhDoanhModalVisible, setInGiayCNDKKinhDoanhModalVisible] =
    useState<boolean>(false);
  const [inGiayPhepKinhDoanhModalVisible, setInGiayPhepKinhDoanhModalVisible] =
    useState<boolean>(false);
  const [inPhieuBanGiaoModalVisible, setInPhieuBanGiaoModalVisible] =
    useState<boolean>(false);
  const [
    inPhieuBienNhanKetQuaModalVisible,
    setInPhieuBienNhanKetQuaModalVisible,
  ] = useState<boolean>(false);
  const [inPhieuGopYModalVisible, setInPhieuGopYModalVisible] =
    useState<boolean>(false);
  const [inPhieuHuongDanModalVisible, setInPhieuHuongDanModalVisible] =
    useState<boolean>(false);
  const [inPhieuKiemSoatModalVisible, setInPhieuKiemSoatModalVisible] =
    useState<boolean>(false);
  const [inPhieuThuLePhiModalVisible, setInPhieuThuLePhiModalVisible] =
    useState<boolean>(false);
  const [
    inPhieuTiepNhanChungThucModalVisible,
    setInPhieuTiepNhanChungThucModalVisible,
  ] = useState<boolean>(false);
  const [inPhieuTuChoiModalVisible, setInPhieuTuChoiModalVisible] =
    useState<boolean>(false);
  const [inPhieuXinLoiModalVisible, setInPhieuXinLoiModalVisible] =
    useState<boolean>(false);
  const [inQuaTrinhXuLyModalVisible, setInQuaTrinhXuLyModalVisible] =
    useState<boolean>(false);
  const [inThongKeDiaBanModalVisible, setInThongKeDiaBanModalVisible] =
    useState<boolean>(false);
  const [
    inThongKeHoSoTiepNhanBuuChinhModalVisible,
    setInThongKeHoSoTiepNhanBuuChinhModalVisible,
  ] = useState<boolean>(false);
  const [
    inThongKeThuTucPhatSinhHoSoBCCIModalVisible,
    setInThongKeThuTucPhatSinhHoSoBCCIModalVisible,
  ] = useState<boolean>(false);
  const [
    tuChoiTiepNhanHoSoTrucTuyenModalVisible,
    setTuChoiTiepNhanHoSoTrucTuyenModalVisible,
  ] = useState<boolean>(false);
  const [
    traKetQuaVaDanhGiaHaiLongModalVisible,
    setTraKetQuaVaDanhGiaHaiLongModalVisible,
  ] = useState<boolean>(false);
  const [
    danhGiaHaiLongModalVisible,
    setDanhGiaHaiLongModalVisible,
  ] = useState<boolean>(false);
  const [traBoSungModalVisible, setTraBoSungModalVisible] =
    useState<boolean>(false);
  const [datLaiHanXuLyModalVisible, setDatLaiHanXuLyModalVisible] =
    useState<boolean>(false);
  const [selectedHoSos, setSelectedHoSos] = useState<React.Key[]>([]);
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
  const [
    xacNhanVaYeuCauBCCILayKetQuaModalVisible,
    setXacNhanVaYeuCauBCCILayKetQuaModalVisible,
  ] = useState<boolean>(false);
  const [
    dangKyNhanKetQuaBCCIModalVisible,
    setDangKyNhanKetQuaBCCIModalVisible,
  ] = useState<boolean>(false);

  return (
    <ButtonActionContext.Provider
      value={{
        capSoVaDongDauModalVisible,
        setCapSoVaDongDauModalVisible,
        yeuCauThanhToanChungThucModalVisible,
        setYeuCauThanhToanChungThucModalVisible,
        danhGiaHaiLongModalVisible,
        setDanhGiaHaiLongModalVisible,
        duThaoTraLaiXinRutHoSoModalVisible,
        setDuThaoTraLaiXinRutHoSoModalVisible,
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
        chiTietHoSoModalVisible,
        setChiTietHoSoModalVisible,
        danhGiaHoSoModalVisible,
        setDanhGiaHoSoModalVisible,
        selectedHoSos,
        setSelectedHoSos,
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
        traKetQuaModalVisible,
        setTraKetQuaModalVisible,
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

        inBaoCao06aModalVisible,
        setInBaoCao06aModalVisible,
        inBaoCao07bModalVisible,
        setInBaoCao07bModalVisible,
        inBaoCaoCacDonViModalVisible,
        setInBaoCaoCacDonViModalVisible,
        inBaoCaoCacDonViChiTietModalVisible,
        setInBaoCaoCacDonViChiTietModalVisible,
        inBaoCaoLoaiHinhModalVisible,
        setInBaoCaoLoaiHinhModalVisible,
        inBaoCaoQuyModalVisible,
        setInBaoCaoQuyModalVisible,
        inBaoCaoSuHaiLongModalVisible,
        setInBaoCaoSuHaiLongModalVisible,
        inBaoCaoTheoThuTucModalVisible,
        setInBaoCaoTheoThuTucModalVisible,
        inBaoCaoTiepNhanLinhVucModalVisible,
        setInBaoCaoTiepNhanLinhVucModalVisible,
        inBaoCaoTiepNhanTheoDoiModalVisible,
        setInBaoCaoTiepNhanTheoDoiModalVisible,
        inBaoCaoTongHopDungHanModalVisible,
        setInBaoCaoTongHopDungHanModalVisible,
        inBaoCaoTongHopQuaHanModalVisible,
        setInBaoCaoTongHopQuaHanModalVisible,
        inBaoCaoTongHopTiepNhanModalVisible,
        setInBaoCaoTongHopTiepNhanModalVisible,
        inBaoCaoXuLyLinhVucModalVisible,
        setInBaoCaoXuLyLinhVucModalVisible,
        inDanhSachHoSoModalVisible,
        setInDanhSachHoSoModalVisible,
        inDanhSachHoSo67134ModalVisible,
        setInDanhSachHoSo67134ModalVisible,
        inDanhSachHoSoChungModalVisible,
        setInDanhSachHoSoChungModalVisible,
        inDanhSachHoSoLISTModalVisible,
        setInDanhSachHoSoLISTModalVisible,
        inDanhSachHoSoLISTTrongKyModalVisible,
        setInDanhSachHoSoLISTTrongKyModalVisible,
        inDanhSachHoSoLTModalVisible,
        setInDanhSachHoSoLTModalVisible,
        inDanhSachHoSoTrongKyModalVisible,
        setInDanhSachHoSoTrongKyModalVisible,
        inDanhSachLePhiHoSoModalVisible,
        setInDanhSachLePhiHoSoModalVisible,
        inGiayCNDKKinhDoanhModalVisible,
        setInGiayCNDKKinhDoanhModalVisible,
        inGiayPhepKinhDoanhModalVisible,
        setInGiayPhepKinhDoanhModalVisible,
        inPhieuBanGiaoModalVisible,
        setInPhieuBanGiaoModalVisible,
        inPhieuBienNhanKetQuaModalVisible,
        setInPhieuBienNhanKetQuaModalVisible,
        inPhieuGopYModalVisible,
        setInPhieuGopYModalVisible,
        inPhieuHuongDanModalVisible,
        setInPhieuHuongDanModalVisible,
        inPhieuKiemSoatModalVisible,
        setInPhieuKiemSoatModalVisible,
        inPhieuThuLePhiModalVisible,
        setInPhieuThuLePhiModalVisible,
        inPhieuTiepNhanChungThucModalVisible,
        setInPhieuTiepNhanChungThucModalVisible,
        inPhieuTuChoiModalVisible,
        setInPhieuTuChoiModalVisible,
        inPhieuXinLoiModalVisible,
        setInPhieuXinLoiModalVisible,
        inQuaTrinhXuLyModalVisible,
        setInQuaTrinhXuLyModalVisible,
        inThongKeDiaBanModalVisible,
        setInThongKeDiaBanModalVisible,
        inThongKeHoSoTiepNhanBuuChinhModalVisible,
        setInThongKeHoSoTiepNhanBuuChinhModalVisible,
        inThongKeThuTucPhatSinhHoSoBCCIModalVisible,
        setInThongKeThuTucPhatSinhHoSoBCCIModalVisible,

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
      }}
    >
      {children}
    </ButtonActionContext.Provider>
  );
};
