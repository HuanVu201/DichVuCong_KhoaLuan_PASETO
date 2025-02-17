using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Commands;
public class AddGroupCommandHandler : ICommandHandler<AddGroupCommand, Guid>
{
    private readonly IRepositoryWithEvents<Group> _repositoryWithEvents;
    public AddGroupCommandHandler(IRepositoryWithEvents<Group> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddGroupCommand request, CancellationToken cancellationToken)
    {
        var group = Group.Create(request.GroupCode, request.GroupName, request.OfGroupCode, request.OfGroupName, request.OfGroupId, request.FullCode, request.GroupOrder, request.DonViQuanLy, request.DonViQuanLyTraHoSo, request.YeuCauXacNhanCoKetQua, request.DonViQuanLyThuPhi, request.Active,
            request.Agent, request.Description, request.Type, request.Catalog, request.TaiKhoanThuHuong, request.MaNganHang, request.TenTaiKhoanThuHuong, request.MaDinhDanh, request.MaNhomLienThong, null, null, request.OtherCatalog, request.DiaChi, request.SoDienThoai, request.ThoiGianLamViec
            , request.Email, request.Website);
        await _repositoryWithEvents.AddAsync(group, cancellationToken);
        return Result<Guid>.Success(group.Id);
    }
}
