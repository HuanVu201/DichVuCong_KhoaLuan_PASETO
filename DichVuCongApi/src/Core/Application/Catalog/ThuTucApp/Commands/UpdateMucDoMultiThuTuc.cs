using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
public class UpdateMucDoMultiThuTuc : ICommand
{
    public List<string> DonViThuTucs { get; set; }
    public List<string> MaTTHCs { get; set; }
    public string MucDo { get; set; }
}
