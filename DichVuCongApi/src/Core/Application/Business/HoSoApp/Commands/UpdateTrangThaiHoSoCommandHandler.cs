using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class UpdateTrangThaiHoSoCommandHandler : ICommandHandler<UpdateTrangThaiHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currUser;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly bool usingZaloTemplate = false;
    private readonly IZaloService _zaloService;
    private readonly IJobService _jobService;
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryYeuCauThanhToan;
    private readonly ILLTPService _lLTPService;

    public UpdateTrangThaiHoSoCommandHandler(ILLTPService lLTPService, ICurrentUser currUser, IRepositoryWithEvents<HoSo> repositoryHoSo, IInjectConfiguration configuration, IDapperRepository dapperRepository, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IZaloService zaloService, IJobService jobService, IRepositoryWithEvents<YeuCauThanhToan> repositoryYeuCauThanhToan)
    {
        _repositoryHoSo = repositoryHoSo;
        _dapperRepository = dapperRepository;
        _currUser = currUser;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        usingZaloTemplate = configuration.GetValue<bool>("ZaloSetting:usingTemplate");
        _zaloService = zaloService;
        _jobService = jobService;
        _repositoryYeuCauThanhToan = repositoryYeuCauThanhToan;
        _lLTPService = lLTPService;

    }
    public async Task<Result> Handle(UpdateTrangThaiHoSoCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _currUser.GetUserFullName();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _currUser.GetUserId();
        var itemExitst = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);

        if (itemExitst == null)
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        if (itemExitst.LoaiDuLieuKetNoi == "LTKS" || itemExitst.LoaiDuLieuKetNoi == "LTKT")
        {
            throw new Exception("Hồ sơ thuộc Dịch vụ công liên thông, vui lòng không sử dụng chức năng này");
        }
        _lLTPService.CheckThaoTac(itemExitst.LoaiDuLieuKetNoi);

        if (request.TrangThaiHoSoId == "3")
        {
            var sql = "select yctt.Id ,yctt.MaHoSo,TrangThai,hs.TrangThaiHoSoId FROM [Business].[YeuCauThanhToans] yctt inner join Business.HoSos hs on hs.MaHoSo = yctt.MaHoSo where hs.MaHoSo = @MaHoSo";
            var item = await _dapperRepository.QueryFirstOrDefaultAsync<YeuCauThanhToan>(sql, new
            {
                MaHoSo = itemExitst.MaHoSo,
            });

            if (item != null)
            {
                var itemExitstYCTT = await _repositoryYeuCauThanhToan.GetByIdAsync(item.Id, cancellationToken);

                if (item.TrangThai == "Chờ thanh toán")
                {
                    var updatedTrangThaiYCTT = itemExitstYCTT.Update(item.MaHoSo, null, null, null, null, "Hủy thanh toán", null, null,
                                               null, null, null, null, null, null, null,
                                               null, null, null, null, null, null, null,
                                               null, null, null, null, null, null, null, null, null, null, null, null, null, null);
                    await _repositoryYeuCauThanhToan.UpdateAsync(updatedTrangThaiYCTT, cancellationToken);
                }
                else if (item.TrangThai == "Đã thanh toán")
                {
                    throw new NotFoundException($"Hồ sơ đã thanh toán, không thể thu hồi");
                }
            }
            var updateTrangThaiHoSo = itemExitst.UpdateTrangThaiHoSo(request.TrangThaiHoSoId, "Thu hồi: " + request.LyDoThuHoi);
            await _repositoryHoSo.UpdateAsync(updateTrangThaiHoSo, cancellationToken);
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(itemExitst.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, "Thu hồi: " + request.LyDoThuHoi, null, "Công dân thu hồi hồ sơ", trangThai: "3");
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
        }
        else if (request.TrangThaiHoSoId == "9")
        {
            var updateTrangThaiHoSo = itemExitst.UpdateTrangThaiHoSo(request.TrangThaiHoSoId, "");
            await _repositoryHoSo.UpdateAsync(updateTrangThaiHoSo, cancellationToken);
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(itemExitst.MaHoSo, userId.ToString(), userFullName, null, null, currentTime, "9", "Thu hồi hồ sơ đã trả kết quả", false);
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
        }
        return (Result)Result.Fail();
    }
}
