using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp.Commands;
public class DeleteMultiPhiLePhiCommandHandler : ICommandHandler<DeleteMultiPhiLePhiCommand>
{
    private readonly string tableName = "[Business].[PhiLePhis]";
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<PhiLePhi> _repositoryWithEvents;
    private IMediator _mediator;

    public DeleteMultiPhiLePhiCommandHandler(IDapperRepository dapperRepository, IRepository<PhiLePhi> repositoryWithEvents, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
    }
    public async Task<Result> Handle(DeleteMultiPhiLePhiCommand request, CancellationToken cancellationToken)
    {
        List<PhiLePhi> phiLePhis = new List<PhiLePhi>();
        var sqlQuery = $"SELECT * FROM {tableName} WHERE {tableName}.ID IN @Ids";
        var itemsExitst = await _dapperRepository.QueryAsync<PhiLePhi>(sqlQuery, request);
        if (itemsExitst != null && itemsExitst.Count > 0)
        {
            foreach (var item in itemsExitst)
            {
                item.SoftDelete();
                phiLePhis.Add(item);
            }
            await _repositoryWithEvents.UpdateRangeAsync(phiLePhis, cancellationToken);
        }
        return (Result)Result.Success();
    }
}
