using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Commands;
public class NopHoSoCommandHandler : ICommandHandler<NopHoSoCommand, string>
{
    private readonly IReadRepository<HoSoNhap> _repositoryHoSoNhap;
    private readonly ICurrentUser _currentUser;
    private readonly IMediator _mediator;
    private readonly ILogger<NopHoSoCommandHandler> _logger;
    public NopHoSoCommandHandler(IReadRepository<HoSoNhap> repositoryHoSoNhap, ICurrentUser currentUser, IMediator mediator, ILogger<NopHoSoCommandHandler> logger)
    {
        _repositoryHoSoNhap = repositoryHoSoNhap;
        _currentUser = currentUser;
        _mediator = mediator;
        _logger = logger;

    }
    public async Task<Result<string>> Handle(NopHoSoCommand request, CancellationToken cancellationToken)
    {
        var hoSoNhap = await _repositoryHoSoNhap.GetByIdAsync(request.Id, cancellationToken);
        var currentUser = _currentUser.GetUserId();
        if (hoSoNhap == null)
        {
            throw new NotFoundException($"HoSoNhap với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        if(currentUser != hoSoNhap.CreatedBy)
        {
            return Result<string>.Fail("Bạn không có quyền sử dụng hồ sơ nháp hiện tại");
        }
        var nopHoSoTrucTuyenCommand = new NopHoSoTrucTuyenCommand()
        {
            DonViQuanLy = hoSoNhap.DonViQuanLy,
            ChoXacNhan = hoSoNhap.ChoXacNhan,
            DonViId = hoSoNhap.DonViId,
            LoaiDoiTuong = hoSoNhap.LoaiDoiTuong,
            ChuHoSo = hoSoNhap.ChuHoSo,
            SoDienThoaiChuHoSo = hoSoNhap.SoDienThoaiChuHoSo,
            EmailChuHoSo = hoSoNhap.EmailChuHoSo,
            SoGiayToChuHoSo = hoSoNhap.SoGiayToChuHoSo,
            LoaiGiayToChuHoSo = hoSoNhap.LoaiGiayToChuHoSo,
            NgaySinhChuHoSo = hoSoNhap.NgaySinhChuHoSo,
            TinhThanhChuHoSo = hoSoNhap.TinhThanhChuHoSo,
            QuanHuyenChuHoSo = hoSoNhap.QuanHuyenChuHoSo,
            XaPhuongChuHoSo = hoSoNhap.XaPhuongChuHoSo,
            DiaChiChuHoSo = hoSoNhap.DiaChiChuHoSo,

            UyQuyen = hoSoNhap.UyQuyen,
            NguoiUyQuyen = hoSoNhap.NguoiUyQuyen,
            SoDienThoaiNguoiUyQuyen = hoSoNhap.SoDienThoaiNguoiUyQuyen,
            EmailNguoiUyQuyen = hoSoNhap.EmailNguoiUyQuyen,
            SoGiayToNguoiUyQuyen = hoSoNhap.SoGiayToNguoiUyQuyen,
            TinhThanhNguoiUyQuyen = hoSoNhap.TinhThanhNguoiUyQuyen,
            QuanHuyenNguoiUyQuyen = hoSoNhap.QuanHuyenNguoiUyQuyen,
            XaPhuongNguoiUyQuyen = hoSoNhap.XaPhuongNguoiUyQuyen,
            DiaChiNguoiUyQuyen = hoSoNhap.DiaChiNguoiUyQuyen,
            NguoiGui = hoSoNhap.NguoiGui,

            TrichYeuHoSo = hoSoNhap.TrichYeuHoSo,
            HinhThucTra = hoSoNhap.HinhThucTra,
            MaTTHC = hoSoNhap.MaTTHC,
            MucDo = hoSoNhap.MucDo,
            TenTTHC = hoSoNhap.TrichYeuHoSo,
            TenTruongHop = hoSoNhap.TenTruongHop,
            MaTruongHop = hoSoNhap.MaTruongHop,
            TruongHopId = hoSoNhap.TruongHopId,

            EFormData = hoSoNhap.EFormData,
            LaHoSoChungThuc = hoSoNhap.LaHoSoChungThuc,
            DangKyNhanHoSoQuaBCCIData = hoSoNhap.DangKyNhanHoSoQuaBCCIData,

        };
        try
        {
            var res = await _mediator.Send(nopHoSoTrucTuyenCommand);
            return Result<string>.Success(data: res.Data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return Result<string>.Fail(ex.ToString());
        }
    }
}
