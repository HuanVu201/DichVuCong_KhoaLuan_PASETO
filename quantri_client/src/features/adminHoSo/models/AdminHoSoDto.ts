
import { IBaseExt } from "@/models";

export interface IAdminHoSo extends IBaseExt {
    donViId?: string;

    maHoSo?: string;
    
    donViQuanLy?: string;
    choXacNhan?: boolean;
    kenhThucHien?: string;
    loaiDoiTuong?: string;
    maDoiTuong?: string;
    chuHoSo?: string;
    soDienThoaiChuHoSo?: string;
    emailChuHoSo?: string;
    soGiayToChuHoSo?: string;
    laHoSoChungThuc? : boolean
    loaiGiayToChuHoSo?: string;
    
    ngaySinhChuHoSo?: string;
    
    tinhThanhChuHoSo?: string;
    
    quanHuyenChuHoSo?: string;
    
    xaPhuongChuHoSo?: string;
    ngayBanHanhKetQua?: string;
    ngayKyKetQua?: string;
    diaChiChuHoSo?: string;
    uyQuyen?: boolean;
    
    nguoiUyQuyen?: string;
    
    
    soDienThoaiNguoiUyQuyen?: string;
    
    
    emailNguoiUyQuyen?: string;
    
    
    soGiayToNguoiUyQuyen?: string;
    
    
    loaiGiayToNguoiUyQuyen?: string;
    
    
    ngaySinhNguoiUyQuyen?: string;
    
    tinhThanhNguoiUyQuyen?: string;
    
    quanHuyenNguoiUyQuyen?: string;
    
    xaPhuongNguoiUyQuyen?: string;
    
    diaChiNguoiUyQuyen?: string;
    
    trichYeuHoSo?: string;
    ngayTiepNhan?: string;
    ngayHenTra?: string;
    
    
    trangThaiHoSoId?: string;
    ngayTra?: string;
    
    hinhThucTra?: string;
    ngayKetThucXuLy?: string;
    
    ghiChu?: string;
    
    
    noiNopHoSo?: string;
    
    
    hoSoCoThanhPhanSoHo?: string;
    
    
    taiKhoanDuocXacThucVoiVNeID?: string;
    
    
    duocThanhToanTrucTuyen?: string;
    ngayTuChoi?: string;
    
    
    loaiDinhDanh?: string;
    
    
    soDinhDanh?: string;
    ngayNopHoSo?: string;
    
    
    maTTHC?: string;
    
    
    maLinhVuc?: string;
    
    tenLinhVuc?: string;
    
    tenTruongHop?: string;
    
    
    maTruongHop?: string;
    
    
    truongHopId?: string;
    thoiGianThucHien?: number;
    
    loaiThoiGianThucHien?: string;
    thongBaoEmail?: boolean; 
    thongBaoZalo?: boolean; 
    thongBaoSMS?: boolean; 
    
    
    nguoiXuLyTiep?: string;
    
    
    buocXuLyTiep?: string;
    
    
    nguoiNhanHoSo?: string;
    
    
    nguoiDaXuLy?: string;
    
    mucDo?: string;
    soBoHoSo?: number;
    
    tenBuocHienTai?: string;
    
    
    buocHienTai?: string;
    
    
    nguoiXuLyTruoc?: string;
    
    
    buocXuLyTruoc?: string;
    
    dangKyNhanHoSoQuaBCCIData?: string;
    
    trichYeuKetQua?: string;
    
    dinhKemKetQua?: string;
    
    
    yKienNguoiChuyenXuLy?: string;
    
    dinhKemYKienNguoiChuyenXuLy?: string;
    
    
    nguoiDangXuLy?: string;
    chuyenNoiBo?: boolean;
    
    lyDoXoa?: string;
    ngayTiepNhanCaNhan?: string;
    ngayHenTraCaNhan?: string;
    
    trangThaiBoSung?: string;
    
    trangThaiTruoc?: string;
    ngayYeuCauBoSung?: string;
    
    lyDoBoSung?: string;
    
    dinhKemBoSung?: string;
    
    thongTinTiepNhanBoSung?: string;
    thanhPhanBoSung?: string;
    
    nguoiGui?: string;
    eFormData?: string;
    eFormKetQuaData?: string;
    
    lyDoTuChoi?: string;
    
    dinhKemTuChoi?: string;
    choBanHanh?: boolean;
    ketQuaDaySangQLVB?: string;
    ngayCongDanBoSung?: string;
    thoiHanBoSung?: number;
    
    noiDungBoSung?: string;
    daSoHoaKetQua?: boolean;
    
    dinhKemSoHoa?: string;
    trangThaiTraKq?: boolean;
    
    
    donViTraKq?: string;
}