using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class AdminGetHoSoHandler : IQueryHandler<AdminGetHoSo, AdminHoSoDto>
{
    private readonly string hoSoTableName = "[Business].[HoSos]";
    private readonly IDapperRepository _dapperRepository;
    public AdminGetHoSoHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<AdminHoSoDto>> Handle(AdminGetHoSo request, CancellationToken cancellationToken)
    {
        if (request == null) throw new ArgumentNullException(nameof(request));
        if(request.Id == null) throw new ArgumentNullException($"{nameof(request.Id)}");
        string sql = $"SELECT * FROM {hoSoTableName} WHERE {hoSoTableName}.Id = @Id";
        var result = await _dapperRepository.QueryAsync<AdminHoSoDto>(sql,request,null,cancellationToken);
        if (result == null) throw new Exception($"Hồ sơ với Id :{hoSoTableName} chưa được thêm trong hệ thống");
        return Result<AdminHoSoDto>.Success(result.FirstOrDefault());
    }
}
