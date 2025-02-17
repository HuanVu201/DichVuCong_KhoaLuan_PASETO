using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

public class GetTaiKhoanQuery : IRequest<UserAppDto>
{
    public Guid? Id { get; set; }
}
