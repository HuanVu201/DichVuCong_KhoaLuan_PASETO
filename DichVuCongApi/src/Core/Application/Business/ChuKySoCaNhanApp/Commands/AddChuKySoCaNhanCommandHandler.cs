using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp.Commands;
public class AddChuKySoCaNhanCommandHandler : ICommandHandler<AddChuKySoCaNhanCommand, Guid>
{
    private readonly IRepository<ChuKySoCaNhan> _repositoryWithEvents;
    public AddChuKySoCaNhanCommandHandler(IRepository<ChuKySoCaNhan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddChuKySoCaNhanCommand request, CancellationToken cancellationToken)
    {
        var chuKySoCaNhan = ChuKySoCaNhan.Create(request.UserName, request.HinhAnh, request.MoTa);
        await _repositoryWithEvents.AddAsync(chuKySoCaNhan, cancellationToken);
        return Result<Guid>.Success(chuKySoCaNhan.Id);

    }
}