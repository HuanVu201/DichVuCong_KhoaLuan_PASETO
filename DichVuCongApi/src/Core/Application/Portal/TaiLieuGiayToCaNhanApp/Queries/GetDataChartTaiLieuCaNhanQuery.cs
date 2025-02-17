using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp.Queries;
public class GetDataChartTaiLieuCaNhanQuery : IRequest<Result<string>>
{
    public string Type { get; set; } = string.Empty; // Loại giấy tờ/Nhóm giấy tờ
}

public class DataChartTaiLieuCaNhanRes
{
    public string TenLoaiNhom { get; set; } = string.Empty;
    public int SoLuong { get; set; }

}