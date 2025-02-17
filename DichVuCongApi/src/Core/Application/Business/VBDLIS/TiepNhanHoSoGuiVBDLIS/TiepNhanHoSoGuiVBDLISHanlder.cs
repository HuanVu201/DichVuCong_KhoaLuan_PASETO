using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.ILISApp;
using TD.DichVuCongApi.Application.Business.LogVBDLISApp.Commands;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.TiepNhanHoSoGuiVBDLIS;
public class TiepNhanHoSoGuiVBDLISHanlder : IRequestHandler<TiepNhanHoSoGuiVBDLISRequest, Result>
{
    private readonly IDapperRepository _dapperRespository;
    private readonly IUserService _user;
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryYeuCauThanhToan;
    private readonly ILogger<HoSo> _logger;
    private readonly IVBDLISServices _vBDLISServices;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IMediator _mediator;
    private readonly IMinioService _minioService;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private readonly string _truongHopThuTucTable = "[Business].[TruongHopThuTucs]";
    private readonly string _thuTucTable = "[Catalog].[ThuTucs]";
    private readonly IILisServices _iLisServices;

    public TiepNhanHoSoGuiVBDLISHanlder(IDapperRepository dapperRepository, IUserService user, IRepositoryWithEvents<YeuCauThanhToan> repositoryYeuCauThanhToan,
    ILogger<HoSo> logger, IVBDLISServices vBDLISServices, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IMediator mediator, IMinioService minioService, IILisServices iLisServices, INguoiXuLyHoSoService nguoiXuLyHoSoService)
    {
        _dapperRespository = dapperRepository;
        _user = user;
        _repositoryYeuCauThanhToan = repositoryYeuCauThanhToan;
        _logger = logger;
        _vBDLISServices = vBDLISServices;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _mediator = mediator;
        _minioService = minioService;
        _iLisServices = iLisServices;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }

    public async Task<Result> Handle(TiepNhanHoSoGuiVBDLISRequest request, CancellationToken cancellationToken)
    {

        var currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);

        // lấy thông tin hồ sơ
        if (request == null) throw new ArgumentNullException(nameof(request));
        string sql = $@"SELECT 
                  Top 1
                hs.Id,
                  hs.MaHoSo, 
                  hs.NgayHenTra, 
                  hs.NgayTiepNhan, 
                  hs.MaTruongHop, 
                  hs.ChuHoSo, 
                  hs.SoGiayToChuHoSo, 
                  hs.SoDienThoaiChuHoSo, 
                  hs.DiaChiChuHoSo, 
                  hs.EmailChuHoSo,
                  u.UserName NguoiNhanHoSo,
                    hs.NguoiDaXuLy,
                gr.LienThongTNMT
                FROM 
                  Business.HoSos hs 
                  INNER JOIN [Identity].Users u ON hs.NguoiNhanHoSo = u.Id
                  INNER JOIN Catalog.Groups gr ON hs.DonViId = gr.GroupCode 
                where 
                  hs.Id = @Id";
        var hoSo = await _dapperRespository.QueryFirstOrDefaultAsync<HoSoQLVB>(sql, new
        {
            request.Id
        });

        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }

        try
        {
            string? maTrangThaiCu = hoSo.TrangThaiHoSoId;
            if (maTrangThaiCu == "2")
            {
                var yctt = await _repositoryYeuCauThanhToan.GetBySpecAsync(new GetYeuCauThuTruocChuaThanhToanSpec(hoSo.MaHoSo), cancellationToken);
                if (yctt != null)
                {
                    return (Result)Result.Fail($"Hồ sơ với mã: {hoSo.MaHoSo} có phí/lệ phí chờ thanh toán");
                }
            }

            // thông tin trường hợp

            string sqlTruongHopThuTuc = $"SELECT TOP(1) Ma MaQuyTrinh, CONCAT(Ten, '_', TenTTHC ) TenQuyTrinh FROM {_truongHopThuTucTable} " +
                $"INNER JOIN {_thuTucTable} ON {_truongHopThuTucTable}.ThuTucId = {_thuTucTable}.MaTTHC WHERE {_truongHopThuTucTable}.DeletedOn IS NULL AND {_thuTucTable}.DeletedOn IS NULL AND Ma = @MaTruongHop ";

            var truongHopThuTuc = await _dapperRespository.QueryFirstOrDefaultAsync<VBDLISThongTinQuyTrinh>(sqlTruongHopThuTuc, new
            {
                hoSo.MaTruongHop
            }, null, cancellationToken);

            // Thông tin thành phần hồ sơ
            List<VBDLISThongTinGiayToDinhKem> thongTinGiayToDinhKems = new List<VBDLISThongTinGiayToDinhKem>();
            SearchThanhPhanHoSoQuery searchThanhPhanHoSoQuery = new SearchThanhPhanHoSoQuery();
            searchThanhPhanHoSoQuery.PageSize = 100;
            searchThanhPhanHoSoQuery.PageNumber = 1;
            searchThanhPhanHoSoQuery.HoSo = hoSo.MaHoSo;
            var thanhPhanHoSos = await _mediator.Send(searchThanhPhanHoSoQuery, cancellationToken);
            if (thanhPhanHoSos != null && thanhPhanHoSos.Data != null && thanhPhanHoSos.Data.Count > 0)
            {
                foreach (var thanhPhanHoSo in thanhPhanHoSos.Data)
                {
                    VBDLISThongTinGiayToDinhKem thongTinGiayToDinhKem = new VBDLISThongTinGiayToDinhKem();
                    if (!string.IsNullOrEmpty(thanhPhanHoSo.DinhKem))
                    {
                        var dinhKemArr = thanhPhanHoSo.DinhKem.Split(new[] { "##" }, StringSplitOptions.None);
                        foreach (string dinhKemstr in dinhKemArr)
                        {
                            Base64DataFile dinhKem = await _minioService.GetFileByKeyAsBase64Async(null, dinhKemstr);
                            thongTinGiayToDinhKem.TenGiayTo = thanhPhanHoSo.Ten;
                            thongTinGiayToDinhKem.SoBanChinh = thanhPhanHoSo.SoBanChinh;
                            thongTinGiayToDinhKem.SoBanSao = thanhPhanHoSo.SoBanSao;
                            thongTinGiayToDinhKem.TapTin = new VBDLISThongTinTapTin(dinhKem.Name, dinhKem.Base64);
                            thongTinGiayToDinhKems.Add(thongTinGiayToDinhKem);
                        }

                    }

                }
            }

            VBDLISThongTinNguoiNop thongTinNguoiNop = new VBDLISThongTinNguoiNop(hoSo.ChuHoSo, hoSo.SoGiayToChuHoSo ?? string.Empty, hoSo.DiaChiChuHoSo ?? string.Empty, hoSo.SoDienThoai ?? string.Empty, hoSo.EmailChuHoSo ?? string.Empty);
            VBDLISThongTinQuyTrinh thongTinQuyTrinh = new VBDLISThongTinQuyTrinh(truongHopThuTuc.MaQuyTrinh, truongHopThuTuc.TenQuyTrinh);
            VBDLISTiepNhanHoSoRequest tiepNhanHoSoRequest = new VBDLISTiepNhanHoSoRequest();
            tiepNhanHoSoRequest.SoBienNhan = hoSo.MaHoSo;
            tiepNhanHoSoRequest.NguoiTiepNhan = hoSo.NguoiNhanHoSo;
            tiepNhanHoSoRequest.NgayHenTra = hoSo.NgayHenTra;
            tiepNhanHoSoRequest.NgayTiepNhan = hoSo.NgayTiepNhan;
            tiepNhanHoSoRequest.TinhId = request.TinhId;
            tiepNhanHoSoRequest.HuyenId = request.HuyenId;
            tiepNhanHoSoRequest.XaId = request.XaId;
            tiepNhanHoSoRequest.ThongTinNguoiNopDon = thongTinNguoiNop;
            tiepNhanHoSoRequest.ThongTinQuyTrinh = thongTinQuyTrinh;
            tiepNhanHoSoRequest.DanhSachGiayToDinhKem = thongTinGiayToDinhKems;
            string tinhId = request.TinhId.ToString();
            string huyenId = $"{tinhId}.{request.HuyenId}";
            string xaId = $"{huyenId}.{request.XaId}";
            string nguoiDaXuLy = !string.IsNullOrEmpty(hoSo.NguoiDaXuLy) ? hoSo.NguoiDaXuLy + "##" + currentUser.Id.ToString() : currentUser.Id.ToString();
            nguoiDaXuLy = HoSo.RemoveDuplicateIds(nguoiDaXuLy);
            var resVBDLISTiepNhanHoSo = !string.IsNullOrEmpty(hoSo.LienThongTNMT) && hoSo.LienThongTNMT.ToLower() == "ilis"
                            ? await _iLisServices.TiepNhanHoSo(tiepNhanHoSoRequest) : await _vBDLISServices.TiepNhanHoSo(tiepNhanHoSoRequest);
            if (resVBDLISTiepNhanHoSo == null) throw new NotFoundException("resVBDLISTiepNhanHoSo is null");
            string resVBDLISTiepNhanHoSoText = JsonConvert.SerializeObject(resVBDLISTiepNhanHoSo);
            if (resVBDLISTiepNhanHoSo.data == 1 || resVBDLISTiepNhanHoSoText.ToLower().Contains("đã tồn tại"))
            {
                // update hồ sơ
                string updateSql = $"UPDATE Business.HoSos " +
                    $"SET TrangThaiHoSoId = '4', LoaiDuLieuKetNoi = 'VBDLIS', NguoiDangXuLy = null, TinhThanhDiaBan = @TinhId, QuanHuyenDiaBan = @HuyenId, XaPhuongDiaBan = @XaId, NguoiDaXuLy = @NguoiDaXuLy " +
                    $"WHERE Id = @Id ";
                await _dapperRespository.ExcuteAsync(updateSql, new { Id = hoSo.Id, TinhId = tinhId, HuyenId = huyenId, XaId = xaId, NguoiDaXuLy = nguoiDaXuLy });
                await _nguoiXuLyHoSoService.SetNguoiDangXuLyAsNguoiDaXuLy(hoSo.Id);
                QuaTrinhXuLyHoSo quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, currentUser.Id.ToString(), currentUser.FullName, string.Empty, "Hệ thống VBDLIS", currentTime, trangThai: string.Empty, thaoTac: "Chuyển liên thông VBDLIS");
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            }
            else
            {
                AddLogVBDLISCommand addLogVBDLIS = new AddLogVBDLISCommand();
                addLogVBDLIS.maHoSo = hoSo.MaHoSo;
                addLogVBDLIS.api = "TiepNhanHoSoGuiVBDLIS";
                addLogVBDLIS.body = JsonConvert.SerializeObject(tiepNhanHoSoRequest);
                addLogVBDLIS.response = resVBDLISTiepNhanHoSoText;
                await _mediator.Send(addLogVBDLIS, cancellationToken);
                return (Result)Result.Fail("Lỗi gửi hồ sơ: " + resVBDLISTiepNhanHoSoText);
            }

            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            AddLogVBDLISCommand addLogVBDLIS = new AddLogVBDLISCommand();
            addLogVBDLIS.maHoSo = hoSo.MaHoSo;
            addLogVBDLIS.api = "TiepNhanHoSoGuiVBDLIS";
            addLogVBDLIS.body = JsonConvert.SerializeObject(request);
            addLogVBDLIS.response = JsonConvert.SerializeObject(ex);
            await _mediator.Send(addLogVBDLIS, cancellationToken);
            throw ex;
        }
    }
}
