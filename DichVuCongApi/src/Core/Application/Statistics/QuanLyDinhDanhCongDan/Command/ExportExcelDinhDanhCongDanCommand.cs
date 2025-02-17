using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Minio;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan.Command;
public class ExportExcelDinhDanhCongDanCommand : IRequest<string>
{
    public string? TypeExport { get; set; } = "excel";
    public bool DaDinhDanh { get; set; }
    public string? DoTuoi { get; set; }
    public string? DoiTuong { get; set; }
    public string? GioiTinh { get; set; }
    public string? FullName { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public new int PageSize { get; set; } = 100;
    public new int PageNumber { get; set; } = 1;
}