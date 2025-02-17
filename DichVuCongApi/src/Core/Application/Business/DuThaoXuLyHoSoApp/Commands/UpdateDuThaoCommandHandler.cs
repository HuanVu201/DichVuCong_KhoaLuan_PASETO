using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Commands;
public class UpdateDuThaoCommandHandler : ICommandHandler<UpdateDuThaoCommand>
{
    private readonly IRepository<DuThaoXuLyHoSo> _repositoryWithEvents;

    public UpdateDuThaoCommandHandler(IRepository<DuThaoXuLyHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateDuThaoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DuThaoXuLyHoSo với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedDuThaoXuLyHoSo = itemExitst.Update(request.FileDinhKem, request.TrichYeu, request.NgayHenTraMoi, request.TenLanhDaoKy, request.TaiKhoanLanhDaoKy);
        await _repositoryWithEvents.UpdateAsync(updatedDuThaoXuLyHoSo, cancellationToken);
        return (Result)Result.Success();
    }
}