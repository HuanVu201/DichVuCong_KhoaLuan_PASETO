using Amazon.Runtime.Internal.Util;
using Azure.Core;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.VnPost;


namespace TD.DichVuCongApi.Infrastructure.VnPost;
public class VNPostServices : IVNPostServices
{
    private readonly VNPostSettings _settings;
    private ILogger<YeuCauBuuDienLayKetQua> _logger;
    public VNPostServices(IOptions<VNPostSettings> settings, ILogger<YeuCauBuuDienLayKetQua> logger)
    {
        _settings = settings.Value;
        _logger = logger;
    }

    public VNPostSettings Get() { return _settings; }
    public async Task<RespondLGSP> Create(OrderLGSPWithItemCode orderLGSPWithItemCode)
    {
        using (var httpClient = new HttpClient())
        {
            try
            {
                // Tạo nội dung yêu cầu với "Content-Type" là "application/json"
                string strContent = JsonConvert.SerializeObject(orderLGSPWithItemCode);
                HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, _settings.urlVNPostAPI);
                if (!string.IsNullOrEmpty(_settings.access_Token)) {
                    request.Headers.Add("access_token", _settings.access_Token);
                }

                request.Content = content; // Đặt nội dung vào yêu cầu
                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<RespondLGSP>(data);
                if(jsonData.Status != "100")
                {
                    _logger.LogInformation("REQUEST_BCCI: " + strContent);
                    _logger.LogInformation("RESULT_BCCI: " + data);
                }
                return jsonData;
            }
            catch (Exception ex)
            {
                RespondLGSP res = new RespondLGSP();
                res.Status = "500";
                res.Message = JsonConvert.SerializeObject(ex);
                return res;
            }
        }
    }

    public async Task<RespondLGSP> CreateWithoutItemCode(OrderLGSPWithItemCode orderLGSPWithItemCode)
    {
        using (var httpClient = new HttpClient())
        {
            try
            {
                // Tạo nội dung yêu cầu với "Content-Type" là "application/json"
                string strContent = JsonConvert.SerializeObject(orderLGSPWithItemCode);
                HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, _settings.urlVNPostAPIWithoutItemCode);
                if (!string.IsNullOrEmpty(_settings.access_Token))
                {
                    request.Headers.Add("access_token", _settings.access_Token);
                }

                request.Content = content; // Đặt nội dung vào yêu cầu

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<RespondLGSP>(data);
                if (jsonData.Status != "100")
                {
                    _logger.LogInformation("REQUEST_BCCI: " + strContent);
                    _logger.LogInformation("RESULT_BCCI: " + data);
                }

                return jsonData;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
