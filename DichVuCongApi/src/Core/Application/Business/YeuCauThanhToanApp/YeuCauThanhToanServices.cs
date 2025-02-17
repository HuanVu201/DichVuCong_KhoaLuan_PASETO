using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp;
using TD.DichVuCongApi.Application.Common.DvcPayment;
using TD.DichVuCongApi.Application.Identity.Users;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
public partial class YeuCauThanhToanServices : IYeuCauThanhToanServices
{
    private readonly string tableName = "Business.YeuCauThanhToans";
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly string donViThuTucableName = "Catalog.[DonViThuTucs]";
    private readonly string taiKhoanThuHuongTableName = "Catalog.TaiKhoanThuHuongs";
    private readonly IDapperRepository _dapperRepository;
    private readonly IDonViThuTucServices _donViThuTucServices;
    private readonly IUserService _currentUser;
    private readonly IDvcPaymentServices _dvcPaymentServices;
    private IGiaoDichThanhToanServices _giaoDichThanhToanServices;
    private readonly ILogger<YeuCauThanhToanDetailDto> _logger;
    public YeuCauThanhToanServices(
       IDapperRepository dapperRepository,
        IUserService user,
        IDvcPaymentServices dvcPaymentServices,
        IDonViThuTucServices donViThuTucServices,
        IGiaoDichThanhToanServices giaoDichThanhToanServices,
        ILogger<YeuCauThanhToanDetailDto> logger
        )
    {

        _dapperRepository = dapperRepository;
        _currentUser = user;
        _dvcPaymentServices = dvcPaymentServices;
        _donViThuTucServices = donViThuTucServices;
        _giaoDichThanhToanServices = giaoDichThanhToanServices;
        _logger = logger;

    }

    public async Task<YeuCauThanhToanDetailDto> Get(DefaultIdType id)
    {
        string where = $"WHERE {tableName}.Id = '{id}'";
        var sql = $"SELECT {tableName}.ID, {tableName}.Ma, {tableName}.MaHoSo, {tableName}.Phi, {tableName}.LePhi, " +
            $"{tableName}.SoTien, {tableName}.HinhThucThu, {tableName}.TrangThai,{tableName}.DonVi, {groupTableName}.MaNganHang, {groupTableName}.TaiKhoanThuHuong,{groupTableName}.TenTaiKhoanThuHuong, " +
            $"HoSos.MaTTHC, HoSos.TenTTHC, HoSos.MaDonViThucHienHoSo, HoSos.ChuHoSo ,HoSos.SoGiayToChuHoSo,HoSos.TenDonViThucHienHoSo, {groupTableName}.MaDinhDanh  " +
            $" FROM {tableName} " +
            $" INNER JOIN " +
            $"(SELECT {thuTucTableName}.MaTTHC, {thuTucTableName}.TenTTHC, {hoSoTableName}.MaHoSo, " +
            $"{groupTableName}.GroupCode as MaDonViThucHienHoSo, {groupTableName}.MaDinhDanh, {groupTableName}.GroupName AS TenDonViThucHienHoSo ,{hoSoTableName}.ChuHoSo,{hoSoTableName}.DiaChiChuHoSo, {hoSoTableName}.SoGiayToChuHoSo " +
            $"FROM {thuTucTableName} " +
            $"INNER JOIN {hoSoTableName} " +
            $"ON {thuTucTableName}.MaTTHC = {hoSoTableName}.MaTTHC " +
            $"INNER JOIN {groupTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupTableName}.GroupCode ) HoSos " +
            $"ON HoSos.MaHoSo = {tableName}.MaHoSo " +
            $"INNER JOIN {groupTableName} " +
            $"ON {groupTableName}.GroupCode = {tableName}.DonVi " +
            $"{where}";
        var res = _dapperRepository.QueryAsync<YeuCauThanhToanDetailDto>(sql).Result.FirstOrDefault();
        if (res == null) throw new NotFoundException($"YeuCauThanhToan với mã: {id} chưa được thêm vào hệ thống");

        // Nếu đơn vị thủ tục có cấu hình tài khoản thụ hưởng thì lấy thông tin tài khoản thụ hưởng của đơn vị thủ tục 
        var taiKhoanThuHuongSQL = $"SELECT {taiKhoanThuHuongTableName}.[TKThuHuong] TaiKhoanThuHuong, {taiKhoanThuHuongTableName}.[MaNHThuHuong] MaNganHang ,{taiKhoanThuHuongTableName}.[TenTKThuHuong] TenTaiKhoanThuHuong " +
            $"FROM {donViThuTucableName} " +
            $"INNER JOIN {taiKhoanThuHuongTableName} " +
            $"ON {donViThuTucableName}.TaiKhoanThuHuongId = {taiKhoanThuHuongTableName}.Id " +
            $"WHERE {donViThuTucableName}.DonViId = '{res.DonVi}' AND {donViThuTucableName}.MaTTHC = '{res.MaTTHC}' ";
        var resTaiKhoanThuHuong = _dapperRepository.QueryAsync<YeuCauThanhToanDetailDto>(taiKhoanThuHuongSQL).Result.FirstOrDefault();
        if (resTaiKhoanThuHuong != null)
        {
            res.TaiKhoanThuHuong = resTaiKhoanThuHuong.TaiKhoanThuHuong;
            res.MaNganHang = resTaiKhoanThuHuong.MaNganHang;
            res.TenTaiKhoanThuHuong = resTaiKhoanThuHuong.TenTaiKhoanThuHuong;
        }
        //var donViThuTucDetail = await _donViThuTucServices.GetBy(res.MaDonViThucHienHoSo, res.MaTTHC);
        //if(donViThuTucDetail != null)
        //{
        //    res.MaNganHang = donViThuTucDetail.MaNHThuHuong;
        //    res.TaiKhoanThuHuong = donViThuTucDetail.TKThuHuong;
        //    res.TenTaiKhoanThuHuong = donViThuTucDetail.TenTKThuHuong;
        //}
        return res;
    }
}
