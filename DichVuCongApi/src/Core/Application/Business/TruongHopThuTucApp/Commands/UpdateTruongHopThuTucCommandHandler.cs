using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Commands;

public class UpdateTruongHopThuTucCommandHandler : ICommandHandler<UpdateTruongHopThuTucCommand>
{
    private readonly IRepositoryWithEvents<TruongHopThuTuc> _repositoryWithEvents;

    public UpdateTruongHopThuTucCommandHandler(IRepositoryWithEvents<TruongHopThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateTruongHopThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TruongHopThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTruongHopThuTuc = itemExitst.Update(request.Ten, request.Ma, request.ThuTucId, request.ThoiGianThucHien, request.LoaiThoiGianThucHien,
            request.BatBuocDinhKemKetQua, request.YeuCauNopPhiTrucTuyen, request.DonViTiepNhanRieng, request.EForm, request.EFormTemplate, request.NodeQuyTrinh,
            request.EdgeQuyTrinh, request.EFormKetQua, request.BatBuocKySoKetQua, request.AnThongTinLienHeNopTrucTuyen,request.ChoChuyenPhiDiaGioi,
            request.KhongThuBanGiay, request.ThoiGianThucHienTrucTuyen, request.KhongCoNgayHenTra,request.ChoPhepNopUyQuyen, request.LoaiDuLieuKetNoi, request.MaSoBieuMau, request.KhongNopTrucTuyen, request.LoaiBaoTroXaHoi,request.BatBuocDungDiaBan, request.NoteNgayLamViec, request.NoteTraKetQua);
        await _repositoryWithEvents.UpdateAsync(updatedTruongHopThuTuc, cancellationToken);
        return (Result)Result.Success();
    }
}
