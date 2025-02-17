using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using TD.DichVuCongApi.Application.Common.BienLaiViettel;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Infrastructure.Common.Extensions;


namespace TD.DichVuCongApi.Infrastructure.BienLaiViettel;
public class BienLaiViettelServices : IBienLaiViettelServices
{
    private IMediator _mediator;
    private CurrencyExtension _currencyExtension;
    private ViettelInvoiceSettings _settings;
    private ILogger<ViettelInvoiceSettings> _logger;
    public BienLaiViettelServices(IMediator mediator, IOptions<ViettelInvoiceSettings> settings, ILogger<ViettelInvoiceSettings> logger)
    {
        _mediator = mediator;
        _currencyExtension = new CurrencyExtension();
        _settings = settings.Value;
        _logger = logger;
    }

    public ViettelInvoiceSettings Get()
    {
        return _settings;
    }

    public async Task<GetTokenViettelInvoiceResponse> GetToken(CauHinhBienLaiViettel req)
    {
        using (var httpClient = new HttpClient())
        {
            try
            {
                // Tạo nội dung yêu cầu với "Content-Type" là "application/json"
                string strContent = JsonConvert.SerializeObject(req);

                HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, _settings.AuthApi);

                request.Content = content; // Đặt nội dung vào yêu cầu

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<GetTokenViettelInvoiceResponse>(data);

                return jsonData;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("GetTokenViettelInvoice: " + ex.Message);

                throw new Exception(ex.Message);
            }
        }
    }

    public async Task<Reservation> getReservationCode(string maSoThue, string token)
    {
        string url = _settings.GetReservationCodeApi + maSoThue;
        using (var httpClient = new HttpClient())
        {
            string strContent = "{\"requestCode\":\"10\"}";
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);

            request.Content = content; // Đặt nội dung vào yêu cầu

            // Sử dụng HttpClient để gửi yêu cầu
            HttpResponseMessage response = await httpClient.SendAsync(request);
            string data = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<Reservation>(data);
            return result;
        }

        return null;
    }

    public async Task<KetQuaPhatHanhBienLai> PhatHanhBienLai(XuatBienLaiViettelRequest req, string cauHinhBienLaiDienTu, string maSoThue)
    {
        try
        {

            ServicePointManager.SecurityProtocol = (SecurityProtocolType)768 | (SecurityProtocolType)3072;
            if (string.IsNullOrEmpty(cauHinhBienLaiDienTu)) throw new NotFoundException("Không có thông tin cấu hình biên lai điện tử");
            var cauHinhBienLai = JsonConvert.DeserializeObject<CauHinhBienLaiViettel>(cauHinhBienLaiDienTu);
            string url = _settings.InitApi + "InvoiceAPI/InvoiceWS/createInvoice/" + maSoThue;
            var token = await GetToken(cauHinhBienLai);
            if (token == null) throw new Exception("Không có token biên lai");
            var reservationCode = await getReservationCode(maSoThue, token.access_token);
            if (reservationCode.result == null) throw new Exception("Không có thông tin reservationcode");
            if (reservationCode.result.Count == 0) throw new Exception("Không có thông tin reservationcode.");
            req.generalInvoiceInfo.reservationCode = reservationCode.result[0];
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);
                string strContent = JsonConvert.SerializeObject(req);
                HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);

                request.Content = content; // Đặt nội dung vào yêu cầu

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<KetQuaPhatHanhBienLai>(data);
                return result;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }

    public async Task<GetBienLaiViettelResponse> GetBienLai(GetBienLaiViettelRequest req, string cauHinhBienLaiDienTu)
    {
        ServicePointManager.SecurityProtocol = (SecurityProtocolType)768 | (SecurityProtocolType)3072;
        if (string.IsNullOrEmpty(cauHinhBienLaiDienTu)) throw new NotFoundException("Không có thông tin cấu hình biên lai điện tử");
        string url = _settings.GetInvoiceApi;
        var cauHinhBienLai = JsonConvert.DeserializeObject<CauHinhBienLaiViettel>(cauHinhBienLaiDienTu);
        var token = await GetToken(cauHinhBienLai);
        if (token == null) throw new Exception("Không có token biên lai");
        using (var httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);
            string strContent = JsonConvert.SerializeObject(req);
            HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);

            request.Content = content; // Đặt nội dung vào yêu cầu

            // Sử dụng HttpClient để gửi yêu cầu
            HttpResponseMessage response = await httpClient.SendAsync(request);
            string data = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<GetBienLaiViettelResponse>(data);
            return result;
        }

    }
    public async Task<CancelBienLaiVietelResponse> CancelBienLaiVietel(CancelBienLaiViettelRequest req, string cauHinhBienLaiDienTu)
    {
        ServicePointManager.SecurityProtocol = (SecurityProtocolType)768 | (SecurityProtocolType)3072;
        if (string.IsNullOrEmpty(cauHinhBienLaiDienTu)) throw new NotFoundException("Không có thông tin cấu hình biên lai điện tử");
        string url = _settings.InitApi + "InvoiceAPI/InvoiceWS/cancelTransactionInvoice";
        var cauHinhBienLai = JsonConvert.DeserializeObject<CauHinhBienLaiViettel>(cauHinhBienLaiDienTu);
        var token = await GetToken(cauHinhBienLai);
        if (token == null) throw new Exception("Không có token biên lai");
        using (var httpClient = new HttpClient())
        {
            var parameters = new Dictionary<string, string>
            {
                { "invoiceNo",req.invoiceNo  },
                { "additionalReferenceDate", req.additionalReferenceDate },
                { "additionalReferenceDesc", req.additionalReferenceDesc },
                { "strIssueDate", req.strIssueDate },
                { "supplierTaxCode", req.supplierTaxCode }
            };
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);
            var content = new FormUrlEncodedContent(parameters);

            var response = await httpClient.PostAsync(url, content);

            // Sử dụng HttpClient để gửi yêu cầu
            string responseData = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<CancelBienLaiVietelResponse>(responseData);

            return result;

        }
    }
}
