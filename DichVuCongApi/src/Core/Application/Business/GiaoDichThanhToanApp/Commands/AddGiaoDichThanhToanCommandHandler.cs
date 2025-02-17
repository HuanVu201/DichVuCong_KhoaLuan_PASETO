using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
public class AddGiaoDichThanhToanCommandHandler : ICommandHandler<AddGiaoDichThanhToanCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<GiaoDichThanhToan> _repositoryWithEvents;
    public AddGiaoDichThanhToanCommandHandler(IRepositoryWithEvents<GiaoDichThanhToan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddGiaoDichThanhToanCommand request, CancellationToken cancellationToken)
    {
        var giaoDichThanhToan = GiaoDichThanhToan.Create(request.HoSo,request.YeuCauThanhToan,request.MaThamChieu,request.SoTien,request.LoaiHinhThanhToan,request.MaKenhThanhToan,request.ThongTinGiaoDich,
              request.Ip,request.TKThuHuong,request.TenTKThuHuong,request.LoaiPhiLePhi,request.MaPhiLePhi,request.TenPhiLePhi,request.MaDonVi,request.TenDonVi,request.MaThuTucDVCQG,request.MaDVCThuTucDVCQuocGia,
              request.TenThuTucDVCQG,request.TenDVCThuTucDVCQuocGia,request.HoTenNguoiNop,request.SoCMNDNguoiNop,request.DiaChiNguoiNop,request.TrangThai,request.ThoiGianGD,request.NgayTao,request.MaGiaoDich,
              request.MaDoiTac,request.LoaiBanTin,request.MaLoi,request.MaNganHang,request.ThoiGianGDThanhCong,request.NgayCapNhatKetQua,request.DuongDanBienLai,request.BodyKetQua
            );
        await _repositoryWithEvents.AddAsync(giaoDichThanhToan, cancellationToken);
        return Result<DefaultIdType>.Success(giaoDichThanhToan.Id);
    }
}
