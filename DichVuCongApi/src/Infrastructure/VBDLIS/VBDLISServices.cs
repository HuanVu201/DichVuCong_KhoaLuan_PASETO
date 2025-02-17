using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Text;
using TD.DichVuCongApi.Application.Business.VBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.ReceiverFromVBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Infrastructure.Minio;



namespace TD.DichVuCongApi.Infrastructure.VBDLIS;
public class VBDLISServices : IVBDLISServices
{
    private readonly VBDLISSettings _settings;
    private ILogger<VBDLISSettings> _logger;
    private readonly IMinioService _minioService;
    private readonly MinioSettings _minioSettings;
    public VBDLISServices(IOptions<VBDLISSettings> settings, ILogger<VBDLISSettings> logger, IMinioService minioService, IOptions<MinioSettings> minioSettings)
    {
        _settings = settings.Value;
        _logger = logger;
        _minioService = minioService;
        _minioSettings = minioSettings.Value;
    }

    public VBDLISSettings Get()
    {
        return _settings;
    }

    public async Task<GuiVBDLISBaseResponse> TiepNhanHoSo(VBDLISTiepNhanHoSoRequest req)
    {
        using (var httpClient = new HttpClient())
        {
            try
            {
                string url = _settings.BaseUrl + "tiepnhan";

                // Tạo nội dung yêu cầu với "Content-Type" là "application/json"
                string strContent = JsonConvert.SerializeObject(req);

                HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);

                request.Content = content; // Đặt nội dung vào yêu cầu

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<GuiVBDLISBaseResponse>(data);

                return jsonData;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("TiepNhanHoSoVBDLIS: " + ex.Message);

                throw new Exception(ex.Message);
            }
        }
    }

    public async Task<GuiVBDLISBaseResponse> CapNhatTrangThaiBoSungHoSo(VBDLISCapNhatTrangThaiBoSungHoSoRequest req)
    {
        using (var httpClient = new HttpClient())
        {
            try
            {
                string url = _settings.BaseUrl + "capnhattrangthaibosunghoso";

                // Tạo nội dung yêu cầu với "Content-Type" là "application/json"
                string strContent = JsonConvert.SerializeObject(req);

                HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);

                request.Content = content; // Đặt nội dung vào yêu cầu

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<GuiVBDLISBaseResponse>(data);

                return jsonData;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("CapNhatTrangThaiBoSungHoSoVBDLIS: " + ex.Message);

                throw new Exception(ex.Message);
            }
        }
    }

    public async Task<GuiVBDLISBaseResponse> CapNhatKetQuaTraHoSo(VBDLISCapNhatKetQuaTraHoSoRequest req)
    {
        using (var httpClient = new HttpClient())
        {
            try
            {
                string url = _settings.BaseUrl + "capnhattrangthaitraketquahoso";

                // Tạo nội dung yêu cầu với "Content-Type" là "application/json"
                string strContent = JsonConvert.SerializeObject(req);

                HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);

                request.Content = content; // Đặt nội dung vào yêu cầu

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<GuiVBDLISBaseResponse>(data);

                return jsonData;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("VBDLISCapNhatKetQuaTraHoSo: " + ex.Message);

                throw new Exception(ex.Message);
            }
        }
    }

    public async Task<GuiVBDLISBaseResponse> PhanHoiHoSoSaiKetQua(VBDLISPhanHoiHoSoSaiKetQuaRequest req)
    {
        using (var httpClient = new HttpClient())
        {
            try
            {
                string url = _settings.BaseUrl + "phanhoihososaiketqua";

                // Tạo nội dung yêu cầu với "Content-Type" là "application/json"
                string strContent = JsonConvert.SerializeObject(req);

                HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);

                request.Content = content; // Đặt nội dung vào yêu cầu

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<GuiVBDLISBaseResponse>(data);

                return jsonData;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("VBDLISPhanHoiHoSoSaiKetQua: " + ex.Message);

                throw new Exception(ex.Message);
            }
        }
    }

    public async Task<List<string>> DownloadFile(List<VBDLISThongTinTapTinDinhKem> req, string folderName)
    {
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        List<string> result = new List<string>();
        using (var httpClient = new HttpClient())
        {
            foreach (var dinhKem in req)
            {
                string url = _settings.DownloadFileUrl + dinhKem.LinkFile;
                string fileName = $"DinhKem_{currentTime.ToString("yyyyMMddhhmmss")}" + dinhKem.KieuFile;
                byte[] fileBytes = await httpClient.GetByteArrayAsync(url);
                string base64String = Convert.ToBase64String(fileBytes);
                IFormFile formFile = _minioService.ConvertBase64ToIFormFile(base64String, fileName);
                string res = await _minioService.UploadFileAsync(formFile, _minioSettings.BucketName, folderName ?? string.Empty);
                result.Add(res);
            }
        }

        return result;
    }
}
