using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Commands;

public class DeleteKhoTaiLieuDienTuCommandHandler : ICommandHandler<DeleteKhoTaiLieuDienTuCommand>
{
    private readonly IRepositoryWithEvents<KhoTaiLieuDienTu> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    public DeleteKhoTaiLieuDienTuCommandHandler(IRepositoryWithEvents<KhoTaiLieuDienTu> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }
    public async Task<Result> Handle(DeleteKhoTaiLieuDienTuCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KhoTaiLieuDienTu với mã: {request.Id} chưa được thêm vào hệ thống");

        string sql = @"UPDATE [Business].[GiayToSoHoas]
                       SET KhoTaiLieuDienTuId = NULL
                       WHERE KhoTaiLieuDienTuId = @KhoTaiLieuDienTuId";

        await _dapperRepository.ExcuteAsync(sql, new
        {
            KhoTaiLieuDienTuId = request.Id,
        });
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}