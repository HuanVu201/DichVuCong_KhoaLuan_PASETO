using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Common.ExportThongKe.Business;
using TD.DichVuCongApi.Application.Common.Minio;
using static TD.DichVuCongApi.Application.Business.HoSoApp.ExportThongKe.ExportThongKeSoTheoDoiHoSoRequestHandler;
namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries.ThuTucNhieuDonViSuDung;
public class ThuTucNhieuDonViSuDungHandler : IRequestHandler<XuatThuTucNhieuDonViSuDungRequest, string>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IMinioService _minioService;
    private readonly string? _fileUploadLocalPath;
    private readonly IExportThuTucNhieuDonViSuDung _exportThongKeService;
    public ThuTucNhieuDonViSuDungHandler(IDapperRepository dapper, IMediator mediator, IMinioService minioService, IExportThuTucNhieuDonViSuDung exportThuTucNhieuDonViSuDung)
    {
        _dapperRepository = dapper;
        _mediator = mediator;
        _minioService = minioService;
        _exportThongKeService = exportThuTucNhieuDonViSuDung;

    }

    public async Task<string> Handle(XuatThuTucNhieuDonViSuDungRequest request, CancellationToken cancellationToken)
    {
        try
        {
            SoTheoDoiHoSoParameters parameters = new SoTheoDoiHoSoParameters();
            string sql = "SELECT distinct TenTTHC, Case WHEN tt.MucDo = '2' THEN 'X' ELSE '' END DVC, Case WHEN tt.MucDo = '3' THEN 'X' ELSE '' END DVCMotPhan , Case WHEN tt.MucDo = '4' THEN 'X' ELSE '' END DVCToanTrinh  FROM Catalog.DonViThuTucs dvtt \r\nINNER JOIN Catalog.ThuTucs tt \r\nON dvtt.MaTTHC = tt.MaTTHC\r\nWHERE dvtt.DeletedOn IS NULL AND tt.DeletedOn IS NULL AND tt.SuDung = 1\r\ngroup by TenTTHC, tt.MucDo\r\nhaving count(dvtt.MaTTHC) >1\r\n";

            var res = await _dapperRepository.QueryAsync<ThuTucNhieuDonViSuDungDto>(sql, cancellationToken);
            if (res == null) throw new NotFoundException("Không có dữ liệu thủ tục");
            string urlPhoi = await _mediator.Send(new GetUrlMauPhoiQuery()
            {
                LoaiPhoi = $"mau-phoi-{request.TypeExport}",
                Code = $"{request.TypeExport}-thu-tuc-nhieu-don-vi-su-dung",
            });
            string pathReturn = await _exportThongKeService.ExportExcelThuTucNhieuDonViSuDung(res.ToList(), urlPhoi, null);
            return pathReturn ?? string.Empty;

        }
        catch (Exception ex)
        {
            throw ex;

        }

    }
}
