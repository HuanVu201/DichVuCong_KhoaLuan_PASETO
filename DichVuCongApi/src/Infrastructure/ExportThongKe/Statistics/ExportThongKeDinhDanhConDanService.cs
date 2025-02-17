using Azure;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SkiaSharp;
using Syncfusion.XlsIO;
using System.Globalization;
using System.IO;
using System.Text.Json;
using Tandan.OpenReport;
using TD.DichVuCongApi.Application.Common.ExportThongKe.Statistics;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Infrastructure.ExportThongKe.Statistics;
public class ExportThongKeDinhDanhConDanService : IExportThongKeDinhDanhCongDan
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IMinioService _minioService;
    private readonly string? FileUploadLocalPath;

    public ExportThongKeDinhDanhConDanService(IDapperRepository dapperRepository, IMediator mediator, IMinioService minioService, IConfiguration configuration)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _minioService = minioService;
        FileUploadLocalPath = configuration.GetValue<string>("FileConfig:FileUploadLocalPath");

    }

    public async Task<string> ExportExcelThongKeDinhDanhCongDan(List<UserAppDto> data, string urlPhoi, string? parameters)
    {
        var fileRes = await _minioService.GetFileByKey2Async("", urlPhoi);
        if (fileRes == null || fileRes.ByteRes == null || fileRes.ByteRes.Length == 0)
        {
            throw new Exception("File not found or is empty.");
        }

        string localPathUpload = !string.IsNullOrEmpty(FileUploadLocalPath) ? FileUploadLocalPath : AppDomain.CurrentDomain.BaseDirectory + "Files";
        using (var stream = new MemoryStream(fileRes.ByteRes))
        {
            using (var rp = ExcelReport.Open(stream))
            {
                try
                {
                    string result = JsonConvert.SerializeObject(data);
                    var jArr = JArray.Parse(result);

                    rp.SetTag("Parameters", parameters);

                    for (int i = 0; i < jArr.Count; i++)
                    {
                        var jObj = (JObject)jArr[i];

                        string formattedDate = string.Empty;
                        string formattedGioiTinh = string.Empty;
                        if (!string.IsNullOrEmpty(jObj["NgayThangNamSinh"]?.ToString()))
                        {
                            var dateInfo = JsonConvert.DeserializeObject<DateInfo>(jObj["NgayThangNamSinh"]?.ToString());
                            if (DateTime.TryParseExact(dateInfo.NgayThangNam, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var date))
                            {
                                formattedDate = date.ToString("dd/MM/yyyy");
                            }
                        }

                        if (!string.IsNullOrEmpty(jObj["GioiTinh"]?.ToString()))
                        {
                            string value = jObj["GioiTinh"]?.ToString();
                            if (value == "1")
                            {
                                formattedGioiTinh = "Nam";
                            }
                            else if (value == "0")
                            {
                                formattedGioiTinh = "Nữ";
                            }
                        }

                        var obj = new ObjectThongKeDinhDanhCongDan
                        {
                            STT = i + 1,
                            FullName = jObj["FullName"]?.ToString(),
                            UserName = jObj["UserName"]?.ToString(),
                            SoDinhDanh = jObj["SoDinhDanh"]?.ToString(),
                            PhoneNumber = jObj["PhoneNumber"]?.ToString(),
                            Email = jObj["Email"]?.ToString(),
                            NgaySinh = formattedDate,
                            GioiTinh = formattedGioiTinh
                        };

                        rp.SetRepeat(obj);
                    }

                    string fileName = $"Thống kê định danh công dân_{DateTime.Now.ToString("yyyy_MM_dd_hh_mm_ss")}.xlsx";
                    string pathSave = $"{localPathUpload}/ThongKeExcel/{fileName}";
                    rp.Save(pathSave);
                    string returnPath = $"/Files/ThongKeExcel/{fileName}";
                    return returnPath;
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Lỗi xuất file excel: " + ex.ToString());
                }
            }
        }

        return string.Empty;
    }

    public class ObjectThongKeDinhDanhCongDan
    {
        public int? STT { get; set; }
        public string? FullName { get; set; }
        public string? UserName { get; set; }
        public string? SoDinhDanh { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? NgaySinh { get; set; }
        public string? GioiTinh { get; set; }
    }
    public class DateInfo
    {
        public string? Nam { get; set; }
        public string? NgayThangNam { get; set; }
    }

}
