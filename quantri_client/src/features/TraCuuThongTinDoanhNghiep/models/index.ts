import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ITraCuuThongTinDoanhNghiep extends IBaseExt {
        maNoiBo: string;
        maSoDoanhNghiep: string;
        soGCNDKKD: string;
        maLoaiHinhDN: string;
        loaiHinhDN: string;
        tenTiengViet: string;
        tenNuocNgoai: string;
        tenVietTat: string;
        ngayDangKyLanDau: string;
        ngayDangKyThayDoi: string;
        soLanDangKyThayDoi: number;
        tinhTrangPhapLy: Array<{
            tinhTrangPhapLy: string;
            maTinhTrangPhapLy: string;
            ngayBatDauTamNgung: string | null;
            ngayKetThucTamNgung: string | null;
            lyDoTamNgung: string | null;
        }>;
        daiDienPhapLuat: Array<{
            thongTinCaNhan: Array<{
                hoVaTen: string;
                loaiGiayToChungThuc: string;
                maLoaiGiayToChungThuc: string;
                soGiayChungThuc: string;
                ngayCap: string;
                noiCap: string;
                quocTich: string;
                maQuocTich: number;
            }>;
        }>;
        diaChiTruSo: Array<{
            diaChi: Array<{
                quocGia: string;
                maQuocGia: string;
                tenTinhThanh: string;
                maTinhThanh: number;
                tenQuanHuyen: string;
                maQuanHuyen: number;
                tenPhuongXa: string;
                maPhuongXa: number;
                diaChi: string;
                soNha: string;
            }>;
        }>;
        nganhNgheKinhDoanh: Array<{
            maNganh: string | null;
            tenNganh: string | null;
            laNganhChinh: number;
        }>;
}

export interface ISearchTraCuuThongTinDoanhNghiep extends IBasePagination, IBaseSearch, IPickSearch<ITraCuuThongTinDoanhNghiep,"maSoDoanhNghiep"> {
  

}