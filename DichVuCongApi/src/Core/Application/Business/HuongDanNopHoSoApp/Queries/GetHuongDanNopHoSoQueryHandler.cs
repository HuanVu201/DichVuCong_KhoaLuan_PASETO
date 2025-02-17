using Mapster;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Queries;
using TD.DichVuCongApi.Application.Catalog.MenuApp;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HuongDanNopHoSoApp.Queries;

public class GetHuongDanNopHoSoByIdSpec : Specification<HuongDanNopHoSo>, ISingleResultSpecification
{
    public GetHuongDanNopHoSoByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetHuongDanNopHoSoQueryHandler : IQueryHandler<GetHuongDanNopHoSoQuery, HuongDanNopHoSoDto>
{
    private readonly string tableName = "[Business].[HuongDanNopHoSos]";
    private readonly string userTableName = "[Identity].[Users]";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly IReadRepository<HuongDanNopHoSo> _readRepository;
    private IMediator _mediator;
    private readonly IDapperRepository _dapperRepository;
    public GetHuongDanNopHoSoQueryHandler(IReadRepository<HuongDanNopHoSo> readRepository, IMediator mediator, IDapperRepository dapperRepository) {
        _mediator = mediator;
        _readRepository = readRepository;
        _dapperRepository = dapperRepository;
    } 
    public async Task<Result<HuongDanNopHoSoDto>> Handle(GetHuongDanNopHoSoQuery request, CancellationToken cancellationToken)
    {
       
        string sql = $"SELECT {tableName}.*, {userTableName}.FullName NguoiTiepNhan, {thuTucTableName}.TenTTHC, {groupsTableName}.GroupName, {groupsTableName}.Catalog, " +
            $" {thuTucTableName}.MaLinhVucChinh MaLinhVuc, {thuTucTableName}.LinhVucChinh TenLinhVuc, {groupsTableName}.SoDienThoai SoDienThoaiDonVi " +
            $"FROM {tableName} " +
            $"INNER JOIN {userTableName} " +
            $"ON {tableName}.NguoiNhanHoSo = {userTableName}.Id " +
            $"INNER JOIN {thuTucTableName} " +
            $"ON {tableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
                $"INNER JOIN {groupsTableName} " +
            $"ON {groupsTableName}.GroupCode = {tableName}.DonViId " +
            $"WHERE {tableName}.Id = '{request.Id}'";
        var result =  await _dapperRepository.QueryFirstOrDefaultAsync<HuongDanNopHoSoDto>(sql,cancellationToken);
        SearchThanhPhanHuongDanNopHoSoQuery searchThanhPhan = new SearchThanhPhanHuongDanNopHoSoQuery();
        searchThanhPhan.HoSo = result?.Id.ToString();
        searchThanhPhan.PageSize = 100;
        searchThanhPhan.PageNumber = 1;
        var thanhPhan = await _mediator.Send(searchThanhPhan);
        if(thanhPhan != null && thanhPhan.Data != null && thanhPhan.Data.Count > 0) result.ThanhPhanHuongDanNopHoSos = thanhPhan.Data;
        return Result<HuongDanNopHoSoDto>.Success(result);
    }
}
