using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;
public class AddApiChiaSeCommandHandler : ICommandHandler<AddApiChiaSeCommand, Guid>
{
    private readonly IRepositoryWithEvents<APIChiaSe> _repositoryWithEvents;
    public AddApiChiaSeCommandHandler(IRepositoryWithEvents<APIChiaSe> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddApiChiaSeCommand request, CancellationToken cancellationToken)
    {
        var apiChiaSe = APIChiaSe.Create(request.MaApiChiaSe, request.TenApiChiaSe, request.NoiDung, request.GioiHan, request.DuongDan, request.NgayGoi, request.SoLuotGoiTrongNgay, request.ThamSoDauVao, request.ThamSoDauRa, request.HuongDanGoi);
        await _repositoryWithEvents.AddAsync(apiChiaSe, cancellationToken);
        return Result<Guid>.Success(apiChiaSe.Id);

    }
}