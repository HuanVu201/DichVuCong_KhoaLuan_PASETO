using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Commands;
public class AddLinhVucCommand : ICommand<Guid>
{
    public string Ten { get; set; }
    public string Ma { get; set; }
    public string MaNganh { get; set; }
    public bool SuDung { get; set; } = true;
    public int? SoLuongThuTuc { get; set; } = 0;
    public int? SoLuongThuTucCapTinh { get; set; } = 0;
    public int? SoLuongThuTucCapHuyen { get; set; } = 0;
    public int? SoLuongThuTucCapXa { get; set; } = 0;
}
