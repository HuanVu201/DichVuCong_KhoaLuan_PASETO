using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class DanhSachHoSoDaTraQuery : ICommand<IReadOnlyList<DanhSachHoSoDaTraDto>>
{
    public double? CacheTime { get; set; } = 10;

    [Newtonsoft.Json.JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;

}

public class DanhSachHoSoDaTraDto : IDto
{
    public string ChuHoSo { get; set; }
    public DateTime NgayTra { get; set; }
    public DateTime NgayHenTra { get; set; }
    public string MaHoSo { get; set; }
    public string TrangThaiHoSoId { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public int TotalCount { get; set; }
}