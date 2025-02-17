using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LogVBDLISApp.Commands;
public class AddLogVBDLISCommandHandler : ICommandHandler<AddLogVBDLISCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<LogVBDLIS> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;

    public AddLogVBDLISCommandHandler(IRepositoryWithEvents<LogVBDLIS> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<DefaultIdType>> Handle(AddLogVBDLISCommand request, CancellationToken cancellationToken)
    {

        var menu = LogVBDLIS.Create(request.api, request.maHoSo, request.body, request.response);
        await _repositoryWithEvents.AddAsync(menu, cancellationToken);
        return Result<DefaultIdType>.Success(menu.Id);

    }
}
