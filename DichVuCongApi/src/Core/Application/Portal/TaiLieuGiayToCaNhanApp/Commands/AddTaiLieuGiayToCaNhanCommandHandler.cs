using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp.Commands;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp.Commands;
public class AddTaiLieuGiayToCaNhanCommandHandler : ICommandHandler<AddTaiLieuGiayToCaNhanCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<TaiLieuGiayToCaNhan> _repositoryWithEvents;
    public AddTaiLieuGiayToCaNhanCommandHandler(IRepositoryWithEvents<TaiLieuGiayToCaNhan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddTaiLieuGiayToCaNhanCommand request, CancellationToken cancellationToken)
    {
        var taiLieuGiayToCaNhan = TaiLieuGiayToCaNhan.Create(request.TenGiayTo, request.DuongDan, request.Type, request.LoaiNhomGiayToCaNhanId);
        await _repositoryWithEvents.AddAsync(taiLieuGiayToCaNhan, cancellationToken);
        return Result<DefaultIdType>.Success(taiLieuGiayToCaNhan.Id);
    }
}
