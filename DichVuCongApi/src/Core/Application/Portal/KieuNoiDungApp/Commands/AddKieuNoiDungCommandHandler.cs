using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Commands;
internal class AddLoaiDichVuCommandHandler : ICommandHandler<AddKieuNoiDungCommand, Guid>
{
    private readonly IRepositoryWithEvents<KieuNoiDung> _repositoryWithEvents;
    public AddLoaiDichVuCommandHandler(IRepositoryWithEvents<KieuNoiDung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddKieuNoiDungCommand request, CancellationToken cancellationToken)
    {
        var item = KieuNoiDung.Create(request.TenNoiDung, request.ChoPhepNhapNoiDung, request.ChoPhepNhapLoaiLienKet, request.ChoPhepNhapTinBai);
        await _repositoryWithEvents.AddAsync(item);
        return Result<DefaultIdType>.Success(item.Id);
    }
}
