using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThongBaoApp.Commands;
public class AddThongBaoCommandHandler : ICommandHandler<AddThongBaoCommand, Guid>
{
    private readonly IRepositoryWithEvents<ThongBao> _repositoryWithEvents;
    public AddThongBaoCommandHandler(IRepositoryWithEvents<ThongBao> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddThongBaoCommand request, CancellationToken cancellationToken)
    {
        var thongBao = ThongBao.Create(request.TieuDe, request.NoiDung, request.TepDinhKem, request.DonViId, request.ToanHeThong, request.QuanTrong, request.SuDung);
        await _repositoryWithEvents.AddAsync(thongBao, cancellationToken);
        return Result<Guid>.Success(thongBao.Id);
    }
}
