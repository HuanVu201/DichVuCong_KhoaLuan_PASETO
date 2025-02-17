using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using TD.DichVuCongApi.Application.Common.LTQVLB;

namespace TD.DichVuCongApi.Infrastructure.LTQLVB;



public class LTQLVBService : ILTQLVBService
{
    private readonly LTQLVBSettings _settings;
    public LTQLVBService(IOptions<LTQLVBSettings> options)
    {
        _settings = options.Value;
    }

    public async Task<LTQLVBResponse<string>> PostData(string data)
    {
        using(HttpClient httpClient = new HttpClient())
        {
            //httpClient.BaseAddress = new Uri(_settings.urlLienThongQLVB);
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(_settings.authorizationSchema, _settings.tokenLienThongQLVB);
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, _settings.urlLienThongQLVB + "/GuiHoSo");
            httpRequestMessage.Content = new StringContent(data, Encoding.UTF8, "application/json");

            var httpResponse = await httpClient.SendAsync(httpRequestMessage);
            string response = await httpResponse.Content.ReadAsStringAsync();
            var responseData = JsonConvert.DeserializeObject<LTQLVBResponse<string>>(response);
            return responseData;
        }
    }
}
