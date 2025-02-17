import { IBaseExt, IBasePagination, IPickSearch } from "../../../../models";
import { IKenhTin } from "../../kenhtin/models";
import { ITrangThai } from "../../trangthai/models";
import {Dayjs} from 'dayjs'
export interface ITinBai extends IBaseExt {
    tieuDe : string,
    ngayBanHanh : string | Dayjs | null,
    ngayKetThuc : string | Dayjs | string,
    trichYeu : string,
    noiDung : string,
    nguonTin : string,
    kenhTinId : string,
    trangThai : ITrangThai,
    trangThaiId : string,
    kenhTin : IKenhTin,
    anhDaiDien : string,
    fileDinhKem : string,
    tacGia : string,
    choPhepBinhLuan : boolean,
    hienThiLenTrangChu : boolean,
    tinNoiBat : boolean
}

export interface ISearchTinBai extends IBasePagination, IPickSearch<ITinBai, "tieuDe" | "ngayBanHanh" | "ngayKetThuc" | "trichYeu" | "kenhTinId" | "trangThaiId" | "tinNoiBat"> {

}