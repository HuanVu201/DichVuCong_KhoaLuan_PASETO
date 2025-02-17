using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;

public class UpdateGiayToSoHoaCommandHandler : ICommandHandler<UpdateGiayToSoHoaCommand>
{
    private readonly IRepository<GiayToSoHoa> _repositoryWithEvents;

    public UpdateGiayToSoHoaCommandHandler(IRepository<GiayToSoHoa> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateGiayToSoHoaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"GiayToSoHoa với mã: {request.Id} chưa được thêm vào hệ thống");
        itemExitst.Update(request.Ten, request.Ma, request.MaGiayToKhoQuocGia, request.MaDinhDanh, request.MaGiayTo, request.DonViId,
            request.NguoiSoHoa, request.ThoiGianSoHoa, request.ThoiHanHieuLuc, request.NgayBanHanh, request.PhamViHieuLuc, request.TrichYeuNoiDung, request.CoQuanBanHanh,
            request.NguoiKy, request.LoaiSoHoa, request.DinhKem, request.SoKyHieu, request.ThoiHanVinhVien, request.JsonOcr, request.MaHoSo);
        itemExitst.SetChuGiayTo(request.ChuGiayTo);

        await _repositoryWithEvents.UpdateAsync(itemExitst, cancellationToken);
        return (Result)Result.Success();
    }
}
