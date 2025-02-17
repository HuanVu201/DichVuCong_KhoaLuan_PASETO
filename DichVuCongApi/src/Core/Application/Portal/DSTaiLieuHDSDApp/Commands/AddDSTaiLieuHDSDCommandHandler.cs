using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.DSTaiLieuHDSDApp.Commands;
public class AddDSTaiLieuHDSDCommandHandler : ICommandHandler<AddDSTaiLieuHDSDCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<DSTaiLieuHDSD> _repositoryWithEvents;
    public AddDSTaiLieuHDSDCommandHandler(IRepositoryWithEvents<DSTaiLieuHDSD> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddDSTaiLieuHDSDCommand request, CancellationToken cancellationToken)
    {
        var dsTaiLieuHDSD = DSTaiLieuHDSD.Create(request.ThuTu, request.TenTaiLieu,request.TepDinhKem,request.MoTa,request.NgayDang,request.TaiLieuDanhCho);
        await _repositoryWithEvents.AddAsync(dsTaiLieuHDSD, cancellationToken);
        return Result<DefaultIdType>.Success(dsTaiLieuHDSD.Id);
    }
}
