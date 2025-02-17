using Newtonsoft.Json;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.OCR;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class AdminUpdateHoSoHandler : ICommandHandler<AdminUpdateHoSo>
{
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currUser;
    private readonly IUserService _user;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    public AdminUpdateHoSoHandler(ICurrentUser currUser, IRepository<HoSo> repositoryHoSo, IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo, IDapperRepository dapperRepository, IUserService user, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo)
    {
        _repositoryHoSo = repositoryHoSo;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _dapperRepository = dapperRepository;
        _currUser = currUser;
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
    }
    public async Task<Result> Handle(AdminUpdateHoSo request, CancellationToken cancellationToken)
    {
        var _currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        var userId = _currentUser.Id.ToString();
        var userOfficeCode = _currentUser.OfficeCode;
        var userFullName = _currentUser.FullName;
        var thaoTac = "Quản trị chỉnh sửa hồ sơ";
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var itemExitst = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null) throw new Exception($"Hồ sơ với mã {request.Id} chưa được thêm vào hệ thống");
        string sqlGetThanhPhan = "SELECT Id FROM [Business].[ThanhPhanHoSos] WHERE HoSo = @HoSo AND @Ids like '%' + convert(nvarchar(36), Id) + '%'";
        string sqlDeleteThanhPhanHoSo = "Update Business.ThanhPhanHoSos SET DeletedOn = GETDATE(), DeletedBy = @UserId WHERE Id IN @Ids";
        var sqlUpdateThanhPhanHoSo = @"
        CREATE TABLE #TempTableThanhPhanHoSo (DinhKem nvarchar(MAX), Id uniqueidentifier, SoBanChinh int, SoBanSao int, MaGiayTo varchar(50), Ten nvarchar(4000), SoTrang int, SoBanGiay int, KyDienTuBanGiay bit);
        INSERT INTO #TempTableThanhPhanHoSo VALUES (@DinhKem, @Id, @SoBanChinh, @SoBanSao, @MaGiayTo, @Ten, @SoTrang, @SoBanGiay, @KyDienTuBanGiay);
        UPDATE tphs SET tphs.DinhKem = (CASE WHEN temp.DinhKem is null or temp.DinhKem = '' THEN tphs.DinhKem ELSE temp.DinhKem END),
        tphs.SoBanChinh = temp.SoBanChinh, tphs.SoBanSao = temp.SoBanSao, tphs.MaGiayTo = temp.MaGiayTo, tphs.Ten = temp.Ten, tphs.SoTrang = temp.SoTrang,
        tphs.SoBanGiay = temp.SoBanGiay,tphs.KyDienTuBanGiay = temp.KyDienTuBanGiay
        FROM Business.ThanhPhanHoSos tphs INNER JOIN
        #TempTableThanhPhanHoSo temp ON tphs.Id = temp.Id
        ";
        if (itemExitst == null)
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");

        //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
        //{
        //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
        //}, TransactionScopeAsyncFlowOption.Enabled))
        //{
        try
        {

            var updatedHoSo = itemExitst.Update(request.DonViId, request.MaHoSo, request.DonViQuanLy, request.ChoXacNhan, request.KenhThucHien, request.LoaiDoiTuong, request.MaDoiTuong,
            request.ChuHoSo, request.SoDienThoaiChuHoSo, request.EmailChuHoSo, request.SoGiayToChuHoSo, request.LoaiGiayToChuHoSo, request.NgaySinhChuHoSo, request.TinhThanhChuHoSo,
            request.QuanHuyenChuHoSo, request.XaPhuongChuHoSo, request.DiaChiChuHoSo, request.UyQuyen, request.NguoiUyQuyen, request.SoDienThoaiNguoiUyQuyen, request.EmailNguoiUyQuyen,
            request.SoGiayToNguoiUyQuyen, request.LoaiGiayToNguoiUyQuyen, request.NgaySinhNguoiUyQuyen, request.TinhThanhNguoiUyQuyen, request.QuanHuyenNguoiUyQuyen, request.XaPhuongNguoiUyQuyen,
            request.DiaChiNguoiUyQuyen, request.TrichYeuHoSo, request.NgayTiepNhan, request.NgayHenTra, request.TrangThaiHoSoId, request.NgayTra, request.HinhThucTra, request.NgayKetThucXuLy,
            request.GhiChu, request.NoiNopHoSo, request.HoSoCoThanhPhanSoHo, request.TaiKhoanDuocXacThucVoiVNeID, request.DuocThanhToanTrucTuyen, request.NgayTuChoi, request.LoaiDinhDanh,
            request.SoDinhDanh, request.NgayNopHoSo, request.MaTTHC, request.MaLinhVuc, request.TenLinhVuc, request.TenTruongHop, request.MaTruongHop, request.TruongHopId,
            request.ThoiGianThucHien, request.LoaiThoiGianThucHien, request.ThongBaoEmail, request.ThongBaoZalo, request.ThongBaoSMS, request.NguoiXuLyTiep,
            request.BuocXuLyTiep, request.NguoiNhanHoSo, request.NguoiDaXuLy, request.MucDo, request.SoBoHoSo, request.TenBuocHienTai, request.BuocHienTai, request.NguoiXuLyTruoc,
            request.BuocXuLyTruoc, request.DangKyNhanHoSoQuaBCCIData, request.TrichYeuKetQua, request.DinhKemKetQua, request.YKienNguoiChuyenXuLy, request.DinhKemYKienNguoiChuyenXuLy,
            request.NguoiDangXuLy, request.EFormData, request.TenDiaBan, request.LoaiVanBanKetQua, request.SoKyHieuKetQua, request.NguoiKyKetQua, request.CoQuanBanHanhKetQua, request.NgayBanHanhKetQua,
            request.NgayKyKetQua, request.LoaiKetQua, request.TrangThaiTraKq, request.NgayYeuCauBoSung);
            if (request.NgayHenTra == null)
            {
                itemExitst.SetNgayHenTra(request.NgayHenTra);
            }
            await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);

            //bulk insert
            if (request.ThanhPhanHoSos != null && request.ThanhPhanHoSos.Count > 0)
            {
                var newThanhPhanHoSoIds = request.ThanhPhanHoSos.Select(x => x.Id).Distinct().ToList();
                string thanhPhanIds = String.Join("##", newThanhPhanHoSoIds);
                var thanhPhanHoSoInDbs = await _dapperRepository.QueryAsync<UpdateHoSo_ThanhPhanHoSo_Select>(sqlGetThanhPhan, new
                {
                    Ids = thanhPhanIds,
                    HoSo = updatedHoSo.MaHoSo
                });
                var thanhPhanNotInDbs = request.ThanhPhanHoSos.Where(u => !thanhPhanHoSoInDbs.Select(x => x.Id.ToString().ToLower()).ToList().Contains(u.Id.ToString().ToLower())).ToList();
                var thanhPhanInDbs = request.ThanhPhanHoSos.Where(u => thanhPhanHoSoInDbs.Select(x => x.Id.ToString().ToLower()).ToList().Contains(u.Id.ToString().ToLower())).ToList();
                var add_thanhPhanHoSos = new List<ThanhPhanHoSo>();
                thanhPhanNotInDbs.ForEach(item =>
                {
                    var thanhPhanHoSo = ThanhPhanHoSo.Create(item.Ten, updatedHoSo.MaHoSo, item.SoBanChinh,
                        item.SoBanSao, item.MaGiayToKhoQuocGia, item.DinhKem, item.NhanBanGiay, item.MaGiayToSoHoa, item.TrangThaiSoHoa,
                        request.MaTTHC, item.DuocLayTuKhoDMQuocGia, item.MaKetQuaThayThe, item.SoTrang, item.SoBanGiay, item.KyDienTuBanGiay, item.TrangThaiDuyet);
                    add_thanhPhanHoSos.Add(thanhPhanHoSo);
                });
                var insertTempValues = thanhPhanInDbs.Select(x => new { DinhKem = x.DinhKem, Id = x.Id.ToString(), SoBanChinh = x.SoBanChinh, SoBanSao = x.SoBanSao, x.MaGiayTo, x.SoBanGiay, x.SoTrang, x.KyDienTuBanGiay, x.Ten }).ToList();
                await _repositoryThanhPhanHoSo.AddRangeAsync(add_thanhPhanHoSos);
                int updatedThanhPhanHoSoRows = await _dapperRepository.ExcuteAsync(sqlUpdateThanhPhanHoSo, insertTempValues);

                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(itemExitst.MaHoSo, userId.ToString(), userFullName, null, null, currentTime, trangThai: "", thaoTac: thaoTac, true);
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
                //quaTrinhXuLyHoSo.SoftDelete();

                if (updatedThanhPhanHoSoRows == 0 && thanhPhanHoSoInDbs.Count > 0)
                {
                    return (Result)Result.Fail("Cập nhật thành phần hồ sơ thất bại");
                }
            }
            if (request.DeletedThanhPhanIds != null && request.DeletedThanhPhanIds.Count > 0)
            {
                int updatedThanhPhanHoSoRows = await _dapperRepository.ExcuteAsync(sqlDeleteThanhPhanHoSo, new
                {
                    UserId = userId,
                    Ids = request.DeletedThanhPhanIds
                });
                if (updatedThanhPhanHoSoRows == 0)
                {
                    return (Result)Result.Fail("Xóa thành thành phần hồ sơ thất bại");
                }
            }

            //transactionScope.Complete();
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
        //}
    }
}
