using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.QuanLyVanBanApp.Commands;

public class UpdateQuanLyVanBanCommandHandler : ICommandHandler<UpdateQuanLyVanBanCommand>
{
    private readonly IRepositoryWithEvents<QuanLyVanBan> _repositoryWithEvents;

    public UpdateQuanLyVanBanCommandHandler(IRepositoryWithEvents<QuanLyVanBan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateQuanLyVanBanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuanLyVanBan với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.SoKyHieu,request.NgayBanHanh,request.LoaiVanBan,request.CongKhai,request.ThuTu,request.TrichYeu,request.FileDinhKem,request.MaLinhVuc,request.CoQuanBanHanh);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
