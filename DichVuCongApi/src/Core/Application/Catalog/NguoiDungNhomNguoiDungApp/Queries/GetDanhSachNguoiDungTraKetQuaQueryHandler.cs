using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.NguoiDungNhomNguoiDungApp.Queries;
public class GetDanhSachNguoiDungTraKetQuaQueryHandler : IQueryHandler<GetDanhSachNguoiDungTraKetQuaQuery, List<GetDanhSachNguoiDungTraKetQuaDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public GetDanhSachNguoiDungTraKetQuaQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<List<GetDanhSachNguoiDungTraKetQuaDto>>> Handle(GetDanhSachNguoiDungTraKetQuaQuery request, CancellationToken cancellationToken)
    {
        string sql = $@"select dvtt.UserId, u.FullName, u.PositionName, u.username, u.OfficeCode, u.OfficeName, u.GroupCode, u.GroupName
            from 
            (SELECT DISTINCT LTRIM(RTRIM(value)) AS UserId
            FROM (
                SELECT REPLACE(NguoiTiepNhanId, '##', '#') AS NguoiTiepNhanId
                FROM Catalog.DonViThuTucs dvtt
                WHERE dvtt.DonViId = @DonViId and MaTTHC = @MaTTHC
            ) AS u
            CROSS APPLY STRING_SPLIT(u.NguoiTiepNhanId, '#')
            WHERE LTRIM(RTRIM(value)) <> '') dvtt inner join [identity].users u on dvtt.UserId = u.Id
            ";
        var data = await _dapperRepository.QueryAsync<GetDanhSachNguoiDungTraKetQuaDto>(sql, request, cancellationToken: cancellationToken);
        return Result<List<GetDanhSachNguoiDungTraKetQuaDto>>.Success(data.ToList());
    }
}
