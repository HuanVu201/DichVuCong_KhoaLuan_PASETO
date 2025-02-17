using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Commands;
public class AddThanhPhanHuongDanNopHoSoCommandHandler : ICommandHandler<AddThanhPhanHuongDanNopHoSoCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<ThanhPhanHuongDanNopHoSo> _repositoryWithEvents;
    public AddThanhPhanHuongDanNopHoSoCommandHandler(IRepositoryWithEvents<ThanhPhanHuongDanNopHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddThanhPhanHuongDanNopHoSoCommand request, CancellationToken cancellationToken)
    {
        var thanhPhanHoSo = ThanhPhanHuongDanNopHoSo.Create(request.Ten,request.HoSo, request.SoBanChinh,
            request.SoBanSao,request.GhiChu);
        await _repositoryWithEvents.AddAsync(thanhPhanHoSo, cancellationToken);
        return Result<DefaultIdType>.Success(thanhPhanHoSo.Id);
    }
}
