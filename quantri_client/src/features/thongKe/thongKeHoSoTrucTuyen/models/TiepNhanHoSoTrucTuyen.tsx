export interface ITiepNhanHoSoTrucTuyenResponse {
  data: ITiepNhanHoSoTrucTuyenElm[];
}
export interface ITiepNhanHoSoTrucTuyenElm {
  maDonVi?: string;
  tenDonVi?: string;
  maThongKe?: string;
  tenThongKe?: string;
  mucDo?: string;
  tongSo: number;
  tongTrucTuyen: number;
  tongTrucTiep: number;
  tongBCCI: number;
  tongToanTrinh: number;
  tongToanTrinhTrucTuyen: number;
  tongToanTrinhTrucTiep: number;
  tongToanTrinhBCCI: number;
  tongMotPhan: number;
  tongMotPhanTrucTuyen: number;
  tongMotPhanTrucTiep: number;
  tongMotPhanBCCI: number;
  tthcKhongPhatSinhHoSo?: number;
  tthcDatChiTieu?: number;
  tthcKhongDatChiTieu?: number;
  thanhPhan?: ITiepNhanHoSoTrucTuyenElm[];
}

export interface IThongKeHoSoTrangChu {
  daHoanThanhDungHan: number;
  daHoanThanhQuaHan: number;
  daTiepNhan: number;
  daGiaiQuyet: number;
  dangXuLy: number;
  tiepNhanTrucTiep: number;
  tiepNhanQuaBCCI: number;
  tiepNhanQuaMang: number;

}

export interface IDuLieuThongKeHoSo {
  tongSoHoSo: number;
  hoSoTuKyTruoc: number;
  hoSoMoiTiepNhan: number;
  tongSoHoSoDaXuLy: number;
  tongSoHoSoDaXuLyTrongKy: number;
  hoSoDaXuLyDungHan: number;
  hoSoDaXuLyQuaHan: number;
  tiepNhanTrucTiep?: number;
  tiepNhanQuaBCCI?: number;
  tiepNhanQuaMang?: number;
  dangXuLy?: number;
  thang: number;
  nam: number;
}

export interface NhacViecResponse {
  moiDangKy: number;
  tiepNhanPhiDiaGioi: number;
  duocTiepNhan: number;
  khongDuocTiepNhan: number;
  dangXuLy: number;
  hoSoToiHan: number;
  hoSoQuaHan: number;
  choMotCuaBoSung: number;
  choCongDanBoSung: number;
  daGuiBoSung: number;
  hoanThanhBoSung: number;
  yeuCauThucHienNghiaVuTaiChinh: number;
  yeuCauBoSung: number
  daChuyenXuLy: number;
  congDanYeuCauRutHoSo: number;
  dungXuLy: number;
  daChuyenXuLyCoKetQua: number;
  daCoKetQua: number;
  tongXuLy: number;
  // choTraTrucTuyen :number;
  // choTraTrucTiep :number;
  choTraBCCI: number;
  choTraBCCITTHCC: number;
  choThanhToan: number
  choTraKetQua: number;
  moiDangKyChungThuc: number;
  duocTiepNhanChungThuc: number;
  dangXuLyChungThuc: number;
  duThaoXinLoiChoThongQua: number;
  duThaoBoSungChoThongQua: number;
  duThaoTraLaiXinRutChoThongQua: number;
  choTraKetQuaChungThuc: number;
}

