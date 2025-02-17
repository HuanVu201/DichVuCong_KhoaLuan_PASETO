
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Commands;
public class AddPhanAnhKienNghiCommandHandler : ICommandHandler<AddPhanAnhKienNghiCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<PhanAnhKienNghi> _repositoryWithEvents;
    public AddPhanAnhKienNghiCommandHandler(IRepositoryWithEvents<PhanAnhKienNghi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddPhanAnhKienNghiCommand request, CancellationToken cancellationToken)
    {
        var phanAnhKienNghi = PhanAnhKienNghi.Create(request.UserId, request.HoTen, request.SoDienThoai, request.Email, request.DiaChi, request.TieuDe, request.NoiDung, request.NgayGui, request.TrangThai, request.NguoiTraLoi, request.NoiDungTraLoi, request.CongKhai);
        await _repositoryWithEvents.AddAsync(phanAnhKienNghi, cancellationToken);
        return Result<DefaultIdType>.Success(phanAnhKienNghi.Id);
    }
}
