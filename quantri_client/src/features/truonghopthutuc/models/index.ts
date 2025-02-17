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
    thoiGianThucHienTrucTuyen?: number,
    loaiThoiGianThucHien: string,
    batBuocDinhKemKetQua: boolean,
    batBuocKySoKetQua: boolean,
    batBuocDungDiaBan: boolean,
    yeuCauNopPhiTrucTuyen: boolean,
    donViTiepNhanRieng: string,
    selectedDonViTiepNhanRieng: string[],
    eForm?: string,
    eFormKetQua?: string,
    eFormTemplate?: string,
    nodeQuyTrinh: string,
    edgeQuyTrinh: string,
    anThongTinLienHeNopTrucTuyen?: boolean,
    khongCoNgayHenTra?: boolean,
    khongThuBanGiay?: boolean,
    loaiDuLieuKetNoi?: string,    
    loaiBaoTroXaHoi?: string,
    maSoBieuMau? : string
    quyetDinh? :string,
    dinhKemQuyetDinh?: string
    noteNgayLamViec?: string
    noteTraKetQua?: string
}

export interface IGetDuLieuThemHoSo {
    ngayTiepNhan: string;
    ngayHenTra: string;
    tenTTHC: string;
    tenDonVi: string;
    diaChiNhanKetQuaTrucTiep?: string;
    mucDo?: string;
    maTTHC: string;
    trangThaiPhiLePhi: boolean,
    laThuTucChungThuc: boolean;
    donViTiepNhanRieng?: string;
    truongHopthuTuc: ITruongHopThuTuc
    tinhThanhDiaBan?: string;
    quanHuyenDiaBan?: string;
    xaPhuongDiaBan?: string;
    taiKhoan: IUser & { diaChiNoiOHienTai: { maDiaBan: string, tenDiaBan: string }[] }
    phiLePhis: IPhiLePhi[]
    thanhPhanThuTucs: IThanhPhanThuTuc[]
    ketQuaThuTucs: IKetQuaThuTuc[]
    urlVideoTutorial?: string
}

export interface ISearchTruongHopThuTuc extends IBasePagination, IBaseSearch, IPickSearch<ITruongHopThuTuc, "thuTucId"> {
    donViTiepNhan?: string;
    byUserOfficeCode?: boolean;
    khongNopTrucTuyen?: boolean;
}

export interface TruongHopThuTucQuyTrinhResponse extends Pick<ITruongHopThuTuc, "edgeQuyTrinh" | "nodeQuyTrinh"> {
    buocHienTai: string;
    nguoiNhanHoSo: string;
    fullName: string;
    quyetDinh? :string;
    dinhKemQuyetDinh? :string
}