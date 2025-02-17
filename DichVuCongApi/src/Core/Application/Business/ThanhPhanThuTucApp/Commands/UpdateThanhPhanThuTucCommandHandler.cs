using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;

public class UpdateThanhPhanThuTucCommandHandler : ICommandHandler<UpdateThanhPhanThuTucCommand>
{
    private readonly IRepository<ThanhPhanThuTuc> _repositoryWithEvents;

    public UpdateThanhPhanThuTucCommandHandler(IRepository<ThanhPhanThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateThanhPhanThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThanhPhanThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedThanhPhanThuTuc = itemExitst.Update(request.Ten, request.Ma, request.ThuTucId, request.TruongHopId, request.MaGiayToKhoQuocGia, request.DinhKem, request.BatBuoc, request.SoBanChinh, request.SoBanSao, request.ChoPhepThemToKhai,request.STT);
        await _repositoryWithEvents.UpdateAsync(updatedThanhPhanThuTuc, cancellationToken);
        return (Result)Result.Success();
    }
}
