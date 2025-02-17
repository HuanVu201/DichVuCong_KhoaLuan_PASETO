using System.Net.NetworkInformation;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Interfaces;
using TD.DichVuCongApi.Application.Business.VBDLIS.CapNhatKetQuaTraHoSoGuiVBDLIS;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.KetNoi.KhaiSinhKhaiTu;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class TruongHopThuTuc_TraKetQuaSelect
{
    public bool? BatBuocDinhKemKetQua { get; set; }
    public bool? BatBuocKySoKetQua { get; set; }
}
public class TraKetQuaHoSo_CheckDaThuPhi
{
    public string TrangThai { get; set; }
}
public class TraKetQuaHoSoCommandHandler : ICommandHandler<TraKetQuaHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IEMCService _eMCService;
    private readonly IMinioService _minioService;
    private readonly ISyncDVCQGService _syncDVCQGService;
    private readonly IMediator _mediator;
    private readonly IEventPublisher _eventPublisher;
    private readonly IKhaiSinhKhaiTuService _khaiSinhKhaiTuService;
    private readonly ILLTPService _lLTPService;
    private readonly ICommonServices _commonServices;
    private readonly IGiayToSoHoaService _giayToSoHoaService;
    public TraKetQuaHoSoCommandHandler(
        ILLTPService lLTPService,
        ICommonServices commonServices,
        IKhaiSinhKhaiTuService khaiSinhKhaiTuService,
        IEventPublisher eventPublisher,
        ISyncDVCQGService syncDVCQGService,
        IMinioService minioService,
        ICurrentUser user,
        IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,
        IRepositoryWithEvents<HoSo> repositoryHoSo,
        IDapperRepository dapperRepository,
        IEMCService eMCService,
        IMediator mediator,
        IGiayToSoHoaService giayToSoHoaService)
    {
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryHoSo = repositoryHoSo;
        _dapperRepository = dapperRepository;
        _eMCService = eMCService;
        _minioService = minioService;
        _syncDVCQGService = syncDVCQGService;
        _mediator = mediator;
        _eventPublisher = eventPublisher;
        _khaiSinhKhaiTuService = khaiSinhKhaiTuService;
        _commonServices = commonServices;
        _lLTPService = lLTPService;
        _giayToSoHoaService = giayToSoHoaService;
    }

    private async Task<string> DaThuHetPhi(string maHoSo, string maTTHC, string loaiKetQua, CancellationToken cancellationToken)
    {
        if (loaiKetQua == DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut)
        {
            return string.Empty;
        }
        var trangThaiThanhToan = new YeuCauThanhToanConstants();
        //string getYeuCauChuaThuPhi = $"SELECT Top 1 TrangThai FROM Business.YeuCauThanhToans WHERE (TrangThai = N'{trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN}' or TrangThai = N'{trangThaiThanhToan.TRANG_THAI.CHUA_THANH_TOAN}') and MaHoSo = @MaHoSo and DeletedOn is null";
        string getYeuCauChuaThuPhi = $"SELECT TrangThai FROM Business.YeuCauThanhToans WHERE MaHoSo = @MaHoSo and DeletedOn is null";
        var res = await _dapperRepository.QueryAsync<TraKetQuaHoSo_CheckDaThuPhi>(getYeuCauChuaThuPhi, new
        {
            MaHoSo = maHoSo
        }, cancellationToken: cancellationToken);
        ThuTuc? thuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<ThuTuc>($"SELECT Top 1 TrangThaiPhiLePhi FROM {SchemaNames.Catalog}.{TableNames.ThuTucs} WHERE MaTTHC = @MaTTHC", new
        {
            MaTTHC = maTTHC
        }, cancellationToken: cancellationToken);
        if (res == null) // danh sách ycct không có gì
        {
            if (thuTuc != null && thuTuc.TrangThaiPhiLePhi == true) // thủ tục mà yêu cầu phải thanh toán
            {
                var settings = _commonServices.Get();
                if (settings != null && settings.XuLyHoSo != null && settings.XuLyHoSo.MaTTHCKhongThuPhi != null)
                {
                    if (settings.XuLyHoSo.MaTTHCKhongThuPhi.IndexOf(maTTHC) == -1)
                    {
                        return "Thủ tục có phí,lệ phí.Vui lòng thanh toán hồ sơ trước khi trả kết quả.";
                    }
                }
                else
                {
                    return "Thủ tục có phí,lệ phí.Vui lòng thanh toán hồ sơ trước khi trả kết quả.";
                }
            }
            return string.Empty; // thủ tục k yêu cầu thanh toán
        }
        else
        {
            var isChuaThanhToanOrChoThanhToan = res.FirstOrDefault(x => x.TrangThai == trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN || x.TrangThai == trangThaiThanhToan.TRANG_THAI.CHUA_THANH_TOAN);
            if (isChuaThanhToanOrChoThanhToan != null)
            {
                return "Vui lòng thu phí/lệ phí trước khi trả kết quả";
            }

            return string.Empty;
        }
    }

    public async Task<Result> Handle(TraKetQuaHoSoCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _user.GetUserFullName();
        var userGroupName = _user.GetUserGroupName();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _user.GetUserId();
        var trangThaiThanhToan = new YeuCauThanhToanConstants();
        string sqlUpdateYcct = $@"Update {SchemaNames.Business}.{TableNames.YeuCauThanhToans} SET TrangThai = N'{trangThaiThanhToan.TRANG_THAI.HUY}'
                                WHERE (TrangThai = N'{trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN}' OR TrangThai = N'{trangThaiThanhToan.TRANG_THAI.CHUA_THANH_TOAN}')
                                AND MaHoSo = @MaHoSo And DeletedOn is null";
        var sqlUpdateGiayToSoHoaKetQua = "UPDATE Business.GiayToSoHoas SET AnGiayTo = 0 WHERE MaHoSo = @MaHoSo AND LoaiSoHoa = '1'";
        var sqlTruongHopThuTuc = "SELECT TOP 1 BatBuocDinhKemKetQua, BatBuocKySoKetQua FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSo, new
        {
            request.Id
        });
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        //TransactionManager.ImplicitDistributedTransactions = true;

        if (hoSo.LoaiDuLieuKetNoi == "VBDLIS")
        {
            CapNhatKetQuaTraHoSoGuiVBDLISRequest capNhatKetQuaTraHoSoGuiVBDLISRequest = new CapNhatKetQuaTraHoSoGuiVBDLISRequest();
            capNhatKetQuaTraHoSoGuiVBDLISRequest.MaHoSo = hoSo.MaHoSo;
            capNhatKetQuaTraHoSoGuiVBDLISRequest.NgayTra = currentTime;
            var resposne = await _mediator.Send(capNhatKetQuaTraHoSoGuiVBDLISRequest, cancellationToken);
            if (resposne.Failed) return resposne;
        }
        if (hoSo.TrangThaiHoSoId == "9")
        {
            string thaoTac = hoSo.LoaiDuLieuKetNoi == "VBDLIS" ? "Trả kết quả, đồng bộ VBDLIS" : "Đã trả kết quả";
            string daThuPhi = await DaThuHetPhi(hoSo.MaHoSo, hoSo.MaTTHC, hoSo.LoaiKetQua, cancellationToken);
            if (!string.IsNullOrEmpty(daThuPhi))
            {
                return (Result)Result.Fail(daThuPhi);
            }
            // không có đính kèm, mà trường hợp yêu cầu đính kèm => lỗi
            var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc_TraKetQuaSelect>(sqlTruongHopThuTuc, new
            {
                hoSo.MaTruongHop
            }, cancellationToken: cancellationToken);
            if (string.IsNullOrEmpty(hoSo.DinhKemKetQua) && string.IsNullOrEmpty(request.DinhKemKetQua))
            {
                if (truongHopThuTuc.BatBuocDinhKemKetQua == true)
                {
                    return (Result)Result.Fail("Thủ tục bắt buộc cập nhật kết quả điện tử trước khi trả");
                }
            }
            else
            {
                if (truongHopThuTuc.BatBuocKySoKetQua == true)
                {
                    var filePaths = request.DinhKemKetQua ?? hoSo.DinhKemKetQua;
                    var filePathList = filePaths.Split("##").ToList();
                    var verifyPdfSignatureResponse = await _minioService.VerifyPdfSignatureITextSharp(filePathList, true);
                    if (!verifyPdfSignatureResponse.HasDigitalSinature)
                    {
                        return (Result)Result.Fail($"Chưa có tệp đính kèm kết quả nào được ký số");
                    }
                }
            }
            if (request.YeuCauBCCILayKetQua == true)
            {
                var resBCCI = await _mediator.Send(new YeuCauBuuDienLayKetQua(hoSo.Id), cancellationToken);
                if (resBCCI.Failed == true) throw new Exception("Yêu cầu BCCI lấy kết quả: " + resBCCI.Message);
                thaoTac = "Trả và yêu cầu BCCI lấy kết quả";
            }

            try
            {
                var updatedHoSo = hoSo.TraKetQua(request.TrichYeuKetQua, request.DinhKemKetQua, currentTime);
                await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);

                if (hoSo.LoaiKetQua == DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut)
                {
                    await _dapperRepository.ExcuteAsync(sqlUpdateYcct, new
                    {
                        MaHoSo = hoSo.MaHoSo
                    });
                }
                else
                {
                    await _dapperRepository.ExcuteAsync(sqlUpdateGiayToSoHoaKetQua, new
                    {
                        hoSo.MaHoSo
                    });
                }
                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, "", "", thaoTac, updatedHoSo.TrangThaiHoSoId);
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
                await _khaiSinhKhaiTuService.AddTrangThaiDVCLT(hoSo.MaHoSo, "5", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, hoSo.LoaiDuLieuKetNoi);
                await _lLTPService.AddTrangThaiDVCLT(hoSo.MaHoSo, "10", TrangThaiDongBoHoSoLLTPConstant.TrangThaiDongBo_ChuaDongBo, hoSo.LoaiDuLieuKetNoi);
                await _giayToSoHoaService.ThemGiayToSoHoaKetQuaByDinhKems(hoSo.DinhKemKetQua, hoSo.MaHoSo, hoSo.MaTTHC, hoSo.MaLinhVuc, hoSo.CoQuanBanHanhKetQua, hoSo.SoGiayToChuHoSo, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            await _eventPublisher.PublishAsync(new ThongBaoCoKetQuaEvent(hoSo, userGroupName));
            return (Result)Result.Success();
        }
        else
        {
            return (Result)Result.Fail(" Hồ sơ không ở trạng thái chờ trả");
        }
    }
}
