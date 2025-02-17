using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucLienQuanApp.Commands;

public class UpdateThuTucLienQuanCommandHandler : ICommandHandler<UpdateThuTucLienQuanCommand>
{
    private readonly IRepositoryWithEvents<ThuTucLienQuan> _repositoryWithEvents;

    public UpdateThuTucLienQuanCommandHandler(IRepositoryWithEvents<ThuTucLienQuan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateThuTucLienQuanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThuTucLienQuan với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedThuTucLienQuan = itemExitst.Update(request.ThuTu, request.ThuTucid, request.ThuTucLienQuanId);
        await _repositoryWithEvents.UpdateAsync(updatedThuTucLienQuan, cancellationToken);
        return (Result)Result.Success();
    }
}