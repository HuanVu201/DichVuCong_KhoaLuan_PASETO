using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Queries;

public class GetApiChiaSeWithMaQueryHandler : IRequestHandler<GetApiChiaSeWithMaQuery, Result<GetApiChiaSeWithMaResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public GetApiChiaSeWithMaQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<Result<GetApiChiaSeWithMaResponse>> Handle(GetApiChiaSeWithMaQuery request, CancellationToken cancellationToken)
    {

        string sql = $@"Select * FROM [Portal].[APIChiaSes]
                        WHERE DeletedOn is null AND MaApiChiaSe = @MaApi";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<GetApiChiaSeWithMaResponse>(sql, new
        {
            MaApi = request.MaApi,
        });
        if (data == null)
            return Result<GetApiChiaSeWithMaResponse>.Fail(message: "Không có thông tin");

        return Result<GetApiChiaSeWithMaResponse>.Success(data);
    }

}