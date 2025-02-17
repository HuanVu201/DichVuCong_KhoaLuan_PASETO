using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Commands;

public class UpdateGroupCommandHandler : ICommandHandler<UpdateGroupCommand>
{
    private readonly IRepositoryWithEvents<Group> _repositoryWithEvents;

    public UpdateGroupCommandHandler(IRepositoryWithEvents<Group> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateGroupCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Cơ cấu tổ chức với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedGroup = itemExitst.Update(request.GroupCode, request.GroupName, request.OfGroupCode, request.OfGroupName, request.OfGroupId, request.GroupOrder, request.DonViQuanLy, request.DonViQuanLyTraHoSo, request.YeuCauXacNhanCoKetQua, request.DonViQuanLyThuPhi, request.Active,
            request.Agent, request.Description, request.Type, request.Catalog, request.TaiKhoanThuHuong, request.MaNganHang, request.TenTaiKhoanThuHuong, request.MaDinhDanh, request.MaNhomLienThong, request.Coordinates, request.LoaiBienLaiThanhToan, request.CauHinhBienLaiThanhToan, request.OtherCatalog, request.DiaChi, request.SoDienThoai, request.ThoiGianLamViec, request.Email, request.Website,
            request.MaTinh, request.MaHuyen, request.MaXa, request.MaDiaBan, request.CauHinhBuuDien, request.MauSoBienLai, request.KyHieuBienLai, request.SoBienLai, request.MaSoThue, null, request.LienThongTNMT);
        await _repositoryWithEvents.UpdateAsync(updatedGroup, cancellationToken);

        return (Result)Result.Success();
    }
}
