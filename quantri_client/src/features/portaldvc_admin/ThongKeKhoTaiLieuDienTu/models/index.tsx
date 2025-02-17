import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";

export interface IThongKeKhoTaiLieuDienTu extends IBaseExt {
    soDinhDanh?: string;
    userName?: string;
    fullName?: string;
    soLuongKho?: string;
    soLuongGiayTo?: string;
    tongDungLuong?: number;
}
export interface IDataChartThongKeKhoTaiLieuDienTu {
    caNhanSuDung?: number;
    caNhanKhongSuDung?: number;
    toChucSuDung?: number;
    toChucKhongSuDung?: number;
}

export interface ISearchThongKeKhoTaiLieuDienTuParams extends IBasePagination, IBaseSearch, IPickSearch<IThongKeKhoTaiLieuDienTu> {
    doiTuong?: string;
    soDinhDanh?: string
    userName?: string;
    fullName?: string;
    phoneNumber?: string;
    tuNgay?:string
    denNgay?:string
}


export interface IExportThongKeKhoTaiLieuParams  {
    daDinhDanh?: boolean
    doTuoi?: string;
    doiTuong?: string;
    gioiTinh?: string;
    pageSize?: number;
    pageNumber?: number;
  }
  
