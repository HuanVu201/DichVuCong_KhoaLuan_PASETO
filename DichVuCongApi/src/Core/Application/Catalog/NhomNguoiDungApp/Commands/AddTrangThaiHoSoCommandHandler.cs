using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NhomNguoiDungApp.Commands;
public class AddNhomNguoiDungCommandHandler : ICommandHandler<AddNhomNguoiDungCommand, Guid>
{
    private readonly IRepositoryWithEvents<NhomNguoiDung> _repositoryWithEvents;
    public AddNhomNguoiDungCommandHandler(IRepositoryWithEvents<NhomNguoiDung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddNhomNguoiDungCommand request, CancellationToken cancellationToken)
    {
        var nhomNguoiDung = NhomNguoiDung.Create(request.Ten, request.Ma, request.MoTa);
        await _repositoryWithEvents.AddAsync(nhomNguoiDung, cancellationToken);
        return Result<Guid>.Success(nhomNguoiDung.Id);
    }
}
