
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Validate;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Commands;
public class UpdateHoSoNhapCommandHandler : ICommandHandler<UpdateHoSoNhapCommand>
{
    private readonly IRepository<HoSoNhap> _repositoryHoSo;
    private readonly IRepository<ThanhPhanHoSoNhap> _repositoryThanhPhanHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currUser;

    public UpdateHoSoNhapCommandHandler(ICurrentUser currUser, IRepository<HoSoNhap> repositoryHoSo, IRepository<ThanhPhanHoSoNhap> repositoryThanhPhanHoSo, IDapperRepository dapperRepository)
    {
        _repositoryHoSo = repositoryHoSo;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _dapperRepository = dapperRepository;
        _currUser = currUser;
    }
    public async Task<Result> Handle(UpdateHoSoNhapCommand request, CancellationToken cancellationToken)
    {
        var userId = _currUser.GetUserId().ToString();
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userFullName = _currUser.GetUserFullName();
        var itemExitst = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        string sqlGetThanhPhan = "SELECT Id FROM [Business].[ThanhPhanHoSoNhaps] where @Ids like '%' + convert(nvarchar(36), Id) + '%'";
        string sqlDeleteThanhPhanHoSo = "Update Business.ThanhPhanHoSoNhaps SET DeletedOn = GETDATE(), DeletedBy = @UserId WHERE Id IN @Ids";
        var sqlUpdateThanhPhanHoSo = @"
        CREATE TABLE #TempTableThanhPhanHoSo (DinhKem nvarchar(MAX), Id uniqueidentifier, SoBanChinh int, SoBanSao int, MaGiayTo varchar(50), Ten nvarchar(4000), SoTrang int, SoBanGiay int, KyDienTuBanGiay bit);
        INSERT INTO #TempTableThanhPhanHoSo VALUES (@DinhKem, @Id, @SoBanChinh, @SoBanSao, @MaGiayTo, @Ten, @SoTrang, @SoBanGiay, @KyDienTuBanGiay);
        UPDATE tphs SET tphs.DinhKem = temp.DinhKem,
        tphs.SoBanChinh = temp.SoBanChinh, tphs.SoBanSao = temp.SoBanSao, tphs.MaGiayTo = temp.MaGiayTo, tphs.Ten = temp.Ten, tphs.SoTrang = temp.SoTrang,
        tphs.SoBanGiay = temp.SoBanGiay,tphs.KyDienTuBanGiay = temp.KyDienTuBanGiay
        FROM Business.ThanhPhanHoSoNhaps tphs INNER JOIN
        #TempTableThanhPhanHoSo temp ON tphs.Id = temp.Id
        ";
        if (itemExitst == null)
            throw new NotFoundException($"HoSoNhap với mã: {request.Id} chưa được thêm vào hệ thống");

        //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
        //{
        //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
        //}, TransactionScopeAsyncFlowOption.Enabled))
        //{
            try
            {

                var updatedHoSo = itemExitst.Update(request.DonViId, request.DonViQuanLy, request.ChoXacNhan, request.KenhThucHien, request.LoaiDoiTuong, request.MaDoiTuong,
                request.ChuHoSo, request.SoDienThoaiChuHoSo, request.EmailChuHoSo, request.SoGiayToChuHoSo, request.LoaiGiayToChuHoSo, request.NgaySinhChuHoSo, request.TinhThanhChuHoSo,
                request.QuanHuyenChuHoSo, request.XaPhuongChuHoSo, request.DiaChiChuHoSo, request.UyQuyen, request.NguoiUyQuyen, request.SoDienThoaiNguoiUyQuyen, request.EmailNguoiUyQuyen,
                request.SoGiayToNguoiUyQuyen, request.LoaiGiayToNguoiUyQuyen, request.NgaySinhNguoiUyQuyen, request.TinhThanhNguoiUyQuyen, request.QuanHuyenNguoiUyQuyen, request.XaPhuongNguoiUyQuyen,
                request.DiaChiNguoiUyQuyen, request.TrichYeuHoSo, request.TrangThaiHoSoId, request.HinhThucTra,
                request.GhiChu, request.NoiNopHoSo, request.HoSoCoThanhPhanSoHo, request.TaiKhoanDuocXacThucVoiVNeID, request.DuocThanhToanTrucTuyen, request.LoaiDinhDanh,
                request.SoDinhDanh, request.MaTTHC, request.MaLinhVuc, request.TenLinhVuc, request.TenTruongHop, request.MaTruongHop, request.TruongHopId,
                request.ThoiGianThucHien, request.LoaiThoiGianThucHien, request.ThongBaoEmail, request.ThongBaoZalo, request.ThongBaoSMS, request.NguoiXuLyTiep,
                request.BuocXuLyTiep, request.NguoiNhanHoSo, request.NguoiDaXuLy, request.MucDo, request.SoBoHoSo, request.TenBuocHienTai, request.BuocHienTai, request.NguoiXuLyTruoc,
                request.BuocXuLyTruoc, request.DangKyNhanHoSoQuaBCCIData, request.TrichYeuKetQua, request.DinhKemKetQua, request.YKienNguoiChuyenXuLy, request.DinhKemYKienNguoiChuyenXuLy,
                request.NguoiDangXuLy, request.EFormData, request.TenDiaBan);
                await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);

                //bulk insert
                if (request.ThanhPhanHoSos != null && request.ThanhPhanHoSos.Count > 0)
                {
                    var newThanhPhanHoSoIds = request.ThanhPhanHoSos.Select(x => x.Id).Distinct().ToList();
                    string thanhPhanIds = String.Join("##", newThanhPhanHoSoIds);
                    var thanhPhanHoSoInDbs = await _dapperRepository.QueryAsync<UpdateHoSo_ThanhPhanHoSo_Select>(sqlGetThanhPhan, new
                    {
                        Ids = thanhPhanIds,
                    });
                    var thanhPhanNotInDbs = request.ThanhPhanHoSos.Where(u => !thanhPhanHoSoInDbs.Select(x => x.Id.ToString().ToLower()).ToList().Contains(u.Id.ToString().ToLower())).ToList();
                    var thanhPhanInDbs = request.ThanhPhanHoSos.Where(u => thanhPhanHoSoInDbs.Select(x => x.Id.ToString().ToLower()).ToList().Contains(u.Id.ToString().ToLower())).ToList();
                    var add_thanhPhanHoSos = new List<ThanhPhanHoSoNhap>();
                    thanhPhanNotInDbs.ForEach(item =>
                    {
                        var thanhPhanHoSo = new ThanhPhanHoSoNhap(item.Ten, updatedHoSo.Id.ToString(), item.SoBanChinh,
                            item.SoBanSao, item.MaGiayToKhoQuocGia, item.DinhKem, item.NhanBanGiay, item.MaGiayToSoHoa, item.TrangThaiSoHoa,
                            item.MaGiayTo, item.DuocLayTuKhoDMQuocGia, item.MaKetQuaThayThe, item.SoTrang, item.SoBanGiay, item.KyDienTuBanGiay, item.TrangThaiDuyet);
                        add_thanhPhanHoSos.Add(thanhPhanHoSo);
                    });
                    var insertTempValues = thanhPhanInDbs.Select(x => new { DinhKem = x.DinhKem, Id = x.Id.ToString(), SoBanChinh = x.SoBanChinh, SoBanSao = x.SoBanSao, x.MaGiayTo, x.SoBanGiay, x.SoTrang, x.KyDienTuBanGiay, x.Ten }).ToList();
                    await _repositoryThanhPhanHoSo.AddRangeAsync(add_thanhPhanHoSos);
                    int updatedThanhPhanHoSoRows = await _dapperRepository.ExcuteAsync(sqlUpdateThanhPhanHoSo, insertTempValues);
                    if (updatedThanhPhanHoSoRows == 0)
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
