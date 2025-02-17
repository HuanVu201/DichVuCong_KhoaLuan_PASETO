using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.OCR;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class CapNhatKetQuaHoSoCommandHandler : ICommandHandler<CapNhatKetQuaHoSoCommand>
{
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IRepository<KetQuaLienQuan> _repositoryKetQuaLienQuan;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLy;
    private readonly IOCRService _oCRService;
    private readonly ICurrentUser _currentUser;
    private readonly ILogger<CapNhatKetQuaHoSoCommandHandler> _logger;
    public CapNhatKetQuaHoSoCommandHandler(IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLy, ILogger<CapNhatKetQuaHoSoCommandHandler> logger, ICurrentUser currentUser, IRepository<HoSo> repositoryHoSo, IOCRService oCRService, IRepository<KetQuaLienQuan> repositoryKetQuaLienQuan)
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

    public async Task<Result> Handle(CapNhatKetQuaHoSoCommand request, CancellationToken cancellationToken)
    {
        try
        {

            var itemExitst = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
            var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
            if (itemExitst == null)
                throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
            //if (itemExitst.LoaiDuLieuKetNoi == "LTKS" || itemExitst.LoaiDuLieuKetNoi == "LTKT")
            //{
            //    throw new Exception("Hồ sơ thuộc Dịch vụ công liên thông, kết quả sẽ tự động được cập nhật, vui lòng không sử dụng chức năng này");
            //}
            string vetDinhKemKetQua = request.DinhKemKetQua != itemExitst.DinhKemKetQua ? itemExitst.DinhKemKetQua : null;
            var updatedHoSo = itemExitst.CapNhatKetQua(request.TrichYeuKetQua, request.DinhKemKetQua, request.EFormKetQuaData, request.LoaiVanBanKetQua, request.SoKyHieuKetQua, request.NguoiKyKetQua, request.CoQuanBanHanhKetQua, request.NgayBanHanhKetQua, request.NgayKyKetQua, _currentUser.GetUserOfficeCode(), request.LoaiKetQua);
            await _repositoryHoSo.UpdateAsync(updatedHoSo);
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(updatedHoSo.MaHoSo, null, null, null, null, _currentUser.GetUserId().ToString(), _currentUser.GetUserFullName(), "", null, currentTime, dinhKem: vetDinhKemKetQua, thaoTac: "Cập nhật hồ sơ", trangThai: "");
            await _repositoryQuaTrinhXuLy.AddAsync(quaTrinhXuLyHoSo);
            return (Result)Result.Success();
        } catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return (Result)Result.Fail(ex.Message);
        }
       
    }
}
