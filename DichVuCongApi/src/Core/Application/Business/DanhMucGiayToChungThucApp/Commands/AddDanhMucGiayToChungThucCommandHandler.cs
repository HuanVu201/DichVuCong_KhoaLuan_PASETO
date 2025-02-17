using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.DanhMucGiayToChungThucApp.Commands;
public class AddDanhMucGiayToChungThucCommandHandler : ICommandHandler<AddDanhMucGiayToChungThucCommand, DefaultIdType>
{
    private readonly IRepository<DanhMucGiayToChungThuc> _repositoryWithEvents;
    public AddDanhMucGiayToChungThucCommandHandler(IRepository<DanhMucGiayToChungThuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddDanhMucGiayToChungThucCommand request, CancellationToken cancellationToken)
    {
        var DanhMucGiayToChungThuc = new DanhMucGiayToChungThuc(request.Ma, request.Ten, request.SuDung);
        await _repositoryWithEvents.AddAsync(DanhMucGiayToChungThuc, cancellationToken);
        return Result<DefaultIdType>.Success(DanhMucGiayToChungThuc.Id);
    }
}
