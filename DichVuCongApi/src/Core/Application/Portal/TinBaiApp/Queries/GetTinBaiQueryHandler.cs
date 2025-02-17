using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.TinBaiApp.Queries;

public class GetTinBaiByIdSpec : Specification<TinBai, DetailTinBaiDto>, ISingleResultSpecification
{
    public GetTinBaiByIdSpec(string Id)
    {
        Query.Select(x => new DetailTinBaiDto()
        {
            Id = x.Id,
            TieuDe = x.TieuDe,
            NgayBanHanh = x.NgayBanHanh,
            NgayKetThuc = x.NgayKetThuc,
            TrichYeu = x.TrichYeu,
            NoiDung = x.NoiDung,
            NguonTin = x.NguonTin,
            KenhTin = new KenhTinApp.KenhTinBaseDto()
            {
                Id = x.KenhTin.Id,
                TenKenhTin = x.KenhTin.TenKenhTin,
                ImageUrl = x.KenhTin.ImageUrl,
            },
            TrangThai = new TrangThaiApp.TrangThaiDto()
            {
                Id = x.TrangThai.Id,
                TenTrangThai = x.TrangThai.TenTrangThai,
            },
            AnhDaiDien = x.AnhDaiDien,
            FileDinhKem = x.FileDinhKem,
            Tacgia = x.Tacgia,
            ChoPhepBinhLuan = x.ChoPhepBinhLuan,
            HienThiLenTrangChu = x.HienThiLenTrangChu,
            TinNoiBat = x.TinNoiBat,
        });
        Query.Where(x => x.Id.ToString() == Id)
            .Include(x => x.TrangThai)
            .Include(x => x.KenhTin);
    }
}

public class GetTinBaiQueryHandler : IQueryHandler<GetTinBaiQuery, DetailTinBaiDto>
{
    private readonly IReadRepository<TinBai> _readRepository;

    public GetTinBaiQueryHandler(IReadRepository<TinBai> readRepository) => _readRepository = readRepository;

    public async Task<Result<DetailTinBaiDto>> Handle(GetTinBaiQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetTinBaiByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Tin bài với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<DetailTinBaiDto>.Success(item);
    }
}
