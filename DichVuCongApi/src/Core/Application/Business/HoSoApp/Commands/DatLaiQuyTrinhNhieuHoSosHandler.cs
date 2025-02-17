using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class DatLaiQuyTrinhNhieuHoSosHandler : ICommandHandler<DatLaiQuyTrinhXuLyNhieuHoSos>
{
    public Task<Result> Handle(DatLaiQuyTrinhXuLyNhieuHoSos request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
