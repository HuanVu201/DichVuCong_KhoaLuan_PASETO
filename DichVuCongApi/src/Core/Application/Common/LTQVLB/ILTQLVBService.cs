using TD.DichVuCongApi.Application.Business.HoSoApp;

namespace TD.DichVuCongApi.Application.Common.LTQVLB;
public interface ILTQLVBService : ITransientService
{
    Task<LTQLVBResponse<string>> PostData(string data);
}

public class LTQLVBResponse<T>
{
    public T? data { get; set; }
    public LTQLVBResponseError error { get; set; }
}

public class LTQLVBResponseError
{
    public int code { get; set; }
    public string internalMessage { get; set; }
    public string userMessage { get; set; }
}

public class LTQLVBSignedDocResponse
{
    public string IDHoSo { get; set; }
    public string MaHoSo { get; set; }
    public DonViLienThongQLVB DonVi { get; set; }
    public VanBanDiQLVB VanBanDi { get; set; }
    public string ThamSoAn { get; set; }
    public string HccLinkAPI { get; set; }
    public string LoaiHSLienthong { get; set; }
    public string LoaiKetQua { get; set; }
}

public class VanBanDiQLVB
{
    public string TrichYeu { get; set; }
    public string? LoaiVanBan { get; set; }
    public string NgayBanHanh { get; set; }
    public string NgayKy { get; set; }
    public string NguoiKy { get; set; }
    public string ChucVu { get; set; }
    public string NguoiSoan { get; set; }
    public string SoKyHieu { get; set; }
    public List<DinhKemDuThaoLienThongQLVB> DinhKem { get; set; }
    public List<DinhKemDuThaoLienThongQLVB> ThanhPhanHoSo { get; set; }
    public string TenHoSo { get; set; }
    public string ThuTuc { get; set; }
    public string ThamSoAn { get; set; }
    public string HccLinkAPI { get; set; }
    
}