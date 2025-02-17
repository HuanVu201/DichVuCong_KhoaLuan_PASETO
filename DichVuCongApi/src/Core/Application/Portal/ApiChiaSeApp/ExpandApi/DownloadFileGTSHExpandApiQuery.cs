using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Minio;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
public class DownloadFileGTSHExpandApiQuery : IRequest<Result<List<FileRes>>>
{
    public string? MaDinhDanh { get; set; }
    public string? ApiEx { get; set; } = "DownloadFileGTSHEx";
}
