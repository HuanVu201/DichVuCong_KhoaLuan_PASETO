using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
public class GetInfoUserExpandApiQueryHandler : IRequestHandler<GetInfoUserExpandApiQuery, Result<GetInfoUserExResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private static string securitycode = "secret-key-call-api";
    private readonly IMediator _mediator;
    public GetInfoUserExpandApiQueryHandler(IDapperRepository dapperRepository, IReadRepository<Config> readRepositoryConfig, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _readRepositoryConfig = readRepositoryConfig;
        _mediator = mediator;
    }
    public async Task<Result<GetInfoUserExResponse>> Handle(GetInfoUserExpandApiQuery request, CancellationToken cancellationToken)
    {
        Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(securitycode), cancellationToken);
        if (string.IsNullOrEmpty(request.SecurityKey) || request.SecurityKey != config.Content)
            return Result<GetInfoUserExResponse>.Fail(message: "401 Unauthorized - Error Security Code");

        try
        {
            var res = await _mediator.Send(new UpdateLuotGoiApiChiaSeCommand()
            {
                MaApiChiaSe = request.ApiEx,
            });
            if (res.Failed)
            {
                return Result<GetInfoUserExResponse>.Fail(res.Message);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return Result<GetInfoUserExResponse>.Fail("Lỗi kiểm tra giới hạn lượt gọi api!");

        }

        string sql = $@"SELECT FullName as HoVaTen, SoDinhDanh AS CCCD, 
                        CASE 
                                WHEN GioiTinh = 1 THEN N'Nam' 
                                WHEN GioiTinh = 2 THEN N'Nữ' 
                                ELSE NULL 
                            END AS GioiTinh
                         FROM [Identity].[Users]
                         WHERE TypeUser= 'CongDan' AND DeletedOn is null AND SoDinhDanh = @SoDinhDanh
                        ";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<GetInfoUserExResponse>(sql, new { SoDinhDanh = request.CCCD });
        if (data == null)
            return Result<GetInfoUserExResponse>.Fail(message: "Không có thông tin người dung!");
        return Result<GetInfoUserExResponse>.Success(data);
    }
}
