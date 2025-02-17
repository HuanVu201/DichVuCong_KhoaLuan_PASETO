using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Commands;

public class UpdateDanhMucChungCommandHandler : ICommandHandler<UpdateDanhMucChungCommand>
{
    private readonly IRepository<DanhMucChung> _repositoryWithEvents;

    public UpdateDanhMucChungCommandHandler(IRepository<DanhMucChung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateDanhMucChungCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Danh mục chung với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedDanhMucChung = itemExitst.Update(request.TenDanhMuc, request.Code, request.ParentCode, request.ThuTu, request.Active, request.Type);
        await _repositoryWithEvents.UpdateAsync(updatedDanhMucChung, cancellationToken);
        return (Result)Result.Success();
    }
}
