import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ITraCuuHoKinhDoanh extends IBaseExt {
    maNoiBo: string;
    maSoHKD: string;
    maSoDangKyHKD: string;
    foundinG_DATE: string;
    maLoaiHinhHKD: string;
    loaiHinhHKD: string;
    tenTiengViet: string;
    tenVietTat: string | null;
    tenNuocNgoai: string | null;
    ngayDangKyLanDau: string;
    ngayDangKyThayDoi: string | null;
    soLanDangKyThayDoi: number;
    chuHoKinhDoanh: Array<{
        hoVaTen: string;
        loaiGiayToChungThuc: string;
        maLoaiGiayToChungThuc: string;
        soGiayChungThuc: string;
        ngayCap: string;
        noiCap: string;
        quocTich: string;
        maQuocTich: number;
    }>;
    diaChiTruSo: Array<{
        maTinhThanh: number;
        tenTinhThanh: string;
        maQuanHuyen: number;
        tenQuanHuyen: string;
        maPhuongXa: number;
        tenPhuongXa: string;
        soNha: string;
        diaChiDayDu: string;
    }>;
    nganhNgheKinhDoanh: Array<{
        maNganh: string | null;
        tenNganh: string | null;
        laNganhChinh: number;
    }>;
}

export interface ISearchTraCuuHoKinhDoanh extends IBasePagination, IBaseSearch, IPickSearch<ITraCuuHoKinhDoanh,"maSoHKD"> {
  

}