using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class UpdateNgayNopSauKhiNopPhiRequest : ICommand
{
    public UpdateNgayNopSauKhiNopPhiRequest(string maHoSo)
    {
        MaHoSo = maHoSo;
    }

    public string MaHoSo { get; set; } = string.Empty;
}
