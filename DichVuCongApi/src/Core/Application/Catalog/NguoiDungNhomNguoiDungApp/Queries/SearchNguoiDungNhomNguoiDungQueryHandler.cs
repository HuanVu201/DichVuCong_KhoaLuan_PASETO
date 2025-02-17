using MediatR;
using Microsoft.AspNetCore.Http.Features;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.ActionApp;
using TD.DichVuCongApi.Application.Catalog.NguoiDungNhomNguoiDungApp;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Queries;

public class SearchNguoiDungNhomNguoiDungQueryWhereBuilder
{
    /// <summary>
    /// dùng cho nhận liên thông xuống, nhận nội bộ
    /// </summary>
    /// <param name="req"></param>
    /// <param name="isDonViTiepNhan">
    /// nếu như nhận liên thông xuống mà req.DonViTiepNhan select k ra j
    /// </param>
    /// <returns></returns>
    public static string Build(SearchNguoiDungNhomNguoiDungQuery req, bool firstQuery)
    {
        string where = "NND.DeletedOn is null ";
        if (!string.IsNullOrEmpty(req.TenUser))
            where += " AND U.FullName Like '%' + @TenUser + '%'";
        if (!string.IsNullOrEmpty(req.TenNhomNguoiDung))
            where += " AND NND.Ten = @TenNhomNguoiDung ";
        if (!string.IsNullOrEmpty(req.TaiKhoan))
            where += " AND C.TaiKhoan = @TaiKhoan ";
        if (!string.IsNullOrEmpty(req.NhomNguoiDungId))
            where += " AND C.NhomNguoiDungId = @NhomNguoiDungId ";
      /*  if (!string.IsNullOrEmpty(req.UserOfficeCode))
            where += " AND (G.OfGroupCode = @UserOfficeCode OR U.OfficeCode = @UserOfficeCode)";*/
        if (!string.IsNullOrEmpty(req.LoaiBuoc) && !string.IsNullOrEmpty(req.UserGroupCode))
        {
            if (req.LoaiBuoc == "Nhận nội bộ")
            {
                where += " AND U.OfficeCode = @UserGroupCode";
            }
            else if (req.LoaiBuoc == "Khác")
            {
                where += "AND (G.OfGroupCode = @UserGroupCode OR U.OfficeCode = @UserGroupCode)";
            }
            else if (req.LoaiBuoc == "Nhận liên thông xuống")
            {
                if(firstQuery && !string.IsNullOrEmpty(req.DonViTiepNhan))
                {
                    where += " AND U.OfficeCode = @DonViTiepNhan";
                } else
                {
                    if (!string.IsNullOrEmpty(req.UserGroupCode))
                    {
                        where += @" AND EXISTS
                        (SELECT 1 FROM
                        (SELECT value FROM STRING_SPLIT(
                        (SELECT TOP 1 MaNhomLienThong FROM Catalog.Groups WHERE GroupCode = @UserGroupCode),'#')) temp WHERE G.MaDinhDanh LIKE CONCAT(temp.value,'%'))";
                    }
                }
            } else if (req.LoaiBuoc == "Nhận liên thông lên")
            {
                if(firstQuery && !string.IsNullOrEmpty(req.UserGroupCode))
                {
                    where += @" AND EXISTS
                        (SELECT 1 FROM
                        (SELECT value FROM STRING_SPLIT(
                        (SELECT TOP 1 MaNhomLienThong FROM Catalog.Groups WHERE GroupCode = @UserGroupCode),'#')) temp WHERE G.MaDinhDanh = temp.value)";
                } else
                {
                    where += " AND U.OfficeCode != @UserGroupCode";
                }
            }
        }
        if (req.IsLastNode == true)
        {
            if (!string.IsNullOrEmpty(req.MaHoSo))
            {
                where += " AND U.OfficeCode = @UserGroupCode";
            }
        }
        if (req.NhomNguoiDungIds != null && req.NhomNguoiDungIds.Count > 0)
            where += " AND C.NhomNguoiDungId IN @NhomNguoiDungIds ";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchNguoiDungNhomNguoiDungQueryHandler : IRequestHandler<SearchNguoiDungNhomNguoiDungQuery, PaginationResponse<NguoiDungNhomNguoiDungDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchNguoiDungNhomNguoiDungQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<NguoiDungNhomNguoiDungDto>> Handle(SearchNguoiDungNhomNguoiDungQuery request, CancellationToken cancellationToken)
    {
        var builder = new SearchNguoiDungNhomNguoiDungQueryBuilder(request, _dapperRepository);
        
        return await builder.GetNguoiDung();
    }
}
