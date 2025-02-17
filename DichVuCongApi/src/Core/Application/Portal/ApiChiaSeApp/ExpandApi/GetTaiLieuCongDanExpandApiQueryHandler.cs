using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Queries;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;

public class GetTaiLieuCongDanExpandApiQueryHandler : IRequestHandler<GetTaiLieuCongDanExpandApiQuery, Result<PaginationResponse<TaiLieuCongDanExpandApiResponse>>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMediator _mediator;
    private static string securitycode = "secret-key-call-api";
    public GetTaiLieuCongDanExpandApiQueryHandler(IDapperRepository dapperRepository, IReadRepository<Config> readRepositoryConfig, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _readRepositoryConfig = readRepositoryConfig;
        _mediator = mediator;
    }

    public async Task<Result<PaginationResponse<TaiLieuCongDanExpandApiResponse>>> Handle(GetTaiLieuCongDanExpandApiQuery request, CancellationToken cancellationToken)
    {
        Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(securitycode), cancellationToken);
        if (string.IsNullOrEmpty(request.SecurityKey) || request.SecurityKey != config.Content)
            throw new Exception("401 Unauthorized - Error Security Code");

        try
        {
            var res = await _mediator.Send(new UpdateLuotGoiApiChiaSeCommand()
            {
                MaApiChiaSe = request.ApiEx,
            });
            if (res.Failed)
            {
                return Result<PaginationResponse<TaiLieuCongDanExpandApiResponse>>.Fail(res.Message);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return Result<PaginationResponse<TaiLieuCongDanExpandApiResponse>>.Fail("Lỗi kiểm tra giới hạn lượt gọi api!");

        }

        string sql = $@"SELECT [Id], [TenGiayTo], [DuongDan], [DungLuong], [CreatedOn] AS ThoiGianTao
                        FROM [Business].[TaiLieuKhoLuuTruCongDans]
                        WHERE DeletedOn is null";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TaiLieuCongDanExpandApiResponse>(sql, request.PageSize, "ThoiGianTao DESC", cancellationToken, request.PageNumber, request);
        return Result<PaginationResponse<TaiLieuCongDanExpandApiResponse>>.Success(data);
    }
}
