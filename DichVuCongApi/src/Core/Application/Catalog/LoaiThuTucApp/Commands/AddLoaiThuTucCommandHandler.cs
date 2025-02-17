using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Commands;
public class AddLoaiThuTucCommandHandler : ICommandHandler<AddLoaiThuTucCommand, Guid>
{
    private readonly IRepositoryWithEvents<LoaiThuTuc> _repositoryWithEvents;
    public AddLoaiThuTucCommandHandler(IRepositoryWithEvents<LoaiThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddLoaiThuTucCommand request, CancellationToken cancellationToken)
    {
        var linhVuc = LoaiThuTuc.Create(request.NhomThuTucID,request.Ten,request.MoTa,request.ThuTu);
        await _repositoryWithEvents.AddAsync(linhVuc, cancellationToken);
        return Result<Guid>.Success(linhVuc.Id);
    }
}
