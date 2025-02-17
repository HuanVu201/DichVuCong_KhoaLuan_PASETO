using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.ExportExcel;
using TD.DichVuCongApi.Application.Common.Minio;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;

public class ExportExcelBaoCao01WhereBuilder
{
    public static string Build(ExportExcelBaoCao01Querry req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.DonVi))
            where += " AND DonVi = @DonVi";
        if (!string.IsNullOrEmpty(req.Quy))
            where += " AND DATEPART(QUARTER, NgayTao) = CAST(@Quy AS INT)";
        if (!string.IsNullOrEmpty(req.Nam))
            where += " AND DATEPART(YEAR, NgayTao) =  CAST(@Nam AS INT)";
        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class ExportExcelBaoCao01QueryHandler : IRequestHandler<ExportExcelBaoCao01Querry, StreamDataFile>
{

    private readonly IDapperRepository _dapperRepository;
    private readonly IExportExcelService _exportExcelService;

    public ExportExcelBaoCao01QueryHandler(IDapperRepository dapperRepository, IExportExcelService exportExcelService)
    {
        _dapperRepository = dapperRepository;
        _exportExcelService = exportExcelService;
    }
    public async Task<StreamDataFile> Handle(ExportExcelBaoCao01Querry request, CancellationToken cancellationToken)
    {
        var where = ExportExcelBaoCao01WhereBuilder.Build(request);
        var sql = $@"SELECT [MaHoSo],
            CAST([TraLoi1] AS INT) AS ChiSo1,
            CAST([TraLoi2] AS INT) AS ChiSo2,
            CAST([TraLoi3] AS INT) AS ChiSo3,
            CAST([TraLoi4] AS INT) AS ChiSo4,
            CAST([TraLoi6] AS INT) AS ChiSo6,
            CAST([TraLoi7] AS INT) AS ChiSo7,
            CAST([TraLoi1] AS INT) + CAST([TraLoi2] AS INT) + CAST([TraLoi3] AS INT) + CAST([TraLoi4] AS INT)  + CAST([TraLoi7] AS INT) AS TongDiem,
            CASE
                WHEN CAST([TraLoi1] AS INT) + CAST([TraLoi2] AS INT) + CAST([TraLoi3] AS INT) + CAST([TraLoi4] AS INT) + CAST([TraLoi6] AS INT) + CAST([TraLoi7] AS INT) >= 5 THEN '100%'
                WHEN CAST([TraLoi1] AS INT) + CAST([TraLoi2] AS INT) + CAST([TraLoi3] AS INT) + CAST([TraLoi4] AS INT) + CAST([TraLoi6] AS INT) + CAST([TraLoi7] AS INT) >= 3.5 AND CAST([TraLoi1] AS INT) + CAST([TraLoi2] AS INT) + CAST([TraLoi3] AS INT) + CAST([TraLoi4] AS INT) + CAST([TraLoi6] AS INT) + CAST([TraLoi7] AS INT) < 5 THEN '70 - 100%'
                ELSE '< 3.5'
            END AS xepLoai,
            CASE
                WHEN CAST([TraLoi1] AS INT) + CAST([TraLoi2] AS INT) + CAST([TraLoi3] AS INT) + CAST([TraLoi4] AS INT) + CAST([TraLoi6] AS INT) + CAST([TraLoi7] AS INT) >= 5 THEN '0,0,1'
                WHEN CAST([TraLoi1] AS INT) + CAST([TraLoi2] AS INT) + CAST([TraLoi3] AS INT) + CAST([TraLoi4] AS INT) + CAST([TraLoi6] AS INT) + CAST([TraLoi7] AS INT) >= 3.5 AND CAST([TraLoi1] AS INT) + CAST([TraLoi2] AS INT) + CAST([TraLoi3] AS INT) + CAST([TraLoi4] AS INT) + CAST([TraLoi6] AS INT) + CAST([TraLoi7] AS INT) < 5 THEN '1,0,0'
                ELSE '0,1,0'
            END AS MucDoHL_MucDoKHL_MucDoRHL
            FROM [Business].[PhieuKhaoSats] {where}";
        var data = await _dapperRepository.QueryAsync<BaoCao01Dto>(sql, request);

        var excelData = await  _exportExcelService.ExportToExcelBaoCao01(data.ToList(), request.Quy, request.Nam,request.DonVi);

        return excelData;
    }
}
