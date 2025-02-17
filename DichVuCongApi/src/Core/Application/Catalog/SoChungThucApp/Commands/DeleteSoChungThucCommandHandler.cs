using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Commands;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Commands;
public class DeleteSoChungThucCommandHandler : ICommandHandler<DeleteSoChungThucCommand>
{
    private readonly IRepositoryWithEvents<SoChungThuc> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;

    public DeleteSoChungThucCommandHandler(IRepositoryWithEvents<SoChungThuc> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> Handle(DeleteSoChungThucCommand request, CancellationToken cancellationToken)
    {
        
        string sql = @$"select top 1 maHoSo from {SchemaNames.Business}.{TableNames.HoSos} where MaHoSo in (
                    SELECT distinct HoSo FROM {SchemaNames.Business}.{TableNames.ThanhPhanHoSos} where SoChungThucDT = @RequestId
                    OR SoChungThucG = @RequestId)
                    and DeletedOn is null";
        var dataTphs = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sql, new
        {
            RequestId = request.Id,
        });
        if (dataTphs != null)
            throw new NotFoundException($"Không thể xóa do đã phát sinh hồ sơ");
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Sổ chứng thực với mã: {request.Id} chưa được thêm vào hệ thống");
        
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
