using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.KieuNoiDungApp;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.KenhTinApp.Queries;

public class GetKenhTinByIdSpec : Specification<KenhTin, DetailKenhTinDto>, ISingleResultSpecification
{
    public GetKenhTinByIdSpec(string Id)
    {
        Query.Select(x => new DetailKenhTinDto()
        {
            Id = x.Id,
            TenKenhTin = x.TenKenhTin,
            TenKenhTinCha = x.KenhTinCha.TenKenhTin,
            ImageUrlKenhTinCha = x.KenhTinCha.ImageUrl,
            MaKenhTinCha = x.KenhTinCha.Id,
            //KenhTincha = x.KenhTinCha != null ? new KenhTinBaseDto()
            //{
            //    Id = x.KenhTinCha.Id ,
            //    TenKenhTin = x.KenhTinCha.TenKenhTin,
            //    ImageUrl = x.KenhTinCha.ImageUrl,
            //} : null,
            ThuTu = x.ThuTu,
            ImageUrl = x.ImageUrl,
            KieuNoiDung = new KieuNoiDungBaseDto()
            {
                Id = x.KieuNoiDung.Id,
                TenNoiDung = x.KieuNoiDung.TenNoiDung,
                ChoPhepNhapLoaiLienKet = x.KieuNoiDung.ChoPhepNhapLoaiLienKet,
                ChoPhepNhapNoiDung = x.KieuNoiDung.ChoPhepNhapNoiDung
            },
            LoaiMoLienKet = x.LoaiMoLienKet,
            LienKetNgoai = x.LienKetNgoai,
            NoiDung = x.NoiDung,
            HienThiMenuChinh = x.HienThiMenuChinh,
            HienThiMenuDoc = x.HienThiMenuDoc,
            HienThiMenuPhu = x.HienThiMenuPhu,
        }).Where(kenhTin => kenhTin.Id.ToString() == Id).Include(x => x.KenhTinCha).Include(x => x.KieuNoiDung);
    }
}

public class GetKenhTinByMaKenhTinChaSpec : Specification<KenhTin>, ISingleResultSpecification
{
    public GetKenhTinByMaKenhTinChaSpec(Guid maKenhTinCha)
    {
        Query.Where(x => x.Id == maKenhTinCha);
    }
}

public class GetKenhTinQueryHandler : IQueryHandler<GetKenhTinQuery, DetailKenhTinDto>
{
    private readonly IReadRepository<KenhTin> _readRepository;
    public GetKenhTinQueryHandler(IReadRepository<KenhTin> readRepository) => _readRepository = readRepository;
    public async Task<Result<DetailKenhTinDto>> Handle(GetKenhTinQuery request, CancellationToken cancellationToken)
    {
        var kenhTin = await _readRepository.FirstOrDefaultAsync(new GetKenhTinByIdSpec(request.Id), cancellationToken);
        if (kenhTin == null)
            throw new NotFoundException($"Kênh tin với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<DetailKenhTinDto>.Success(kenhTin);
    }
}
