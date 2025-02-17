using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Commands;

public class UpdateKhoTaiLieuDienTuCommandHandler : ICommandHandler<UpdateKhoTaiLieuDienTuCommand>
{
    private readonly IRepositoryWithEvents<KhoTaiLieuDienTu> _repositoryWithEvents;

    public UpdateKhoTaiLieuDienTuCommandHandler(IRepositoryWithEvents<KhoTaiLieuDienTu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateKhoTaiLieuDienTuCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KhoTaiLieuDienTu với mã: {request.Id} chưa được thêm vào hệ thống");
        if (itemExitst.DungLuong + request.DungLuong >= 1024)
        {
            return (Result)Result.Fail("Dung lượng tối đa 1024 MB");
        }

        var updatedKhoTaiLieuDienTu = itemExitst.Update(request.TenKhoTaiLieu, request.MoTa, request.DungLuong, request.SoLuong);
        await _repositoryWithEvents.UpdateAsync(updatedKhoTaiLieuDienTu, cancellationToken);
        return (Result)Result.Success("Thêm vào kho thành công!");
    }
}