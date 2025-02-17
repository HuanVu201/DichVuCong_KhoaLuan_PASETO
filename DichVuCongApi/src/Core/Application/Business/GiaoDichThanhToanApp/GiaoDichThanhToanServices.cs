using Mapster;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp;
public partial class GiaoDichThanhToanServices : IGiaoDichThanhToanServices
{
    private readonly IRepositoryWithEvents<GiaoDichThanhToan> _repositoryWithEvents;

    public GiaoDichThanhToanServices(IRepositoryWithEvents<GiaoDichThanhToan> repositoryWithEvents)
    {
        _repositoryWithEvents = repositoryWithEvents;
    }
    public async Task<AddGiaoDichThanhToanResponse> Create(AddGiaoDichThanhToanRequest request)
    {

        if (request == null) throw new ArgumentNullException(nameof(request));
        var giaoDichThanhToan = GiaoDichThanhToan.Create(request.HoSo, request.YeuCauThanhToan, request.MaThamChieu, request.SoTien, request.LoaiHinhThanhToan, request.MaKenhThanhToan, request.ThongTinGiaoDich,
        request.Ip, request.TKThuHuong, request.TenTKThuHuong, request.LoaiPhiLePhi, request.MaPhiLePhi, request.TenPhiLePhi, request.MaDonVi, request.TenDonVi, request.MaThuTucDVCQG, request.MaDVCThuTucDVCQuocGia,
        request.TenThuTucDVCQG, request.TenDVCThuTucDVCQuocGia, request.HoTenNguoiNop, request.SoCMNDNguoiNop, request.DiaChiNguoiNop, request.TrangThai, request.ThoiGianGD, request.NgayTao, request.MaGiaoDich,
        request.MaDoiTac, request.LoaiBanTin, request.MaLoi, request.MaNganHang, request.ThoiGianGDThanhCong, request.NgayCapNhatKetQua, request.DuongDanBienLai, request.BodyKetQua, "", request.NguoiNopTienBienLai, request.MaSoThueBienLai, request.DiaChiBienLai
        , request.SoTaiKhoanHoanPhi, request.TenTaiKhoanHoanPhi, request.TenNganHangHoanPhi, request.SoGiayToNguoiNopTienBienLai, request.EmailNguoiNopTienBienLai);

        try
        {
            var res = await _repositoryWithEvents.AddAsync(giaoDichThanhToan);
            if (res == null) throw new Exception("AddGiaoDichThanhToan Error");
            return res.Adapt<AddGiaoDichThanhToanResponse>();
        }
        catch (Exception e)
        {
            throw e;
        }

        return null;
    }

}
