using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.QuanLyVanBanApp.Commands;
public class AddQuanLyVanBanCommandHandler : ICommandHandler<AddQuanLyVanBanCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<QuanLyVanBan> _repositoryWithEvents;
    public AddQuanLyVanBanCommandHandler(IRepositoryWithEvents<QuanLyVanBan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddQuanLyVanBanCommand request, CancellationToken cancellationToken)
    {
        var quanLyVanBan = QuanLyVanBan.Create(request.SoKyHieu,request.NgayBanHanh,request.LoaiVanBan,request.CongKhai, request.ThuTu,request.TrichYeu,request.FileDinhKem,request.MaLinhVuc,request.CoQuanBanHanh);
        await _repositoryWithEvents.AddAsync(quanLyVanBan, cancellationToken);
        return Result<DefaultIdType>.Success(quanLyVanBan.Id);
    }
}
