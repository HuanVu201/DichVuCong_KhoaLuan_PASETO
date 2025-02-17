using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Commands;

public class AddGiayToSoHoaChiaSeCommandHandler : ICommandHandler<AddGiayToSoHoaChiaSeCommand, Guid>
{
    private readonly IRepository<GiayToSoHoaChiaSe> _repositoryWithEvents;
    public AddGiayToSoHoaChiaSeCommandHandler(IRepository<GiayToSoHoaChiaSe> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddGiayToSoHoaChiaSeCommand request, CancellationToken cancellationToken)
    {
        var giayToSoHoaChiaSe = GiayToSoHoaChiaSe.Create(request.SoDinhDanh, request.GiayToSoHoaId, request.MaDinhDanhChiaSe);
        await _repositoryWithEvents.AddAsync(giayToSoHoaChiaSe, cancellationToken);
        return Result<Guid>.Success(giayToSoHoaChiaSe.Id);

    }
}