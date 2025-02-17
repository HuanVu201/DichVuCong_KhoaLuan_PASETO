import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface ILoaiNhomGiayToCaNhan extends IBaseExt {
    ten?: string
    soDinhDanh?: string
    ghiChu?: string
    loai?: string
}
export interface ITaiLieuGiayToCaNhan extends IBaseExt {
    tenGiayTo?: string
    duongDan?: string
    type?: string
    loaiNhomGiayToCaNhanId?: string
}

export interface ISearchLoaiNhomGiayToCaNhan extends IBasePagination, IBaseSearch, IPickSearch<ILoaiNhomGiayToCaNhan> {
    ten?: string
    soDinhDanh?: string
    ghiChu?: string
    loai?: string
}

export interface ISearchTaiLieuGiayToCaNhan extends IBasePagination, IBaseSearch, IPickSearch<ITaiLieuGiayToCaNhan> {
    tenGiayTo?: string
    duongDan?: string
    type?: string
    loaiNhomGiayToCaNhanId?: string
}

export interface IThongKeTaiLieuGiayToCongDan {
    TenLoaiNhom?: string
    SoLuong?: number
}

// export interface IThongKeNguoiSuDungKho extends IBaseExt {
//     soDinhDanh?: string
//     fullName?: string
//     tongDungLuong?: number
//     soLuong?: number

//     soLuongCongDanTaiLen?: number
//     tongDungLuongCongDanTaiLen?: number

//     soLuongKetQuaGiaiQuyet?: number
//     tongDungLuongKetQuaGiaiQuyet?: number

//     soLuongThanhPhanHoSo?: number
//     tongDungLuongThanhPhanHoSo?: number
// }


// export interface ISearchThongKeNguoiSuDungKho extends IBasePagination, IBaseSearch, IPickSearch<IThongKeNguoiSuDungKho> {
//     soDinhDanh?: string
//     fullName?: string
// }
