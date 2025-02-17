export interface ITiepNhanHoSoTrucTuyenResponse {
  data: ITiepNhanHoSoTrucTuyenElm[];
}
export interface ITiepNhanHoSoTrucTuyenElm {
  maDonVi: string;
  tenDonVi: string;
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
  thanhPhan: ITiepNhanHoSoTrucTuyenElm[];
}

export interface IThongKeHoSoTrangChu {
  daHoanThanhDungHan : number;
  daHoanThanhQuaHan : number;
  daTiepNhan : number;
  daGiaiQuyet : number;
  dangXuLy : number;
}

export interface IDuLieuThongKeHoSo {
  tongSoHoSo : number;
  hoSoTuKyTruoc : number;
  hoSoMoiTiepNhan : number;
  tongSoHoSoDaXuLy : number;
  hoSoDaXuLyDungHan : number;
  hoSoDaXuLyQuaHan : number;
  thang : number;
  nam : number;
}

export interface NhacViecResponse {
  moiDangKy : number;
  duocTiepNhan : number;
  khongDuocTiepNhan : number;
  dangXuLy : number;
  hoSoToiHan : number;
  hoSoQuaHan : number;
  choMotCuaBoSung : number;
  choCongDanBoSung : number;
  daGuiBoSung : number;
  hoanThanhBoSung : number;
  yeuCauThucHienNghiaVuTaiChinh : number;
  daChuyenXuLy : number;
  congDanYeuCauRutHoSo : number;
  dungXuLy : number;
  daChuyenXuLyCoKetQua : number;
  // daTraKetQua : number;
  tongXuLy : number;
  choTraTrucTuyen :number;
  choTraTrucTiep :number;
  choTraBCCI :number;
}

