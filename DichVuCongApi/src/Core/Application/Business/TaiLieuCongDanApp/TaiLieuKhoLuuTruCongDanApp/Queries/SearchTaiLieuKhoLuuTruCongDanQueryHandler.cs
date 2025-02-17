using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Queries;
public class SearchTaiLieuKhoLuuTruCongDanQueryWhereBuilder
{
    public static string Build(SearchTaiLieuKhoLuuTruCongDanQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenGiayTo))
            where += " AND TenGiayTo Like N'%' + @TenGiayTo + '%'";

        if (!string.IsNullOrEmpty(req.DuongDan))
            where += " AND DuongDan Like N'%' + @DuongDan + '%'";

        if (!string.IsNullOrEmpty(req.Nguon))
            where += " AND Nguon = @Nguon";

        if (!string.IsNullOrEmpty(req.KhoLuuTruId.ToString()))
            where += " AND KhoLuuTruId = @KhoLuuTruId";

        if (!string.IsNullOrEmpty(req.LoaiNhomGiayToCaNhanId))
            where += " AND tl.LoaiNhomGiayToCaNhanId = @LoaiNhomGiayToCaNhanId";

        if (!string.IsNullOrEmpty(req.MaLinhVuc))
            where += " AND tl.MaLinhVuc = @MaLinhVuc";

        string tuNgay = req.TuNgay.HasValue ? req.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = req.DenNgay.HasValue ? req.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;

        if (!string.IsNullOrEmpty(tuNgay))
            where += $" AND CONVERT(DATE,tl.CreatedOn,23)  >= '{tuNgay}' ";

        if (!string.IsNullOrEmpty(denNgay))
            where += $" AND CONVERT(DATE,tl.CreatedOn,23)  <= '{denNgay}' ";

        if (req.Removed == false)
            where += " AND tl.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND tl.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchTaiLieuKhoLuuTruCongDanQueryHandler : IRequestHandler<SearchTaiLieuKhoLuuTruCongDanQuery, PaginationResponse<TaiLieuKhoLuuTruCongDanDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    public SearchTaiLieuKhoLuuTruCongDanQueryHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
    }

    public async Task<PaginationResponse<TaiLieuKhoLuuTruCongDanDto>> Handle(SearchTaiLieuKhoLuuTruCongDanQuery request, CancellationToken cancellationToken)
    {
        var res = await _mediator.Send(new CheckExistKhoLuuTruCongDanCommand());

        if (res.Succeeded && !string.IsNullOrEmpty(res.Data.ToString()))
        {
            request.KhoLuuTruId = res.Data;
            string where = SearchTaiLieuKhoLuuTruCongDanQueryWhereBuilder.Build(request);
            string sql = $@"SELECT tl.Id, KhoLuuTruId, TenGiayTo, loai.Ten as LoaiTaiLieu, DuongDan ,DungLuong, Nguon, LoaiGiayToId, tl.CreatedOn, tl.Type, tl.LoaiNhomGiayToCaNhanId, loaiNhom.Ten AS TenLoaiNhomGiayToCaNhan
                            FROM [Business].[TaiLieuKhoLuuTruCongDans] tl
                            Left JOIN [Business].[LoaiGiayToKhoLuuTrus] loai ON tl.LoaiGiayToId = loai.Id
                            LEFT JOIN [Portal].[LoaiNhomGiayToCaNhans] loaiNhom ON loaiNhom.Id = tl.LoaiNhomGiayToCaNhanId
                            {where}";
            var data = await _dapperRepository.PaginatedListSingleQueryAsync<TaiLieuKhoLuuTruCongDanDto>(sql, request.PageSize, "CreatedOn DESC", cancellationToken, request.PageNumber, request);
            return data;
        }
        else
        {
            return null;
        }
    }
}