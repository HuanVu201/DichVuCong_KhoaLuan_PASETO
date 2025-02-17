using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;
public class XuatPhieuHuongDanNopTrucTiepCommand : IQuery<object>
{
    public string? LoaiPhoi { get; set; }
    public string? Code { get; set; }
    public string? MaLinhVuc { get; set; }
    public string? MaTTHC { get; set; }
}

public class XuatPhieuHuongDanNopTrucTiepDto : IDto
{
    public string UrlPhoi { get; set; }
    public string Catalog { get; set; }
    public string GroupName { get; set; }
    public string MaTinh { get; set; }
    public string TenTinh { get; set; }
    public string SoDienThoaiDonVi { get; set; }
}