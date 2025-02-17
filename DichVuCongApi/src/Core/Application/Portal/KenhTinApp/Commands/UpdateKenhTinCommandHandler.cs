using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.KenhTinApp.Commands;

//public class UpdateKenhTinCommandValidator : CustomValidator<UpdateKenhTinCommand>
//{
//    public UpdateKenhTinCommandValidator()
//    {
//        RuleFor(x => x.ThuTu).GreaterThan(0).WithMessage("Giá trị của ThuTu phải lớn hơn 0");
//    }
//}
public class UpdateKenhTinCommandHandler : ICommandHandler<UpdateKenhTinCommand>
{
    private readonly IRepositoryWithEvents<KenhTin> _repositoryWithEvents;
    public UpdateKenhTinCommandHandler(IRepositoryWithEvents<KenhTin> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(UpdateKenhTinCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Kênh tin với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Update(request.TenKenhTin, request.MaKenhTinCha, request.TomTat, request.ThuTu, request.ImageUrl,
            request.KieuNoiDungId, request.HienThiMenuChinh, request.HienThiMenuDoc, request.HienThiMenuPhu, request.NoiDung, request.LoaiMoLienKet, request.LienKetNgoai);
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
