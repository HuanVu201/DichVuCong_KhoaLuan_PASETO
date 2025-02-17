using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.TrangThaiApp.Commands;
public class AddTrangThaiCommandHandler : ICommandHandler<AddTrangThaiCommand, Guid>
{
    private readonly IRepositoryWithEvents<TrangThai> _repositoryWithEvents;
    public AddTrangThaiCommandHandler(IRepositoryWithEvents<TrangThai> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddTrangThaiCommand request, CancellationToken cancellationToken)
    {
        var trangThai = TrangThai.Create(request.TenTrangThai, request.ThuTu, request.HienThiTrangChu);
        await _repositoryWithEvents.AddAsync(trangThai);
        return Result<DefaultIdType>.Success(trangThai.Id);
    }
}
