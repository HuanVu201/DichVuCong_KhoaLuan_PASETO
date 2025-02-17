using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Commands;
public class AddNgayNghiCommandHandler : ICommandHandler<AddNgayNghiCommand, Guid>
{
    private readonly IRepositoryWithEvents<NgayNghi> _repositoryWithEvents;
    public AddNgayNghiCommandHandler(IRepositoryWithEvents<NgayNghi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddNgayNghiCommand request, CancellationToken cancellationToken)
    {
        var ngayNghi = NgayNghi.Create(request.Date, request.Description);
        await _repositoryWithEvents.AddAsync(ngayNghi, cancellationToken);
        return Result<Guid>.Success(ngayNghi.Id);
    }
}
