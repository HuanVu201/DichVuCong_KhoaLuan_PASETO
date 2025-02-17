using MediatR;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Tandan.OpenReport;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Common.ExportThongKe.Business;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Persistence;
using static TD.DichVuCongApi.Application.Business.HoSoApp.ExportThongKe.ExportThongKeSoTheoDoiHoSoRequestHandler;

namespace TD.DichVuCongApi.Infrastructure.ExportThongKe.Business;
public class ExportSoTheoDoiHoSoService : IExportSoTheoDoiHoSo
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IMinioService _minioService;
    private readonly string? FileUploadLocalPath;

    public ExportSoTheoDoiHoSoService(IDapperRepository dapperRepository, IMediator mediator, IMinioService minioService, IConfiguration configuration)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _minioService = minioService;
        FileUploadLocalPath = configuration.GetValue<string>("FileConfig:FileUploadLocalPath");

    }

    public async Task<string> ExportExcelSoTheoDoiHoSo(List<HoSoTiepNhanQuaHanDto> data, string urlPhoi, SoTheoDoiHoSoParameters? parameters)
    {
        var fileRes = await _minioService.GetFileByKey2Async(string.Empty, urlPhoi);
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
                    if (!string.IsNullOrEmpty(parameters.GroupName))
                        rp.SetTag("GroupName", parameters.GroupName.ToUpper());
                    if (!string.IsNullOrEmpty(parameters.TuNgay) || !string.IsNullOrEmpty(parameters.DenNgay))
                        rp.SetTag("ThoiGian", $"Từ ngày {parameters.TuNgay ?? "..."} đến ngày {parameters.DenNgay ?? "..."} ");
                    if (!string.IsNullOrEmpty(parameters.TrangThaiHoSo))
                        rp.SetTag("TrangThaiHoSo", $"Trạng thái hồ sơ: {parameters.TrangThaiHoSo}");

                    for (int i = 0; i < jArr.Count; i++)
                    {
                        var jObj = (JObject)jArr[i];
                        string tenDiaBan = string.Empty;
                        if (!string.IsNullOrEmpty(jObj["TenDiaBan"]?.ToString()))
                        {
                            try
                            {
                                ObjectThongTinDiaBan thongTinDiaBan = JsonConvert.DeserializeObject<ObjectThongTinDiaBan>(jObj["TenDiaBan"]?.ToString());
                                if (!string.IsNullOrEmpty(thongTinDiaBan.tenTinh)) tenDiaBan = thongTinDiaBan.tenTinh;
                                if (!string.IsNullOrEmpty(thongTinDiaBan.tenHuyen)) tenDiaBan = !string.IsNullOrEmpty(tenDiaBan) ? thongTinDiaBan.tenHuyen + " - " + tenDiaBan : thongTinDiaBan.tenHuyen;
                                if (!string.IsNullOrEmpty(thongTinDiaBan.tenXa)) tenDiaBan = !string.IsNullOrEmpty(tenDiaBan) ? thongTinDiaBan.tenXa + " - " + tenDiaBan : thongTinDiaBan.tenXa;
                            }
                            catch (Exception) { }
                        }
                        var obj = new ObjectSoTheoDoiHoSo
                        {
                            STT = i + 1,
                            MaHoSo = jObj["MaHoSo"]?.ToString(),
                            TrichYeuHoSo = jObj["TrichYeuHoSo"]?.ToString(),
                            SoBoHoSo = jObj["SoBoHoSo"]?.ToString(),
                            ChuHoSo = jObj["ChuHoSo"]?.ToString(),
                            DiaChiChuHoSo = jObj["DiaChiChuHoSo"]?.ToString(),
                            SoDienThoaiChuHoSo = jObj["SoDienThoaiChuHoSo"]?.ToString(),
                            NgayTiepNhan = !string.IsNullOrWhiteSpace(jObj["NgayTiepNhan"]?.ToString()) ?
                                            DateTime.Parse(jObj["NgayTiepNhan"].ToString()).ToString("dd/MM/yyyy HH:mm:ss") : null,

                            NgayHenTra = !string.IsNullOrWhiteSpace(jObj["NgayHenTra"]?.ToString()) ?
                                        DateTime.Parse(jObj["NgayHenTra"].ToString()).ToString("dd/MM/yyyy HH:mm:ss") : null,

                            NgayTra = !string.IsNullOrWhiteSpace(jObj["NgayTra"]?.ToString()) ?
                                        DateTime.Parse(jObj["NgayTra"].ToString()).ToString("dd/MM/yyyy HH:mm:ss") : null,
                            TenNguoiNhanHoSo = jObj["TenNguoiNhanHoSo"]?.ToString() ?? string.Empty,
                            TenDiaBan = tenDiaBan
                        };

                        rp.SetRepeat(obj);
                    }

                    string fileName = $"Sổ theo dõi hồ sơ_{DateTime.Now.ToString("yyyy_MM_dd_hh_mm")}.xlsx";
                    string pathSave = $"{localPathUpload}/ThongKeExcel/{fileName}";
                    rp.Save(pathSave);
                    return $"/Files/ThongKeExcel/{fileName}";
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Lỗi xuất file excel: " + ex.ToString());
                    throw new Exception("Lỗi xuất excel" + ex.Message);
                }
            }
        }

        return string.Empty;
    }

    public async Task<string> ExportWordSoTheoDoiHoSo(List<HoSoTiepNhanQuaHanDto> data, string urlPhoi, SoTheoDoiHoSoParameters? parameters)
    {
        var fileRes = await _minioService.GetFileByKey2Async(string.Empty, urlPhoi);
        if (fileRes == null || fileRes.ByteRes == null || fileRes.ByteRes.Length == 0)
        {
            throw new Exception("File not found or is empty.");
        }

        string localPathUpload = !string.IsNullOrEmpty(FileUploadLocalPath) ? FileUploadLocalPath : AppDomain.CurrentDomain.BaseDirectory + "Files";
        using (var stream = new MemoryStream(fileRes.ByteRes))
        {
            using (var rp = WordReport.Open(stream))
            {
                try
                {
                    string result = JsonConvert.SerializeObject(data);
                    var jArr = JArray.Parse(result);
                    if (!string.IsNullOrEmpty(parameters.GroupName))
                        rp.SetTag("GroupName", parameters.GroupName.ToUpper());
                    if (!string.IsNullOrEmpty(parameters.TuNgay) || !string.IsNullOrEmpty(parameters.DenNgay))
                        rp.SetTag("ThoiGian", $"Từ ngày {parameters.TuNgay ?? "..."} đến ngày {parameters.DenNgay ?? "..."} ");
                    if (!string.IsNullOrEmpty(parameters.TrangThaiHoSo))
                        rp.SetTag("TrangThaiHoSo", $"Trạng thái hồ sơ: {parameters.TrangThaiHoSo}");

                    for (int i = 0; i < jArr.Count; i++)
                    {
                        var jObj = (JObject)jArr[i];
                        string tenDiaBan = string.Empty;
                        if (!string.IsNullOrEmpty(jObj["TenDiaBan"]?.ToString()))
                        {
                            try
                            {
                                ObjectThongTinDiaBan thongTinDiaBan = JsonConvert.DeserializeObject<ObjectThongTinDiaBan>(jObj["TenDiaBan"]?.ToString());
                                if (!string.IsNullOrEmpty(thongTinDiaBan.tenTinh)) tenDiaBan = thongTinDiaBan.tenTinh;
                                if (!string.IsNullOrEmpty(thongTinDiaBan.tenHuyen)) tenDiaBan = !string.IsNullOrEmpty(tenDiaBan) ? thongTinDiaBan.tenHuyen + " - " + tenDiaBan : thongTinDiaBan.tenHuyen;
                                if (!string.IsNullOrEmpty(thongTinDiaBan.tenXa)) tenDiaBan = !string.IsNullOrEmpty(tenDiaBan) ? thongTinDiaBan.tenXa + " - " + tenDiaBan : thongTinDiaBan.tenXa;
                            }
                            catch (Exception) { }
                        }

                        var obj = new ObjectSoTheoDoiHoSo
                        {
                            STT = i + 1,
                            MaHoSo = jObj["MaHoSo"]?.ToString(),
                            TrichYeuHoSo = jObj["TrichYeuHoSo"]?.ToString(),
                            SoBoHoSo = jObj["SoBoHoSo"]?.ToString(),
                            ChuHoSo = jObj["ChuHoSo"]?.ToString(),
                            DiaChiChuHoSo = jObj["DiaChiChuHoSo"]?.ToString(),
                            SoDienThoaiChuHoSo = jObj["SoDienThoaiChuHoSo"]?.ToString(),
                            NgayTiepNhan = !string.IsNullOrWhiteSpace(jObj["NgayTiepNhan"]?.ToString()) ?
                                            DateTime.Parse(jObj["NgayTiepNhan"].ToString()).ToString("dd/MM/yyyy HH:mm:ss") : null,

                            NgayHenTra = !string.IsNullOrWhiteSpace(jObj["NgayHenTra"]?.ToString()) ?
                                            DateTime.Parse(jObj["NgayHenTra"].ToString()).ToString("dd/MM/yyyy HH:mm:ss") : null,

                            NgayTra = !string.IsNullOrWhiteSpace(jObj["NgayTra"]?.ToString()) ?
                                            DateTime.Parse(jObj["NgayTra"].ToString()).ToString("dd/MM/yyyy HH:mm:ss") : null,
                            TenNguoiNhanHoSo = jObj["TenNguoiNhanHoSo"]?.ToString() ?? string.Empty,
                            TenDiaBan = tenDiaBan
                        };

                        rp.SetRepeat(obj);
                    }

                    string fileName = $"Sổ theo dõi hồ sơ_{DateTime.Now.ToString("yyyy_MM_dd_hh_mm")}.docx";
                    string pathSave = $"{localPathUpload}/ThongKeWord/{fileName}";
                    rp.Save(pathSave);
                    return $"/Files/ThongKeWord/{fileName}";
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Lỗi xuất file word: " + ex.ToString());
                    throw new Exception("Lỗi xuất word" + ex.Message);
                }
            }
        }

        return string.Empty;
    }

    public class ObjectSoTheoDoiHoSo
    {
        public int? STT { get; set; }
        public string? MaHoSo { get; set; }
        public string? TrichYeuHoSo { get; set; }
        public string? SoBoHoSo { get; set; }
        public string? ChuHoSo { get; set; }
        public string? DiaChiChuHoSo { get; set; }
        public string? SoDienThoaiChuHoSo { get; set; }
        public string? NgayTiepNhan { get; set; }
        public string? NgayHenTra { get; set; }
        public string? NgayTra { get; set; }
        public string? TenNguoiNhanHoSo { get; set; }
        public string? TenDiaBan { get; set; }
    }
    public class ObjectThongTinDiaBan
    {
        public string? tenTinh { get; set; }
        public string? tenHuyen { get; set; }
        public string? tenXa { get; set; }
    }
}

