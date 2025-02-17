using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using System.Transactions;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Classes;
using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Business.HoSoApp.Validate;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Identity.Users;
using Mapster;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class TotalHoSoInToDay
{
    public int Count { get; set; }
}

public class UserInfo
{
    public string Id { get; set; }
    public string MaDinhDanh { get; set; }
    public string FullName { get; set; }
    public string OfficeCode { get; set; }
    public string OfficeName { get; set; }
    public string GroupName { get; set; }
    public string DiaChiDonVi { get; set; }
}

public class AddHoSoCommandHandler : RemoveFileWithJobHandler, ICommandHandler<AddHoSoCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryYeuCauThanhToan;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IRepositoryWithEvents<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IHoSoServices _hoSoServices;
    private readonly IInjectConfiguration _iInjectConfiguration;
    private readonly IEventPublisher _publisher;
    private readonly IValidateThanhPhanHoSo _validateThanhPhanHoSo;
    private readonly IUserService _userService;
    private readonly string tenTinhThanh;
    private readonly IGenerateMaHoSo _generateMaHoSo;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    public AddHoSoCommandHandler(IRepositoryWithEvents<HoSo> repositoryHoSo,
        IInjectConfiguration iInjectConfiguration,
        IRepositoryWithEvents<YeuCauThanhToan> repositoryYeuCauThanhToan,
        IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,
        IReadRepository<NgayNghi> repositoryNgayNghi,
        ICurrentUser user,
        IRepositoryWithEvents<ThanhPhanHoSo> repositoryThanhPhanHoSo,
        IDapperRepository dapperRepository,
        IHoSoServices hoSoServices,
        IEventPublisher publisher,
        IValidateThanhPhanHoSo validateThanhPhanHoSo,
        IUserService userService,
        IGenerateMaHoSo generateMaHoSo,
        INguoiXuLyHoSoService nguoiXuLyHoSoService
        )
    {
        _publisher = publisher;
        _iInjectConfiguration = iInjectConfiguration;
        _repositoryHoSo = repositoryHoSo;
        _repositoryYeuCauThanhToan = repositoryYeuCauThanhToan;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryNgayNghi = repositoryNgayNghi;
        _user = user;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _dapperRepository = dapperRepository;
        _hoSoServices = hoSoServices;
        _validateThanhPhanHoSo = validateThanhPhanHoSo;
        _userService = userService;
        tenTinhThanh = iInjectConfiguration.GetValue<string>("GLOBAL_CONFIG:Ten_Tinh_Thanh");
        _generateMaHoSo = generateMaHoSo;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }

    public async Task<Result<DefaultIdType>> Handle(AddHoSoCommand request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _user.GetUserId();
        var userOfficeCode = _user.GetUserOfficeCode();
        var userOfficeName = _user.GetUserOfficeName();
        var userFullName = _user.GetUserOfficeName();
        string catalog = string.Empty;
        string soDienThoaiDonVi = string.Empty;
        string ofGroupName = string.Empty;
        string newYeuCauThanhToanId = string.Empty;
        string sqlGetMaDinhDanh = @"SELECT Top 1 Id, MaDinhDanh, Catalog, GroupName, OfGroupName, DonViQuanLy, SoDienThoai, DonViQuanLyThuPhi from Catalog.Groups where GroupCode = @DonViId";
        string sqlGetThuTuc = $"SELECT Top 1 MaLinhVucChinh, LinhVucChinh, MucDo FROM {SchemaNames.Catalog}.{TableNames.ThuTucs} WHERE MaTTHC = @MaTTHC AND DeletedOn is null";
        if(request.CheckKySo)
        {
            var validateTPHSResponse = await _validateThanhPhanHoSo.ValidateBaseOnConfig(request.ThanhPhanHoSos, ValidateThanhPhanHoSoLoaiNguoiDung.CanBo);
            if (!validateTPHSResponse.IsSucceed)
            {
                return Result<DefaultIdType>.Fail(validateTPHSResponse.Message);
            }
        }
        var donViLayMaDinhDanh = userOfficeCode;
        bool laHoSoPhiDiaGioi = !string.IsNullOrEmpty(request.DonViPhiDiaGioi);
        if (laHoSoPhiDiaGioi)
        {
            donViLayMaDinhDanh = request.DonViPhiDiaGioi;
        }
        var group = await _dapperRepository.QueryFirstOrDefaultAsync<Group>(sqlGetMaDinhDanh, new
        {
            DonViId = donViLayMaDinhDanh
        });
        if (group == null)
        {
            return Result<DefaultIdType>.Fail("Không tìm thấy đơn vị người dùng");
        }

        var maHoSo = await _generateMaHoSo.GenerateMaHoSo(group.MaDinhDanh, cancellationToken);

        var thuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<ThuTuc>(sqlGetThuTuc, new
        {
            MaTTHC = request.MaTTHC
        });
        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>("SELECT Top 1 KhongCoNgayHenTra, ThoiGianThucHienTrucTuyen, ThoiGianThucHien, LoaiThoiGianThucHien,  NodeQuyTrinh, EdgeQuyTrinh, KhongNopTrucTuyen FROM [Business].[TruongHopThuTucs] where Ma = @MaTruongHop and ThuTucId = @ThuTucId", new
        {
            request.MaTruongHop,
            ThuTucId = request.MaTTHC
        });
        string mucDo = thuTuc.MucDo ?? request.MucDo;
        if (truongHopThuTuc.KhongNopTrucTuyen != null && truongHopThuTuc.KhongNopTrucTuyen == true)
        {
            mucDo = "2";
        }
        var currentNode = _hoSoServices.GetCurrentNode(truongHopThuTuc, request.BuocHienTai);
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken: cancellationToken);
        string donViQuanLyThuPhi = (group.DonViQuanLyThuPhi == true && !string.IsNullOrEmpty(group?.DonViQuanLy)) ? group.DonViQuanLy : userOfficeCode;
        string donViQuanLy = !string.IsNullOrEmpty(group.DonViQuanLy) ? group.DonViQuanLy : userOfficeCode;

        var caculateTime = new CaculateTime(_iInjectConfiguration);
        double thoiGianXuLy = caculateTime.GetThoiGianXuLy(currentNode, request.KenhThucHien);


        var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianXuLy, "Ngày làm việc");
        var ngayHenTra = truongHopThuTuc.KhongCoNgayHenTra == true ? null : request.NgayHenTra;
        var hoSo = HoSo.Create(userOfficeCode, maHoSo, request.KenhThucHien, request.LoaiDoiTuong, request.MaDoiTuong,
            request.ChuHoSo, request.SoDienThoaiChuHoSo, request.EmailChuHoSo, request.SoGiayToChuHoSo, request.LoaiGiayToChuHoSo, request.NgaySinhChuHoSo, request.TinhThanhChuHoSo,
            request.QuanHuyenChuHoSo, request.XaPhuongChuHoSo, request.DiaChiChuHoSo, request.UyQuyen, request.NguoiUyQuyen, request.SoDienThoaiNguoiUyQuyen, request.EmailNguoiUyQuyen,
            request.SoGiayToNguoiUyQuyen, request.LoaiGiayToNguoiUyQuyen, request.NgaySinhNguoiUyQuyen, request.TinhThanhNguoiUyQuyen, request.QuanHuyenNguoiUyQuyen, request.XaPhuongNguoiUyQuyen,
            request.DiaChiNguoiUyQuyen, request.TrichYeuHoSo, currentTime, ngayHenTra, request.MaTrangThaiHoSo, request.NgayTra, request.HinhThucTra, request.NgayKetThucXuLy,
            request.GhiChu, request.NoiNopHoSo, request.HoSoCoThanhPhanSoHo, request.TaiKhoanDuocXacThucVoiVNeID, request.DuocThanhToanTrucTuyen, request.NgayTuChoi, request.LoaiDinhDanh,
            request.SoDinhDanh, currentTime, request.MaTTHC, request.MaLinhVuc, request.TenLinhVuc, request.TenTruongHop, request.MaTruongHop, request.TruongHopId,
            request.ThoiGianThucHien, request.LoaiThoiGianThucHien, request.ThongBaoEmail, request.ThongBaoZalo, request.ThongBaoSMS, request.NguoiXuLyTiep,
            request.BuocXuLyTiep, userId.ToString(), null, mucDo, request.SoBoHoSo, request.TenBuocHienTai, request.BuocHienTai, request.NguoiXuLyTruoc,
            request.BuocXuLyTruoc, request.DangKyNhanHoSoQuaBCCIData, request.TrichYeuKetQua, request.DinhKemKetQua, request.YKienNguoiChuyenXuLy, request.DinhKemYKienNguoiChuyenXuLy,
            userId.ToString(), request.NguoiGui, currentTime, ngayHenTraCaNhan, request.EFormData, request.LaHoSoChungThuc, donViQuanLy, userOfficeCode,
            request.TinhThanhDiaBan, request.QuanHuyenDiaBan, request.XaPhuongDiaBan, request.TenDiaBan);
        hoSo.SetSoDinhDanh(hoSo.SoGiayToChuHoSo);
        hoSo.SetLinhVuc(thuTuc.MaLinhVucChinh, thuTuc.LinhVucChinh);
        hoSo.SetThoiGianThucHien(truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.ThoiGianThucHienTrucTuyen, truongHopThuTuc.LoaiThoiGianThucHien);
        if(laHoSoPhiDiaGioi)
        {
            hoSo.ThemMoiHoSoPhiDiaGioi(request.DonViPhiDiaGioi, userId.ToString());
        }

        try
        {
            await _repositoryHoSo.AddAsync(hoSo, cancellationToken);
            await _nguoiXuLyHoSoService.AddNguoiXuLyHoSo(new NguoiXuLyHoSo(userId, hoSo.Id), cancellationToken: cancellationToken);

            if (request.HinhThucThu == "Thu trước")
            {
                var trangThaiThanhToan = new YeuCauThanhToanConstants();
                var yeuCauThanhToan = new YeuCauThanhToan(maHoSo, (int)request.TongTien, (int)request.PhiThu, (int)request.LePhiThu, trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN, currentTime, userId.ToString(), donViQuanLyThuPhi, request.HinhThucThu, request.ChiTietPhiLePhi, donVi: userOfficeCode);
                await _repositoryYeuCauThanhToan.AddAsync(yeuCauThanhToan);
                newYeuCauThanhToanId = yeuCauThanhToan.Id.ToString();
            }
            else if (request.HinhThucThu == "Thu sau")
            {
                var trangThaiThanhToan = new YeuCauThanhToanConstants();
                var yeuCauThanhToan = new YeuCauThanhToan(maHoSo, 0, 0, 0, trangThaiThanhToan.TRANG_THAI.CHUA_THANH_TOAN, currentTime, userId.ToString(), donViQuanLyThuPhi, request.HinhThucThu, request.ChiTietPhiLePhi, donVi: userOfficeCode);
                await _repositoryYeuCauThanhToan.AddAsync(yeuCauThanhToan);
                newYeuCauThanhToanId = yeuCauThanhToan.Id.ToString();
            }
            else if (request.HinhThucThu == "Đối tượng miễn phí")
            {
                var trangThaiThanhToan = new YeuCauThanhToanConstants();
                var yeuCauThanhToan = new YeuCauThanhToan(maHoSo, 0, 0, 0, trangThaiThanhToan.TRANG_THAI.DA_THANH_TOAN, currentTime, userId.ToString(), donViQuanLyThuPhi, request.HinhThucThu, request.ChiTietPhiLePhi, donVi: userOfficeCode);
                await _repositoryYeuCauThanhToan.AddAsync(yeuCauThanhToan);
                newYeuCauThanhToanId = yeuCauThanhToan.Id.ToString();
            }
            if (request.ThanhPhanHoSos != null && request.ThanhPhanHoSos.Count > 0)
            {
                var thanhPhanHoSos = new List<ThanhPhanHoSo>();
                request.ThanhPhanHoSos.ForEach(item =>
                {
                    var thanhPhanHoSo = new ThanhPhanHoSo(item.Ten, maHoSo, item.SoBanChinh,
                        item.SoBanSao, item.MaGiayToKhoQuocGia, item.DinhKem, item.NhanBanGiay, item.MaGiayToSoHoa, item.TrangThaiSoHoa,
                        item.MaGiayTo, item.DuocLayTuKhoDMQuocGia, item.MaKetQuaThayThe, item.SoTrang, item.SoBanGiay, item.KyDienTuBanGiay, item.TrangThaiDuyet);
                    thanhPhanHoSo.SetDinhKemGoc(item.DinhKem);
                    thanhPhanHoSos.Add(thanhPhanHoSo);
                });

                await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos);
            }


            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(maHoSo, request.NodeQuyTrinh, null, null, null, userId.ToString(), userFullName, "", null, request.NgayTiepNhan, trangThai: "2", thaoTac: laHoSoPhiDiaGioi ? "Tiếp nhận hồ sơ phi địa giới" : "Tiếp nhận hồ sơ");
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
               

        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
        try
        {
            await _userService.UpdateEmailAndPhoneNumber(request.EmailChuHoSo, request.SoDienThoaiChuHoSo, request.SoGiayToChuHoSo);
            await _publisher.PublishAsync(new ThemMoiTrucTiepEvent(hoSo, truongHopThuTuc.ThoiGianThucHien, _user.GetUserFullName(), userOfficeName, request.TenTTHC, userOfficeName, group.Catalog, tenTinhThanh, group.SoDienThoai, ofGroupName, truongHopThuTuc.KhongCoNgayHenTra));
            if (request.HinhThucThu == "Thu trước")
            {

                try
                {
                    HoSoQLVB hoSoQLVB = hoSo.Adapt<HoSoQLVB>();
                    hoSoQLVB.TenTTHC = request.TenTTHC;
                    hoSoQLVB.OfGroupName = group.OfGroupName;
                    hoSoQLVB.Catalog = group.Catalog;
                    hoSoQLVB.SoDienThoai = group.SoDienThoai;
                    hoSoQLVB.GroupName = group.GroupName;
                    await _publisher.PublishAsync(new ThongBaoNopPhiEvent(hoSoQLVB, request.HinhThucThu, (int)request.PhiThu, (int)request.LePhiThu, userFullName, userOfficeName, hoSoQLVB.Catalog, tenTinhThanh, hoSoQLVB.SoDienThoai, newYeuCauThanhToanId));
                }
                catch (Exception ex)
                {

                }
            }
        }
        catch (Exception ex)
        {

        }
       
        return Result<DefaultIdType>.Success(hoSo.Id);
    }
}
