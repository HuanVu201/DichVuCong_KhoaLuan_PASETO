using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Text;
using TD.DichVuCongApi.Application.Business.ILISApp;
using TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.ReceiverFromVBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Infrastructure.Minio;



namespace TD.DichVuCongApi.Infrastructure.ILIS;
public class ILISServices : IILisServices
{
    private readonly ILISSettings _settings;
    private ILogger<ILISSettings> _logger;
    private readonly IMinioService _minioService;
    private readonly MinioSettings _minioSettings;
    public ILISServices(IOptions<ILISSettings> settings, ILogger<ILISSettings> logger, IMinioService minioService, IOptions<MinioSettings> minioSettings)
    {
        _settings = settings.Value;
        _logger = logger;
        _minioService = minioService;
        _minioSettings = minioSettings.Value;
    }

    public ILISSettings Get()
    {
        return _settings;
    }
    private async Task<string> GetToken()
    {
        try
        {
            using (HttpClient client = new HttpClient())
            {
                var postData = new Dictionary<string, string>
            {
                { "grant_type", "password" },
                { "username", _settings.UserName },
                { "password", _settings.Password },
                { "client_id", _settings.ClientId },
                { "client_secret", _settings.ClientSecret }
            };

                var content = new FormUrlEncodedContent(postData);
                HttpResponseMessage response = await client.PostAsync(_settings.GetTokenUrl, content);

                if (response.IsSuccessStatusCode)
                {
                    string responseText = await response.Content.ReadAsStringAsync();
                    AccessTokenILIS json = JsonConvert.DeserializeObject<AccessTokenILIS>(responseText);
                    return json?.access_token ?? string.Empty;
                }

                return string.Empty;
            }
        }
        catch (Exception ex)
        {
            _logger.LogInformation("GetTokenILIS: " + ex.Message);
            throw ex;
        }
    }

    public async Task<GuiVBDLISBaseResponse> TiepNhanHoSo(VBDLISTiepNhanHoSoRequest req)
    {
        using (var httpClient = new HttpClient())
        {
            try
            {
                string url = _settings.BaseUrl + "TiepNhanHoSo";

                // Tạo nội dung yêu cầu với "Content-Type" là "application/json"
                string strContent = JsonConvert.SerializeObject(req);

                HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);

                request.Content = content; // Đặt nội dung vào yêu cầu
                string accessToken = await GetToken();
                if (!string.IsNullOrEmpty(accessToken))
                {
                    request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
                }

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<GuiVBDLISBaseResponse>(data);

                return jsonData;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("TiepNhanHoSoILIS: " + ex.Message);

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
                string url = _settings.BaseUrl + "BoSungHoSo";

                // Tạo nội dung yêu cầu với "Content-Type" là "application/json"
                string strContent = JsonConvert.SerializeObject(req);

                HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);

                request.Content = content; // Đặt nội dung vào yêu cầu
                string accessToken = await GetToken();
                if (!string.IsNullOrEmpty(accessToken))
                {
                    request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
                }

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<GuiVBDLISBaseResponse>(data);

                return jsonData;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("CapNhatTrangThaiBoSungHoSoILIS: " + ex.Message);

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
                string url = _settings.BaseUrl + "CapNhatTrangThaiHoSo";

                // Tạo nội dung yêu cầu với "Content-Type" là "application/json"
                string strContent = JsonConvert.SerializeObject(req);

                HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);

                request.Content = content; // Đặt nội dung vào yêu cầu

                string accessToken = await GetToken();
                if (!string.IsNullOrEmpty(accessToken))
                {
                    request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
                }

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<GuiVBDLISBaseResponse>(data);

                return jsonData;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("ILISCapNhatKetQuaTraHoSo: " + ex.Message);

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
                string accessToken = await GetToken();
                if (!string.IsNullOrEmpty(accessToken))
                {
                    request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
                }

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<GuiVBDLISBaseResponse>(data);

                return jsonData;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("ILISPhanHoiHoSoSaiKetQua: " + ex.Message);

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
            string accessToken = await GetToken();
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
            foreach (var dinhKem in req)
            {
                try
                {
                    string url = dinhKem.LinkFile;
                    string fileName = $"DinhKem_{currentTime.ToString("yyyyMMddhhmmss")}" + dinhKem.KieuFile;
                    byte[] fileBytes = await httpClient.GetByteArrayAsync(url);
                    string base64String = Convert.ToBase64String(fileBytes);
                    IFormFile formFile = _minioService.ConvertBase64ToIFormFile(base64String, fileName);
                    string res = await _minioService.UploadFileAsync(formFile, _minioSettings.BucketName, folderName ?? string.Empty);
                    result.Add(res);
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("ILISDownloadFile: " + ex.Message);
                }
            }
        }

        return result;

    }
}
