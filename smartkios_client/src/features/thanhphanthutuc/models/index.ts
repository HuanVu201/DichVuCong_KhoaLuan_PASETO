import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IThanhPhanThuTuc extends IBaseExt {
    ten: string;
    ma: string;
    thuTucId: string;
    truongHopId: string;
    maGiayToKhoQuocGia?: string;
    dinhKem?: string;
    batBuoc: boolean;
    soBanChinh: number;
    soBanSao: number;
    nhanBanGiay: boolean;
    choPhepThemToKhai?: boolean;
}

export interface ISearchThanhPhanThuTuc extends IBasePagination, IBaseSearch, IPickSearch<IThanhPhanThuTuc, "truongHopId"> {

}