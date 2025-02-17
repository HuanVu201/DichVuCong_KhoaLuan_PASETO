using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Commands;

public class UpdateQuanLyTaiNguyenCommandHandler : ICommandHandler<UpdateQuanLyTaiNguyenCommand>
{
    private readonly IRepositoryWithEvents<QuanLyTaiNguyen> _repositoryWithEvents;

    public UpdateQuanLyTaiNguyenCommandHandler(IRepositoryWithEvents<QuanLyTaiNguyen> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateQuanLyTaiNguyenCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuanLyTaiNguyen với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.DinhKem, request.Ten, request.Mota, request.Public, request.SuDung,request.ThuTu,request.KichThuocTep);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
