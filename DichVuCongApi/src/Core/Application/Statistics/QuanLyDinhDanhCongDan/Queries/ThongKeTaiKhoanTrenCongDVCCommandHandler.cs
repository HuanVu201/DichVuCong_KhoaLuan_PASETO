using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
public class ThongKeTaiKhoanTrenCongDVCWhereBuilder
{
    public static string Build(ThongKeTaiKhoanTrenCongDVCCommand req)
    {
        string where = string.Empty;

        if (req.DaDinhDanh == true)
            where += " AND SoDinhDanh is not null";
        else if (req.DaDinhDanh == false)
            where += " AND SoDinhDanh is null";

        if (!string.IsNullOrEmpty(req.GioiTinh))
            where += " AND GioiTinh Like N'%' + @GioiTinh + '%'";


        if (!string.IsNullOrEmpty(req.DoTuoi))
        {
            string[] value = req.DoTuoi.Split("##");
            string startAge = value[0];
            string endAge = value[1];
            int currentYear = DateTime.Now.Year;

            where += $" AND ({currentYear} - NamSinh) >= {startAge} AND ({currentYear} - NamSinh) <= {endAge}";
        }



        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class ThongKeTaiKhoanTrenCongDVCCommandHandler : IRequestHandler<ThongKeTaiKhoanTrenCongDVCCommand, PaginationResponse<UserAppDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public ThongKeTaiKhoanTrenCongDVCCommandHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<UserAppDto>> Handle(ThongKeTaiKhoanTrenCongDVCCommand request, CancellationToken cancellationToken)
    {
        var where = ThongKeTaiKhoanTrenCongDVCWhereBuilder.Build(request);
        var sql = $@"SELECT ID, FullName, UserName, SoDinhDanh, Email, GioiTinh, NgayThangNamSinh, TypeUser FROM [Identity].[Users] {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<UserAppDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}