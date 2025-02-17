using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;

public class UpdateGiaoDichThanhToanCommandHandler : ICommandHandler<UpdateGiaoDichThanhToanCommand>
{
    private readonly IRepositoryWithEvents<GiaoDichThanhToan> _repositoryWithEvents;

    public UpdateGiaoDichThanhToanCommandHandler(IRepositoryWithEvents<GiaoDichThanhToan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateGiaoDichThanhToanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"GiaoDichThanhToan với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedGiaoDichThanhToan = itemExitst.Update(request.HoSo, request.YeuCauThanhToan, request.MaThamChieu, request.SoTien, request.LoaiHinhThanhToan, request.MaKenhThanhToan, request.ThongTinGiaoDich,
              request.Ip, request.TKThuHuong, request.TenTKThuHuong, request.LoaiPhiLePhi, request.MaPhiLePhi, request.TenPhiLePhi, request.MaDonVi, request.TenDonVi, request.MaThuTucDVCQG, request.MaDVCThuTucDVCQuocGia,
              request.TenThuTucDVCQG, request.TenDVCThuTucDVCQuocGia, request.HoTenNguoiNop, request.SoCMNDNguoiNop, request.DiaChiNguoiNop, request.TrangThai, request.ThoiGianGD, request.NgayTao, request.MaGiaoDich,
              request.MaDoiTac, request.LoaiBanTin, request.MaLoi, request.MaNganHang, request.ThoiGianGDThanhCong, request.NgayCapNhatKetQua, request.DuongDanBienLai, request.BodyKetQua,request.ResponseDvcPayment
              ,null,null,null,null,null,null,null,request.AutoCheckedTrangThaiTTTT);
        await _repositoryWithEvents.UpdateAsync(updatedGiaoDichThanhToan, cancellationToken);
        return (Result)Result.Success();
    }
}
