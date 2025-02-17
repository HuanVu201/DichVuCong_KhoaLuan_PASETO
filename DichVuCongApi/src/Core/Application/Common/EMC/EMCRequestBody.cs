
namespace TD.DichVuCongApi.Application.Common.EMC;
public class EMCRequestBody
{
    public string CodeProfile { get; set; }
    public int? SiteId { get; set; }
    public string CodeTTHC { get; set; }
    public string NameTTHC { get; set; }
    public string MaHoSo { get; set; }
    public string Status { get; set; }
    public string? FormsReception { get; set; }
    public string FormsPayments { get; set; }
    public string Level { get; set; }
    /// <summary>
    /// truyền LoaiDuLieuKetNoi từ hoso.
    /// </summary>
    public string? IsFromDVCQG { get; set; }
    public string? IsDVCBC { get; set; }
    public string? Data { get; set; }
    public string? User { get; set; }
}

public enum StatusEnum
{
    Khac = 0,
    TiepNhan = 1,
    PhanCongXuLy = 4,
    DangXuLy = 2,
    TraKetQua = 3,
}
public enum HinhThucEnum
{
    TrucTuyen = 1,
    TrucTiep = 2,
}

public enum LevelEnum
{
    DVCTrucTiepMotPhan = 0,
    DVCTrucTiepToanTrinh = 1,
    DVCTrucTuyenMotPhan = 3,
    DVCTrucTuyenToanTrinh = 4,
}

public enum IsFromDVCQGEnum
{
    FromDVCQG = 1,
    NotFromDVCQG = 0,
}
public enum HinhThucThanhToanEnum
{
    Online = 1,
    TrucTiep = 2,
    KhongThanhToan = 0
}
public enum IsDVCBCEnum
{
    TrucTiepQuaNhan = 0,
    VnPost = 1,
    Khac = 2,
}