using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Commands;

public class UpdateDanhGiaHaiLongCommandHandler : ICommandHandler<UpdateDanhGiaHaiLongCommand>
{
    private readonly IRepository<DanhGiaHaiLong> _repositoryWithEvents;

    public UpdateDanhGiaHaiLongCommandHandler(IRepository<DanhGiaHaiLong> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateDanhGiaHaiLongCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhGiaHaiLong với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.MaHoSo,request.LoaiDanhGia,request.NguoiDanhGia,request.ThoiGianDanhGia,request.DanhGia,request.NoiDungDanhGia);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
