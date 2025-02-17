using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KetQuaLienQuanApp.Commands;
public class AddKetQuaLienQuanCommandHandler : ICommandHandler<AddKetQuaLienQuanCommand, DefaultIdType>
{
    private readonly IRepository<KetQuaLienQuan> _repositoryWithEvents;
    public AddKetQuaLienQuanCommandHandler(IRepository<KetQuaLienQuan> repositoryWithEvents)
    {
        _repositoryWithEvents = repositoryWithEvents;
    }

    public async Task<Result<DefaultIdType>> Handle(AddKetQuaLienQuanCommand request, CancellationToken cancellationToken)
    {
        var ketQuaLienQuan = new KetQuaLienQuan(request.MaHoSo, request.LoaiKetQua, request.SoKyHieu, request.TrichYeu, request.NgayKy, request.NguoiKy, request.CoQuanBanHanh, request.NgayCoHieuLuc, request.NgayHetHieuLuc, request.TrangThai, request.DinhKem);
        await _repositoryWithEvents.AddAsync(ketQuaLienQuan, cancellationToken);
        return Result<DefaultIdType>.Success(ketQuaLienQuan.Id);
    }
}
