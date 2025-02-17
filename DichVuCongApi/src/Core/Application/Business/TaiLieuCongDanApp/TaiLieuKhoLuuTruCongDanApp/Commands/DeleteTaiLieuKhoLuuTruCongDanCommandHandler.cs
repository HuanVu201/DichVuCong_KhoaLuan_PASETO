using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Commands;
public class DeleteTaiLieuKhoLuuTruCongDanCommandHandler : ICommandHandler<DeleteTaiLieuKhoLuuTruCongDanCommand>
{
    private readonly IRepositoryWithEvents<TaiLieuKhoLuuTruCongDan> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    public DeleteTaiLieuKhoLuuTruCongDanCommandHandler(IRepositoryWithEvents<TaiLieuKhoLuuTruCongDan> repositoryWithEvents, IDapperRepository dapperRepository, IMediator mediator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
        _mediator = mediator;
    }

    public async Task<Result> Handle(DeleteTaiLieuKhoLuuTruCongDanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            return (Result)Result.Fail(message: "Tài liệu không tồn tại trên hệ thống!");

        var res = await _mediator.Send(new UpdateKhoLuuTruCongDanCommand()
        {
            DungLuong = -itemExitst.DungLuong,
            SoLuong = -1,
            KhoLuuTruId = request.KhoLuuTruId
        });

        if (res.Failed)
            return (Result)Result.Fail(res.Message);

        if (request.ForceDelete == true)
        {
            //string sqlForceDelete = @"DELETE [Business].[TaiLieuKhoLuuTruCongDans]
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