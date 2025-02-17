using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Commands;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;




namespace TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Commands;
public class DeleteDanhGiaCoQuanCommanHandler : ICommandHandler<DeleteDanhGiaCoQuanCommand>
{
    private readonly IRepository<DanhGiaCoQuan> _repositoryWithEvents;
    public DeleteDanhGiaCoQuanCommanHandler(IRepository<DanhGiaCoQuan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteDanhGiaCoQuanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Đánh giá cơ quan với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
