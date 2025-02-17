using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp;
public class NguoiTiepNhanThuTucDto : IDto
{
    public Guid Id { get; set; }
    public string? NguoiTiepNhan { get; set; }
    public string? TenTTHC { get; set; }
    public string? NguoiTiepNhanId { get; set; }
    public string? MaTTHC { get; set; }
    public bool? SuDung { get; set; }
    public Guid? DonViId { get; set; }
    public string? LoaiTTHC { get; set; }
    public string? MucDo { get; set; }
    public string? QuyetDinhCongBo { get; set; }
    public string? DinhKemQuyetDinh { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}

