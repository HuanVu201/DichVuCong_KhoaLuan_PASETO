using MassTransit;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Queries;

public class GetGiayToSoHoaByIdSpec : Specification<GiayToSoHoa>, ISingleResultSpecification
{
    public GetGiayToSoHoaByIdSpec(GetGiayToSoHoaQuery req)
    {
        if (req.Id != default)
            Query.Where(x => x.Id == req.Id);
        if (!string.IsNullOrEmpty(req.SoDinhDanh))
            Query.Where(x => x.MaDinhDanh == req.SoDinhDanh);
        if (!string.IsNullOrEmpty(req.FileUrl))
            Query.Where(x => x.DinhKem.Contains(req.FileUrl));
    }
}
public class GetGiayToSoHoaByQueryWhereBuilder
{
    public static string Build(GetGiayToSoHoaQuery req)
    {
        string where = string.Empty;
        if (req.Id != default)
            where += " AND gtsh.Id = @Id";
        if (!string.IsNullOrEmpty(req.SoDinhDanh))
            where += " AND gtsh.MaDinhDanh = @SoDinhDanh";
        if (!string.IsNullOrEmpty(req.FileUrl))
            where += " AND gtsh.DinhKem LIKE '%' + @FileUrl + '%'";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}


public class GetGiayToSoHoaQueryHandler : IQueryHandler<GetGiayToSoHoaQuery, GiayToSoHoaDetailDto>
{
    private readonly IReadRepository<GiayToSoHoa> _readRepository;
    private readonly IDapperRepository _dapperRepository;

    public GetGiayToSoHoaQueryHandler(IReadRepository<GiayToSoHoa> readRepository, IDapperRepository dapperRepository)
    {
        _readRepository = readRepository;
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<GiayToSoHoaDetailDto>> Handle(GetGiayToSoHoaQuery request, CancellationToken cancellationToken)
    {
        //var item = await _readRepository.FirstOrDefaultAsync(new GetGiayToSoHoaByIdSpec(request), cancellationToken);
        //if (item == null)
        //    throw new NotFoundException($"GiayToSoHoa với mã: {request.Id} chưa được thêm vào hệ thống");
        var where = GetGiayToSoHoaByQueryWhereBuilder.Build(request);
        var sql = $@"SELECT gtsh.ID, ThoiHanHieuLuc, gtsh.MaDinhDanh, ChuGiayTo, Ten, Ma, ThoiGianSoHoa, g.GroupName, gtsh.SoKyHieu, u.FullName, gtsh.DinhKem, gtsh.LoaiSoHoa ,hs.ChuHoSo,gtsh.MaHoSo,PhamViHieuLuc,
                        TrichYeuNoiDung,CoQuanBanHanh,NguoiKy,NgayBanHanh, gtsh.ThoiHanVinhVien, gtsh.JsonOcr
                        FROM Business.GiayToSoHoas as gtsh
                        LEFT JOIN Catalog.Groups as g on gtsh.DonViId = g.MaDinhDanh
                        INNER JOIN [Identity].[Users] as u  on u.Id = gtsh.NguoiSoHoa 
                        LEFT JOIN Business.HoSos as hs on hs.MaHoSo = gtsh.MaHoSo {where}";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<GiayToSoHoaDetailDto>(sql, request);
        if (data == null)
        {
            throw new NotFoundException($"GiayToSoHoa với mã: {request.Id} chưa được thêm vào hệ thống");
        }

        return Result<GiayToSoHoaDetailDto>.Success(data);
    }
}
