using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.TaiKhoanThuHuongApp.Commands;
public class AddTaiKhoanThuHuongCommandHandler : ICommandHandler<AddTaiKhoanThuHuongCommand, Guid>
{
    private readonly IRepositoryWithEvents<TaiKhoanThuHuong> _repositoryWithEvents;
    public AddTaiKhoanThuHuongCommandHandler(IRepositoryWithEvents<TaiKhoanThuHuong> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddTaiKhoanThuHuongCommand request, CancellationToken cancellationToken)
    {
        var taiKhoanThuHuong = TaiKhoanThuHuong.Create(request.TKThuHuong,request.MaNHThuHuong,request.TenTKThuHuong,request.MoTa,request.DonViId);
        await _repositoryWithEvents.AddAsync(taiKhoanThuHuong, cancellationToken);
        return Result<Guid>.Success(taiKhoanThuHuong.Id);
    }
}
