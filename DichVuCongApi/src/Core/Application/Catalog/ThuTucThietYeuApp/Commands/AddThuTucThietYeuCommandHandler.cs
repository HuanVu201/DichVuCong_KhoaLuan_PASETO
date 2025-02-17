using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThietYeuApp.Commands;
public class AddThuTucThietYeuCommandHandler : ICommandHandler<AddThuTucThietYeuCommand, Guid>
{
    private readonly IRepositoryWithEvents<ThuTucThietYeu> _repositoryWithEvents;
    public AddThuTucThietYeuCommandHandler(IRepositoryWithEvents<ThuTucThietYeu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddThuTucThietYeuCommand request, CancellationToken cancellationToken)
    {
        var thuTuc = ThuTucThietYeu.Create(request.MaTTHC, request.TenTTHC, request.LinkDVC, request.SoThuTu);
        await _repositoryWithEvents.AddAsync(thuTuc, cancellationToken);
        return Result<Guid>.Success(thuTuc.Id);
    }
}