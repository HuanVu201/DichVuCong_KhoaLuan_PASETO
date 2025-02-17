using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Commands;
public class AddThuTucThuocLoaiCommandHandler : ICommandHandler<AddThuTucThuocLoaiCommand, Guid>
{
    private readonly IRepositoryWithEvents<ThuTucThuocLoai> _repositoryWithEvents;
    public AddThuTucThuocLoaiCommandHandler(IRepositoryWithEvents<ThuTucThuocLoai> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddThuTucThuocLoaiCommand request, CancellationToken cancellationToken)
    {
        var linhVuc = ThuTucThuocLoai.Create(request.ThuTucID,request.ThuTu,request.LoaiThuTucId);
        await _repositoryWithEvents.AddAsync(linhVuc, cancellationToken);
        return Result<Guid>.Success(linhVuc.Id);
    }
}
