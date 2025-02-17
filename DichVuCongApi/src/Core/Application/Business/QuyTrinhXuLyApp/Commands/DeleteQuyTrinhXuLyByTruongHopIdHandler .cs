using Mapster;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Commands;


public class DeleteQuyTrinhXuLyByTruongHopIdHandler : ICommandHandler<DeleteQuyTrinhXuLyByTruongHopId>
{
    private readonly IRepository<QuyTrinhXuLy> _repositoryWithEvents;
    private readonly IMediator _mediator;
    private readonly IDapperRepository _dapperRepository;
    public DeleteQuyTrinhXuLyByTruongHopIdHandler(IRepository<QuyTrinhXuLy> repositoryWithEvents, IMediator mediator,IDapperRepository dapper) {
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
        _dapperRepository = dapper;
    } 

    public async Task<Result> Handle(DeleteQuyTrinhXuLyByTruongHopId request, CancellationToken cancellationToken)
    {
        if (request.ForceDelete)
        {
            var sql = $"DELETE FROM Business.QuyTrinhXuLys WHERE TruongHopId = '{request.TruongHopId}'";
            await _dapperRepository.ExcuteAsync(sql);
        }    
        else
        {
           
            SearchQuyTrinhXuLyQuery searchQuyTrinhXuLyQuery = new SearchQuyTrinhXuLyQuery();
            searchQuyTrinhXuLyQuery.PageNumber = 1;
            searchQuyTrinhXuLyQuery.PageSize = 100;
            searchQuyTrinhXuLyQuery.TruongHopId = request.TruongHopId;
            searchQuyTrinhXuLyQuery.Removed = false;
            var itemExitst = await _mediator.Send(searchQuyTrinhXuLyQuery);
            if (itemExitst.Data != null)
            {
                List<QuyTrinhXuLy> tmpQuyTrinhXuLys = new List<QuyTrinhXuLy>();
                foreach(var item in itemExitst.Data)
                {
                    QuyTrinhXuLy tmp = item.Adapt<QuyTrinhXuLy>();
                    tmp.SoftDelete();
                    tmpQuyTrinhXuLys.Add(tmp);
                }
               
                await _repositoryWithEvents.UpdateRangeAsync(tmpQuyTrinhXuLys);
            }
            
        }
    return (Result)Result.Success();
    }
}
