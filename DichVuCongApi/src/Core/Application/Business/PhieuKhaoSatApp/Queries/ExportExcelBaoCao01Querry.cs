using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Minio;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;
public class ExportExcelBaoCao01Querry : IRequest<StreamDataFile>
{
    public string? DonVi { get; set; }
    public string? Quy { get; set; }
    public string? Nam { get; set; }
    public bool? Removed { get; set; } = false;
}
