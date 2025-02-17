import { IBaseExt, IBasePagination, IPickSearch } from "@/models";

export interface IHoSoBoSung extends IBaseExt{
    maHoSo : string;
    noiDungBoSung : string;
    dinhKemNoiDungBoSung : string;
    ngayBoSung : string;
    nguoiYeuCauBoSung : string;
    ngayHenTraTruoc : string;
    ngayTiepNhanBoSung : string;
    ngayHenTraMoi : string;
    trangThaiBoSung : string;
    thanhPhanBoSung : string;
    thongTinTiepNhan : string;
    danhSachGiayToBoSung : string;
    nguoiTiepNhanBoSung : string;
    nguoiTiepNhanBoSungFullName : string;
    nguoiYeuCauBoSungFullName : string;
} 

export interface ISearchHoSoBoSung extends IBasePagination, IPickSearch<IHoSoBoSung, "maHoSo"> {
}