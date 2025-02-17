using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Commands;
public class UpdatePhanAnhKienNghiCommandHandler : ICommandHandler<UpdatePhanAnhKienNghiCommand>
{
    private readonly IRepositoryWithEvents<PhanAnhKienNghi> _repositoryWithEvents;

    public UpdatePhanAnhKienNghiCommandHandler(IRepositoryWithEvents<PhanAnhKienNghi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdatePhanAnhKienNghiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"PhanAnhKienNghi với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedPAKN = itemExitst.Update(request.UserId, request.HoTen, request.Email, request.SoDienThoai, request.DiaChi, request.TieuDe, request.NoiDung, request.NgayGui, request.TrangThai, request.NguoiTraLoi, request.NoiDungTraLoi, request.CongKhai);
        await _repositoryWithEvents.UpdateAsync(updatedPAKN, cancellationToken);
        return (Result)Result.Success();
    }
}