using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.OCR;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class CapNhatKetQuaNhieuHoSoCommandHandler : ICommandHandler<CapNhatKetQuaNhieuHoSoCommand>
{
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IRepository<KetQuaLienQuan> _repositoryKetQuaLienQuan;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLy;
    private readonly IOCRService _oCRService;
    private readonly ICurrentUser _currentUser;
    private readonly ILogger<CapNhatKetQuaNhieuHoSoCommandHandler> _logger;
    public CapNhatKetQuaNhieuHoSoCommandHandler(IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLy, ILogger<CapNhatKetQuaNhieuHoSoCommandHandler> logger,
        ICurrentUser currentUser, IRepository<HoSo> repositoryHoSo, IOCRService oCRService, IRepository<KetQuaLienQuan> repositoryKetQuaLienQuan)
    {
        _repositoryHoSo = repositoryHoSo;
        _oCRService = oCRService;
        _repositoryKetQuaLienQuan = repositoryKetQuaLienQuan;
        _currentUser = currentUser;
        _logger = logger;
        _repositoryQuaTrinhXuLy = repositoryQuaTrinhXuLy;
    }
    private async Task<string?> GetEFormKetQuaData(string maTruongHop, string dinhKemKetQua)
    {
        var maNhanDienOCR = await _oCRService.GetMaNhanDienOCR(maTruongHop);
        if (!string.IsNullOrEmpty(maNhanDienOCR))
        {
            var data = await _oCRService.GetData(maNhanDienOCR, dinhKemKetQua);
            return JsonConvert.SerializeObject(new { data = data.results[0] });
        }
        return null;
    }

    public async Task<Result> Handle(CapNhatKetQuaNhieuHoSoCommand request, CancellationToken cancellationToken)
    {
        foreach (string id in request.Ids)
        {
            Guid guid = Guid.Parse(id);
            try
            {
                var itemExitst = await _repositoryHoSo.GetByIdAsync(guid, cancellationToken);
                var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
                if (itemExitst == null)
                    throw new NotFoundException($"HoSo với mã: {guid} chưa được thêm vào hệ thống");

                string vetDinhKemKetQua = request.DinhKemKetQua != itemExitst.DinhKemKetQua ? itemExitst.DinhKemKetQua : null;
                var updatedHoSo = itemExitst.CapNhatKetQua(request.TrichYeuKetQua, request.DinhKemKetQua, request.EFormKetQuaData, request.LoaiVanBanKetQua, request.SoKyHieuKetQua, request.NguoiKyKetQua, request.CoQuanBanHanhKetQua, request.NgayBanHanhKetQua, request.NgayKyKetQua, _currentUser.GetUserOfficeCode(), request.LoaiKetQua);
                await _repositoryHoSo.UpdateAsync(updatedHoSo);

                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(updatedHoSo.MaHoSo, null, null, null, null, _currentUser.GetUserId().ToString(), _currentUser.GetUserFullName(), "", null, currentTime, dinhKem: vetDinhKemKetQua, thaoTac: "Cập nhật hồ sơ", trangThai: "");
                await _repositoryQuaTrinhXuLy.AddAsync(quaTrinhXuLyHoSo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return (Result)Result.Fail(ex.Message);
            }
        }

        return (Result)Result.Success();

    }
}