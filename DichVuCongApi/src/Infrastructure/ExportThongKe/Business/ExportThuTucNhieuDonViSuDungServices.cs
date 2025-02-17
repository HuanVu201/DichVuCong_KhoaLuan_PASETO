using MediatR;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Tandan.OpenReport;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries.ThuTucNhieuDonViSuDung;
using TD.DichVuCongApi.Application.Common.ExportThongKe.Business;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Persistence;

namespace TD.DichVuCongApi.Infrastructure.ExportThongKe.Business;

public class ExportThuTucNhieuDonViXuDungServices : IExportThuTucNhieuDonViSuDung
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IMinioService _minioService;
    private readonly string? _fileUploadLocalPath;

    public ExportThuTucNhieuDonViXuDungServices(IDapperRepository dapperRepository, IMediator mediator, IMinioService minioService, IConfiguration configuration)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _minioService = minioService;
        _fileUploadLocalPath = configuration.GetValue<string>("FileConfig:_fileUploadLocalPath");

    }

    public async Task<string> ExportExcelThuTucNhieuDonViSuDung(List<ThuTucNhieuDonViSuDungDto> data, string urlPhoi, ThuTucNhieuDonViSuDungParams? parameters)
    {
        var fileRes = await _minioService.GetFileByKey2Async(string.Empty, urlPhoi);
        if (fileRes == null || fileRes.ByteRes == null || fileRes.ByteRes.Length == 0)
        {
            throw new Exception("File not found or is empty.");
        }

        string localPathUpload = !string.IsNullOrEmpty(_fileUploadLocalPath) ? _fileUploadLocalPath : AppDomain.CurrentDomain.BaseDirectory + "Files";
        using (var stream = new MemoryStream(fileRes.ByteRes))
        {
            using (var rp = ExcelReport.Open(stream))
            {
                try
                {
                    int totalDVC = 0;
                    int totalDVCToanTrinh = 0;
                    int totalDVCMotPhan = 0;
                    string result = JsonConvert.SerializeObject(data);
                    var jArr = JArray.Parse(result);
                    //if (parameters != null && !string.IsNullOrEmpty(parameters.GroupName))
                    //    rp.SetTag("GroupName", parameters.GroupName.ToUpper());
                    //if (parameters != null && (!string.IsNullOrEmpty(parameters.TuNgay) || !string.IsNullOrEmpty(parameters.DenNgay)))
                    //    rp.SetTag("ThoiGian", $"Từ ngày {parameters.TuNgay ?? "..."} đến ngày {parameters.DenNgay ?? "..."} ");
                    //if (parameters != null && !string.IsNullOrEmpty(parameters.TrangThaiHoSo))
                    //    rp.SetTag("TrangThaiHoSo", $"Trạng thái hồ sơ: {parameters.TrangThaiHoSo}");
                    for (int i = 0; i < jArr.Count; i++)
                    {
                        var jObj = (JObject)jArr[i];
                        var obj = new ObjectThuTucNhieuDonViSuDung
                        {
                            STT = i + 1,
                            TenTTHC = jObj["TenTTHC"]?.ToString(),
                            DVC = jObj["DVC"]?.ToString(),
                            DVCToanTrinh = jObj["DVCToanTrinh"]?.ToString(),
                            DVCMotPhan = jObj["DVCMotPhan"]?.ToString(),
                        };
                        if (obj.DVC == "X") totalDVC += 1;
                        if (obj.DVCMotPhan == "X") totalDVCMotPhan += 1;
                        if (obj.DVCToanTrinh == "X") totalDVCToanTrinh += 1;
                        rp.AddRepeatItem(obj);
                    }
                    rp.SetTag("TotalDVC", totalDVC);
                    rp.SetTag("TotalDVCToanTrinh", totalDVCToanTrinh);
                    rp.SetTag("TotalDVCMotPhan", totalDVCMotPhan);
                    string fileName = $"Thủ tục nhiều đơn vị sử dụng_{DateTime.Now.ToString("yyyy_MM_dd_hh_mm")}.xlsx";
                    string pathSave = $"{localPathUpload}/ThongKeExcel/{fileName}";
                    rp.Save(pathSave);
                    return $"/Files/ThongKeExcel/{fileName}";
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Lỗi xuất file excel: " + ex.ToString());
                    throw ex;
                }
            }
        }
    }

    public class ObjectThuTucNhieuDonViSuDung
    {
        public int? STT { get; set; }
        public string? TenTTHC { get; set; }
        public string? DVC { get; set; }
        public string? DVCToanTrinh { get; set; }
        public string? DVCMotPhan { get; set; }

    }
}