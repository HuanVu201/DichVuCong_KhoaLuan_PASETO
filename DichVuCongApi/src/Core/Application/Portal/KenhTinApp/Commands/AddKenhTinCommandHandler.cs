using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.KenhTinApp.Queries;
using TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Queries;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.KenhTinApp.Commands;

public class AddKenhTinCommandValidator : CustomValidator<AddKenhTinCommand>
{
    public AddKenhTinCommandValidator()
    {
        RuleFor(x => x.ThuTu).GreaterThan(0).WithMessage("Giá trị của ThuTu phải lớn hơn 0");
    }
}

public class AddKenhTinCommandHandler : ICommandHandler<AddKenhTinCommand, Guid>
{
    private readonly IRepositoryWithEvents<KenhTin> _repositoryKenhTin;
    private readonly IRepositoryWithEvents<KieuNoiDung> _repositoryKieuNoiDung;
    public AddKenhTinCommandHandler(IRepositoryWithEvents<KenhTin> repositoryKenhTin, IRepositoryWithEvents<KieuNoiDung> repositoryKieuNoiDung)
        => (_repositoryKenhTin, _repositoryKieuNoiDung) = (repositoryKenhTin, repositoryKieuNoiDung);
    public async Task<Result<DefaultIdType>> Handle(AddKenhTinCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var kenhTinCha = request.MaKenhTinCha != null ?
                await _repositoryKenhTin.FirstOrDefaultAsync(new GetKenhTinByMaKenhTinChaSpec((DefaultIdType)request.MaKenhTinCha), cancellationToken) :
                null;
            if (request.MaKenhTinCha != null && kenhTinCha == null)
            {
                throw new NotFoundException($"kenhTinCha với mã {request.MaKenhTinCha} chưa được thêm vào hệ thống");
            }
            var kieuNoiDung = await _repositoryKieuNoiDung.FirstOrDefaultAsync(new GetKieuNoiDungById(request.KieuNoiDungId), cancellationToken);
            if(kieuNoiDung == null)
            {
                throw new NotFoundException($"KieuNoiDung với mã {request.KieuNoiDungId} chưa được thêm vào hệ thống");
            }
            var kenhTin = KenhTin.Create(request.TenKenhTin, request.MaKenhTinCha, request.TomTat, request.ThuTu, request.ImageUrl, request.KieuNoiDungId,
                request.HienThiMenuChinh, request.HienThiMenuDoc, request.HienThiMenuPhu, request.NoiDung, request.LoaiMoLienKet, request.LienKetNgoai);
            await _repositoryKenhTin.AddAsync(kenhTin);
            return Result<DefaultIdType>.Success(kenhTin.Id);
        }
        catch (Exception ex)
        {
            throw new InternalServerException(ex.ToString());
        }
    }
}
