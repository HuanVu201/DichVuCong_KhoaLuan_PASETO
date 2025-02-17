using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenHoSoPhiDiaGioiCommandHandler : ICommandHandler<ChuyenHoSoPhiDiaGioiCommand>
{
    private readonly IRepository<HoSo> _hoSoRepo;
    private readonly IReadRepository<DonViThuTuc> _donViThuTucRepo;
    private readonly IRepository<QuaTrinhXuLyHoSo> _quaTrinhXuLyRepo;
    private readonly ICurrentUser _currentUser;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;

    public ChuyenHoSoPhiDiaGioiCommandHandler(
        IRepository<HoSo> hoSoRepo,
        IReadRepository<DonViThuTuc> donViThuTucRepo,
        IRepository<QuaTrinhXuLyHoSo> quaTrinhXuLyRepo,
        ICurrentUser currentUser,
        INguoiXuLyHoSoService nguoiXuLyHoSoService)
    {
        _hoSoRepo = hoSoRepo;
        _donViThuTucRepo = donViThuTucRepo;
        _quaTrinhXuLyRepo = quaTrinhXuLyRepo;
        _currentUser = currentUser;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }

    public async Task<Result> Handle(ChuyenHoSoPhiDiaGioiCommand request, CancellationToken cancellationToken)
    {
        var hoSo = await _hoSoRepo.GetBySpecAsync(new GetHoSoByMaHoSoSpec(request.MaHoSo), cancellationToken)
            ?? throw new NotFoundException($"Hồ sơ với mã: {request.MaHoSo} không tồn tại hoặc đã bị xóa");
        var donViThuTuc = await _donViThuTucRepo.FirstOrDefaultAsync(new GetDonViThuTucBySpec(hoSo.DonViPhiDiaGioi, hoSo.MaTTHC), cancellationToken)
            ?? throw new NotFoundException($"Chưa cấu hình người tiếp nhận cho đơn vị tiếp nhận hồ sơ");
        hoSo.ChuyenHoSoPhiDiaGioi(donViThuTuc.NguoiTiepNhanId);
        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, _currentUser.GetUserId().ToString(), _currentUser.GetUserFullName(), donViThuTuc.NguoiTiepNhanId, string.Empty, DateTime.Now, hoSo.TrangThaiHoSoId, thaoTac: "Chuyển phi địa giới");
        try
        {
            await _hoSoRepo.UpdateAsync(hoSo, cancellationToken);
            await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(donViThuTuc.NguoiTiepNhanId, hoSo.Id, cancellationToken: cancellationToken);
            await _quaTrinhXuLyRepo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            return (Result)Result.Success();
        } catch (Exception ex)
        {
            return (Result)Result.Fail(ex.Message);
        }
    }
}
