using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.LienThongNVTCDVCQG;
public class AddLienThongNVTCDVCQuocGiaCommand : ICommand<Guid>
{
    public string File { get; set; } = string.Empty;
    public string TrangThai { get; set; } = string.Empty;
    public string Loai { get; set; } = string.Empty;
}
