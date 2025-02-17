using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KetQuaThuTucApp.Commands;
public class AddKetQuaThuTucCommandHandler : ICommandHandler<AddKetQuaThuTucCommand, DefaultIdType>
{
    private readonly IRepository<KetQuaThuTuc> _repositoryWithEvents;
    public AddKetQuaThuTucCommandHandler(IRepository<KetQuaThuTuc> repositoryWithEvents)
    {
        _repositoryWithEvents = repositoryWithEvents;
    }

    public async Task<Result<DefaultIdType>> Handle(AddKetQuaThuTucCommand request, CancellationToken cancellationToken)
    {
        var ketQuaThuTuc = new KetQuaThuTuc(request.MaNhanDienOCR, request.MaKetQua, request.TenKetQua, request.TenTep, request.Url, request.MaTTHC, request.EFormKetQua, request.ThoiHanMacDinh, request.LoaiThoiHan, request.LaThuTucThongDung);
        await _repositoryWithEvents.AddAsync(ketQuaThuTuc, cancellationToken);
        return Result<DefaultIdType>.Success(ketQuaThuTuc.Id);
    }
}
