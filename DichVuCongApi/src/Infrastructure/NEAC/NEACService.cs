using TD.DichVuCongApi.Application.Common.NEAC;
using System.Net.Http.Headers;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using Newtonsoft.Json;
using System.Text;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Infrastructure.Persistence.Configuration;
using TD.DichVuCongApi.Domain.Constant;
using SchemaNames = TD.DichVuCongApi.Infrastructure.Persistence.Configuration.SchemaNames;
using Microsoft.Extensions.Logging;

namespace TD.DichVuCongApi.Infrastructure.NEAC;
public class NEACService : INEACService
{
    private readonly NEACSetting _setting;
    private readonly IRepository<KySoNEAC> _neacRepo;
    private readonly IMinioService _minioService;
    private readonly ICurrentUser _currentUser;
    private readonly IDapperRepository _dapperRepository;
    private readonly ILogger<NEACService> _logger;
    public NEACService(IOptions<NEACSetting> options, IMinioService minioService, IRepository<KySoNEAC> neacRepo, ICurrentUser currentUser, IDapperRepository dapperRepository,
        ILogger<NEACService> logger)
    {
        _setting = options.Value;
        _minioService = minioService;
        _neacRepo = neacRepo;
        _currentUser = currentUser;
        _dapperRepository = dapperRepository;
        _logger = logger;
    }
    private async Task<TRes> RequestHandler<TReq, TRes>(TReq req, string suffix, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(_setting.UrlBase))
        {
            return default(TRes);
        }
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            if (!string.IsNullOrEmpty(_setting.BearerToken))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _setting.BearerToken);
            }

            HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Post, _setting.UrlBase + "/" + suffix);
            var reqContent = JsonConvert.SerializeObject(req);
            httpRequest.Content = new StringContent(reqContent, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));

            var res = await httpClient.SendAsync(httpRequest, cancellationToken);
            var stringContent = await res.Content.ReadAsStringAsync();
            var jsonData = JsonConvert.DeserializeObject<TRes>(stringContent);
            return jsonData;
        }
    }
    public async Task<NEACGetCertificateResponse?> GetCertificate(NEACGetCertificateRequest req, CancellationToken cancellationToken)
    {
        return await RequestHandler<NEACGetCertificateRequest, NEACGetCertificateResponse>(req, "get_certificate", cancellationToken);
    }

    public async Task<Result<string>?> SignFile(NEACSignFileRequest req, CancellationToken cancellationToken)
    {
        var res = await RequestHandler<NEACSignFileRequest, NEACSignFileResponseWrapper>(req, "sign_file", cancellationToken);
        if(res.data.signFiles.Count == 0)
        {
            throw new Exception("Ký số thất bại");
        }
        var signFile = res.data.signFiles[0];
        var file = await _minioService.UploadFileAsBase64Async(signFile.file_base64, signFile.file_name, null, "KySoNeac");
        if (string.IsNullOrEmpty(file))
        {
            return Result<string>.Fail("Tải tệp mới thất bại");
        }
        if(!string.IsNullOrEmpty(req.user_id) && !string.IsNullOrEmpty(req.ca_name))
        {
            try
            {
                var fileKySoNeac = new KySoNEAC(req.user_id, req.ca_name, file);
                await _neacRepo.AddAsync(fileKySoNeac);
            } catch (Exception ex)
            {
                _logger.LogError($"NEACService_{req.user_id}_err:{JsonConvert.SerializeObject(ex)}");
            }
        }

        return Result<string>.Success(data: file);
    }

    
    public async Task<PaginationResponse<KySoNEAC>> GetDatas(NeacGetDataRequest request, CancellationToken cancellationToken)
    {
        List<string> where = new List<string>();
        where.Add("SoGiayTo = @SoGiayTo");
        if (!string.IsNullOrEmpty(request.NgayKyFrom))
        {
            where.Add($"{nameof(KySoNEAC.NgayKy)} >= @NgayKyFrom");
        }
        if (!string.IsNullOrEmpty(request.NgayKyTo))
        {
            where.Add($"{nameof(KySoNEAC.NgayKy)} <= @NgayKyTo");
        }
        if (!string.IsNullOrEmpty(request.CaName))
        {
            where.Add($"{nameof(KySoNEAC.CaName)} = @CaName");
        }
        string sql = $@"SELECT
                {nameof(KySoNEAC.Id)},
                {nameof(KySoNEAC.CaName)},
                {nameof(KySoNEAC.DuongDanFile)},
                {nameof(KySoNEAC.NgayKy)} FROM {SchemaNames.Catalog}.{TableNames.KySoNEACs}
                WHERE {string.Join(" AND ", where)}";
        var datas = await _dapperRepository.PaginatedListSingleQueryAsync<KySoNEAC>(sql, request.PageSize, nameof(KySoNEAC.NgayKy) + " DESC", cancellationToken, request.PageNumber, new
        {
            SoGiayTo = _currentUser.GetUserName()
        });
        return datas;
    }
}
