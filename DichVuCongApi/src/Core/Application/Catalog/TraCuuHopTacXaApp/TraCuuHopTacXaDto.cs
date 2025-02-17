using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.TraCuuTraCuuHopTacXaApp;
public class TraCuuHopTacXaDto : IDto
{
    public Guid Id { get; set; }
    public Guid ThuTucid { get; set; }
    public Guid TraCuuThongTinDaonhNghiepId { get; set; }
    public int ThuTu { get; set; }

    public string TenThuTuc { get; set; }
    public string TenTraCuuThongTinDaonhNghiep { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}