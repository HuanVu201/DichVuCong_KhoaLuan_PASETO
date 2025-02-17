using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.ChiaSeTaiLieuKhoLuuTruCongDanApp.Commands;
public class AddChiaSeTaiLieuKhoLuuTruCongDanCommand : ICommand<Guid>
{
    public string SoDinhDanhNhan { get; set; } = string.Empty;
    public Guid TaiLieuLuuTruId { get; set; }
}
