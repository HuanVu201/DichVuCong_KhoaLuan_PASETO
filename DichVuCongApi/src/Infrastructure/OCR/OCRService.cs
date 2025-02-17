using Irony.Parsing;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.OCR;
using TD.DichVuCongApi.Application.Common.Persistence;

namespace TD.DichVuCongApi.Infrastructure.OCR;

public class OCRService : IOCRService
{
    private readonly IMinioService _minioService;
    private readonly IDapperRepository _dapperRepository;
    private readonly OCRSetting _oCRSetting;
    public OCRService(IMinioService minioService, IOptions<OCRSetting> options, IDapperRepository dapperRepository)
    {
        _minioService = minioService;
        _oCRSetting = options.Value;
        _dapperRepository = dapperRepository;
    }
    public async Task<string> GetMaNhanDienOCR(string maTruongHop)
    {
        string sql = @"SELECT MaNhanDienOCR
                       FROM Business.TruongHopThuTucs WHERE Ma = @maTruongHop";
        TruongHopThuTucOCR data = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTucOCR>(sql, new
        {
            maTruongHop
        });
        return data.MaNhanDienOCR;

    }

    public async Task<OCRResponse> GetData(OCRRequest request)
    {
        try
        {
            return await HandlerRequest(request);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.ToString());
        }
    }

    private async Task<OCRResponse> HandlerRequest(OCRRequest request)
    {
        using (HttpClient httpClient = new HttpClient())
        {
            var fileData = _minioService.ConvertStreamToBytes(request.file);
            //httpClient.BaseAddress = new Uri(_oCRSetting.ApiEndPoint);
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            if (!string.IsNullOrEmpty(_oCRSetting.BearerToken))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _oCRSetting.BearerToken);
            }
            var byteArrayContent = new ByteArrayContent(fileData);
            var requestContent = new MultipartFormDataContent();
            requestContent.Add(byteArrayContent, "file", "test.pdf");
            var res = await httpClient.PostAsync(_oCRSetting.ApiEndPoint + $"?textCode={request.textCode}", requestContent);


            var content = await res.Content.ReadAsStringAsync();
            var responseData = JsonConvert.DeserializeObject<OCRResponse>(content);
            return responseData;
        }
    }
    public async Task<OCRResponse> GetData(string maNhanDienOCR, string fileUrl)
    {
        try
        {
            var data = await _minioService.GetFileByKeyAsync(null, fileUrl);
            return await HandlerRequest(new OCRRequest() { file = data.StreamData, textCode = maNhanDienOCR }); ;

        } catch (Exception ex)
        {
            throw new Exception(ex.ToString());
        }
    }

    
}
