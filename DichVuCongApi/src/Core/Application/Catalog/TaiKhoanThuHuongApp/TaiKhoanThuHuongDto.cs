

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Application.Catalog.TaiKhoanThuHuongApp;


public class TaiKhoanThuHuongDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public Guid Id { get; set; }
    public string DonViId { get; set; }
    public string TKThuHuong { get; set; }
    public string TenTKThuHuong { get; set; }
    public string MaNHThuHuong { get; set; } 
    public string MoTa { get; set; } 
    public string Module { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
