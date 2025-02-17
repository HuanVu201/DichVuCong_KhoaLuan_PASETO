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
public class ThuHoiDangKyNhanKqQuaBCCIHandler : ICommandHandler<ThuHoiDangKyNhanKqQuaBCCI, List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse>>
{
    private readonly IRepositoryWithEvents<HoSo> _repositoryWithEvents;
    private readonly IUserService _userService;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    public ThuHoiDangKyNhanKqQuaBCCIHandler(IRepositoryWithEvents<HoSo> repositoryWithEvents, IUserService userService, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _userService = userService;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
    }

    public async Task<Result<List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse>>> Handle(ThuHoiDangKyNhanKqQuaBCCI request, CancellationToken cancellationToken)
    {
       
        List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse> res = new List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse>();
        if (request?.Ids == null) throw new ArgumentNullException(nameof(request.Ids));
        if (request.Ids.Count <= 0) throw new ArgumentNullException(nameof(request.Ids));
        var quaTrinhXuLyHoSos = new List<QuaTrinhXuLyHoSo>();
        List<HoSo> updateHoSos = new List<HoSo>();
        var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);
        var userOfficeCode = currentUser.OfficeCode;
        var userId = currentUser.Id.ToString();

        var userFullName = currentUser.FullName;
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        foreach (var id in request.Ids)
        {
            Guid guid;
            var checkPaser = Guid.TryParse(id, out guid);
            if (!checkPaser)
            {
                YeuCauBuuDienLayKetQuaWithoutItemCodeResponse tmpRes = new YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(guid, string.Empty, "500", "Không thể paser guid: " + id);
                res.Add(tmpRes);
                break;
            }
            var item = await _repositoryWithEvents.GetByIdAsync(guid, cancellationToken);
            if (item == null)
            {
                YeuCauBuuDienLayKetQuaWithoutItemCodeResponse tmpRes = new YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(item.Id, item.MaHoSo, "404", $"Hồ sơ {id} chưa được thêm vào hệ thống");
                res.Add(tmpRes);
                break;
            }
            else
            {
                var updateHoSo = item.ThuHoiDangKyNhanKqQuaBCCIData();
                updateHoSos.Add(updateHoSo);
                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(item.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "9", thaoTac: "Thu hồi đăng ký nhận kết quả qua BCCI");
                quaTrinhXuLyHoSos.Add(quaTrinhXuLyHoSo);

            }
        }

       
        await _repositoryWithEvents.UpdateRangeAsync(updateHoSos);
        await _repositoryQuaTrinhXuLyHoSo.AddRangeAsync(quaTrinhXuLyHoSos);
        return Result<List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse>>.Success(res);
    }
}
