using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp.Commands;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
public class DeleteLoaiGiayToKhoLuuTruCommandHandler : ICommandHandler<DeleteLoaiGiayToKhoLuuTruCommand>
{
    private readonly IRepositoryWithEvents<LoaiGiayToKhoLuuTru> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    public DeleteLoaiGiayToKhoLuuTruCommandHandler(IRepositoryWithEvents<LoaiGiayToKhoLuuTru> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> Handle(DeleteLoaiGiayToKhoLuuTruCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"LoaiGiayToKhoLuuTru với mã: {request.Id} chưa được thêm vào hệ thống");

        if (request.ForceDelete == true)
        {
            //string sqlForceDelete = @"DELETE [Business].[LoaiGiayToKhoLuuTrus]
            //                        WHERE Id = @Id";
            //await _dapperRepository.ExcuteAsync(sqlForceDelete, new { Id = request.Id });
        }
        else
        {
            var updatedItem = itemExitst.SoftDelete();
            await _repositoryWithEvents.UpdateAsync(updatedItem);
        }

        return (Result)Result.Success();
    }
}