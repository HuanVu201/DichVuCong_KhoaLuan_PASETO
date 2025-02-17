using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.TaiKhoanThuHuongApp.Commands;

public class UpdateTaiKhoanThuHuongCommandHandler : ICommandHandler<UpdateTaiKhoanThuHuongCommand>
{
    private readonly IRepositoryWithEvents<TaiKhoanThuHuong> _repositoryWithEvents;

    public UpdateTaiKhoanThuHuongCommandHandler(IRepositoryWithEvents<TaiKhoanThuHuong> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateTaiKhoanThuHuongCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TaiKhoanThuHuong với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.TKThuHuong,request.MaNHThuHuong,request.TenTKThuHuong,request.MoTa,request.DonViId);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
