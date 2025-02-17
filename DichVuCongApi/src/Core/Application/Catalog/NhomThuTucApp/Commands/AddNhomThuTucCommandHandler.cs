using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Commands;
public class AddNhomThuTucCommandHandler : ICommandHandler<AddNhomThuTucCommand, Guid>
{
    private readonly IRepositoryWithEvents<NhomThuTuc> _repositoryWithEvents;
    public AddNhomThuTucCommandHandler(IRepositoryWithEvents<NhomThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddNhomThuTucCommand request, CancellationToken cancellationToken)
    {
        var linhVuc = NhomThuTuc.Create(request.Ten,request.MoTa,request.Icon,request.MauSac,request.DoiTuong,request.ThuTu);
        await _repositoryWithEvents.AddAsync(linhVuc, cancellationToken);
        return Result<Guid>.Success(linhVuc.Id);
    }
}
