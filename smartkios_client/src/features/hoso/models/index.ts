import { IPhiLePhi } from "@/features/philephi/models";
import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models";

export interface IHoSo extends IBaseExt {
    fullName?:string;
    thuTucId?: string;
    donViId: string;
    linhVucId : string;
    dinhKemSoHoa ?: string;
    maHoSo : string;
    kenhThucHien : string;
    loaiDoiTuong : string;
    maDoiTuong: string;
    chuHoSo ?: string;
    soDienThoaiChuHoSo : string;
    emailChuHoSo : string;
    soGiayToChuHoSo : string;
    loaiGiayToChuHoSo : string;
    ngaySinhChuHoSo : string;
    tinhThanhChuHoSo : string;
    quanHuyenChuHoSo : string;
    xaPhuongChuHoSo : string;
    diaChiChuHoSo : string;
    uyQuyen: boolean;
    nguoiUyQuyen ?: string;
    soDienThoaiNguoiUyQuyen ?: string;
    emailNguoiUyQuyen ?: string;
    soGiayToNguoiUyQuyen ?: string;
    loaiGiayToNguoiUyQuyen ?: string;
    ngaySinhNguoiUyQuyen ?: string;
    tinhThanhNguoiUyQuyen ?: string;
    quanHuyenNguoiUyQuyen?: string; 
    xaPhuongNguoiUyQuyen ?: string;
    diaChiNguoiUyQuyen ?: string;
    trichYeuHoSo ?: string;
    ngayTiepNhan ?: string;
    ngayHenTra ?: string;
    trangThaiHoSoId : string;
    ngayTra : string;
    hinhThucTra : string;
    ngayKetThucXuLy : string;
    ghiChu : string;
    noiNopHoSo : string;
    hoSoCoThanhPhanSoHo : string;
    taiKhoanDuocXacThucVoiVNeID : string;
    duocThanhToanTrucTuyen : string;
    ngayTuChoi : string;
    ngayYeuCauBoSung : string;
    ngayCongDanBoSung: string;
    ngayHenTraCaNhan : string;
    loaiDinhDanh : string;
    soDinhDanh : string;
    ngayNopHoSo : string;
    tenTTHC?: string;
    maTTHC: string;
    maLinhVucChinh: string;
    tenLinhVuc: string;
    tenTruongHop: string;
    maTruongHop: string;
    truongHopId: string;
    thoiGianThucHien: number;
    loaiThoiGianThucHien: string;
    thongBaoEmail: boolean;
    thongBaoZalo: boolean;
    thongBaoSMS: boolean;
    nguoiXuLyTiep: string;
    buocXuLyTiep: string;
    nguoiNhanHoSo: string;
    nguoiDaXuLy: string;
    mucDo : string;
    soBoHoSo : string;
    tenBuocHienTai: string;
    buocHienTai : string;
    nguoiXuLyTruoc : string;
    buocXuLyTruoc: string;
    dangKyNhanHoSoQuaBCCIData?:string;
    trichYeuKetQua: string;
    dinhKemKetQua: string;
    yKienNguoiChuyenXuLy: string;
    dinhKemYKienNguoiChuyenXuLy: string;
    thongTinTiepNhanBoSung: string;
    hinhThucThu: string;
    soTien:string;
    maTrangThaiHoSo: string;
    thanhPhanThuTucs?: IThanhPhanThuTuc[];
    phiLePhis?: IPhiLePhi[];
    yeuCauThanhToans?: IYeuCauThanhToan[];
    thanhPhanHoSos?: IThanhPhanHoSo[];
    eFormData?: string;
    eForm?: string; // thtt
    nguoiGui?: string; // thtt
    edgeQuyTrinh?: string; // thtt
    nodeQuyTrinh?: string; // thtt
    nguoiTiepNhan?: string; // thtt
    nguoiNopHoSo?: string; // thtt
    tenDonVi?: string; 
    lyDoTuChoi?: string; 
    dinhKemTuChoi?: string; 
    groupName?: string
    catalog?: string
    danhGia?: string
    noiDungDanhGia?: string;
    eFormKetQuaData?: string;
    maDinhDanh?: string;
    phi?: string;
    lePhi?: string;
    laHoSoChungThuc: boolean;
    YeuCauBCCILayKetQua?:boolean;
    maVanDonBuuDien?:string;
}

export const TRANGTHAIBOSUNG = {
    "Yêu cầu một cửa bổ sung": "Yêu cầu một cửa bổ sung",
    "Yêu cầu công dân bổ sung": "Yêu cầu công dân bổ sung",
    "Công dân đã gửi bổ sung": "Công dân đã gửi bổ sung",
    "Hoàn thành bổ sung": "Hoàn thành bổ sung",
} as const
export const TRANGTHAITHUPHI = {
    "Chờ thanh toán": "Chờ thanh toán",
    "Đã thanh toán": "Đã thanh toán",
    "Hủy thanh toán": "Hủy thanh toán",
    "Hoàn phí": "Hoàn phí",
} as const
type KeyTrangThaiBoSung = keyof typeof TRANGTHAIBOSUNG
type KeyTrangThaiThuPhi = keyof typeof TRANGTHAITHUPHI
export interface ISearchHoSo extends IBasePagination, IBaseSearch, IPickSearch<IHoSo, "maLinhVucChinh" | "thuTucId"> {
    tiepNhanFrom?: string;
    tiepNhanTo?: string;
    henTraFrom?: string;
    henTraTo?: string;
    ngayGuiTo?: string;
    ngayGuiFrom?: string;
    byCurrentUser?: boolean;
    maTrangThai?: string;
    notInMaTrangThais?: string[];
    inMaTrangThais?: string[];
    nguoiDaXuLy?: string;
    nguoiXuLyTruoc?: string;
    kenhThucHien?: string;
    notEqKenhThucHien?: string;
    hinhThucTra?: string;
    groupCode?: string;
    nguoiNhanHoSo?: string;
    byNguoiGui?: boolean;
    trichYeuHoSo?: string;
    trangThaiBoSung?: KeyTrangThaiBoSung;
    nhanKetQuaBCCI?: boolean;
    trangThaiThuPhi?: KeyTrangThaiThuPhi;
    hinhThucThuPhi?: string;
    donViYeuCauThuPhi?: string;
    trangThaiTraKq?:string;
    donViTraKq?: string;
    laHoSoChungThuc?: boolean;
    searchKeys?: string;
    trangThaiChuaHoacKhongThuPhi?:boolean;
    daYeuCauBCCILayKetQua?: boolean;
}    
    
