namespace TD.DichVuCongApi.Application.Common.KetNoi.DVC.KhoSoHoaDVCQG;
public static class KhoSoHoaDVCQGParams
{
    public class DanhSachDanhMucKetQuaData
    {
        public string MaKetQua { get; set; }
        public string SoKyHieu { get; set; }
    }
    public class GetDanhSachKetQuaCongDanRequest
    {
        public string MaThuTuc { get; set; }
        public List<DanhSachDanhMucKetQuaData> DanhSachDanhMucKetQua { get; set; }
    }
    public class GetDanhSachKetQuaCanBoRequest
    {
        public string SoDinhDanhChuSoHuu { get; set; }
        public string MaThuTuc { get; set; }
        public List<DanhSachDanhMucKetQuaData> DanhSachDanhMucKetQua { get; set; }
    }
    public class GetDanhSachKetQuaCongDanWithoutDanhMucRequest
    {
        public string MaThuTuc { get; set; }
    }
    public class GetDanhSachKetQuaCanBoWithoutDanhMucRequest
    {
        public string SoDinhDanhChuSoHuu { get; set; }
        public string MaThuTuc { get; set; }
    }
    public class GetDanhSachKetQuaRequest
    {
        public string SoDinhDanhChuSoHuu { get; set; }
        public string HoTenNguoiYeuCau { get; set; }
        public string KenhThucHien { get; set; }
        public string SoDinhDanhNguoiYeuCau { get; set; }
        public string MaThuTuc { get; set; }
        public List<DanhSachDanhMucKetQuaData> DanhSachDanhMucKetQua { get; set; }
    }

    public class GetKetQuaByURLRequest
    {
        public string CoQuanChuQuan { get; set; }
        public List<GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua_DanhSachTepDinhKem> DanhSachTepDinhKem { get; set; }
    }

    public class GetListKetQuaByUrlRequest
    {
        public string SoGiayToChuHoSo { get; set; }
        public string Nguon { get; set; }
        public List<GetKetQuaByURLRequestDongBo> DanhSachKetQuas { get; set; }
    }
    public class GetKetQuaByURLRequestDongBo
    {
        public string CoQuanChuQuan { get; set; }
        public string TenGiayTo { get; set; }
        public string SoKyHieu { get; set; }
        public List<GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua_DanhSachTepDinhKem> DanhSachTepDinhKem { get; set; }
    }

    public class GetKetQuaByURLRequestBodyDVCQG
    {
        public string CoQuanChuQuan { get; set; }
        public string DuongDan { get; set; }
    }
    public class GetKetQuaByURLRequestBodyDVCQGWithTenTep
    {
        public string CoQuanChuQuan { get; set; }
        public string DuongDan { get; set; }
        public string TenTep { get; set; }
    }

    public class GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua_DanhSachTepDinhKem
    {
        public string TenTep { get; set; }
        public string DuongDan { get; set; }
    }
    public class GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua
    {
        public string MaKetQua { get; set; }
        public string TenGiayTo { get; set; }
        public string SoKyHieu { get; set; }
        public string CoQuanChuQuan { get; set; }
        public List<GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua_DanhSachTepDinhKem> DanhSachTepDinhKem { get; set; }
    }
    public class GetDanhSachKetQuaResponse_Result
    {
        public List<GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua> DanhSachGiayToKetQua { get; set; }
    }

    public class GetDanhSachKetQuaResponse
    {
        public string errorCode { get; set; }
        public string message { get; set; }
        public string signature { get; set; }
        public GetDanhSachKetQuaResponse_Result result { get; set; }
    }
    public class UploadResult
    {
        public string FileName { get; set; }
        public string CoQuanChuQuan { get; set; }
        public string SoKyHieu { get; set; }
        public string Path { get; set; }
        public bool IsSucceed { get; set; }
        public string Error { get; set; }
    }
}

