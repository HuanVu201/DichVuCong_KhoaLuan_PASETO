using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Classes;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Business.KetQuaLienQuanApp.Dto;
using TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Queries;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.NguoiDungNhomNguoiDungApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.LTQVLB;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.ServiceLogger;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Shared.Authorization;
using static TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS.LienThongILISParams;

namespace TD.DichVuCongApi.Application.Business.HoSoApp;

public class NguoiDungLienThongQLVB
{
    public string Ten { get; set; }
    public string CMND { get; set; }
    public string SoDienThoai { get; set; }
    public string DiaChi { get; set; }
}
public class NguoiKyLienThongQLVB
{
    public string Ten { get; set; }
    public string TaiKhoan { get; set; }
    public string Id { get; set; }
}
public class DonViLienThongQLVB
{
    public string Ten { get; set; }
    public string MaDinhDanh { get; set; }
}
public class VanBanDuThaoLienThongQLVB
{
    public string TrichYeu { get; set; }
    public string LoaiVanBan { get; set; }
    public string NgayTao { get; set; }
    public List<DinhKemDuThaoLienThongQLVB> DinhKem { get; set; }
}
public class DinhKemDuThaoLienThongQLVB
{
    public string Ten { get; set; }
    public string Base64 { get; set; }
    public string? Link { get; set; }
}


public class LienThongTrucDVCQLVB
{
    public string IDHoSo { get; set; }
    public string MaHoSo { get; set; }
    public NguoiDungLienThongQLVB ChuHoSo { get; set; }
    public NguoiDungLienThongQLVB NguoiNop { get; set; }
    public NguoiKyLienThongQLVB NguoiKy { get; set; }
    public NguoiKyLienThongQLVB NguoiTrinhKy { get; set; }
    public DonViLienThongQLVB DonVi { get; set; }
    public VanBanDuThaoLienThongQLVB VanBanDuThao { get; set; }
    public List<DinhKemDuThaoLienThongQLVB> ThanhPhanHoSo { get; set; }
    public string TenHoSo { get; set; }
    public string ThuTuc { get; set; }
    public string ThamSoAn { get; set; }
    public string HccLinkAPI { get; set; }
    public string LoaiHSLienthong { get; set; }
    public string SoKyHieuVanBan { get; set; }
    public string NguoiKyVanBan { get; set; }
    public string? HanXuLyVanBan { get; set; }
}

public class HoSoServices : IHoSoServices
{
    private readonly IUserService _user;
    private readonly ICurrentUser _currentUser;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<HoSoBoSung> _repositoryHoSoBoSung;
    private readonly IMinioService _minioService;
    private readonly ILTQLVBService _lTQLVBService;
    private readonly IMediator _mediator;
    private readonly IInjectConfiguration _configuration;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly TrangThaiTraKetQuaHoSoConstant _trangThaiTraHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();
    private readonly IRepository<NgayNghi> _repositoryNgayNghi;
    private readonly ILogger<HoSoServices> _logger;
    private readonly IJobService _jobService;
    private readonly string publicApiGetFile;
    private readonly string publicApiGetFileAccessKey;
    private readonly string domainName;
    private readonly IEventPublisher _eventPublisher;
    private readonly IMailService _mailService;
    private readonly ILLTPService _lLTPService;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private readonly ILienThongILISService _lienThongILISService;
    private readonly IRepository<QuaTrinhXuLyHoSo> _quaTrinhXuLyHoSoRepo;
    private readonly IRepository<ThongBaoThue> _thongBaoThueRepo;
    private readonly LTQLVBSettings? _ltqlvbSettings;
    private readonly ICacheService _cacheService;
    private readonly ICacheKeyService _cacheKeyService;

    public HoSoServices(
        IMailService mailService,
        ICurrentUser currentUser,
        IJobService jobService,
        IUserService user,
        IDapperRepository dapperRepository,
        IMinioService minioService,
        ILTQLVBService lTQLVBService,
        IRepository<HoSoBoSung> repositoryHoSoBoSung,
        IMediator mediator, IInjectConfiguration configuration,
        IRepository<HoSo> repositoryHoSo,
        IRepository<NgayNghi> repositoryNgayNghi,
        ILogger<HoSoServices> logger,
        IEventPublisher eventPublisher,
        IInjectConfiguration injectConfiguration,
        ILLTPService lLTPService,
        INguoiXuLyHoSoService nguoiXuLyHoSoService,
        ILienThongILISService lienThongILISService,
        IRepository<QuaTrinhXuLyHoSo> quaTrinhXuLyHoSoRepo,
        IRepository<ThongBaoThue> thongBaoThueRepo,
        ICacheService cacheService,
        ICacheKeyService cacheKeyService
        )
    {
        _mailService = mailService;
        _currentUser = currentUser;
        _user = user;
        _jobService = jobService;
        _dapperRepository = dapperRepository;
        _minioService = minioService;
        _lTQLVBService = lTQLVBService;
        _repositoryHoSoBoSung = repositoryHoSoBoSung;
        _mediator = mediator;
        _configuration = configuration;
        _repositoryHoSo = repositoryHoSo;
        _repositoryNgayNghi = repositoryNgayNghi;
        _eventPublisher = eventPublisher;
        _logger = logger;
        publicApiGetFile = injectConfiguration.GetValue<string>("FileConfig:PUBLIC_API_GET_FILE");
        publicApiGetFileAccessKey = injectConfiguration.GetValue<string>("FileConfig:ACCESS_FILE_KEY");
        domainName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_NAME");
        _ltqlvbSettings = injectConfiguration.GetFromSection<LTQLVBSettings>(nameof(LTQLVBSettings));
        _lLTPService = lLTPService;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
        _lienThongILISService = lienThongILISService;
        _quaTrinhXuLyHoSoRepo = quaTrinhXuLyHoSoRepo;
        _thongBaoThueRepo = thongBaoThueRepo;
        _cacheService = cacheService;
        _cacheKeyService = cacheKeyService;
    }
     /// <summary>
    /// chỉ truyền 1 trong 2 giá trị
    /// </summary>
    /// <param name="Id"></param>
    /// <param name="maHoSo"></param>
    /// <returns></returns>
    /// <exception cref="Exception"></exception>
    public async Task<HoSoPer?> GetRequiredFieldForCheckPersHoSo(DefaultIdType? Id, string? maHoSo)
    {
        string where = string.Empty;
        if(Id != null && Id != Guid.Empty)
        {
            where += "Id = @Id";
        }
        if (!string.IsNullOrEmpty(maHoSo))
        {
            where += "MaHoSo = @MaHoSo";
        }
        if(where == string.Empty)
        {
            throw new Exception("Tham số truyền vào không hợp lệ");
        }
        string sql = $@"SELECT TOP 1 {nameof(HoSo.NguoiDangXuLy)}, {nameof(HoSo.NguoiDaXuLy)}, {nameof(HoSo.NguoiNhanHoSo)}, {nameof(HoSo.NguoiGui)}, {nameof(HoSo.DonViId)}, {nameof(HoSo.DonViDaChuyenXuLy)}
                  FROM {SchemaNames.Business}.{TableNames.HoSos} WHERE {where} And DeletedOn is null";
        HoSoPer? hoSoPer = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoPer>(sql, new
        {
            Id = Id,
            MaHoSo = maHoSo
        });
        return hoSoPer;
    }
    public async Task<bool> HasPermissionHandleHoSo(HoSo hoSo, CancellationToken cancellationToken = default)
    {
        string userId = _currentUser.GetUserId().ToString().ToLower();
        string danhSachNguoiThaoTacHoSo = hoSo.NguoiDangXuLy + hoSo.NguoiDaXuLy + hoSo.NguoiNhanHoSo;
        if (danhSachNguoiThaoTacHoSo.ToLower().Contains(userId))
        {
            return true;
        }
        if (hoSo.NguoiGui?.ToLower() == _currentUser.GetUserName().ToLower())
        {
            return true;
        }
        string? officeCode = _currentUser.GetUserOfficeCode()?.ToLower();
        if (hoSo.DonViId?.ToLower() == officeCode)
        {
            return true;
        }
        if (hoSo.DonViDaChuyenXuLy != null && hoSo.DonViDaChuyenXuLy.ToLower().Contains(officeCode))
        {
            return true;
        }

        var permissions = await _cacheService.GetOrSetAsync(
            _cacheKeyService.GetCacheKey(TDClaims.Permission, userId),
            () => _user.GetPermissionsAsync(userId, cancellationToken),
            cancellationToken: cancellationToken);
        var s = permissions?.Any(x => x.ToLower().Contains(TDResource.NhomQuanTriDonVi.ToLower()) || x.ToLower().Contains(TDResource.NhomQuanTriHeThong.ToLower()));
        if (s == true)
        {
            return true;
        }

        return false;
    }
    // tạo request body tới /lienthonghsqlvb/GuiHoSo
    public async Task<LienThongTrucDVCQLVB> GuiHoSoLTQLVB(HoSoQLVB hoSo, NguoiKyLienThongQLVB nguoiKy, NguoiKyLienThongQLVB nguoiTrinhKy, string? reqDinhKemKetQua, string? reqTrichYeuKetQua, string officeName, string maDinhDanhOfficeCode, object? thamSoAn, string? trichYeu, string? reqLoaiVanBanKetQua, string? reqCoQuanBanHanh = null, string? reqNguoiKyVanBan = null, string? reqSoKyHieuVanBan = null, DateTime? ngayHenTraCaNhan = null)
    {

        VanBanDuThaoLienThongQLVB vanBanDuThaoLienThongQLVB = new VanBanDuThaoLienThongQLVB() { };
        var dinhKemDuThaoLienThongQLVB = new List<DinhKemDuThaoLienThongQLVB>() { };
        var dinhKemKetQua = !string.IsNullOrEmpty(reqDinhKemKetQua) ? reqDinhKemKetQua : hoSo.DinhKemKetQua;
        string coQuanBanHanhKetQua = !string.IsNullOrEmpty(reqCoQuanBanHanh) ? reqCoQuanBanHanh : !string.IsNullOrEmpty(officeName) ? officeName : !string.IsNullOrEmpty(hoSo.CoQuanBanHanhKetQua) ? hoSo.CoQuanBanHanhKetQua : " ";
        string nguoiKyVanBanKetQua = !string.IsNullOrEmpty(reqNguoiKyVanBan) ? reqNguoiKyVanBan : !string.IsNullOrEmpty(hoSo.NguoiKyKetQua) ? hoSo.NguoiKyKetQua : string.Empty;
        string soKyHieuKetQua = !string.IsNullOrEmpty(reqSoKyHieuVanBan) ? reqSoKyHieuVanBan : !string.IsNullOrEmpty(hoSo.SoKyHieuKetQua) ? hoSo.SoKyHieuKetQua : string.Empty;

        // nếu như đơn vị hiện tại là ubnd tỉnh => lấy cơ quan ban hành kết quả
        if (string.IsNullOrEmpty(dinhKemKetQua))
        {
            throw new Exception("Vui lòng đính kèm tệp khi gửi Quản lý văn bản");
        }
        #region đính kèm kết quả chính
        if (!string.IsNullOrEmpty(dinhKemKetQua))
        {
            foreach (var item in dinhKemKetQua.Split("##"))
            {
                Base64DataFile dinhKem = await _minioService.GetFileByKeyAsBase64Async(null, item);
                dinhKemDuThaoLienThongQLVB.Add(new DinhKemDuThaoLienThongQLVB() { Ten = dinhKem.Name, Base64 = dinhKem.Base64, Link = null });
            }
        }
        #endregion
        dinhKemDuThaoLienThongQLVB = dinhKemDuThaoLienThongQLVB.DistinctBy(x => x.Ten).Select(x => new DinhKemDuThaoLienThongQLVB
        {
            Base64 = x.Base64,
            Ten = Path.GetFileName(x.Ten),
            Link = x.Link
        }).ToList();
        //!string.IsNullOrEmpty(trichYeu) ? trichYeu : ((reqTrichYeuKetQua ?? hoSo.TrichYeuKetQua ?? hoSo.TrichYeuHoSo));
        vanBanDuThaoLienThongQLVB.TrichYeu = hoSo.MaHoSo;
        if (!string.IsNullOrEmpty(trichYeu))
        {
            vanBanDuThaoLienThongQLVB.TrichYeu = trichYeu;
        } else if (!string.IsNullOrEmpty(reqTrichYeuKetQua))
        {
            vanBanDuThaoLienThongQLVB.TrichYeu = reqTrichYeuKetQua;
        } else if (!string.IsNullOrEmpty(hoSo.TrichYeuKetQua))
        {
            vanBanDuThaoLienThongQLVB.TrichYeu = hoSo.TrichYeuKetQua;
        } else if (!string.IsNullOrEmpty(hoSo.TrichYeuHoSo))
        {
            vanBanDuThaoLienThongQLVB.TrichYeu = hoSo.TrichYeuHoSo;
        }
        if (_ltqlvbSettings != null && _ltqlvbSettings.themMaHoSoVaoTrichYeu != null && _ltqlvbSettings.themMaHoSoVaoTrichYeu == true)
        {
            vanBanDuThaoLienThongQLVB.TrichYeu += $" ({hoSo.MaHoSo})";
        }
        vanBanDuThaoLienThongQLVB.DinhKem = dinhKemDuThaoLienThongQLVB;
        vanBanDuThaoLienThongQLVB.NgayTao = "";
        vanBanDuThaoLienThongQLVB.LoaiVanBan = !string.IsNullOrEmpty(reqLoaiVanBanKetQua) ? reqLoaiVanBanKetQua : hoSo.LoaiVanBanKetQua;

        string sqlGetThanhPhanHoSos = $"SELECT Ten, DinhKem as Link FROM Business.ThanhPhanHoSos WHERE HoSo = @MaHoSo AND (DinhKem is not null or DinhKem <> '')";
        var thanhPhanHoSos = await _dapperRepository.QueryAsync<DinhKemDuThaoLienThongQLVB>(sqlGetThanhPhanHoSos, new
        {
            hoSo.MaHoSo
        });
        var dinhKemKetQuaLienQuans = await _dapperRepository.QueryAsync<KetQuaLienQuanDto>("SELECT DinhKem, TrichYeu FROM Business.KetQuaLienQuans where MaHoSo = @MaHoSo and DeletedOn is null", new
        {
            hoSo.MaHoSo
        });

        var thanhPhanHoSoWithPublicLinks = new List<DinhKemDuThaoLienThongQLVB>();
        for (int i = 0; i < thanhPhanHoSos.Count; i++)
        {
            var thanhPhanHoSo = thanhPhanHoSos[i];
            if (string.IsNullOrEmpty(thanhPhanHoSo.Link))
            {
                continue;
            }
            var links = thanhPhanHoSo.Link.Split("##").ToList();
            if(links.Count > 1)
            {
                for (int j = 0; j < links.Count; j++)
                {
                    thanhPhanHoSoWithPublicLinks.Add(new DinhKemDuThaoLienThongQLVB()
                    {
                        Base64 = "",
                        Ten = Path.GetFileName(links[j]),
                        Link = domainName + publicApiGetFile + "?Path=" + links[j] + "&AccessKey=" + publicApiGetFileAccessKey
                    });
                }
            } else if(links.Count == 1)
            {
                thanhPhanHoSoWithPublicLinks.Add(new DinhKemDuThaoLienThongQLVB()
                {
                    Base64 = "",
                    Ten = Path.GetFileName(thanhPhanHoSo.Link),
                    Link = domainName + publicApiGetFile + "?Path=" + thanhPhanHoSo.Link + "&AccessKey=" + publicApiGetFileAccessKey
                });
            }
        }

        for (int i = 0; i < dinhKemKetQuaLienQuans.Count; i++)
        {
            var dinhKemKetQuaLienQuan = dinhKemKetQuaLienQuans[i];
            if (string.IsNullOrEmpty(dinhKemKetQuaLienQuan.DinhKem))
            {
                continue;
            }
            var links = dinhKemKetQuaLienQuan.DinhKem.Split("##").ToList();
            if (links.Count > 1)
            {
                for (int j = 0; j < links.Count; j++)
                {
                    thanhPhanHoSoWithPublicLinks.Add(new DinhKemDuThaoLienThongQLVB()
                    {
                        Base64 = "",
                        Ten = Path.GetFileName(links[j]),
                        Link = domainName + publicApiGetFile + "?Path=" + links[j] + "&AccessKey=" + publicApiGetFileAccessKey
                    });
                }
            }
            else if (links.Count == 1)
            {
                thanhPhanHoSoWithPublicLinks.Add(new DinhKemDuThaoLienThongQLVB()
                {
                    Base64 = "",
                    Ten = Path.GetFileName(dinhKemKetQuaLienQuan.DinhKem),
                    Link = domainName + publicApiGetFile + "?Path=" + dinhKemKetQuaLienQuan.DinhKem + "&AccessKey=" + publicApiGetFileAccessKey
                });
            }
        }


        LienThongTrucDVCQLVB lienThongTrucDVCQLVB = new LienThongTrucDVCQLVB()
        {
            IDHoSo = hoSo.Id.ToString(),
            MaHoSo = hoSo.MaHoSo,
            TenHoSo = hoSo.TrichYeuHoSo,
            ThuTuc = hoSo.TenTTHC,
            ThamSoAn = JsonConvert.SerializeObject(thamSoAn), // dùng cho dự thảo
            HccLinkAPI = "/apifile?url=", //domain
            LoaiHSLienthong = "LoaiHSLienthong",
            ChuHoSo = new NguoiDungLienThongQLVB()
            {
                Ten = hoSo.ChuHoSo,
                CMND = hoSo.SoGiayToChuHoSo,
                SoDienThoai = hoSo.SoDienThoaiChuHoSo,
                DiaChi = hoSo.DiaChiChuHoSo,
            },
            NguoiNop = new NguoiDungLienThongQLVB()
            {
                Ten = hoSo.NguoiUyQuyen ?? hoSo.ChuHoSo,
                CMND = hoSo.SoGiayToNguoiUyQuyen ?? hoSo.SoGiayToChuHoSo,
                SoDienThoai = hoSo.SoDienThoaiNguoiUyQuyen ?? hoSo.SoDienThoaiChuHoSo,
                DiaChi = hoSo.DiaChiNguoiUyQuyen ?? hoSo.DiaChiChuHoSo,
            },
            NguoiKy = nguoiKy,
            NguoiTrinhKy = nguoiTrinhKy,
            DonVi = new DonViLienThongQLVB()
            {
                Ten = coQuanBanHanhKetQua,
                MaDinhDanh = maDinhDanhOfficeCode ?? "",
            },
            VanBanDuThao = vanBanDuThaoLienThongQLVB,
            ThanhPhanHoSo = thanhPhanHoSoWithPublicLinks,
            NguoiKyVanBan = nguoiKyVanBanKetQua,
            SoKyHieuVanBan = soKyHieuKetQua,
            HanXuLyVanBan = ngayHenTraCaNhan?.ToString("yyyyMMddHHmmss")
        };
        return lienThongTrucDVCQLVB;
    }
    private class GetNguoiXuLyTiepLienThongQLVB_Group
    {
        public string MaDinhDanh { get; set; }
    }
    private class GetNguoiXuLyTiepLienThongQLVB_User
    {
        public string Id { get; set; }
    }
    public async Task<string> GetNguoiXuLyTiepLienThongQLVB(string userOfficeCode, ReactFlowNodeQuyTrinhXuLy node, HoSoQLVB hoSo)
    {
        var pageSize = 200;
        var pageNumber = 1;
        string nguoiXuLyTiep = string.Empty;

        if(node.data.maTrangThaiHoSo == "9")
        {
            return hoSo.NguoiNhanHoSo;
        }
        //if (node.data.loaiBuoc != "Nhận nội bộ")
        //{
        var group = await _dapperRepository.QueryFirstOrDefaultAsync<GetNguoiXuLyTiepLienThongQLVB_Group>("SELECT MaDinhDanh FROM Catalog.Groups WHERE GroupCode = @DonViId", new
        {
            hoSo.DonViId
        });
        //if (group == null) return null;
        var request = new SearchNguoiDungNhomNguoiDungQuery()
        {
            NhomNguoiDungId = node.data.nhomNguoiDungId.ToString(),
            LoaiBuoc = node.data.loaiBuoc,
            UserGroupCode = userOfficeCode,
            DonViTiepNhan = hoSo.DonViId,
            MaDinhDanh = group?.MaDinhDanh,
            PageNumber = pageNumber,
            PageSize= pageSize,
        };
        var builder = new SearchNguoiDungNhomNguoiDungQueryBuilder(request, _dapperRepository);
        var paginationResponse = await builder.GetNguoiDung();
        var nguoiDungs = paginationResponse.Data;
        if(nguoiDungs != null && nguoiDungs.Count > 0)
        {
            nguoiXuLyTiep = String.Join("##", nguoiDungs.Select(x => x.UserId));

        } else
        {
            throw new Exception("Không tìm được người xử lý sau khi liên thông QLVB, kiểm tra lại quy trình!");
        }
       
        //} else if (node.data.loaiBuoc == "Nhận nội bộ")
        //{
        //    var response = await _dapperRepository.QueryAsync<GetNguoiXuLyTiepLienThongQLVB_User>($"SELECT Id FROM [Identity].[Users] WHERE GroupCode = @OfficeCode", new
        //    {
        //        OfficeCode = currUser.OfficeCode
        //    });
        //    nguoiXuLyTiep = String.Join("##", response.Select(x => x.Id.ToString()));
        //}
        return nguoiXuLyTiep;
    }

    /// <summary>
    /// Gửi dữ liệu lên LTQLVB
    /// </summary>
    /// <param name="hoSo"></param>
    /// <param name="currUser"></param>
    /// <param name="reqDinhKemKetQua"></param>
    /// <param name="reqTrichYeuKetQua"></param>
    /// <param name="reqNguoiXuLyTiep"></param>
    /// <returns></returns>
    /// <exception cref="Exception"></exception>
    public async Task<HoSo> HandleLTQLVB(HoSoQLVB hoSo, UserDetailsDto currUser, string? reqDinhKemKetQua, string? reqTrichYeuKetQua, string? reqNguoiXuLyTiep, ReactFlowNodeQuyTrinhXuLy nodeQuyTrinhXuLy, string? reqLoaiVanBanKetQua, string? reqCoQuanBanHanh = null, string? reqNguoiKyVanBan = null, string? reqSoKyHieuVanBan = null, DateTime? ngayHenTraCaNhan = null)
    {
        string errorText = string.Empty;

        int nguoiXuLyTiepLength = reqNguoiXuLyTiep.Split("##").Length;
        if (nguoiXuLyTiepLength > 1)
        {
            errorText = "ERR_HSCV:Bước liên thông quản lý văn bản chỉ được chọn 1 người xử lý!";
        }
        else if (nguoiXuLyTiepLength == 1)
        {
            var nguoiDung = await _user.GetAsync(reqNguoiXuLyTiep, default);
            //if(nguoiDung.TaiKhoanHeThongQLVB == false)
            if(false)
            {
                errorText = "ERR_HSCV:Người trình ký chưa được cấu hình tài khoản quản lý văn bản!";
            //} else if (nguoiDung.TaiKhoanHeThongQLVB == true)
            } else if (true)
            {
                // gửi dữ liệu qua ltqlvb
                string taiKhoanNguoiKyQLVB = nguoiDung.UserName;
                if (!string.IsNullOrEmpty(nguoiDung.TaiKhoanQLVB))
                {
                    taiKhoanNguoiKyQLVB = nguoiDung.TaiKhoanQLVB;
                }
                NguoiKyLienThongQLVB nguoiKy = new NguoiKyLienThongQLVB()
                {
                    Ten = nguoiDung.FullName,
                    TaiKhoan = taiKhoanNguoiKyQLVB,
                };
                NguoiKyLienThongQLVB nguoiTrinhKy = new NguoiKyLienThongQLVB()
                {
                    Ten = currUser.FullName,
                    TaiKhoan = currUser.UserName,
                };
                string nguoiXuLyTiep = await GetNguoiXuLyTiepLienThongQLVB(currUser != null ? currUser.OfficeCode : "", nodeQuyTrinhXuLy, hoSo);
                if (string.IsNullOrEmpty(nguoiXuLyTiep))
                {
                    errorText = "Không tìm thấy cán bộ xử lý tiếp trong quy trình xử lý";
                    throw new Exception(errorText);
                }
                hoSo.LienThongQLVB(true, "", currUser.Id.ToString(), nguoiXuLyTiep); // tính người xử lý tiếp
                if(hoSo.NguoiXuLyTiep.Length > 1000)
                {
                    errorText = "Chuyển xử lý QLVB thất bại, vượt quá số lượng người nhận xử lý bước tiếp theo (Vui lòng kiểm tra lại quy trình xử lý)";
                    throw new Exception(errorText);
                }
                LienThongTrucDVCQLVB lienThongTrucDVCQLVB = await GuiHoSoLTQLVB(hoSo, nguoiKy, nguoiTrinhKy, reqDinhKemKetQua, reqTrichYeuKetQua, nguoiDung.OfficeName, nguoiDung.MaDinhDanhOfficeCode, null, null, reqLoaiVanBanKetQua, reqCoQuanBanHanh, reqNguoiKyVanBan, reqSoKyHieuVanBan, ngayHenTraCaNhan);
                var responseLienThongQLVB = await _lTQLVBService.PostData(JsonConvert.SerializeObject(lienThongTrucDVCQLVB));
                if (responseLienThongQLVB.error.code == 200)
                {
                    //hoSo.LienThongQLVB(true, JsonConvert.SerializeObject(responseLienThongQLVB), currUser.Id.ToString(), nguoiXuLyTiep);
                }
                else
                {
                    lienThongTrucDVCQLVB.VanBanDuThao = new VanBanDuThaoLienThongQLVB();
                    _logger.LogError($"{hoSo.MaHoSo}_LOICHUYENQLVB_{JsonConvert.SerializeObject(responseLienThongQLVB)}_req:{JsonConvert.SerializeObject(lienThongTrucDVCQLVB)}");
                    errorText = "ERR_HSCV:Lỗi kết nối HSCV: " + responseLienThongQLVB.error?.internalMessage;
                }
            }
        }
        else
        {
            errorText = "ERR_HSCV:Chưa chọn người xử lý!";
        }
        if(errorText != string.Empty)
        {
            throw new Exception(errorText);
        }
        return hoSo;
    }

    public ReactFlowNodeQuyTrinhXuLy GetCurrentNode(TruongHopThuTuc truongHopThuTuc, string currentNodeId)
    {
        var nodeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowNodeQuyTrinhXuLy>>(truongHopThuTuc.NodeQuyTrinh);
        var edgeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowEdgeQuyTrinhXuLy>>(truongHopThuTuc.EdgeQuyTrinh);
        var currentNode = nodeQuyTrinhs.Find(node => node.id == currentNodeId); // hoSo.BuocHienTai là bước hiện tại của hồ sơ khi CHƯA Cập nhật

        return currentNode;
    }

    public ReactFlowNodeQuyTrinhXuLy GetFirstNode(TruongHopThuTuc truongHopThuTuc)
    {
        var nodeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowNodeQuyTrinhXuLy>>(truongHopThuTuc.NodeQuyTrinh);
        var edgeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowEdgeQuyTrinhXuLy>>(truongHopThuTuc.EdgeQuyTrinh);
        var fisrtNode = nodeQuyTrinhs.Find(node => node.data.maTrangThaiHoSo == "2");
        return fisrtNode;
    }

    public QuyTrinhXuLyResponse GetNextNode(TruongHopThuTuc truongHopThuTuc, string buocSau, string currentNodeId = null)
    {
        var nodeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowNodeQuyTrinhXuLy>>(truongHopThuTuc.NodeQuyTrinh);
        var edgeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowEdgeQuyTrinhXuLy>>(truongHopThuTuc.EdgeQuyTrinh);
        var nextNode = nodeQuyTrinhs.Find(node => node.id == buocSau); // request gửi lên giá trị node hiện tại sau khi cập nhật
        var startNodeEdges = edgeQuyTrinhs.FindAll(edge => edge.source == buocSau).Select(x => x.target);//các bước sau của bước sẽ cập nhật
        var nextNodeIds = String.Join("##", startNodeEdges);
        var nextNodeId = startNodeEdges.FirstOrDefault(x => nodeQuyTrinhs.FindIndex(node => node.id == x) != -1); //  giá trị bước tiếp theo cho chuyển liên thông sẽ mặc định lấy chỉ 1 node
        var nextOfUpdatedNode = nodeQuyTrinhs.Find(node => node.id == nextNodeId);
        var currentNode = nodeQuyTrinhs.Find(node => node.id == currentNodeId); // hoSo.BuocHienTai là bước hiện tại của hồ sơ khi CHƯA Cập nhật

        return new QuyTrinhXuLyResponse()
        {
            NextNode = nextNode,
            NextOfUpdatedNode = nextOfUpdatedNode,
            Nodes = nodeQuyTrinhs,
            Edges = edgeQuyTrinhs,
            NextNodeIds = nextNodeIds,
            NextNodeId = nextNodeId,
            CurrentNode = currentNode
        };
    }
    public List<ReactFlowNodeQuyTrinhXuLy>? GetNextOfCurrentNode(TruongHopThuTuc truongHopThuTuc, string currentNodeId)
    {
        var nodeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowNodeQuyTrinhXuLy>>(truongHopThuTuc.NodeQuyTrinh);
        var edgeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowEdgeQuyTrinhXuLy>>(truongHopThuTuc.EdgeQuyTrinh);
        var nextNodeIds = edgeQuyTrinhs.FindAll(edge => edge.source == currentNodeId).Select(x => x.target);//các bước tiếp
        var nextNodes = nodeQuyTrinhs.FindAll(node => nextNodeIds.Any(x => node.id == x));
        return nextNodes;
    }

    public async Task<ChuyenBuocXuLyType> ChuyenBuoc(DateTime currentTime, TruongHopThuTuc truongHopThuTuc, HoSoQLVB? hoSo, string? buocHienTai, List<NgayNghi>? ngayNghis, double soGioMacDinhBuocXuLy, UserDetailsDto currUser, string? reqDinhKemKetQua, string? reqTrichYeuKetQua, string? reqNguoiXuLyTiep, string? reqLoaiVanBanKetQua, string? reqCoQuanBanHanh = null, string? reqNguoiKyVanBan = null, string? reqSoKyHieuVanBan = null)
    {

        try
        {
            if (hoSo.LoaiDuLieuKetNoi == "LTKS" || hoSo.LoaiDuLieuKetNoi == "LTKT")
            {
                throw new Exception("Hồ sơ thuộc Dịch vụ công liên thông, vui lòng không sử dụng chức năng này");
            }
            _lLTPService.CheckThaoTac(hoSo.LoaiDuLieuKetNoi);
            var quyTrinhXuLy = GetNextNode(truongHopThuTuc, buocHienTai, hoSo.BuocHienTai);
            var nextNode = quyTrinhXuLy.NextNode;
            var edgeQuyTrinhs = quyTrinhXuLy.Edges;
            var nextOfUpdatedNode = quyTrinhXuLy.NextOfUpdatedNode;
            var nextNodeIds = quyTrinhXuLy.NextNodeIds;
            var currentNode = quyTrinhXuLy.CurrentNode;
            string trangThaiTraKq = "";
            string? donViTraKq = null;
            // tính bước xử lý tiếp theo của bước sau khi cập nhật

            string maNodeTruoc = hoSo.BuocHienTai;
            string maNodeSau = nextNode.id;
            string maTrangThaiTruoc = hoSo.TrangThaiHoSoId;
            string maTrangThai = nextNode.data.maTrangThaiHoSo;
            //tính ngày xử lý cá nhân
            DateTime? ngaytiepnhancanhancu = hoSo.NgayTiepNhanCaNhan;
            DateTime? ngayhentracanhancu = hoSo.NgayHenTraCaNhan;
            var caculateTime = new CaculateTime(_configuration);


            // trạng thái cuối sẽ không có xét đúng hạn/ quá hạn
            if (currentNode?.data != null && currentNode.data.maTrangThaiHoSo == "9")
            {
                ngayhentracanhancu = null;
            }

            if (nextNode.data.thoiGianXuLy != null || nextNode.data.thoiGianThucHienTrucTuyen != null)
            {
                soGioMacDinhBuocXuLy = caculateTime.GetThoiGianXuLy(nextNode, hoSo.KenhThucHien);
            }
            var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, soGioMacDinhBuocXuLy, nextNode.data.loaiThoiGian);
            var tenBuocSau = nextNode.data.tenBuocXuLy;
            var tenThaoTac = edgeQuyTrinhs.Find(edge => edge.target == nextNode.id && edge.source == hoSo.BuocHienTai);

            DateTime? ngayYeuCauBoSung = null;

            #region tạo request gửi thông báo firebase
            string notificationType = null;

            #endregion
            #region Liên thông qlvb
            if (nextNode.data.guiLienThongQLVB == true)
            {
                if (nextOfUpdatedNode == null)
                {
                    throw new Exception("Có lỗi xảy ra với bước liên thông ở quy trình xử lý, vui lòng liên hệ quản trị hệ thống");
                }
                if (hoSo.ChoBanHanh == true)
                {
                    throw new Exception("Hồ sơ đã được gửi lên hệ thống quản lý văn bản");
                }
                await HandleLTQLVB(hoSo, currUser, reqDinhKemKetQua, reqTrichYeuKetQua, reqNguoiXuLyTiep, nextOfUpdatedNode, reqLoaiVanBanKetQua, reqCoQuanBanHanh, reqNguoiKyVanBan, reqSoKyHieuVanBan, ngayHenTraCaNhan);
                notificationType = NotificationType.DangXuLy;
            }

            #endregion
            #region Liên thông ILIS
            if (nextNode.data.loaiDuLieuKetNoi == TruongHopThuTuc.LoaiDuLieuKetNoiBuoc.LienThongThueILIS)
            {
                TiepNhanHoSoResponse res = await _lienThongILISService.SendData(hoSo);
                if (res.data == 0)
                {
                    throw new Exception(res.status.message);
                }
            }
            #endregion

            if (maTrangThai == "4")
            {
                notificationType = NotificationType.DangXuLy;
            }
            #region Xử lý riêng
            if (maTrangThai == "8")
            {
                ngayYeuCauBoSung = currentTime;
                notificationType = NotificationType.DungXuLy;
            }
            DateTime? ngayHenTra = null;
            if (maTrangThaiTruoc == "8")
            {
                ngayHenTra = hoSo.NgayHenTra != null && hoSo.NgayHenTra != default ? caculateTime.GetNgayHenTraBoSung(hoSo.NgayHenTra, (DateTime)hoSo.NgayYeuCauBoSung, ngayNghis, currentTime) : null;
                var hoSoBoSung = new HoSoBoSung(hoSo.MaHoSo, hoSo.NguoiXuLyTruoc, currUser.Id.ToString(), hoSo.NgayHenTra, ngayHenTra, "Dừng xử lý hồ sơ");
                if (!string.IsNullOrEmpty(hoSo.BuocXuLyTruoc))
                {
                    var prevNode = GetCurrentNode(truongHopThuTuc, hoSo.BuocXuLyTruoc);
                    if (prevNode.data.guiLienThongQLVB == true)
                    {
                        await _dapperRepository.InsertEntityAsync(hoSoBoSung, SchemaNames.Business + "." + TableNames.HoSoBoSungs);
                    }
                    else
                    {
                        await _repositoryHoSoBoSung.AddAsync(hoSoBoSung);
                    }
                }
                else
                {
                    await _repositoryHoSoBoSung.AddAsync(hoSoBoSung);
                }
            }
            #endregion
            #region yêu cầu thực hiện nghĩa vụ tài chính
            if (maTrangThai == "6")
            {
                ngayYeuCauBoSung = currentTime;
                notificationType = NotificationType.YeuCauThucHienNghiaVuTaiChinh;
            }
            if (maTrangThaiTruoc == "6")
            {
                ngayHenTra = caculateTime.GetNgayHenTraBoSung(hoSo.NgayHenTra, (DateTime)hoSo.NgayYeuCauBoSung, ngayNghis, currentTime);
                var hoSoBoSung = new HoSoBoSung(hoSo.MaHoSo, hoSo.NguoiXuLyTruoc, currUser != null ? currUser.Id.ToString() : null, hoSo.NgayHenTra, ngayHenTra, "Yêu cầu thực hiện nghĩa vụ tài chính");
                var prevNode = GetCurrentNode(truongHopThuTuc, hoSo.BuocXuLyTruoc);
                if (prevNode != null && prevNode.data != null && prevNode.data.guiLienThongQLVB == true)
                {
                    await _dapperRepository.InsertEntityAsync(hoSoBoSung, SchemaNames.Business + "." + TableNames.HoSoBoSungs);
                }
                else
                {
                    await _repositoryHoSoBoSung.AddAsync(hoSoBoSung);
                }
            }
            #endregion

            #region Tự chuyển bước
            if (nextNode.data.laBuocTuChuyen == true)
            {

            }
            #endregion
            DateTime? ngayTraKetQua = null;
            if (maTrangThai == "9")
            {
                GroupDto groupInfo = null;
                if (!string.IsNullOrEmpty(hoSo.DonViId))
                {
                    var groupsInfo = await _mediator.Send(new GetByGroupCodeQuery(hoSo.DonViId));
                    groupInfo = groupsInfo.Data;
                    if (groupInfo?.YeuCauXacNhanCoKetQua == null || groupInfo?.YeuCauXacNhanCoKetQua == false)
                    {
                        trangThaiTraKq = _trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ;
                        notificationType = NotificationType.DaTraKetQua;
                        //await _eventPublisher.PublishAsync(new ThongBaoTraKetQuaEvent(hoSo, hoSo.TenDonVi,hoSo.Catalog));
                    }
                    else
                    {
                        trangThaiTraKq = _trangThaiTraHoSoConstant.CHO_XAC_NHAN;
                        notificationType = NotificationType.ChoXacNhanTraKetQua;

                    }
                    donViTraKq = !string.IsNullOrEmpty(groupInfo?.DonViQuanLy) && groupInfo.DonViQuanLyTraHoSo == true ? groupInfo?.DonViQuanLy : hoSo.DonViId;
                    ngayTraKetQua = currentTime;

                }

            }
            //await _eventPublisher.PublishAsync(new ChuyenBuocNotificationEvent(hoSo, reqNguoiXuLyTiep, (currUser != null ? currUser.FullName : "Hệ thống quản lý văn bản") + " " + tenThaoTac.label + " " + hoSo.MaHoSo, notificationType, maTrangThai, trangThaiTraKq));
            return new ChuyenBuocXuLyType
            {
                NotificationType = notificationType,
                TenBuoc = tenBuocSau,
                MaNodeSau = maNodeSau,
                TenThaoTac = tenThaoTac?.label,
                BuocXuLyTiep = nextNode.data.guiLienThongQLVB == true ? nextOfUpdatedNode.id : "",
                MaTrangThai = maTrangThai,
                NgayHenTraCaNhan = ngayHenTraCaNhan,
                NgayHenTraCaNhanCu = ngayhentracanhancu,
                NgayTiepNhanCaNhanCu = ngaytiepnhancanhancu,
                NgayYeuCauBoSung = ngayYeuCauBoSung,
                NgayHenTra = ngayHenTra,
                NgayTraKetQua = ngayTraKetQua,
                ThoiHanBuocXuLy = currentNode?.data != null && currentNode?.data?.thoiGianXuLy != null ? currentNode?.data?.thoiGianXuLy : null,
                LoaiThoiHanBuocXuLy = currentNode?.data != null && currentNode?.data?.loaiThoiGian != null ? currentNode?.data?.loaiThoiGian : null,
                LaBuocChuyenLTQLVB = currentNode?.data != null ? nextNode?.data?.guiLienThongQLVB == true ? true : false : false,
                TrangThaiTraKq = trangThaiTraKq,
                DonViTraKq = donViTraKq,
                LoaiKetQua = DuThaoXuLyHoSoConstant.Loai_KetQua,
                loaiDuLieuKetNoi = nextNode.data.loaiDuLieuKetNoi,
                trangThaiChiTiet = nextNode.data.trangThaiChiTiet
            };
        }
        catch (NullReferenceException exx)
        {
            _logger.LogError($"{hoSo.MaHoSo}_UNKNOWNERROR_QLVB1_{exx.ToString()}_req:{JsonConvert.SerializeObject(hoSo)}");
            throw new Exception("Có lỗi xảy ra khi thực hiện chuyển bước");
        }
    }

    public async Task<bool> ChuyenBuocXuLyQuanLyVanBan(ChuyenBuocXuLyQLVB request, HoSoQLVB hoSo, bool addKetQuaLienQuan = false)
    {
        // Sửa logic cần phải sửa lại ở SyncQLVBService

        int soGioMacDinhBuocXuLy = 2;
        bool updateSuccess = true;
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var sqlTruongHopThuTuc = "SELECT Top 1 NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHien, LoaiThoiGianThucHien, Ten, Ma, Id FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";
        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
        {
            hoSo.MaTruongHop
        });
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year));
        try
        {
            var updateHoSoData = await ChuyenBuoc(currentTime, truongHopThuTuc, hoSo, request.BuocHienTai, ngayNghis, soGioMacDinhBuocXuLy, null, request.DinhKemKetQua, request.TrichYeuKetQua, request.NguoiXuLyTiep, request.LoaiVanBanKetQua);
            var dinhKemKetQuaCu = hoSo.DinhKemKetQua;
            var trichYeuKetQuaCu = hoSo.TrichYeuKetQua;
            var soKyHieuKetQuaCu = hoSo.SoKyHieuKetQua;
            var loaiVanBanKetQuaCu = hoSo.LoaiVanBanKetQua;
            var nguoiKyKetQuaCu = hoSo.NguoiKyKetQua ?? "";
            var coQuanBanHanhKetQuaCu = hoSo.CoQuanBanHanhKetQua;
            var ngayBanHanhKetQuaCu = hoSo.NgayBanHanhKetQua;
            var ngayKyKetQuaCu = hoSo.NgayKyKetQua;

            bool laTrangThaiChoTra = updateHoSoData.MaTrangThai == "9";

            var nguoiXuLyTiep = laTrangThaiChoTra ? hoSo.NguoiNhanHoSo : request.NguoiXuLyTiep;
            DateTime? ngayKetThucXuLy = laTrangThaiChoTra ? currentTime : null;
            var updateHoSoSql = HoSoCommandBuilder.GetChuyenBuocXuLyHoSoQLVB(
                updateHoSoData.TenBuoc, updateHoSoData.MaNodeSau, nguoiXuLyTiep,
                request.TrichYeuKetQua, request.DinhKemKetQua, request.YKienNguoiChuyenXuLy,
                request.DinhKemYKienNguoiChuyenXuLy, updateHoSoData.MaTrangThai, currentTime,
                updateHoSoData.NgayHenTraCaNhan, updateHoSoData.NgayYeuCauBoSung, updateHoSoData.NgayHenTra,
                updateHoSoData.NgayTraKetQua, updateHoSoData.TrangThaiTraKq, updateHoSoData.DonViTraKq, hoSo.NguoiXuLyTruoc, hoSo.BuocHienTai, hoSo.NguoiDangXuLy, request.LoaiVanBanKetQua,
                request.SoKyHieuKetQua, request.NguoiKyKetQua, request.CoQuanBanHanhKetQua, request.NgayBanHanhKetQua, request.NgayKy, ngayKetThucXuLy);

            var resUpdateHoSo = await _dapperRepository.ExcuteAsync(updateHoSoSql, new
            {
                TenBuocHienTai = updateHoSoData.TenBuoc,
                BuocHienTai = updateHoSoData.MaNodeSau,
                //NguoiXuLyTiep = null,
                //BuocXuLyTiep = updateHoSoData.BuocXuLyTiep,
                //NguoiXuLyTruoc = null,
                BuocXuLyTruoc = hoSo.BuocHienTai,
                NguoiDaXuLy = HoSo.RemoveDuplicateIds((hoSo.NguoiDaXuLy.EndsWith("##") ? hoSo.NguoiDaXuLy : hoSo.NguoiDaXuLy + "##") + hoSo.NguoiDangXuLy),
                NguoiDangXuLy = nguoiXuLyTiep,
                TrichYeuKetQua = request.TrichYeuKetQua,
                DinhKemKetQua = request.DinhKemKetQua,
                YKienNguoiChuyenXuLy = request.YKienNguoiChuyenXuLy,
                DinhKemYKienNguoiChuyenXuLy = request.DinhKemYKienNguoiChuyenXuLy,
                TrangThaiHoSoId = updateHoSoData.MaTrangThai,
                NgayTiepNhanCaNhan = currentTime,
                NgayHenTraCaNhan = updateHoSoData.NgayHenTraCaNhan,
                NgayYeuCauBoSung = updateHoSoData.NgayYeuCauBoSung,
                NgayHenTra = updateHoSoData.NgayHenTra,
                NgayTra = updateHoSoData.NgayTraKetQua,
                TrangThaiTraKq = updateHoSoData.TrangThaiTraKq,
                DonViTraKq = updateHoSoData.DonViTraKq,
                NguoiXuLyTruoc = hoSo.NguoiXuLyTruoc,
                LoaiVanBanKetQua = request.LoaiVanBanKetQua,
                SoKyHieuKetQua = request.SoKyHieuKetQua,
                NguoiKyKetQua = request.NguoiKyKetQua,
                CoQuanBanHanhKetQua = request.CoQuanBanHanhKetQua,
                NgayBanHanhKetQua = request.NgayBanHanhKetQua,
                NgayKyKetQua = request.NgayKy,
                NgayKetThucXuLy = ngayKetThucXuLy,
                Id = hoSo.Id
            });
            if(resUpdateHoSo == 0)
            {
                updateSuccess = false;
            } else
            {
                if (laTrangThaiChoTra)
                {
                    // để người nhận hồ sơ là người đang xử lý
                    await _nguoiXuLyHoSoService.SwapNguoiDangXuLyAndNguoiDaXuLy(hoSo.Id, nguoiXuLyTiep);
                }
                else
                {
                    // để người trong bước tiếp là người đang xử lý
                    await _nguoiXuLyHoSoService.ReplaceUsersToNguoiDangXuLy(hoSo.Id, nguoiXuLyTiep);
                }
            }

            var quaTrinhXuLyHoSoSql = HoSoCommandBuilder.GetQuaTrinhXuLyHoSoQLVB();
            var resAddQTXL = await _dapperRepository.ExcuteAsync(quaTrinhXuLyHoSoSql, new
            {
                MaHoSo = hoSo.MaHoSo,
                NodeQuyTrinh = updateHoSoData.BuocXuLyTiep,
                ThoiHanBuocXuLy = (int)updateHoSoData.ThoiHanBuocXuLy,
                LoaiThoiHanBuocXuLy = updateHoSoData.LoaiThoiHanBuocXuLy,
                ThaoTac = updateHoSoData.TenThaoTac, // ten thao tac
                TrangThai = updateHoSoData.MaTrangThai,
                NgayHetHanBuocXuLy = updateHoSoData.NgayHenTraCaNhanCu,
                NguoiGui = "",
                TenNguoiGui = request.TenNguoiGui ?? "Văn thư đơn vị",
                NguoiNhan = nguoiXuLyTiep,
                TenNguoiNhan = "",
                ThoiGian = currentTime,
                NoiDung = request.YKienNguoiChuyenXuLy,
                DinhKem = request.DinhKemYKienNguoiChuyenXuLy
            });
            if (resAddQTXL == 0)
            {
                updateSuccess = false;
            }
            if (!string.IsNullOrEmpty(request.DinhKemKetQua)) // bước tiếp là chờ trả kết quả thì k thêm nữa vì nó là kq chính r
            {
                var ketQuaLienQuan = new KetQuaLienQuan(hoSo.MaHoSo, loaiVanBanKetQuaCu, soKyHieuKetQuaCu, trichYeuKetQuaCu, ngayKyKetQuaCu, nguoiKyKetQuaCu, coQuanBanHanhKetQuaCu, ngayBanHanhKetQuaCu, null, null, dinhKemKetQuaCu);
                var resAddKQLQ = await _dapperRepository.InsertEntityAsync(ketQuaLienQuan, SchemaNames.Business + "." + TableNames.KetQuaLienQuans);
                if (resAddKQLQ == 0)
                {
                    updateSuccess = false;
                }
            }

            if (updateSuccess)
            {
                if (updateHoSoData.TrangThaiTraKq == _trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ)
                {
                    await _eventPublisher.PublishAsync(new ThongBaoTraKetQuaEvent(hoSo, hoSo.TenDonVi, hoSo.Catalog));
                }
                await _eventPublisher.PublishAsync(new ChuyenBuocNotificationEvent(hoSo, request.NguoiXuLyTiep, "Hệ thống quản lý văn bản" + " " + updateHoSoData.TenThaoTac + " " + hoSo.MaHoSo, updateHoSoData.NotificationType, updateHoSoData.MaTrangThai, updateHoSoData.TrangThaiTraKq));
                return true;
            } else
            {
                return false;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return false;
        }
    }
    public async Task<bool> YeuCauMotCuaBoSungHoSo(MotCuaYeuCauBoSungCommand request, HoSo hoSo, DateTime currentTime, string userFullName, string? userId, string? tenBuocXuLy)
    {
        string maTrangThaiHienTai = hoSo.TrangThaiHoSoId;
        var sqlUpdateThanhPhanHoSo = @"
            CREATE TABLE #TempTableThanhPhanHoSo (NoiDungBoSung nvarchar(500), Id uniqueidentifier);
            INSERT INTO #TempTableThanhPhanHoSo VALUES (@NoiDungBoSung, @Id);
            UPDATE tphs SET tphs.NoiDungBoSung = temp.NoiDungBoSung FROM Business.ThanhPhanHoSos tphs INNER JOIN
            #TempTableThanhPhanHoSo temp ON tphs.Id = temp.Id";
        string trangThaiTraKq = _trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ;
        string? donViTraKq = null;

        if (!string.IsNullOrEmpty(hoSo.DonViId))
        {
            var sqlGetGroup = $"SELECT YeuCauXacNhanCoKetQua, DonViQuanLy, DonViQuanLyTraHoSo FROM {SchemaNames.Catalog}.{TableNames.Groups} WHERE GroupCode = @DonViId";
            var groupInfo = await _dapperRepository.QueryFirstOrDefaultAsync<GroupDto>(sqlGetGroup, new
            {
                DonViId = hoSo.DonViId
            });
            if (groupInfo?.YeuCauXacNhanCoKetQua == null || groupInfo?.YeuCauXacNhanCoKetQua == false)
            {
                trangThaiTraKq = _trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ;
            }
            else
            {
                trangThaiTraKq = _trangThaiTraHoSoConstant.CHO_XAC_NHAN;

            }
            donViTraKq = !string.IsNullOrEmpty(groupInfo?.DonViQuanLy) && groupInfo.DonViQuanLyTraHoSo == true ? groupInfo?.DonViQuanLy : hoSo.DonViId;
        }
        if (maTrangThaiHienTai == "4")
        {
            hoSo.YeuCauMotCuaBoSung(maTrangThaiHienTai, "5", currentTime, request.LyDoBoSung, request.DinhKemBoSung,
                JsonConvert.SerializeObject(request.ThanhPhanBoSung), userId, HoSoConstant.TrangThaiBoSungMotCua, request.LyDoBoSung,
                request.DinhKemBoSung, hoSo.NguoiNhanHoSo, hoSo.NguoiDangXuLy, request.ThoiHanBoSung, request.NoiDungBoSung, trangThaiTraKq, donViTraKq, DuThaoXuLyHoSoConstant.Loai_BoSung);
            var hoSoBoSung = new HoSoBoSung(hoSo.MaHoSo, request.LyDoBoSung, request.DinhKemBoSung, currentTime, hoSo.NguoiNhanHoSo,
                hoSo.NgayHenTra, HoSoConstant.TrangThaiBoSungMotCua, JsonConvert.SerializeObject(request.ThanhPhanBoSung));

            var insertedRow = await _dapperRepository.InsertEntityAsync<HoSoBoSung>(hoSoBoSung, SchemaNames.Business + "." + TableNames.HoSoBoSungs);
            if(insertedRow == 0)
            {
                return false;
            }
            await _nguoiXuLyHoSoService.SwapNguoiDangXuLyAndNguoiDaXuLy(hoSo.Id, hoSo.NguoiNhanHoSo);
        }
        else if (maTrangThaiHienTai == "2")
        {
            hoSo.YeuCauMotCuaBoSung(maTrangThaiHienTai, "5", currentTime, request.LyDoBoSung, request.DinhKemBoSung,
                JsonConvert.SerializeObject(request.ThanhPhanBoSung), userId, HoSoConstant.TrangThaiBoSungCongDan, null, null, null, null, request.ThoiHanBoSung, request.NoiDungBoSung, trangThaiTraKq, donViTraKq);
            var hoSoBoSung = new HoSoBoSung(hoSo.MaHoSo, request.LyDoBoSung, request.DinhKemBoSung, currentTime, hoSo.NguoiNhanHoSo,
               hoSo.NgayHenTra, HoSoConstant.TrangThaiBoSungCongDan, JsonConvert.SerializeObject(request.ThanhPhanBoSung));
            var insertedRow = await _dapperRepository.InsertEntityAsync<HoSoBoSung>(hoSoBoSung, SchemaNames.Business + "." + TableNames.HoSoBoSungs);
            if (insertedRow == 0)
            {
                return false;
            }
        }
        else if (maTrangThaiHienTai == "1")
        {
            hoSo.YeuCauMotCuaBoSung(maTrangThaiHienTai, "5", currentTime, request.LyDoBoSung, request.DinhKemBoSung,
               JsonConvert.SerializeObject(request.ThanhPhanBoSung), userId, HoSoConstant.TrangThaiBoSungChoTiepNhan, null, null, null, null, request.ThoiHanBoSung, request.NoiDungBoSung, trangThaiTraKq, donViTraKq);
        }
        var updatedHoSoRow = await _dapperRepository.UpdateEntityAsync<HoSo>(hoSo, new
        {
            HoSoId = hoSo.Id,
        }, SchemaNames.Business + "." + TableNames.HoSos, null, "Id = @HoSoId");
        if(updatedHoSoRow == 0)
        {
            return false;
        }
        var insertTempValues = request.ThanhPhanBoSung?.Select(x => new { x.NoiDungBoSung, Id = x.ThanhPhanHoSoId }).ToList();
        if (insertTempValues != null && insertTempValues.Count > 0)
        {
            var updatedThanhPhanHoSoRows = await _dapperRepository.ExcuteAsync(sqlUpdateThanhPhanHoSo, insertTempValues);
            if (updatedThanhPhanHoSoRows == 0)
            {
                return false;
            }
        }
        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, "", null, null, null, userId, userFullName ?? "", "", "", currentTime, request.LyDoBoSung, request.DinhKemBoSung, tenBuocXuLy ?? "Phát hành văn bản", "5");
        var insertedQuaTrinh = await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLyHoSo, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
        if(insertedQuaTrinh == 0)
        {
            return false;
        }
        return true;
    }
    public async Task<bool> ChuyenTraHoSo(ChuyenTraHoSoCommand request, HoSo hoSo, DateTime currentTime, string userFullName, string thaoTacVet)
    {
        var sqlTruongHopThuTuc = "SELECT Ten,Ma, Id, NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHien, LoaiThoiGianThucHien FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";
        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
        {
            hoSo.MaTruongHop
        });
        var nodeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowNodeQuyTrinhXuLy>>(truongHopThuTuc.NodeQuyTrinh);
        var edgeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowEdgeQuyTrinhXuLy>>(truongHopThuTuc.EdgeQuyTrinh);
        var lastNode = nodeQuyTrinhs.Find(x => x.data.maTrangThaiHoSo == "9");
        string trangThaiTraKq = _trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ;
        string? donViTraKq = null;
        if (!string.IsNullOrEmpty(hoSo.DonViId))
        {
            var sqlGetGroup = $"SELECT YeuCauXacNhanCoKetQua, DonViQuanLy, DonViQuanLyTraHoSo FROM {SchemaNames.Catalog}.{TableNames.Groups} WHERE GroupCode = @DonViId";
            var groupInfo = await _dapperRepository.QueryFirstOrDefaultAsync<GroupDto>(sqlGetGroup, new
            {
                DonViId = hoSo.DonViId
            });
            //var groupsInfo = await _mediator.Send(new GetByGroupCodeQuery(hoSo.DonViId));
            if (groupInfo?.YeuCauXacNhanCoKetQua == null || groupInfo?.YeuCauXacNhanCoKetQua == false)
            {
                trangThaiTraKq = _trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ;
                //await _eventPublisher.PublishAsync(new ThongBaoTraKetQuaEvent(hoSo, hoSo.TenDonVi,hoSo.Catalog));
            }
            else
            {
                trangThaiTraKq = _trangThaiTraHoSoConstant.CHO_XAC_NHAN;

            }
            donViTraKq = !string.IsNullOrEmpty(groupInfo?.DonViQuanLy) && groupInfo.DonViQuanLyTraHoSo == true ? groupInfo?.DonViQuanLy : hoSo.DonViId;
        }
        var updatedHoSo = hoSo.ChuyenTraHoSo(lastNode.id, lastNode.data.tenBuocXuLy, request.YKienNguoiChuyenXuLy, request.DinhKemYKienNguoiChuyenXuLy, currentTime, trangThaiTraKq, donViTraKq, DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut);
        var updatedRows = await _dapperRepository.UpdateEntityAsync<HoSo>(hoSo, new
        {
            HoSoId = hoSo.Id,
        }, SchemaNames.Business + "." + TableNames.HoSos, null, "Id = @HoSoId");
        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, "", null, null, null, hoSo.NguoiDangXuLy, userFullName ?? "", "", "", currentTime, request.YKienNguoiChuyenXuLy, request.DinhKemYKienNguoiChuyenXuLy, thaoTacVet ?? "Phát hành văn bản", "9");
        //await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
        var insertedQuaTrinh = await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLyHoSo, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);

        if (insertedQuaTrinh == 0)
        {
            return false;
        }

        if (updatedRows == 0)
        {
            return false;
        }
        return true;
    }
    public async Task<bool> DuThaoXinLoi(DuThaoXinLoiResponse request, HoSoQLVB hoSo, DateTime currentTime, string userFullName, DateTime ngayHenTraMoi)
    {
        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, "", null, null, null, hoSo.NguoiDangXuLy, userFullName ?? "", "", "", currentTime, request.YKienNguoiChuyenXuLy, request.DinhKemYKienNguoiChuyenXuLy, "Ban hành văn bản xin lỗi", hoSo.TrangThaiHoSoId);
        //await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
        var insertedQuaTrinh = await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLyHoSo, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
        if (insertedQuaTrinh == 0)
        {
            return false;
        }
        return true;
    }
    public async Task<CapNhatKetQuaThongBaoThueResponse> CapNhatKetQuaILIS(CapNhatKetQuaThongBaoThueRequest request, CancellationToken cancellationToken = default)
    {
        string maHoSo = request.SoBienNhan;
        try
        {
            if (!request.DanhSachThongBaoThue.Any())
            {
                return new CapNhatKetQuaThongBaoThueResponse()
                {
                    Message = "Không có thông tin thông báo thuế",
                    Result = 0
                };
            }
            var sqlTruongHopThuTuc = @$"SELECT Top 1
            {nameof(TruongHopThuTuc.NodeQuyTrinh)},
            {nameof(TruongHopThuTuc.EdgeQuyTrinh)}
            FROM {SchemaNames.Business}.{TableNames.TruongHopThuTucs} WHERE {nameof(TruongHopThuTuc.Ma)} = @MaTruongHop";
            var hoSoQueryBuilder = new HoSoQueryBuilder();
            var hoSoSelect = hoSoQueryBuilder.select;
            var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSo, new
            {
                MaHoSo = request.SoBienNhan,
            }, cancellationToken: cancellationToken);
            if (hoSo == null)
            {
                return new CapNhatKetQuaThongBaoThueResponse()
                {
                    Message = "Hồ sơ không tồn tại hoặc đã bị xóa",
                    Result = 0
                };
            }
            maHoSo = hoSo.MaHoSo;
            DateTime currentTime = DateTime.Now;
            var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
            {
                hoSo.MaTruongHop
            }, cancellationToken: cancellationToken);
            var quyTrinhXuLy = GetNextOfCurrentNode(truongHopThuTuc, hoSo.BuocHienTai);
            if (quyTrinhXuLy == null || quyTrinhXuLy?.Count != 1)
            {
                return new CapNhatKetQuaThongBaoThueResponse()
                {
                    Message = "Quy trình xử lý MCĐT không hợp lệ, vui lòng thử lại sau",
                    Result = 0
                };
            }
            var nextNode = quyTrinhXuLy[0];
            var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken);
            List<ThongBaoThue> thongBaoThues = new List<ThongBaoThue>();
            for (int i = 0; i < request.DanhSachThongBaoThue.Count; i++)
            {
                var thongBaoThueReq = request.DanhSachThongBaoThue[i];
                string dinhKem = await _lienThongILISService.DownloadFile(thongBaoThueReq.DuongDanTBT);
                ThongBaoThue thongBaoThue = new ThongBaoThue(hoSo.Id, thongBaoThueReq.LoaiThue, thongBaoThueReq.SoThongBaoThue, thongBaoThueReq.SoThongBaoThue, request.NgayCoKetQuaThue, request.GhiChu, 0);
                thongBaoThue.SetThongBaoThueILIS(dinhKem, thongBaoThueReq.HoVaChu);
                thongBaoThues.Add(thongBaoThue);
            }

            var updatedHoSoData = await ChuyenBuoc(currentTime, truongHopThuTuc, hoSo, nextNode.id, ngayNghis, 2, null, null, null, null, null, null);
            hoSo.CapNhatKetQuaILIS(updatedHoSoData.NgayHenTra, updatedHoSoData.NgayYeuCauBoSung, updatedHoSoData.NgayHenTraCaNhan, updatedHoSoData.MaNodeSau, updatedHoSoData.TenBuoc);
            await _repositoryHoSo.UpdateAsync(hoSo, cancellationToken);

            await _thongBaoThueRepo.AddRangeAsync(thongBaoThues, cancellationToken);

            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, updatedHoSoData.BuocXuLyTiep, null, updatedHoSoData.LoaiThoiHanBuocXuLy, updatedHoSoData.NgayHenTraCaNhanCu, string.Empty, "Hệ thống ILIS", hoSo.NguoiDangXuLy, "", currentTime, string.Empty, string.Empty, updatedHoSoData.TenThaoTac ?? "", updatedHoSoData.MaTrangThai);
            await _quaTrinhXuLyHoSoRepo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            return new CapNhatKetQuaThongBaoThueResponse()
            {
                Message = string.Empty,
                Result = 1
            };
        } catch (Exception ex)
        {
            await _lienThongILISService.Log(new ServiceLoggerRequestParams()
            {
                MaHoSo = maHoSo,
                isSucceed = false,
                Receiver = null,
                Sender = null,
                Request = JsonConvert.SerializeObject(request),
                Response = JsonConvert.SerializeObject(ex),
                Service = ServiceLoggerServiceType.ILIS,
            });
            return new CapNhatKetQuaThongBaoThueResponse()
            {
                Message = "Có lỗi xảy ra khi thực hiện xử lý",
                Result = 0
            };
        }
    }
}

public class ChuyenBuocXuLyType
{
    public string NotificationType { get; set; }
    public string? TenBuoc { get; set; }
    public string? MaNodeSau { get; set; }
    public string? MaTrangThai { get; set; }
    public string? BuocXuLyTiep { get; set; }
    public double? ThoiHanBuocXuLy { get; set; }
    public string? LoaiThoiHanBuocXuLy { get; set; }
    public string? TenThaoTac { get; set; }
    public bool LaBuocChuyenLTQLVB { get; set; }
    public DateTime? NgayHenTraCaNhan { get; set; }
    public DateTime? NgayTiepNhanCaNhanCu { get; set; }
    public DateTime? NgayHenTraCaNhanCu { get; set; }
    public DateTime? NgayYeuCauBoSung { get; set; }
    public DateTime? NgayHenTra { get; set; }
    public DateTime? NgayTraKetQua { get; set; }
    public string? TrangThaiTraKq { get; set; }
    public string? DonViTraKq { get; set; }
    public string? LoaiKetQua { get; set; }
    public string? loaiDuLieuKetNoi { get; set; }
    public string? trangThaiChiTiet { get; set; }
}

public class QuyTrinhXuLyResponse
{
    public ReactFlowNodeQuyTrinhXuLy NextNode { get; set; }
    public string NextNodeIds { get; set; }
    public string NextNodeId { get; set; }
    public ReactFlowNodeQuyTrinhXuLy NextOfUpdatedNode { get; set; }
    public List<ReactFlowNodeQuyTrinhXuLy> Nodes { get; set; }
    public List<ReactFlowEdgeQuyTrinhXuLy> Edges { get; set; }
    public ReactFlowNodeQuyTrinhXuLy CurrentNode { get; set; }
    
}
