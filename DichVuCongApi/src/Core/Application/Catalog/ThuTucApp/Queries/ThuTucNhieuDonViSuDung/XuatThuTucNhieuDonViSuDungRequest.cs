using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries.ThuTucNhieuDonViSuDung;
public class XuatThuTucNhieuDonViSuDungRequest : IRequest<string>
{
    public string? TypeExport { get; set; }

}
