using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
public class AddMultiThanhPhanThuTucCommand : ICommand
{
  public List<ThanhPhanThuTuc> data { get; set; } = new List<ThanhPhanThuTuc>();
}
