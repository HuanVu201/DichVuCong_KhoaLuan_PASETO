using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.ExportExcel;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan.Command;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Application.Portal.ThongKeKhoTaiLieuApp.Commands;

public class ValueClass
{
    public string Where { get; set; }
    public string Parameter { get; set; }
}
public class ExportExcelThongKeSuDungKhoTaiLieuCommandWhereBuilder
{
    public static ValueClass Build(ExportExcelThongKeSuDungKhoTaiLieuCommand req)
    {
        string where = string.Empty;
        string parameters = string.Empty;
        ValueClass data = new ValueClass();

        where += " AND TypeUser = 'CongDan'";

        if (!string.IsNullOrEmpty(req.DoiTuong))
        {
            if (req.DoiTuong.ToLower().Contains("congdan"))
            {
                where += " AND NgayThangNamSinh is not null";
                parameters += "Đối tượng: Công dân\n";
            }
            else
            {
                where += " AND NgayThangNamSinh is null";
                parameters += "Đối tượng: Tổ chức/Doanh nghiệp\n";
            }
        }
        if (req.TuNgay.HasValue)
        {
            where += " AND kho.CreatedOn >= @TuNgay";
            parameters += $"Từ ngày: {DateTime.ParseExact(req.TuNgay.ToString(), "yyyy-MM-dd", null).ToString("dd/MM/yyyy")}\n";
        }
        if (req.DenNgay.HasValue)
        {
            where += " AND kho.CreatedOn <= @DenNgay";
            parameters += $"Đến ngày: {DateTime.ParseExact(req.DenNgay.ToString(), "yyyy-MM-dd", null).ToString("dd/MM/yyyy")}\n";
        }




        data.Parameter = parameters;
        return data;
    }
}

public class ExportExcelThongKeSuDungKhoTaiLieuCommandHandler : IRequestHandler<ExportExcelThongKeSuDungKhoTaiLieuCommand, StreamDataFile>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IExportExcelThongKeKhoTaiLieuService _exportExcelService;

    public ExportExcelThongKeSuDungKhoTaiLieuCommandHandler(IDapperRepository dapperRepository, IMediator mediator, IExportExcelThongKeKhoTaiLieuService exportExcelService)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _exportExcelService = exportExcelService;
    }
    public async Task<StreamDataFile> Handle(ExportExcelThongKeSuDungKhoTaiLieuCommand request, CancellationToken cancellationToken)
    {
        var where = ExportExcelThongKeSuDungKhoTaiLieuCommandWhereBuilder.Build(request).Where;
        var parameters = ExportExcelThongKeSuDungKhoTaiLieuCommandWhereBuilder.Build(request).Parameter;
        var sql = $@"SELECT u.Id, u.SoDinhDanh, u.UserName, u.FullName, u.PhoneNumber,
                        COUNT(DISTINCT kho.Id) AS SoLuongKho,
                        SUM(DISTINCT kho.dungLuong) AS TongDungLuong,
                        COUNT(gt.Id) AS SoLuongGiayTo
                    FROM [Identity].[Users] u
                    INNER JOIN [Business].[KhoTaiLieuDienTus] kho ON u.SoDinhDanh = kho.SoDinhDanh
                    LEFT JOIN [Business].[GiayToSoHoas] gt ON kho.Id = gt.KhoTaiLieuDienTuId
                    WHERE u.TypeUser = 'CongDan' AND u.SoDinhDanh IS NOT NULL AND kho.DeletedOn IS NULL {where}
                    GROUP BY u.Id, u.SoDinhDanh, u.UserName, u.FullName, u.PhoneNumber";

        var data = await _dapperRepository.QueryAsync<ThongKeKhoTaiLieuDto>(sql, request);
        var excelData = await _exportExcelService.ThongKeSuDungKhoTaiLieu(data.ToList(), parameters);

        //var data = await _dapperRepository.PaginatedListSingleQueryAsync<UserAppDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        //var excelData = await _exportExcelService.ThongKeDinhDanhCongDan(data.Data, parameters);

        return excelData;
    }
}