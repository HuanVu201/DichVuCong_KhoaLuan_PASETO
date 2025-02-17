using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Commands;
public class AddLinhVucCommandHandler : ICommandHandler<AddLinhVucCommand, Guid>
{
    private readonly IRepositoryWithEvents<LinhVuc> _repositoryWithEvents;
    public AddLinhVucCommandHandler(IRepositoryWithEvents<LinhVuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddLinhVucCommand request, CancellationToken cancellationToken)
    {
        var linhVuc = LinhVuc.Create(request.Ten, request.Ma, request.MaNganh, request.SuDung, request.SoLuongThuTuc, request.SoLuongThuTucCapTinh, request.SoLuongThuTucCapHuyen, request.SoLuongThuTucCapXa);
        await _repositoryWithEvents.AddAsync(linhVuc, cancellationToken);
        return Result<Guid>.Success(linhVuc.Id);
    }
}
