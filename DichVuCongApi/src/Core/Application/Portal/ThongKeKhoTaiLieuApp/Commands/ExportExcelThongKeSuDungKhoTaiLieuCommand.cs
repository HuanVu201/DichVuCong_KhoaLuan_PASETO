using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Minio;

namespace TD.DichVuCongApi.Application.Portal.ThongKeKhoTaiLieuApp.Commands;
public class ExportExcelThongKeSuDungKhoTaiLieuCommand : IRequest<StreamDataFile>
{
    public string? DoiTuong { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }

    public new int PageSize { get; set; } = 100;
    public new int PageNumber { get; set; } = 1;
}
