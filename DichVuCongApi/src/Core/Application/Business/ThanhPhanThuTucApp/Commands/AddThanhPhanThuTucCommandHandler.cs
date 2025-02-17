using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
public class AddThanhPhanThuTucCommandHandler : ICommandHandler<AddThanhPhanThuTucCommand, DefaultIdType>
{
    private readonly IRepository<ThanhPhanThuTuc> _repositoryWithEvents;
    public AddThanhPhanThuTucCommandHandler(IRepository<ThanhPhanThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddThanhPhanThuTucCommand request, CancellationToken cancellationToken)
    {
        var thanhPhanThuTuc = ThanhPhanThuTuc.Create(request.Ten, request.Ma, request.ThuTucId, request.TruongHopId, request.MaGiayToKhoQuocGia, request.DinhKem, request.BatBuoc, request.SoBanChinh, request.SoBanSao, request.ChoPhepThemToKhai,request.STT);
        await _repositoryWithEvents.AddAsync(thanhPhanThuTuc, cancellationToken);
        return Result<DefaultIdType>.Success(thanhPhanThuTuc.Id);
    }
}
