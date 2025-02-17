using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp;
using TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Queries;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Catalog.NguoiDungNhomNguoiDungApp;
public class SearchNguoiDungNhomNguoiDungQueryBuilder
{
    public SearchNguoiDungNhomNguoiDungQueryBuilderResponse where { get; private set; }
    private readonly IDapperRepository _dapperRepository;
    private readonly SearchNguoiDungNhomNguoiDungQuery _request;
    public const string sqlGetNhomNguoiDungHienTai = $@"SELECT NhomNguoiDungId FROM {SchemaNames.Catalog}.{TableNames.NguoiDungNhomNguoiDungs} as ndnnd WHERE TaiKhoan = @UserName";

    public SearchNguoiDungNhomNguoiDungQueryBuilder(SearchNguoiDungNhomNguoiDungQuery request, IDapperRepository dapperRepository)
    {
        _request = request;
        where = Build(request);
        _dapperRepository = dapperRepository;
    }

    public SearchNguoiDungNhomNguoiDungQueryBuilderResponse Build(SearchNguoiDungNhomNguoiDungQuery request)
    {
        var response = new SearchNguoiDungNhomNguoiDungQueryBuilderResponse();
        #region liên thông lên
        var whereLienThongLen1 = SearchNguoiDungNhomNguoiDungQueryWhereBuilder.Build(request, true);
        var whereLienThongLen2 = SearchNguoiDungNhomNguoiDungQueryWhereBuilder.Build(request, false);
        var baseSqlLienThongLen = $@"SELECT U.FullName, NND.Ten as TenNhom, NND.Ma as MaNhom, NND.Id as NhomNguoiDungId, U.Id as UserId, C.Id,U.UserOrder,
                    U.GroupCode, U.GroupName, U.UserName, U.OfficeCode,U.OfficeName,U.PositionName
                    FROM Catalog.NguoiDungNhomNguoiDungs as C inner join Catalog.NhomNguoiDungs as NND on C.NhomNguoiDungId = NND.Id
                    inner join [Identity].[Users] as U on C.TaiKhoan = U.UserName inner join Catalog.Groups as G on U.OfficeCode = G.GroupCode ";
        response.SqlLienThongLen1 = baseSqlLienThongLen + whereLienThongLen1;
        response.SqlLienThongLen2 = baseSqlLienThongLen + whereLienThongLen2;
        #endregion


        #region liên thông xuống
        var whereLienThongXuong1 = SearchNguoiDungNhomNguoiDungQueryWhereBuilder.Build(request, true);
        var whereLienThongXuong2 = SearchNguoiDungNhomNguoiDungQueryWhereBuilder.Build(request, false);
        var baseSqlLienThongXuong = $@"SELECT U.FullName, NND.Ten as TenNhom, NND.Ma as MaNhom, NND.Id as NhomNguoiDungId, U.Id as UserId, C.Id,U.UserOrder,
                    U.GroupCode, U.GroupName, U.UserName, U.OfficeCode,U.OfficeName ,U.PositionName 
                    FROM Catalog.NguoiDungNhomNguoiDungs as C inner join Catalog.NhomNguoiDungs as NND on C.NhomNguoiDungId = NND.Id
                    inner join [Identity].[Users] as U on C.TaiKhoan = U.UserName ";
        response.SqlLienThongXuongTheoDonViHoSo = baseSqlLienThongXuong + whereLienThongXuong1;
        response.SqlLienThongXuongTheoDonViNguoiDung = baseSqlLienThongXuong + whereLienThongXuong2;
        #endregion

        var whereNhanNoiBo = SearchNguoiDungNhomNguoiDungQueryWhereBuilder.Build(request, false);
        var sqlNhanNoiBo = $@"SELECT U.FullName, NND.Ten as TenNhom, NND.Ma as MaNhom, NND.Id as NhomNguoiDungId, U.Id as UserId, C.Id,U.UserOrder,
                    U.GroupCode, U.GroupName, U.UserName, U.OfficeCode,U.OfficeName ,U.PositionName 
                    FROM Catalog.NguoiDungNhomNguoiDungs as C inner join Catalog.NhomNguoiDungs as NND on C.NhomNguoiDungId = NND.Id
                    inner join [Identity].[Users] as U on C.TaiKhoan = U.UserName
                    {whereNhanNoiBo}";
        response.SqlNhanNoiBo = sqlNhanNoiBo;

        var whereNguoiDungNhomNguoiDungDonVi = SearchNguoiDungNhomNguoiDungQueryWhereBuilder.Build(request, false);
        var sqlNguoiDungNhomNguoiDungDonVi = $@"SELECT U.FullName, NND.Ten as TenNhom, NND.Ma as MaNhom, NND.Id as NhomNguoiDungId, U.Id as UserId, C.Id,U.UserOrder,
                    U.GroupCode, U.GroupName, U.UserName, U.OfficeCode,U.OfficeName ,U.PositionName 
                    FROM Catalog.NguoiDungNhomNguoiDungs as C inner join Catalog.NhomNguoiDungs as NND on C.NhomNguoiDungId = NND.Id
                    inner join [Identity].[Users] as U on C.TaiKhoan = U.UserName
                    inner join Catalog.Groups as G on U.OfficeCode = G.GroupCode
                    {whereNguoiDungNhomNguoiDungDonVi}";
        response.SqlNhomNguoiDungDonVi = sqlNguoiDungNhomNguoiDungDonVi;


        return response;
    }
    private string GetOrderBy(string[]? keys)
    {
        List<string> res = new List<string>();
        if (keys == null)
        {
            return "UserOrder";
        }
        Dictionary<string, string> result = new Dictionary<string, string>();
        result.Add("OfficeCode", "OfficeCode");
        result.Add("FullName", "FullName");
        for (int i = 0; i < keys.Count(); i++)
        {
            var key = keys[i];
            if (result.ContainsKey(key))
            {
                res.Add(result[key]);
            }
        }
        if (res.Count > 0)
            return string.Join(",", res);
        else return "UserOrder";
    }

    public async Task<PaginationResponse<NguoiDungNhomNguoiDungDto>> GetNguoiDung()
    {
        //if (_request.LoaiBuoc == "Nhận liên thông lên")
        //{
        //    var data2 = await _dapperRepository.PaginatedListSingleQueryAsync<NguoiDungNhomNguoiDungDto>(where.SqlLienThongLen1, _request.PageSize,_request.OrderBy != null && _request.OrderBy.Length >0 ? _request.OrderBy: new List<string>() { "FullName"}.ToArray(), page: _request.PageNumber, param: _request);
        //    return data2;
        //}
        //var data = await _dapperRepository.PaginatedListSingleQueryAsync<NguoiDungNhomNguoiDungDto>(where.SqlLienThongXuongTheoDonViHoSo, _request.PageSize, _request.OrderBy != null && _request.OrderBy.Length > 0 ? _request.OrderBy : new List<string>() { "FullName" }.ToArray(), page: _request.PageNumber, param: _request);
        //if (_request.LoaiBuoc == "Nhận liên thông xuống" && data.Data == null)
        //{
        //    var data1 = await _dapperRepository.PaginatedListSingleQueryAsync<NguoiDungNhomNguoiDungDto>(where.SqlLienThongXuongTheoDonViNguoiDung, _request.PageSize, _request.OrderBy != null && _request.OrderBy.Length > 0 ? _request.OrderBy : new List<string>() { "FullName" }.ToArray(), page: _request.PageNumber, param: _request);
        //    return data1;
        //}
        //return data;
        string order = GetOrderBy(_request.OrderBy);
        if (_request.LoaiBuoc == "Nhận liên thông lên")
        {
            var firstQueryResponse = await _dapperRepository.PaginatedListSingleQueryAsync<NguoiDungNhomNguoiDungDto>(where.SqlLienThongLen1, _request.PageSize, order, page: _request.PageNumber, param: _request);
            if (firstQueryResponse.Data != null) return firstQueryResponse;
            return await _dapperRepository.PaginatedListSingleQueryAsync<NguoiDungNhomNguoiDungDto>(where.SqlLienThongLen2, _request.PageSize, order, page: _request.PageNumber, param: _request);
        }
        else if (_request.LoaiBuoc == "Nhận liên thông xuống")
        {
            var firstQueryResponse = await _dapperRepository.PaginatedListSingleQueryAsync<NguoiDungNhomNguoiDungDto>(where.SqlLienThongXuongTheoDonViHoSo, _request.PageSize, order, page: _request.PageNumber, param: _request);
            if (firstQueryResponse.Data != null) return firstQueryResponse;
            return await _dapperRepository.PaginatedListSingleQueryAsync<NguoiDungNhomNguoiDungDto>(where.SqlLienThongXuongTheoDonViNguoiDung, _request.PageSize, order, page: _request.PageNumber, param: _request);
        }
        else if (_request.LoaiBuoc == "Khác")
        {
            return await _dapperRepository.PaginatedListSingleQueryAsync<NguoiDungNhomNguoiDungDto>(where.SqlNhomNguoiDungDonVi, _request.PageSize, order, page: _request.PageNumber, param: _request);
        }

        return await _dapperRepository.PaginatedListSingleQueryAsync<NguoiDungNhomNguoiDungDto>(where.SqlNhanNoiBo, _request.PageSize, order, page: _request.PageNumber, param: _request);

    }
}

public class SearchNguoiDungNhomNguoiDungQueryBuilderResponse
{
    /// <summary>
    /// query lần 1 liên thông lên
    /// </summary>
    public string SqlLienThongLen1 { get; set; }
    /// <summary>
    /// query lần 2 liên thông lên
    /// </summary>
    public string SqlLienThongLen2 { get; set; }
    /// <summary>
    /// query lần 1 liên thông xuống
    /// </summary>
    public string SqlLienThongXuongTheoDonViHoSo { get; set; }
    /// <summary>
    /// query lần 2 liên thông xuống
    /// </summary>
    public string SqlLienThongXuongTheoDonViNguoiDung { get; set; }
    public string SqlNhanNoiBo { get; set; }
    public string SqlNhomNguoiDungDonVi { get; set; }

}
