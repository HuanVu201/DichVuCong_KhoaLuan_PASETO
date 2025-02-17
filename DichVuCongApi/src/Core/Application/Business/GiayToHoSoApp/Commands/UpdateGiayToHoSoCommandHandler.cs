using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Commands;

public class UpdateGiayToHoSoCommandHandler : ICommandHandler<UpdateGiayToHoSoCommand>
{
    private readonly IRepository<GiayToHoSo> _repositoryWithEvents;

    public UpdateGiayToHoSoCommandHandler(IRepository<GiayToHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateGiayToHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"GiayToHoSo với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedGiayToHoSo = itemExitst.Update(request.SuDung, request.PDFPhieu, request.DocxPhieu, request.HinhAnhChuKyCongDan, request.NgayKySo, request.NguoiKySo, request.NgayGuiCongDan, request.TrangThaiGuiCongDan, request.NguoiGuiCongDan);
        await _repositoryWithEvents.UpdateAsync(updatedGiayToHoSo, cancellationToken);
        return (Result)Result.Success();
    }
}