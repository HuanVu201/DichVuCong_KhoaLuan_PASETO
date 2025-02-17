using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Commands;
public class AddGiayToSoHoaChiaSeCommand : ICommand<Guid>
{
    public string SoDinhDanh { get; set; }
    public Guid? GiayToSoHoaId { get; set; }
    public string? MaDinhDanhChiaSe { get; set; }
}