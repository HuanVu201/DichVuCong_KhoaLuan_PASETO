using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Queries;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ThemMoiHoSoDienTuCommandHandler : ICommandHandler<ThemMoiHoSoDienTuCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IGenerateMaHoSo _generateMaHoSo;
    private readonly IInjectConfiguration _injectConfiguration;
    private readonly IReadRepository<ThuTuc> _repositoryThuTuc;
    private readonly IReadRepository<TruongHopThuTuc> _repositoryTruongHopThuTuc;
    private readonly IHoSoServices _hoSoServices;
    private readonly ICurrentUser _user;
    private readonly IMinioService _minioService;
    private readonly IReadRepository<NgayNghi> _ngayNghiRepository;
    private readonly IReadRepository<ThanhPhanThuTuc> _repositoryThanhPhanThuTuc;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepositoryWithEvents<Domain.Business.ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly ILogger<HoSo> _logger;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;



    public class NguoiTiepNhan
    {
        public string DonViId { get; set; }
        public string NguoiTiepNhanId { get; set; }
        public string TaiKhoanTiepNhan { get; set; }
        public string FullName { get; set; }
    }


    public ThemMoiHoSoDienTuCommandHandler(
        IRepositoryWithEvents<HoSo> repositoryWithEvents,
        IDapperRepository dapperRepository
        ,IGenerateMaHoSo generateMaHoSo,
        IInjectConfiguration injectConfiguration,
        ICurrentUser user,
        IReadRepository<ThuTuc> repositoryThuTuc,
        IReadRepository<TruongHopThuTuc> repositoryTruongHopThuTuc
        ,IHoSoServices hoSoServices,
        IMinioService minioService,
        IReadRepository<NgayNghi> ngayNghiRepository,
        IReadRepository<ThanhPhanThuTuc> repositoryThanhPhanThuTuc,
        IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,
        ILogger<HoSo> logger,
        IRepositoryWithEvents<Domain.Business.ThanhPhanHoSo> repositoryThanhPhanHoSo,
        INguoiXuLyHoSoService nguoiXuLyHoSoService
        )
    {
        _logger = logger;
        _repositoryHoSo = repositoryWithEvents;
        _dapperRepository = dapperRepository;
        _generateMaHoSo = generateMaHoSo;
        _injectConfiguration = injectConfiguration;
        _user = user;
        _repositoryThuTuc = repositoryThuTuc;
        _repositoryTruongHopThuTuc = repositoryTruongHopThuTuc;
        _hoSoServices = hoSoServices;
        _minioService = minioService;
        _ngayNghiRepository = ngayNghiRepository;
        _repositoryThanhPhanThuTuc = repositoryThanhPhanThuTuc;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
    }

    public async Task<Result> Handle(ThemMoiHoSoDienTuCommand request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _user.GetUserId();
        var userOfficeCode = _user.GetUserOfficeCode();
        var userOfficeName = _user.GetUserOfficeName();
        var userFullName = _user.GetUserOfficeName();
        string sqlGetNguoiTiepNhan = @"SELECT STRING_AGG (CONVERT(NVARCHAR(1000),NguoiTiepNhanId) , '##') as TaiKhoanTiepNhan FROM [Catalog].[DonViThuTucs]
                                       where MaTTHC = @MaTTHC and DeletedOn is null and DonViId = @DonViId";
        string sqlGetMaDinhDanh = @"SELECT Top 1 Id, MaDinhDanh, DonViQuanLy,GroupCode from Catalog.Groups where MaDinhDanh = @MaDinhDanh";
        string sqlCheckTrungMaHoSo = @"SELECT Top 1 MaHoSo from Business.HoSos where MaHoSo = @MaHoSo";
        var thuTuc = await _repositoryThuTuc.GetBySpecAsync(new GetThuTucByMaTTHCSpec(request.MaTTHC), cancellationToken);
        var truongHopThuTucs = await _repositoryTruongHopThuTuc.ListAsync(new GetTruongHopThuTucsByMaTTHCSpec(request.MaTTHC), cancellationToken);
        var group = await _dapperRepository.QueryFirstOrDefaultAsync<Group>(sqlGetMaDinhDanh, new
        {
            MaDinhDanh = request.DonVi,
        }, cancellationToken: cancellationToken);
        var exsistMaHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoDto>(sqlCheckTrungMaHoSo, new
        {
            MaHoSo = request.MaHoSo,
        }, cancellationToken: cancellationToken);
        if (exsistMaHoSo == null)
        {
            if (truongHopThuTucs == null || truongHopThuTucs.Count == 0)
            {
                return Result<string>.Fail($"Không tồn tại trường hợp thủ tục tương ứng với mã thủ tục: {request.MaTTHC}");
            }
            if (group == null)
            {
                throw new Exception($"Không tồn tại đơn vị ứng với Mã định danh: {request.DonVi}");
            }

            if (string.IsNullOrEmpty(request.MaHoSo))
            {
                throw new Exception("Vui lòng nhập mã hồ sơ");
            }


            var caculateTime = new CaculateTime(_injectConfiguration);

            var truongHopThuTuc = truongHopThuTucs.Find(x => x.ThuTucId == request.MaTTHC);
            if (truongHopThuTuc == null)
            {
                truongHopThuTuc = truongHopThuTucs[0];
            }
            var firstNode = _hoSoServices.GetFirstNode(truongHopThuTuc);

            double thoiGianXuLy = caculateTime.GetThoiGianXuLy(firstNode, "1");
            var ngayNghis = await _ngayNghiRepository.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken);
            var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianXuLy, truongHopThuTuc.LoaiThoiGianThucHien);

            string donViQuanLy = !string.IsNullOrEmpty(group.DonViQuanLy) ? group.DonViQuanLy : request.DonVi;
            var nguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<NguoiTiepNhan>(sqlGetNguoiTiepNhan, new
            {
                DonViId = group.GroupCode,
                MaTTHC = thuTuc.MaTTHC,
            }, cancellationToken: cancellationToken);
            if (nguoiTiepNhan.TaiKhoanTiepNhan == null)
            {
                throw new Exception("Chưa cấu hình người tiếp nhận cho thủ tục");
            }
            var thanhPhanThuTucs = await _repositoryThanhPhanThuTuc.ListAsync(new GetThanhPhanThuTucByMaTTHCSpec(truongHopThuTuc.Ma), cancellationToken);
            DateTime? ngayHenTra = truongHopThuTuc.KhongCoNgayHenTra == true ? null : caculateTime.TinhNgayHenTra(ngayNghis, currentTime, (int)truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.LoaiThoiGianThucHien);
            try
            {
                string mucDo = thuTuc.MucDo;
                if (truongHopThuTuc.KhongNopTrucTuyen != null && truongHopThuTuc.KhongNopTrucTuyen == true)
                {
                    mucDo = "2";
                }
                var hoSo = new HoSo(group.GroupCode, request.MaHoSo, request.LoaiDoiTuong, request.ChuHoSo, request.SoDienThoaiChuHoSo, request.EmailChuHoSo, request.SoGiayToChuHoSo, LoaiChuHoSoConstant.CongDan, request.NamSinhChuHoSo, request.TinhThanhChuHoSo, request.QuanHuyenChuHoSo, request.XaPhuongChuHoSo, request.DiaChiChuHoSo,
                    null, request.MaTTHC, truongHopThuTuc.Ma, truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(), null, null, nguoiTiepNhan.TaiKhoanTiepNhan, request.TrichYeuHoSo, currentTime, request.UyQuyen,
                    request.NguoiDuocUyQuyen, request.SoDienThoaiNguoiDuocUyQuyen, request.EmailNguoiDuocUyQuyen, request.SoGiayToNguoiDuocUyQuyen, request.TinhThanhNguoiUyQuyen, request.QuanHuyenNguoiUyQuyen, request.XaPhuongNguoiUyQuyen, request.DiaChiNguoiDuocUyQuyen, request.MaTTHC, currentTime, ngayHenTraCaNhan, mucDo, "0", donViTraKq: donViQuanLy);
                string nguoiNhanHoSo = nguoiTiepNhan.TaiKhoanTiepNhan.Substring(0, nguoiTiepNhan.TaiKhoanTiepNhan.IndexOf("##") != -1 ? nguoiTiepNhan.TaiKhoanTiepNhan.IndexOf("##") : nguoiTiepNhan.TaiKhoanTiepNhan.Length) ?? "";
                hoSo.DongBoTaoMoiHoSo(thuTuc.MaLinhVucChinh, thuTuc.TenTTHC, ngayHenTra, nguoiNhanHoSo, firstNode.id, null);
                hoSo.SetThoiGianThucHien(truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.ThoiGianThucHienTrucTuyen, truongHopThuTuc.LoaiThoiGianThucHien);
                hoSo.SetKenhThucHien(request.KenhThucHien);
                hoSo.SetTrangThaiHoSoId("10");


                if (request.ThanhPhanHoSos != null && request.ThanhPhanHoSos.Count > 0)
                {
                    var thanhPhanHoSos = new List<ThanhPhanHoSo>();
                    request.ThanhPhanHoSos.ForEach(item =>
                    {
                        var thanhPhanHoSo = new ThanhPhanHoSo(item.Ten, request.MaHoSo, item.SoBanChinh,
                            item.SoBanSao, item.MaGiayToKhoQuocGia, item.DinhKem, item.NhanBanGiay, item.MaGiayToSoHoa, item.TrangThaiSoHoa,
                            item.MaGiayTo, item.DuocLayTuKhoDMQuocGia, item.MaKetQuaThayThe, item.SoTrang, item.SoBanGiay, item.KyDienTuBanGiay, item.TrangThaiDuyet);
                        thanhPhanHoSo.SetDinhKemGoc(item.DinhKem);
                        thanhPhanHoSos.Add(thanhPhanHoSo);
                    });
                    await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos, cancellationToken);
                }

                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(request.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", null, currentTime, trangThai: "10", thaoTac: "Thêm mới hồ sơ điện tử");
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
                await _repositoryHoSo.AddAsync(hoSo, cancellationToken);
                await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(nguoiTiepNhan.TaiKhoanTiepNhan, hoSo.Id, cancellationToken: cancellationToken);
                return Result<string>.Success(data: request.MaHoSo);
            }
            catch (Exception ex)
            {
                _logger.LogError($"{request.MaHoSo} đã tồn tại, không thể thêm mới");
                throw new Exception(ex.Message);
            }
        }
        else
        {
            throw new Exception("Mã hồ sơ người dùng thêm đã tồn tại, không thể thêm mới!");

        }

    }
}


