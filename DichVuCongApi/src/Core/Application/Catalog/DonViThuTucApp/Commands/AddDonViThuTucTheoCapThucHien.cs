using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
public class AddDonViThuTucTheoCapThucHien : ICommand
{
    public List<AddDonViThuTucTheoCapThucHienElm> data { get; set; } = new List<AddDonViThuTucTheoCapThucHienElm>();
}

public class AddDonViThuTucTheoCapThucHienElm
{
    public string MaTTHC { get; set; }
    public string CapThucHien { get; set; }
    public string MucDo { get; set;}
    public string DonViThucHienId { get; set; }
    
}