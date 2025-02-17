using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Commands;
public class AddListNguoiDungToNhomNguoiDung : ICommand
{
    public List<string> TaiKhoans { get; set; }
    public string NhomNguoiDungId { get; set; }
}
