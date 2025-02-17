using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.HoiDapApp.Commands;

public class UpdateHoiDapCommandHandler : ICommandHandler<UpdateHoiDapCommand>
{
    private readonly IRepositoryWithEvents<HoiDap> _repositoryWithEvents;

    public UpdateHoiDapCommandHandler(IRepositoryWithEvents<HoiDap> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateHoiDapCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"HoiDap với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.TieuDe, request.HoTen, request.SoDienThoai, request.Email, request.DiaChi, request.NoiDung, request.MaDonVi, request.Ma, request.NgayGui, request.TraLoi, request.NguoiTraLoi, request.CongKhai, request.DinhKem, request.TrangThai, request.TieuDeTraLoi, request.NoiDungTraLoi);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
