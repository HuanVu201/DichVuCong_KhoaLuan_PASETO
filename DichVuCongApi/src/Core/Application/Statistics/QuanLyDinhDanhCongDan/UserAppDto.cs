using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
public class UserAppDto : IDto
{
    public string Id { get; set; }
    public string? FullName { get; set; }
    public string? UserName { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? GioiTinh { get; set; }
    public string? NgayThangNamSinh { get; set; }
    public string? TypeUser { get; set; }
    public string? NamSinh { get; set; }
    public bool? LockoutEnabled { get; set; }
    public bool? SuDungKhoTaiLieuDienTu { get; set; }
    public string? OfficeName { get; set; }
    public string? MaDinhDanhOfficeCode { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
