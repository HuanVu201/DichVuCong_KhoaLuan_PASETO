using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class YeuCauThuPhiCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string HinhThucThu { get; set; }
    public int PhiThu { get; set; }
    public int LePhiThu { get; set; }
    public bool? CoLuuVet { get; set; } = true;
    public int TongTien { get; set; }
    public List<YeuCauThuPhi_PhiLePhi> PhiLePhi { get; set; }
}

public class YeuCauThuPhi_PhiLePhi
{
    public DefaultIdType Id { get; set; }
    public string Loai { get; set; }
    public int SoTien { get; set; }
    public string Ten { get; set; }
}