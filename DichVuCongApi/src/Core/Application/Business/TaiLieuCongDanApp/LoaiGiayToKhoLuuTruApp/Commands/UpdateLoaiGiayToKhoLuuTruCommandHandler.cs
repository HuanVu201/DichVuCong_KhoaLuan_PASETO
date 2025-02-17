using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp.Commands;
public class UpdateLoaiGiayToKhoLuuTruCommandHandler : ICommandHandler<UpdateLoaiGiayToKhoLuuTruCommand>
{
    private readonly IRepositoryWithEvents<LoaiGiayToKhoLuuTru> _repositoryWithEvents;

    public UpdateLoaiGiayToKhoLuuTruCommandHandler(IRepositoryWithEvents<LoaiGiayToKhoLuuTru> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateLoaiGiayToKhoLuuTruCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"LoaiGiayToKhoLuuTru với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedLoaiGiayToKhoLuuTru = itemExitst.Update(request.Ma, request.Ten, request.Eform, request.SuDung);
        await _repositoryWithEvents.UpdateAsync(updatedLoaiGiayToKhoLuuTru, cancellationToken);
        return (Result)Result.Success();
    }
}