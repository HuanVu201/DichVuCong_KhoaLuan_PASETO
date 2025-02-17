using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
public class AddThanhPhanHoSoCommandHandler : ICommandHandler<AddThanhPhanHoSoCommand, DefaultIdType>
{
    private readonly IRepository<ThanhPhanHoSo> _repositoryWithEvents;
    public AddThanhPhanHoSoCommandHandler(IRepository<ThanhPhanHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddThanhPhanHoSoCommand request, CancellationToken cancellationToken)
    {
        var thanhPhanHoSo = ThanhPhanHoSo.Create(request.Ten,request.HoSo, request.SoBanChinh,
            request.SoBanSao, request.MaGiayToKhoQuocGia, request.DinhKem, request.NhanBanGiay, request.MaGiayToSoHoa, request.TrangThaiSoHoa,
            request.MaGiayTo, request.DuocLayTuKhoDMQuocGia, request.MaKetQuaThayThe, request.SoTrang, request.SoBanGiay, request.KyDienTuBanGiay, request.TrangThaiDuyet);
        thanhPhanHoSo.SetDinhKemGoc(request.DinhKem);
        await _repositoryWithEvents.AddAsync(thanhPhanHoSo, cancellationToken);
        return Result<DefaultIdType>.Success(thanhPhanHoSo.Id);
    }
}
