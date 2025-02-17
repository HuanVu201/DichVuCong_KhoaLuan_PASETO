using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenTraHoSoCommandHandler : ICommandHandler<ChuyenTraHoSoCommand>
{
    private readonly IHoSoServices _hoSoServices;
    private readonly IReadRepository<HoSo> _readRepository;
    private readonly ICurrentUser _currentUser;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    public ChuyenTraHoSoCommandHandler(IHoSoServices hoSoServices, IReadRepository<HoSo> readRepository, ICurrentUser currentUser, INguoiXuLyHoSoService nguoiXuLyHoSoService)
    {
        _hoSoServices = hoSoServices;
        _readRepository = readRepository;
        _currentUser = currentUser;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;

    }
    public async Task<Result> Handle(ChuyenTraHoSoCommand request, CancellationToken cancellationToken)
    {
        var hoSo = await _readRepository.GetByIdAsync(request.Id);
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userFullName = _currentUser.GetUserFullName();
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        
        var updateSucced = await _hoSoServices.ChuyenTraHoSo(request, hoSo, currentTime, userFullName, "Chuyển trả hồ sơ");
        await _nguoiXuLyHoSoService.SetCurrentUserAsNguoiDaXuLy(hoSo.Id);
        if (updateSucced)
        {
            return (Result)Result.Success();
        }
        return (Result)Result.Fail("Cập nhật thất bại");
    }
}
