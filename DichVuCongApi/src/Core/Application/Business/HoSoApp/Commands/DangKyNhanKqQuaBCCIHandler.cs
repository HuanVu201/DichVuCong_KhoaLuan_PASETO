using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class DangKyNhanKqQuaBCCIHandler : ICommandHandler<DangKyNhanKqQuaBCCI>
{
    private readonly IRepositoryWithEvents<HoSo> _repositoryWithEvents;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IUserService _userService;
    public DangKyNhanKqQuaBCCIHandler(IRepositoryWithEvents<HoSo> repositoryWithEvents, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,IUserService userService)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _userService = userService;
    }

    public async Task<Result> Handle(DangKyNhanKqQuaBCCI request, CancellationToken cancellationToken)
    {
        if (request.Id == null) throw new ArgumentNullException(nameof(request.Id));
        var existItem = await _repositoryWithEvents.GetByIdAsync(request.Id);
        if (existItem == null) throw new NotFoundException($"Mã hồ sơ: {request.Id} chưa được thêm vào hệ thống");
        
        var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);
        var userOfficeCode = currentUser.OfficeCode;
        var userId = currentUser.Id.ToString();

        var userFullName = currentUser.FullName;
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        existItem.SuaDangKyNhanKqQuaBCCIData(request.DangKyNhanKqQuaBCCIData, request.Loai == "chinhsua" ? null : currentTime);
        await _repositoryWithEvents.UpdateAsync(existItem);
         var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(existItem.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "9", thaoTac: "Đăng ký nhận kết quả qua BCCI");
        await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo,cancellationToken);
        return (Result)Result.Success();
    }
}
