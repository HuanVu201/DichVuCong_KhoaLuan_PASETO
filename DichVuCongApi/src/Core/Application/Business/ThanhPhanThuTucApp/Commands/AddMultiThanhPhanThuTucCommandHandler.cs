using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
public class AddMultiThanhPhanThuTucCommandHandler : ICommandHandler<AddMultiThanhPhanThuTucCommand>
{
    private readonly IRepository<ThanhPhanThuTuc> _repositoryWithEvents;
    public AddMultiThanhPhanThuTucCommandHandler(IRepository<ThanhPhanThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(AddMultiThanhPhanThuTucCommand request, CancellationToken cancellationToken)
    {
        await _repositoryWithEvents.AddRangeAsync(request.data, cancellationToken);
        return (Result)Result.Success();
    }
}
