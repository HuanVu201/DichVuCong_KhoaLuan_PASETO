using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp.Queries;
public class GetDataChartTaiLieuCaNhanQueryHandler : IRequestHandler<GetDataChartTaiLieuCaNhanQuery, Result<string>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public GetDataChartTaiLieuCaNhanQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<Result<string>> Handle(GetDataChartTaiLieuCaNhanQuery request, CancellationToken cancellationToken)
    {
        string userId = _currentUser.GetUserId().ToString();
        if (string.IsNullOrEmpty(userId))
            return Result<string>.Fail("Không có thông tin người dùng hiện tại");

        if (string.IsNullOrEmpty(request.Type))
            return Result<string>.Fail("Vui lòng chọn Loại/Nhóm giấy tờ để thực hiện thống kê!");

        string sqlQuery = @$"SELECT ln.Ten as TenLoaiNhom, COUNT(tl.Id) AS SoLuong, ln.CreatedOn
                            FROM [Business].[TaiLieuKhoLuuTruCongDans] tl
                            LEFT JOIN [Portal].[LoaiNhomGiayToCaNhans] ln ON tl.LoaiNhomGiayToCaNhanId = ln.Id
                            WHERE tl.DeletedOn is null AND tl.Type = @Type AND tl.CreatedBy = @CreatedBy
                            GROUP BY ln.Ten, ln.CreatedOn
                            ORDER BY ln.CreatedOn ASC";

        try
        {
            var data = await _dapperRepository.QueryAsync<DataChartTaiLieuCaNhanRes>(sqlQuery, new { Type = request.Type, CreatedBy = userId });
            return Result<string>.Success(data: JsonConvert.SerializeObject(data));
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message, ex);
        }

    }
}
