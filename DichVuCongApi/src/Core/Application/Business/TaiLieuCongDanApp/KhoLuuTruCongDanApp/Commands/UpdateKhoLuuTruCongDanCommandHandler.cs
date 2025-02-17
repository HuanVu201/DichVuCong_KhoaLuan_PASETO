using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
public class UpdateKhoLuuTruCongDanCommandHandler : ICommandHandler<UpdateKhoLuuTruCongDanCommand, Guid>
{
    private readonly IRepositoryWithEvents<KhoLuuTruCongDan> _repositoryWithEvents;
    private readonly IMediator _mediator;

    public UpdateKhoLuuTruCongDanCommandHandler(IRepositoryWithEvents<KhoLuuTruCongDan> repositoryWithEvents, IMediator mediator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
    }

    public async Task<Result<DefaultIdType>> Handle(UpdateKhoLuuTruCongDanCommand request, CancellationToken cancellationToken)
    {
        Guid khoTaiLieuId = new Guid();
        if(request.KhoLuuTruId != null && request.KhoLuuTruId != Guid.Empty) // admin tự nhập kho lưu trữ khi thêm cho công dân
        {
            khoTaiLieuId = (Guid)request.KhoLuuTruId;
        } else
        {
            var res = await _mediator.Send(new CheckExistKhoLuuTruCongDanCommand());
            if (!string.IsNullOrEmpty(res.Data.ToString()))
                khoTaiLieuId = res.Data;
            if (!res.Succeeded)
                return Result<Guid>.Fail(message: "Không có thông tin kho tài liệu");
        }

        var itemExitst = await _repositoryWithEvents.GetByIdAsync(khoTaiLieuId, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KhoLuuTruCongDan với mã: {khoTaiLieuId} chưa được thêm vào hệ thống");

        if((itemExitst.TongDungLuong + request.DungLuong) > 100)
            return Result<Guid>.Fail(message: "Vượt quá dung lượng tối đa cho phép");

        var updatedKhoLuuTruCongDan = itemExitst.Update(request.DungLuong, request.SoLuong);
        await _repositoryWithEvents.UpdateAsync(updatedKhoLuuTruCongDan, cancellationToken);
        return Result<Guid>.Success(message: "Cập nhật thành công", data: khoTaiLieuId);
    }
}