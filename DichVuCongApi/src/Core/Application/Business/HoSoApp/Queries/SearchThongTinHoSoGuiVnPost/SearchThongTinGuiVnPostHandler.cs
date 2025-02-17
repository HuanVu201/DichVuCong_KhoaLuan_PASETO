using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchThongTinHoSoGuiVnPost;
public class SearchThongTinGuiVnPostHandler : IRequestHandler<SearchThongTinGuiVnPostRequest, List<ThongTinGuiVnPostResponse>>
{
    private readonly string tableName = "Business.HoSos";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly IDapperRepository _dapperRepository;
    
    public SearchThongTinGuiVnPostHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<List<ThongTinGuiVnPostResponse>> Handle(SearchThongTinGuiVnPostRequest request, CancellationToken cancellationToken)
    {
        var sql = $"SELECT {tableName}.Id, {tableName}.MaHoSo, {tableName}.DangKyNhanHoSoQuaBCCIData,{groupTableName}.CauHinhBuuDien, " +
            $"{groupTableName}.SoDienThoai FROM {tableName} " +
            $"INNER JOIN {groupTableName} ON {tableName}.DonViId = {groupTableName}.GroupCode " +
            $"WHERE {tableName}.Id IN @Ids";
        var hoSos = await _dapperRepository.QueryAsync<ThongTinGuiVnPostResponse>(sql, request, null, cancellationToken);
        if (hoSos == null) throw new NotFoundException("Không tìm thấy thông tin hồ sơ");
        return hoSos.ToList();
        
    }
}
