using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.ChiaSeTaiLieuKhoLuuTruCongDanApp.Commands;
public class DeleteChiaSeTaiLieuKhoLuuTruCongDanCommandHandler : ICommandHandler<DeleteChiaSeTaiLieuKhoLuuTruCongDanCommand>
{
    private readonly IRepositoryWithEvents<ChiaSeTaiLieuKhoLuuTruCongDan> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    public DeleteChiaSeTaiLieuKhoLuuTruCongDanCommandHandler(IRepositoryWithEvents<ChiaSeTaiLieuKhoLuuTruCongDan> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> Handle(DeleteChiaSeTaiLieuKhoLuuTruCongDanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ChiaSeTaiLieuKhoLuuTruCongDan với mã: {request.Id} chưa được thêm vào hệ thống");

        if (request.ForceDelete == true)
        {
            //string sqlForceDelete = @"DELETE [Business].[ChiaSeTaiLieuKhoLuuTruCongDans]
            //                        WHERE Id = @Id";
            //await _dapperRepository.ExcuteAsync(sqlForceDelete, new { Id = request.Id });
        }
        else
        {
            var updatedItem = itemExitst.SoftDelete();
            await _repositoryWithEvents.UpdateAsync(updatedItem);
        }

        return (Result)Result.Success(message: "Thao tác thành công!");
    }
}