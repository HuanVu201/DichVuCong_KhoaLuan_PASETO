import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
interface IDaiDienPhapLuat {
    hoVaTen: string;
    maLoaiGiayToChungThuc: string;
    loaiGiayToChungThuc: string;
    soGiayChungThuc: string;
    ngayCap: string; // Consider using Date type if you handle it as a date
    noiCap: string;
    quocTich: string;
    maQuocTich: number;
}

interface IDiaChi {
    maTinhThanh: number;
    tenTinhThanh: string;
    maQuanHuyen: number;
    tenQuanHuyen: string;
    maPhuongXa: number;
    tenPhuongXa: string;
    soNha: string;
    diaChiDayDu: string;
}

interface INganhNgheKinhDoanh {
    maNganh: string;
    tenNganh: string;
    laNganhChinh: number;
}

export interface ITraCuuHopTacXa  extends IBaseExt {
    maSoDoanhNghiep: string;
    maNoiBo: string;
    maSoHTX: string;
    maLoaiHinhHTX: string;
    loaiHinhHTX: string;
    tenTiengViet: string;
    tenVietTat: string;
    tenNuocNgoai: string | null;
    ngayDangKyLanDau: string; // Consider using Date type if you handle it as a date
    ngayDangKyThayDoi: string | null;
    soLanDangKyThayDoi: number | null;
    daiDienPhapLuat: IDaiDienPhapLuat;
    diaChiTruSo: IDiaChi[];
    nganhNgheKinhDoanh: INganhNgheKinhDoanh[];
}

export interface ISearchTraCuuHopTacXa extends IBasePagination, IBaseSearch, IPickSearch<ITraCuuHopTacXa,"maSoHTX"> {
  

}