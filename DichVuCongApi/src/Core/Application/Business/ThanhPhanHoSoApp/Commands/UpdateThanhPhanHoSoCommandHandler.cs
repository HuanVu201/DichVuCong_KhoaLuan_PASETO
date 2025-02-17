using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;

public class UpdateThanhPhanHoSoCommandHandler : ICommandHandler<UpdateThanhPhanHoSoCommand>
{
    private readonly IRepository<ThanhPhanHoSo> _repositoryWithEvents;

    public UpdateThanhPhanHoSoCommandHandler(IRepository<ThanhPhanHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateThanhPhanHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThanhPhanHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedThanhPhanHoSo = itemExitst.Update(request.Ten, request.HoSo, request.SoBanChinh,
            request.SoBanSao, request.MaGiayToKhoQuocGia, request.DinhKem, request.NhanBanGiay, request.MaGiayToSoHoa, request.TrangThaiSoHoa,
            request.MaGiayTo, request.DuocLayTuKhoDMQuocGia, request.MaKetQuaThayThe, request.TrangThaiDuyet);
        await _repositoryWithEvents.UpdateAsync(updatedThanhPhanHoSo, cancellationToken);
        return (Result)Result.Success();
    }
}
