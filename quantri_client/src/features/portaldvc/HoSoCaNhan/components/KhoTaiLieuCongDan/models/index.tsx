import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface ITaiLieuLuuTruCongDan extends IBaseExt {
    idChiaSe?: string
    tenGiayTo?: string
    duongDan?: string
    dungLuong?: number
    soLuong?: number
    nguon?: string
    soDinhDanhNhan?: string
    taiLieuLuuTruId?: string
    soLuotTaiSuDung?: number
    loaiGiayToId?: string
    loaiGiayTo?: string
    khoLuuTruId?: string;
    eformData?: any
    type?: string
    tenLoaiNhomGiayToCaNhan?: string
    loaiNhomGiayToCaNhanId?: string
    maLinhVuc?: string
}

export interface IDataChartTaiLieuCongDan {
    dataValue: number
    conLai: number
}

export interface ISearchTaiLieuLuuTruCongDan extends IBasePagination, IBaseSearch, IPickSearch<ITaiLieuLuuTruCongDan> {
    tenGiayTo?: string
    duongDan?: string
    nguon?: string
}

export interface IThongKeNguoiSuDungKho extends IBaseExt {
    soDinhDanh?: string
    fullName?: string
    tongDungLuong?: number
    soLuong?: number

    soLuongCongDanTaiLen?: number
    tongDungLuongCongDanTaiLen?: number

    soLuongKetQuaGiaiQuyet?: number
    tongDungLuongKetQuaGiaiQuyet?: number

    soLuongThanhPhanHoSo?: number
    tongDungLuongThanhPhanHoSo?: number
}


export interface ISearchThongKeNguoiSuDungKho extends IBasePagination, IBaseSearch, IPickSearch<IThongKeNguoiSuDungKho> {
    soDinhDanh?: string
    fullName?: string,
    tuNgay?:string,
    denNgay?: string,
}

export const Nguon_CongDanTaiLen = "Công dân tải lên";
export const Nguon_KetQuaGiaiQuyetHoSo = "Kết quả giải quyết hồ sơ";
export const Nguon_ThanhPhanHoSo = "Thành phần hồ sơ";
export const Nguon_DVCQG = "Dịch vụ công quốc gia";