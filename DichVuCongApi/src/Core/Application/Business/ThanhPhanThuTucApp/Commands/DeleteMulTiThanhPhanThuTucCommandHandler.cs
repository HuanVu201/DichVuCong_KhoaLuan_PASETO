using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
public class DeleteMulTiThanhPhanThuTucCommandHandler : ICommandHandler<DeleteMultiThanhPhanThuTucCommand>
{
    private readonly string tableName = "[Business].[ThanhPhanThuTucs]";
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<ThanhPhanThuTuc> _repositoryWithEvents;
    private IMediator _mediator;

    public DeleteMulTiThanhPhanThuTucCommandHandler(IDapperRepository dapperRepository, IRepository<ThanhPhanThuTuc> repositoryWithEvents, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
    }
    public async Task<Result> Handle(DeleteMultiThanhPhanThuTucCommand request, CancellationToken cancellationToken)
    {
        List<ThanhPhanThuTuc> thanhPhanThuTucs = new List<ThanhPhanThuTuc>();
        var sqlQuery = $"SELECT * FROM {tableName} WHERE {tableName}.ID IN @Ids";
        var itemsExitst = await _dapperRepository.QueryAsync<ThanhPhanThuTuc>(sqlQuery, request);
        if (itemsExitst != null && itemsExitst.Count > 0)
        {
            foreach (var item in itemsExitst)
            {
                item.SoftDelete();
                thanhPhanThuTucs.Add(item);
            }
            await _repositoryWithEvents.UpdateRangeAsync(thanhPhanThuTucs, cancellationToken);
        }
        return (Result)Result.Success();
    }
}
