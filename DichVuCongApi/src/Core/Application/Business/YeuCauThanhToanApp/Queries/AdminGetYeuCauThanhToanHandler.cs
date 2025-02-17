using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Dto;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
public class AdminGetYeuCauThanhToanHandler : IQueryHandler<AdminGetYeuCauThanhToan, AdminYeuCauThanhToanDto>
{
    private readonly string yeuCauThanhToanTable = $"[Business].[YeuCauThanhToans]";
    private readonly IDapperRepository _dapperRepository;
    public AdminGetYeuCauThanhToanHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<AdminYeuCauThanhToanDto>> Handle(AdminGetYeuCauThanhToan request, CancellationToken cancellationToken)
    {
        if (request == null) throw new ArgumentNullException($"{nameof(request)}");
        if(request.Id == null) throw new ArgumentNullException($"{nameof(request)}");
        string sql = $"SELECT * FROM {yeuCauThanhToanTable} WHERE {yeuCauThanhToanTable}.Id = @Id";
        var res = await _dapperRepository.QueryFirstOrDefaultAsync<AdminYeuCauThanhToanDto>(sql, request, null, cancellationToken);
        if (res == null) throw new Exception($"Yêu cầu thanh toán với Id: {request.Id} không tồn tại trong hệ thống");
        return Result<AdminYeuCauThanhToanDto>.Success(res);
    }
}
