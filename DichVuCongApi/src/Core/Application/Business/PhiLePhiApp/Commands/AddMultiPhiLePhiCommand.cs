using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Application.Abstractions.Messaging;


namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp.Commands;
public class AddMultiPhiLePhiCommand : ICommand

{
    public string? ThuTucId { get; set; }
    public string? TruongHopId { get; set; }
    public List<AddMultiPhiLePhiParams> dataAdd { get; set; }
}


public class AddMultiPhiLePhiParams
{
    public string? MA { get; set; }
    public string? MOTA { get; set; }
    public string? LOAI { get; set; }
    public string? DINHKEM { get; set; }
    public string? TEN { get; set; }
    public int? SOTIEN { get; set; }
    public string? TENTEP { get; set; }
    public string? URL { get; set; }
}