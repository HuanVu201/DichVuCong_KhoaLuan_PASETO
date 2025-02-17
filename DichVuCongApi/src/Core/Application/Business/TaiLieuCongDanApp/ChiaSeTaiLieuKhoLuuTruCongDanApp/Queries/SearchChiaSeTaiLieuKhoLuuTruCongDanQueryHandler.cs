using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.ChiaSeTaiLieuKhoLuuTruCongDanApp;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.ChiaSeTaiLieuKhoLuuTruCongDanApp.Queries;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.ChiaSeChiaSeTaiLieuKhoLuuTruCongDanApp.Queries;
public class SearchChiaSeTaiLieuKhoLuuTruCongDanQueryHandler : IRequestHandler<SearchChiaSeTaiLieuKhoLuuTruCongDanQuery, PaginationResponse<ChiaSeTaiLieuKhoLuuTruCongDanDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly ICurrentUser _currentUser;
    public SearchChiaSeTaiLieuKhoLuuTruCongDanQueryHandler(IDapperRepository dapperRepository, IMediator mediator, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _currentUser = currentUser;
    }

    public async Task<PaginationResponse<ChiaSeTaiLieuKhoLuuTruCongDanDto>> Handle(SearchChiaSeTaiLieuKhoLuuTruCongDanQuery request, CancellationToken cancellationToken)
    {
        string where = string.Empty;
        if (request.Removed == false)
            where += " AND cs.DeletedOn is null AND tl.DeletedOn is null";
        else if (request.Removed == true)
            where += " AND cs.DeletedOn is not null AND tl.DeletedOn is not null";


        var userId = _currentUser.GetUserId();
        string sqlQueryUser = @"SELECT TOP (1) Id, SoDinhDanh
                                          FROM [Identity].[Users]
                                          WHERE Id= @Id";

        var resUser = await _dapperRepository.QueryFirstOrDefaultAsync<UserAppDto>(sqlQueryUser, new
        {
            Id = userId
        });
        if (resUser != null)
        {
            request.SoDinhDanhNhan = resUser.SoDinhDanh ?? string.Empty;
        }
        else return null;

        string sqlQuery = @$"SELECT cs.Id as Id, TaiLieuLuuTruId, u.FullName as TenNguoiChiaSe, cs.CreatedOn,
		                        tl.TenGiayTo, tl.DuongDan, tl.DungLuong
                          FROM [Business].[ChiaSeTaiLieuKhoLuuTruCongDans] cs
                          INNER JOIN [Business].[TaiLieuKhoLuuTruCongDans] tl ON cs.TaiLieuLuuTruId = tl.Id
                          INNER JOIN [Identity].[Users] u ON u.SoDinhDanh = cs.SoDinhDanhChiaSe
                          WHERE SoDinhDanhNhan = @SoDinhDanhNhan {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ChiaSeTaiLieuKhoLuuTruCongDanDto>(sqlQuery, request.PageSize, "CreatedOn DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}