import { IPhiLePhi } from "@/features/philephi/models";
import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IUser } from "@/features/user/models";
import { IKetQuaThuTuc } from "@/features/ketquathutuc/models";
export interface ITruongHopThuTuc extends IBaseExt {
    ten: string,
    ma: string,
    thuTucId: string,
    thoiGianThucHien: number,
    loaiThoiGianThucHien: string,
    batBuocDinhKemKetQua: boolean,
    batBuocKySoKetQua: boolean,
    yeuCauNopPhiTrucTuyen: boolean,
    donViTiepNhanRieng: string,
    selectedDonViTiepNhanRieng: string[],
    eForm?: string,
    eFormKetQua?: string,
    eFormTemplate?: string,
    nodeQuyTrinh: string,
    edgeQuyTrinh: string,
    anThongTinLienHeNopTrucTuyen?: boolean,
}

export interface IGetDuLieuThemHoSo {
    ngayTiepNhan: string;
    ngayHenTra: string;
    tenTTHC: string;
    tenDonVi: string;
    mucDo?: string;
    maTTHC: string;
    laThuTucChungThuc: boolean;
    donViTiepNhanRieng?: string;
    truongHopthuTuc: ITruongHopThuTuc
    taiKhoan: IUser & {diaChiNoiOHienTai: {maDiaBan: string, tenDiaBan: string}[]}
    phiLePhis: IPhiLePhi[]
    thanhPhanThuTucs: IThanhPhanThuTuc[]
    ketQuaThuTucs: IKetQuaThuTuc[]
}

export interface ISearchTruongHopThuTuc extends IBasePagination, IBaseSearch, IPickSearch<ITruongHopThuTuc, "thuTucId">{
    donViTiepNhan?:string;
    byUserOfficeCode?:boolean;
}

export interface TruongHopThuTucQuyTrinhResponse extends Pick<ITruongHopThuTuc, "edgeQuyTrinh" | "nodeQuyTrinh"> {
    buocHienTai: string;
    nguoiNhanHoSo: string;
    fullName: string;
}