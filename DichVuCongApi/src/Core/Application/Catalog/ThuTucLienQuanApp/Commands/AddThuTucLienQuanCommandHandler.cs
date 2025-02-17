using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucLienQuanApp.Commands;
public class AddThuTucLienQuanCommandHandler : ICommandHandler<AddThuTucLienQuanCommand, Guid>
{
    private readonly IRepositoryWithEvents<ThuTucLienQuan> _repositoryWithEvents;
    public AddThuTucLienQuanCommandHandler(IRepositoryWithEvents<ThuTucLienQuan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddThuTucLienQuanCommand request, CancellationToken cancellationToken)
    {
        var thuTuc = ThuTucLienQuan.Create(request.ThuTu, request.ThuTucid, request.ThuTucLienQuanId);
        await _repositoryWithEvents.AddAsync(thuTuc, cancellationToken);
        return Result<Guid>.Success(thuTuc.Id);
    }
}