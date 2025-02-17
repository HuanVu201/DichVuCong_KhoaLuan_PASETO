using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class XacNhanTraKetQuaVaYeuCauThuPhiHandler : ICommandHandler<XacNhanTraKetQuaVaYeuCauThuPhi>
{
    private readonly string hoSoTableName = "[Business].[HoSos]";
    private readonly IMediator _mediator;
    private readonly IUserService _user;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly TrangThaiTraKetQuaHoSoConstant _trangThaiTraHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();
    private YeuCauThanhToanConstants _yeuCauThanhToanContants;
    private readonly ILogger<XacNhanTraKetQuaVaYeuCauThuPhi> _logger;
    private readonly IMinioService _minioService;
    public XacNhanTraKetQuaVaYeuCauThuPhiHandler(IMinioService minioService, IMediator mediator, ICurrentUser currentUser, IRepositoryWithEvents<HoSo> repositoryHoSo, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,IUserService user, IDapperRepository dapperRepository, ILogger<XacNhanTraKetQuaVaYeuCauThuPhi> logger)
    {
        _mediator = mediator;
        _user = user;
        _repositoryHoSo = repositoryHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _dapperRepository = dapperRepository;
        _yeuCauThanhToanContants = new YeuCauThanhToanConstants();
        _logger = logger;
        _minioService = minioService;
    }
    public async Task<Result> Handle(XacNhanTraKetQuaVaYeuCauThuPhi request, CancellationToken cancellationToken)
    {
        try
        {
            if (string.IsNullOrEmpty(request.Id)) throw new ArgumentNullException(nameof(request.Id));
            string sql = $"SELECT * FROM {hoSoTableName} WHERE {hoSoTableName}.Id = @Id ";
            var itemsExitst = await _dapperRepository.QueryAsync<HoSo>(sql, new { Id = request.Id }, null, cancellationToken);

            var sqlTruongHopThuTuc = "SELECT Top 1 BatBuocKySoKetQua, BatBuocDinhKemKetQua FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";

            if (itemsExitst == null) throw new NotFoundException($"Hồ sơ {request.Id} chưa được thêm vào hệ thống");
            var item = itemsExitst.FirstOrDefault();

            var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
            {
                item.MaTruongHop
            }, cancellationToken: cancellationToken);
            if (item.TrangThaiHoSoId == "9")
            {
                if (truongHopThuTuc.BatBuocDinhKemKetQua == true)
                {
                    var filePaths = item.DinhKemKetQua;
                    if (string.IsNullOrEmpty(filePaths))
                    {
                        return (Result)Result.Fail($"Vui lòng đính kèm kết quả");
                    }
                }
                if (truongHopThuTuc.BatBuocKySoKetQua == true)
                {
                    var filePaths = item.DinhKemKetQua;
                    if (string.IsNullOrEmpty(filePaths))
                    {
                        return (Result)Result.Fail($"Vui lòng đính kèm kết quả");
                    }
                    var filePathList = filePaths.Split("##").ToList();
                    var verifyPdfSignatureResponse = await _minioService.VerifyPdfSignatureITextSharp(filePathList, true);
                    if (!verifyPdfSignatureResponse.HasDigitalSinature)
                    {
                        return (Result)Result.Fail($"Vui lòng đính kèm ít nhất một tệp đính kèm kết quả đã được ký số");
                    }
                }
            }

            List<HoSo> UpdateHoSo = new List<HoSo>();
            var quaTrinhXuLyHoSos = new List<QuaTrinhXuLyHoSo>();
            var _currentUser = await _user.GetCurrentUserAsync(cancellationToken);
            var userId = _currentUser.Id.ToString();
            var userOfficeCode = _currentUser.OfficeCode;
            var userFullName = _currentUser.FullName;

            var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
         
            var thaoTac = "Xác nhận kết quả và yêu cầu thu phí";
            YeuCauThuPhiCommand yeuCauThuPhiCommand = new YeuCauThuPhiCommand();
            yeuCauThuPhiCommand.PhiThu = request.Phi.HasValue ? request.Phi.Value : 0;
            yeuCauThuPhiCommand.LePhiThu = request.LePhi.HasValue ? request.LePhi.Value : 0;
            yeuCauThuPhiCommand.HinhThucThu = !string.IsNullOrEmpty(request.HinhThucThu) ? request.HinhThucThu: _yeuCauThanhToanContants.HINH_THUC_THU.THU_SAU;
            yeuCauThuPhiCommand.Id = item.Id;
            yeuCauThuPhiCommand.CoLuuVet = false;
            var resYeuCauThuPhi = await _mediator.Send(yeuCauThuPhiCommand, cancellationToken);
            if (!string.IsNullOrEmpty(request.TrangThaiTraKq))
            {
                item = item.XacNhanKetQua(request.TrangThaiTraKq, null,null,currentTime);
            }
            else
            {
                item = item.XacNhanKetQua(_trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ, null,null,currentTime);
            }
            await _repositoryHoSo.UpdateAsync(item, cancellationToken);
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(item.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "9", thaoTac: !string.IsNullOrEmpty(request.ThaoTac) ? request.ThaoTac : thaoTac);
            quaTrinhXuLyHoSos.Add(quaTrinhXuLyHoSo);
            await _repositoryQuaTrinhXuLyHoSo.AddRangeAsync(quaTrinhXuLyHoSos);
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.InnerException.Message);
            throw ex;

        }
        
    }
}
