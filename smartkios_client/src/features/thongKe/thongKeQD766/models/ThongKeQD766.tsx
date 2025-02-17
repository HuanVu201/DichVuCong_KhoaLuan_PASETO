export interface IThongKeQD766Response {
  data: IThongKeQD766[];
}

export interface IThongKeQD766 {
  catalog?: string;
  maThongKe?: string;
  tenThongKe?: string;
  tongSo?: number; //16
  tongTiepNhan?: number; //5
  tongDaXuLy?: number; //10
  tongDangXuLy?: number; //13
  tongPhaiDongBoDvcqg?: number; //26
  tongDaDongBoDvcqg?: number; //27
  tongCoNghiaVuTaiChinh?: number; //28
  tiepNhanKyTruoc?: number; //7
  tiepNhanQuaMang?: number; //6
  tiepNhanTrucTiep?: number; //8
  tiepNhanBCCI?: number; //9
  daXuLyDungHan?: number; //11
  daXuLyQuaHan?: number; //12
  dangXuLyTrongHan?: number; //14
  dangXuLyQuaHan?: number; //15
  daTTTTQuaDvcqg?: number; //29
}
