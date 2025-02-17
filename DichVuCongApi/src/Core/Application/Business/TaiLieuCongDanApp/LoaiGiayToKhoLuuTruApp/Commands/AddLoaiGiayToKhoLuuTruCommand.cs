using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp.Commands;
public class AddLoaiGiayToKhoLuuTruCommand : ICommand<DefaultIdType>
{
    public string Ma { get; set; } = string.Empty;
    public string Ten { get; set; } = string.Empty;
    public string? Eform { get; set; }
    public bool? SuDung { get; set; }
}
