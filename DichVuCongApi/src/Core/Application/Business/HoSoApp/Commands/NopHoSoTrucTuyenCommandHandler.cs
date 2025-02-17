using MediatR;
using System.Diagnostics.Metrics;
using System.Net.WebSockets;
using System.Threading;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Classes;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Application.Business.HoSoApp.Validate;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Domain.Constant;
using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class TaiKhoanNguoiTiepNhan_Select
{
    public string TaiKhoanTiepNhan { get; set; }
}
public class TenTTHC_Select
{
    public string TenTTHC { get; set; }
}
public class NopHoSoTrucTuyen_MaDinhDanh_Select
{
    public string MaDinhDanh { get; set; }
    public string OfGroupName { get; set; }
    public string GroupName { get; set; }
}

public class NopHoSoTrucTuyenCommandHandler : RemoveFileWithJobHandler, ICommandHandler<NopHoSoTrucTuyenCommand, string>
{
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly IEMCService _eMCService;
    private readonly IZaloService _zaloService;
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IJobService _jobService;
    private readonly IMediator _mediator;
    private readonly IInjectConfiguration _configuration;
    private readonly IEventPublisher _publisher;
    private readonly IValidateThanhPhanHoSo _validateThanhPhanHoSo;
    private readonly IUserService _userService;
    private readonly IGenerateMaHoSo _generateMaHoSo;
    private readonly ICurrentUser _currentUser;
    private readonly ILogger<NopHoSoTrucTuyenCommandHandler> _logger;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;

    public NopHoSoTrucTuyenCommandHandler(ICurrentUser currentUser, ILogger<NopHoSoTrucTuyenCommandHandler> logger, IGenerateMaHoSo generateMaHoSo, IUserService userService,
        IValidateThanhPhanHoSo validateThanhPhanHoSo, IEventPublisher publisher, IJobService jobService, IReadRepository<NgayNghi> repositoryNgayNghi,
        IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo, IRepository<HoSo> repositoryHoSo,
        IDapperRepository dapperRepository, IEMCService eMCService, IInjectConfiguration configuration, IZaloService zaloService, IMediator mediator,
        INguoiXuLyHoSoService nguoiXuLyHoSoService
        )
    {
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _repositoryHoSo = repositoryHoSo;
        _dapperRepository = dapperRepository;
        _eMCService = eMCService;
        _repositoryNgayNghi = repositoryNgayNghi;
        _jobService = jobService;
        _zaloService = zaloService;
        _configuration = configuration;
        _mediator = mediator;
        _publisher = publisher;
        _validateThanhPhanHoSo = validateThanhPhanHoSo;
        _userService = userService;
        _generateMaHoSo = generateMaHoSo;
        _logger = logger;
        _currentUser = currentUser;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }

    public async Task<Result<string>> Handle(NopHoSoTrucTuyenCommand request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var sqlGetNguoiTiepNhan = hoSoQueryBuilder.select.GetNguoiTiepNhanSql;
        string sqlGetMaDinhDanh = @"SELECT Top 1 Id, MaDinhDanh, GroupName, OfGroupName, DonViQuanLy from Catalog.Groups where GroupCode = @DonViId";
        string sqlGetThuTuc = $"SELECT Top 1 MaLinhVucChinh, LinhVucChinh, SuDung FROM {SchemaNames.Catalog}.{TableNames.ThuTucs} WHERE MaTTHC = @MaTTHC AND DeletedOn is null";
        var group = await _dapperRepository.QueryFirstOrDefaultAsync<Group>(sqlGetMaDinhDanh, new
        {
            request.DonViId
        });
        if (group == null) {
            return Result<string>.Fail("Không tìm thấy đơn vị người dùng");
        }
        var maHoSo = await _generateMaHoSo.GenerateMaHoSo(group.MaDinhDanh, cancellationToken);

        var validateTPHSResponse = await _validateThanhPhanHoSo.ValidateBaseOnConfig(request.ThanhPhanHoSos, ValidateThanhPhanHoSoLoaiNguoiDung.CongDan);
        if (!validateTPHSResponse.IsSucceed)
        {
            return Result<string>.Fail(validateTPHSResponse.Message);
        }
        var nguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<TaiKhoanNguoiTiepNhan_Select>(sqlGetNguoiTiepNhan, new
        {
            request.MaTTHC,
            request.DonViId,
        }, cancellationToken: cancellationToken);
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken: cancellationToken);

        var thuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<ThuTuc>(sqlGetThuTuc, new
        {
            MaTTHC = request.MaTTHC
        }, cancellationToken: cancellationToken);
        if(thuTuc == null)
        {
            return Result<string>.Fail("Thủ tục không tồn tại");
        }
        if(thuTuc.SuDung == false || thuTuc.SuDung == null)
        {
            return Result<string>.Fail("Thủ tục đã bị ngừng sử dụng");
        }

        string donViQuanLy = !string.IsNullOrEmpty(group.DonViQuanLy) ? group.DonViQuanLy : request.DonViId;

        var caculateTime = new CaculateTime(_configuration);
        var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, 8, "Ngày làm việc");

        var hoSoNopTrucTuyen = new HoSo(request.DonViId, maHoSo, request.LoaiDoiTuong, request.ChuHoSo, request.SoDienThoaiChuHoSo, request.EmailChuHoSo, request.SoGiayToChuHoSo,
                                            request.LoaiGiayToChuHoSo, request.NgaySinhChuHoSo, request.TinhThanhChuHoSo, request.QuanHuyenChuHoSo,
                                            request.XaPhuongChuHoSo, request.DiaChiChuHoSo, request.NguoiGui, request.MaTTHC, request.MaTruongHop,
                                            request.TenTruongHop, request.TruongHopId, request.EFormData, request.DangKyNhanHoSoQuaBCCIData, nguoiTiepNhan.TaiKhoanTiepNhan,
                                            request.TrichYeuHoSo, null, request.UyQuyen, request.NguoiUyQuyen, request.SoDienThoaiNguoiUyQuyen, request.EmailNguoiUyQuyen, request.SoGiayToNguoiUyQuyen,
                                            request.TinhThanhNguoiUyQuyen, request.QuanHuyenNguoiUyQuyen, request.XaPhuongNguoiUyQuyen, request.DiaChiNguoiUyQuyen, request.MaTTHC, currentTime, ngayHenTraCaNhan, request.MucDo, request.HinhThucTra, request.LaHoSoChungThuc, donViQuanLy
                                            , DuThaoXuLyHoSoConstant.Loai_KetQua, ngayHenTraCaNhan);
        hoSoNopTrucTuyen.SetSoDinhDanh(hoSoNopTrucTuyen.SoGiayToChuHoSo);
        hoSoNopTrucTuyen.SetNotificationOn();
        hoSoNopTrucTuyen.SetLinhVuc(thuTuc.MaLinhVucChinh, thuTuc.LinhVucChinh);
        try
        {
            await _repositoryHoSo.AddAsync(hoSoNopTrucTuyen, cancellationToken);
            await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(nguoiTiepNhan.TaiKhoanTiepNhan, hoSoNopTrucTuyen.Id, cancellationToken: cancellationToken);
            if (request.ThanhPhanHoSos.Count > 0)
            {
                var thanhPhanHoSos = new List<ThanhPhanHoSo>();
                request.ThanhPhanHoSos.ForEach(item =>
                {
                    var thanhPhanHoSo = ThanhPhanHoSo.Create(item.Ten, maHoSo, item.SoBanChinh,
                        item.SoBanSao, item.MaGiayToKhoQuocGia, item.DinhKem, item.NhanBanGiay, item.MaGiayToSoHoa, item.TrangThaiSoHoa,
                        item.MaGiayTo, item.DuocLayTuKhoDMQuocGia, item.MaKetQuaThayThe, item.SoTrang, item.SoBanGiay, item.KyDienTuBanGiay, item.TrangThaiDuyet);
                    thanhPhanHoSo.SetDinhKemGoc(item.DinhKem);
                    thanhPhanHoSos.Add(thanhPhanHoSo);
                });
                await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos, cancellationToken);
            }

            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(maHoSo, null, null, null, null, _currentUser.GetUserId().ToString(), request.UyQuyen == true ? request.NguoiUyQuyen : request.ChuHoSo, "", "", currentTime, trangThai: "1", thaoTac: "Nộp hồ sơ trực tuyến");
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError($"{hoSoNopTrucTuyen.MaHoSo}_NopTrucTuyen_{JsonConvert.SerializeObject(request)}");
            throw new Exception(ex.Message);
        }
        try
        {
            await _userService.UpdateEmailAndPhoneNumber(request.EmailChuHoSo, request.SoDienThoaiChuHoSo, request.SoGiayToChuHoSo);
            //await DeleteFiles(_jobService, request.RemoveFiles);
            await _publisher.PublishAsync(new NopHoSoTrucTuyenEvent(hoSoNopTrucTuyen, group.GroupName, hoSoNopTrucTuyen.TrichYeuHoSo));
        }
        catch (Exception ex)
        {
            _logger.LogError($"{hoSoNopTrucTuyen.MaHoSo}_NopTrucTuyen_Mail_User_{JsonConvert.SerializeObject(request)}");
            throw new Exception(ex.Message);
        }
        return Result<string>.Success(data: maHoSo);
    }
}
