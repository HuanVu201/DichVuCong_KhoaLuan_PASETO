import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IService_Logs_Mgr extends IBaseExt {
    id: string; // Unique identifier for the log entry
    service: string; // Name of the service, e.g., "Zalo"
    sender: string | null; // Sender can be a string or null
    receiver: string; // Receiver's contact information
    isSucceed: boolean; // Status of the operation (success or failure)
    request: string; // JSON string representing the request details
    response: string; // JSON string representing the response details
    maHoSo: string; // Document code or identifier
    createdAt: string; // Timestamp of when the log entry was created (ISO 8601 format)
}
export interface ISearchService_Logs_Mgr extends IBasePagination, IBaseSearch, IPickSearch<IService_Logs_Mgr> {
    maHoSo?: string,
}

export interface IRequestSMS {
    soDienThoai: string;     // Số điện thoại người nhận
    noiDungthamSo: string;   // Nội dung tham số của tin nhắn
    idMauTin: string;        // ID mẫu tin nhắn
    gioGui: string;          // Thời gian gửi tin nhắn
    maPhanMem: string;       // Mã phần mềm gửi tin nhắn
    nhaMang: string;         // Nhà mạng cung cấp dịch vụ
    MaHoSo: string;          // Mã hồ sơ liên quan
}

export interface IRequestZalo {
    Banner: string | null;  // Banner có thể là chuỗi hoặc null
    SoDienThoai: string;   // Số điện thoại người nhận
    TenHoSo: string;       // Tên hồ sơ
    TenNguoiDan: string;   // Tên người dân
    MaHoSo: string;        // Mã hồ sơ
    TrangThai: string;     // Trạng thái
    TenDichVu: string;     // Tên dịch vụ
    LoiNhan: string;       // Lời nhắn
    CtaLink: string;       // Link CTA
    CtaIcon: string | null; // Icon CTA có thể là chuỗi hoặc null
    CtaText: string;       // Văn bản CTA
  }

export interface IRequestEmail {
    To: string[];           // Danh sách các địa chỉ email người nhận
    Subject: string;       // Tiêu đề của email
    MaHoSo: string;        // Mã hồ sơ
    Body: string;          // Nội dung của email dưới dạng HTML
    From?: string | null;  // Địa chỉ email người gửi (có thể là null)
    DisplayName?: string | null; // Tên hiển thị của người gửi (có thể là null)
    ReplyTo?: string | null; // Địa chỉ email để phản hồi (có thể là null)
    ReplyToName?: string | null; // Tên người gửi phản hồi (có thể là null)
    Bcc?: string[];        // Danh sách các địa chỉ email ẩn (có thể gửi cho các địa chỉ này mà không ai thấy)
    Cc?: string[];         // Danh sách các địa chỉ email sao chép (các địa chỉ này sẽ thấy nhau)
    AttachmentData?: object; // Dữ liệu đính kèm (có thể là một object, hoặc có thể không có)
    Headers?: object;      // Headers của email (có thể là một object, hoặc có thể không có)
}

export interface IRequestEMC {
    CodeProfile: string;       // Mã hồ sơ
    SiteId: string | null;     // ID của site, có thể null
    CodeTTHC: string;          // Mã thủ tục hành chính
    NameTTHC: string;          // Tên thủ tục hành chính
    MaHoSo: string;            // Mã hồ sơ, tương tự như CodeProfile
    Status: string;            // Trạng thái
    FormsReception: string;    // Số mẫu tiếp nhận
    FormsPayments: string;     // Số mẫu thanh toán
    Level: string;             // Cấp độ
    IsFromDVCQG: boolean | null; // Có phải từ DVC Quốc Gia không, có thể null
    IsDVCBC: boolean | null;   // Có phải DVC Bộ Chỉ huy không, có thể null
    Data: any;                 // Dữ liệu bổ sung, kiểu dữ liệu không xác định
    User: any;                 // Thông tin người dùng, kiểu dữ liệu không xác định
}

export interface IRequestTBKM {
    service: string;                 // Dịch vụ
    isUpdating: string;              // Trạng thái cập nhật
    data: {
        MaHoSoQG: string;            // Mã hồ sơ quốc gia
        MaTTHC: string;              // Mã thủ tục hành chính
        SoVanBan: string;            // Số văn bản
        NgayNopHoSo: string;         // Ngày nộp hồ sơ (định dạng: YYYYMMDDHHMMSS)
        TenThuongNhan: string;       // Tên thương nhân
        DiaChiDoanhNghiep: {
            MaTinh: string;          // Mã tỉnh
            MaHuyen: string;         // Mã huyện
            MaXa: string;            // Mã xã
            DiaChiChiTiet: string;   // Địa chỉ chi tiết
        };
        DienThoai: string;           // Số điện thoại
        Fax: string;                 // Số fax (có thể là chuỗi rỗng)
        Email: string;               // Địa chỉ email
        MaSoThue: string;            // Mã số thuế
        NguoiLienHe: string;         // Người liên hệ
        SoDienThoaiNguoiLienHe: string; // Số điện thoại của người liên hệ
        ThongTinDaNop: {
            MaHoSoQGDNP: string;     // Mã hồ sơ quốc gia đã nộp
            SoVanBanDaNopDNP: string; // Số văn bản đã nộp
            NgayNopHoSoDNP: string;  // Ngày nộp hồ sơ đã nộp
            TenChuongTrinhKhuyenMaiDNP: string; // Tên chương trình khuyến mại đã nộp
            ThoiGianKhuyenMaiTuDNP: string;     // Thời gian khuyến mại từ
            ThoiGianKhuyenMaiDenDNP: string;    // Thời gian khuyến mại đến
            DiaBanKhuyenMaiDNP: string;         // Địa bàn khuyến mại
        };
        ThongTinSuaDoi: {
            SoLuongHangHoaDichVuKM: string;   // Số lượng hàng hóa dịch vụ khuyến mại
            HangHoaDichVuKM: string;          // Hàng hóa dịch vụ khuyến mại
            CoCauGiaiThuongKM: string | null; // Cơ cấu giải thưởng khuyến mại (có thể là null)
            NoiDungChiTietKM: string | null;  // Nội dung chi tiết khuyến mại (có thể là null)
            HangHoaDichVuDungKM: string | null; // Hàng hóa dịch vụ không dùng khuyến mại (có thể là null)
        };
        LyDoDieuChinh: string;          // Lý do điều chỉnh
        NoiDungCamKetKhac: string;     // Nội dung cam kết khác
        TenTepDangKy: string;          // Tên tập đăng ký
        URLTepDangKy: string;          // URL tập đăng ký
    };
}
export interface IResponeTBKM {
    ClassName: string;
    Message: string;
    Data: any; // Thay đổi thành kiểu dữ liệu cụ thể nếu có thông tin chi tiết hơn
    InnerException: any; // Thay đổi thành kiểu dữ liệu cụ thể nếu có thông tin chi tiết hơn
    HelpURL: string | null;
    StackTraceString: string;
    RemoteStackTraceString: string | null;
    RemoteStackIndex: number;
    ExceptionMethod: string | null;
    HResult: number;
    Source: string;
    WatsonBuckets: any; // Thay đổi thành kiểu dữ liệu cụ thể nếu có thông tin chi tiết hơn
    ObjectName: string;
}

export interface IResponeZalo {
    Message: string; // Thông điệp lỗi hoặc thông tin phản hồi từ API
}

export interface IResponeEMC {
    CodeProfile: string;
    SiteId: string | null;  // SiteId có thể là null
    CodeTTHC: string;
    NameTTHC: string;
    MaHoSo: string;
    Status: string;
    FormsReception: string;
    FormsPayments: string;
    Level: string;
    IsFromDVCQG: boolean | null; // IsFromDVCQG có thể là null
    IsDVCBC: boolean | null;    // IsDVCBC có thể là null
    Data: unknown; // Giả sử Data có thể là bất kỳ loại nào, có thể cần làm rõ hơn nếu biết kiểu dữ liệu chính xác
    User: unknown; // Giả sử User có thể là bất kỳ loại nào, có thể cần làm rõ hơn nếu biết kiểu dữ liệu chính xác
}