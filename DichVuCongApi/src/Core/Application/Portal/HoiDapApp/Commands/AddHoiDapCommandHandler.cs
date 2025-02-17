using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.HoiDapApp.Commands;
public class AddHoiDapCommandHandler : ICommandHandler<AddHoiDapCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<HoiDap> _repositoryWithEvents;
    public AddHoiDapCommandHandler(IRepositoryWithEvents<HoiDap> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddHoiDapCommand request, CancellationToken cancellationToken)
    {
        var hoiDap = HoiDap.Create(request.TieuDe,request.HoTen,request.SoDienThoai,request.Email,request.DiaChi,request.NoiDung,request.MaDonVi,request.Ma,request.NgayGui,request.TraLoi,request.NguoiTraLoi,request.CongKhai,request.DinhKem,request.TrangThai,request.TieuDeTraLoi,request.NoiDungTraLoi);
        await _repositoryWithEvents.AddAsync(hoiDap, cancellationToken);
        return Result<DefaultIdType>.Success(hoiDap.Id);
    }
}
