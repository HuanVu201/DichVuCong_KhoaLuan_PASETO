using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Commands;
public class UpdateTaiLieuKhoLuuTruCongDanCommandHandler : ICommandHandler<UpdateTaiLieuKhoLuuTruCongDanCommand>
{
    private readonly IRepositoryWithEvents<TaiLieuKhoLuuTruCongDan> _repositoryWithEvents;
    private readonly IMediator _mediator;

    public UpdateTaiLieuKhoLuuTruCongDanCommandHandler(IRepositoryWithEvents<TaiLieuKhoLuuTruCongDan> repositoryWithEvents, IMediator mediator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
    }

    public async Task<Result> Handle(UpdateTaiLieuKhoLuuTruCongDanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TaiLieuKhoLuuTruCongDan với mã: {request.Id} chưa được thêm vào hệ thống");

        double prevDungLuong = itemExitst.DungLuong ?? 0;
        var resUpdateKho = await _mediator.Send(new UpdateKhoLuuTruCongDanCommand()
        {
            DungLuong = request.DungLuong - prevDungLuong,
            SoLuong = 0
        });

        if(resUpdateKho.Failed)
            return (Result)Result.Fail(message: "Cập nhật thông tin dung lượng kho thất bại!");

        var updatedTaiLieuKhoLuuTruCongDan = itemExitst.Update(request.TenGiayTo, request.DuongDan, request.DungLuong, request.TaiSuDung, request.EformData, request.Type, request.LoaiNhomGiayToCaNhanId);
        await _repositoryWithEvents.UpdateAsync(updatedTaiLieuKhoLuuTruCongDan, cancellationToken);
        return (Result)Result.Success(message: "Cập nhật tài liệu thành công!");
    }
}