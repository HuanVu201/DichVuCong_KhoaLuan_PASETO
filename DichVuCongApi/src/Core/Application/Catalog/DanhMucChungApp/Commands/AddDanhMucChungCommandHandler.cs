using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Commands;
public class AddDanhMucChungCommandHandler : ICommandHandler<AddDanhMucChungCommand, Guid>
{
    private readonly IRepository<DanhMucChung> _repositoryWithEvents;
    public AddDanhMucChungCommandHandler(IRepository<DanhMucChung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddDanhMucChungCommand request, CancellationToken cancellationToken)
    {
        var danhMucChung = DanhMucChung.Create(request.TenDanhMuc, request.Code, request.ThuTu, request.Active, request.Type);
        danhMucChung.SetParentCode(request.ParentCode);
        await _repositoryWithEvents.AddAsync(danhMucChung, cancellationToken);
        return Result<Guid>.Success(danhMucChung.Id);
    }
}
