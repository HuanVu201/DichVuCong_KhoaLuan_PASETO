using Newtonsoft.Json;
using System.Text;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.ServiceLogger;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Infrastructure.SMS;
public class SMSBrandnameService : ISMSBrandnameService
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IServiceLogger _serviceLogger;
    private readonly ICacheService _cacheService;
    public SMSBrandnameService(IServiceLogger serviceLogger, IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
        _serviceLogger = serviceLogger;
    }

    private async Task<TRes?> GetConfig<TRes>(string donVi, string maHoSo, string sdt)
        where TRes : class
    {
        string sql = $"SELECT SmsConfig FROM {SchemaNames.Catalog}.{TableNames.Groups} WHERE GroupCode = @DonVi AND DeletedOn is null";
        var data = await _cacheService.GetOrSetAsync(
            $"{nameof(SMSBrandnameService)}_{donVi}",
            async () => await _dapperRepository.QueryFirstOrDefaultAsync<Group>(sql, new
            {
                DonVi = donVi
            }),
            TimeSpan.FromMinutes(15));
        if (data == null)
        {
            await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams()
            {
                MaHoSo = maHoSo,
                isSucceed = false,
                Receiver = sdt,
                Sender = null,
                Request = string.Empty,
                Response = JsonConvert.SerializeObject(new
                {
                    Message = $"Đơn vị với groupCode:{donVi} không tồn tại"
                }),
                Service = ServiceLoggerServiceType.SMS,
            });
            return default;
        }

        if (string.IsNullOrEmpty(data.SmsConfig))
        {
            await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams()
            {
                MaHoSo = maHoSo,
                isSucceed = false,
                Receiver = sdt,
                Sender = null,
                Request = string.Empty,
                Response = JsonConvert.SerializeObject(new
                {
                    Message = $"Chưa cấu hình SMSConfig Đơn vị với groupCode:{donVi}"
                }),
                Service = ServiceLoggerServiceType.SMS,
            });
            return default;
        }

        try
        {
            return JsonConvert.DeserializeObject<TRes>(data.SmsConfig);
        }
        catch (Exception ex)
        {
            await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams()
            {
                MaHoSo = maHoSo,
                isSucceed = false,
                Receiver = sdt,
                Sender = null,
                Request = string.Empty,
                Response = JsonConvert.SerializeObject(new
                {
                    Message = $"Lỗi khi lấy cấu hình SMSConfig Đơn vị với groupCode:{donVi}",
                    Ex = ex.ToString()
                }),
                Service = ServiceLoggerServiceType.SMS,
            });
            return default;
        }
    }

    public async Task<string?> SendSMS(string sdt, string noiDungthamSo, string gioGui, string donVi, string maHoSo, string loaiNoiDung = "")
    {
        OutPutCauHinhSMSWrap? outPutCauHinhSMS = await GetConfig<OutPutCauHinhSMSWrap>(donVi, maHoSo, sdt);
        if (outPutCauHinhSMS != null && outPutCauHinhSMS.CauHinhVina != null && outPutCauHinhSMS.NhaMang == "Vina")
        {
            return await SendSMSItemVina(sdt, noiDungthamSo, gioGui, outPutCauHinhSMS.CauHinhVina, maHoSo);
        }

        if (outPutCauHinhSMS != null && outPutCauHinhSMS.CauHinhViettel != null && outPutCauHinhSMS.NhaMang == "Viettel")
        {
            return await SendSMSItemViettel(sdt, noiDungthamSo, outPutCauHinhSMS.CauHinhViettel, maHoSo, loaiNoiDung);
        }

        await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams()
        {
            MaHoSo = maHoSo,
            isSucceed = false,
            Receiver = sdt,
            Sender = null,
            Request = string.Empty,
            Response = JsonConvert.SerializeObject(new
            {
                Message = $"Cấu hình không hợp lệ groupCode: {donVi}, {JsonConvert.SerializeObject(outPutCauHinhSMS)}",
            }),
            Service = ServiceLoggerServiceType.SMS,
        });
        return null;
    }

    public async Task<string> SendSMSItemVina(string sdt, string noiDungthamSo, string gioGui, OutPutCauHinhSMSVina lstCH, string maHoSo)
    {
        var inputSMS = new InputSMS();
        var listThongSo = new ThongSoSMS();
        var lstthamso = new List<ThamSoSMS>();
        if (!string.IsNullOrEmpty(gioGui))
        {
            // string strGio = Convert.ToDateTime(gioGui.ToString()).ToString("dd/MM/yyyy HH:mm");
            listThongSo.SCHEDULETIME = gioGui;
        }
        else
        {
            listThongSo.SCHEDULETIME = string.Empty;
        }

        string? thamSo = noiDungthamSo;
        if (thamSo.Contains(","))
        {
            var lstnoidung = thamSo.Split(',').ToList();
            for (int i = 0; i < lstnoidung.Count; i++)
            {
                var noiDungTS = new ThamSoSMS();
                noiDungTS.NUM = (i + 1).ToString();
                noiDungTS.CONTENT = lstnoidung[i];
                lstthamso.Add(noiDungTS);
            }
        }
        else
        {
            var noiDungTS = new ThamSoSMS();
            noiDungTS.NUM = "1";
            noiDungTS.CONTENT = thamSo;
            lstthamso.Add(noiDungTS);
        }

        sdt = "84" + sdt.Substring(1);
        string? urlSMS = lstCH.APIURL;
        listThongSo.AGENTID = lstCH.AGENTID;
        listThongSo.name = "send_sms_list";
        listThongSo.LABELID = lstCH.LABELID;
        listThongSo.APIUSER = lstCH.APIUSERSMS;
        listThongSo.APIPASS = lstCH.APIPASSSMS;
        listThongSo.CONTRACTTYPEID = lstCH.CONTRACTTYPEID;
        listThongSo.CONTRACTID = lstCH.CONTRACTID;
        listThongSo.TEMPLATEID = lstCH.TEMPLATEID;
        listThongSo.MOBILELIST = sdt;
        listThongSo.ISTELCOSUB = lstCH.ISTELCOSUB;
        listThongSo.PARAMS = lstthamso;
        listThongSo.USERNAME = lstCH.USERNAME;
        listThongSo.DATACODING = "0";
        listThongSo.REQID = "1";
        inputSMS.RQST = listThongSo;
        string? result = string.Empty;

        // goi api SmS
        /*
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(urlSMS);
        request.ContentType = "application/json";
        request.Method = "POST";

        using (var streamWriter = new StreamWriter(request.GetRequestStream()))
        {
            string? json = JsonConvert.SerializeObject(inputSMS);
            streamWriter.Write(json);
        }

        var httpResponse = (HttpWebResponse)request.GetResponse();
        using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
        {
            result = streamReader.ReadToEnd();
        }

        var jsonData = JsonConvert.DeserializeObject<OutPutSMS>(result);
        */
        using (HttpClient client = new HttpClient())
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, urlSMS);
            string? json = JsonConvert.SerializeObject(inputSMS);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.SendAsync(request);
            string resSTr = await response.Content.ReadAsStringAsync();
            result = resSTr;
            var jsonData = JsonConvert.DeserializeObject<OutPutSMS>(result);
            result = jsonData.RPLY.ERROR.ToString();
            if (result != "0")
            {
                await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams()
                {
                    MaHoSo = maHoSo,
                    isSucceed = false,
                    Receiver = sdt,
                    Sender = null,
                    Request = json,
                    Response = JsonConvert.SerializeObject(new
                    {
                        Message = $"Có lỗi ghi gửi tin nhắn: {resSTr}",
                    }),
                    Service = ServiceLoggerServiceType.SMS,
                });
            }
            else if (result == "0")
            {
                await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams()
                {
                    MaHoSo = maHoSo,
                    isSucceed = false,
                    Receiver = sdt,
                    Sender = null,
                    Request = json,
                    Response = JsonConvert.SerializeObject(new
                    {
                        Message = "Success"
                    }),
                    Service = ServiceLoggerServiceType.SMS,
                });
            }
        }

        return result; // "0" - Thành công
    }

    public async Task<string> SendSMSItemViettel(string soDTGui, string noiDung, OutPutCauHinhSMSViettel lstCH, string maHoSo, string loaiNoiDung = "")
    {
        string? result = string.Empty;

        string? userID = "84" + soDTGui.Substring(1);
        string? receiverID = "84" + soDTGui.Substring(1);
        string? content = noiDung;
        string? contentType = string.Empty;
        string? user = lstCH.User;
        string? passWord = lstCH.Password;
        string? cpCode = lstCH.CPCode;
        string? requestID = lstCH.RequestID;
        string? serviceID = lstCH.ServiceID;
        string? commandCode = lstCH.CommandCode;
        if (loaiNoiDung == string.Empty) contentType = lstCH.ContentType;
        else contentType = loaiNoiDung;
        ServiceSMSViettel.CcApiClient service = new ServiceSMSViettel.CcApiClient();
        ServiceSMSViettel.wsCpMtRequest request = new ServiceSMSViettel.wsCpMtRequest()
        {
            CommandCode = commandCode,
            Content = content,
            ContentType = contentType,
            CPCode = cpCode,
            Password = passWord,
            ReceiverID = receiverID,
            RequestID = requestID,
            ServiceID = serviceID,
            User = user,
            UserID = userID
        };

        ServiceSMSViettel.wsCpMtResponse resultBO = await service.wsCpMtAsync(request);
        result = resultBO.ToString() ?? string.Empty;
        if (result != "1")
        {
            await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams()
            {
                MaHoSo = maHoSo,
                isSucceed = false,
                Receiver = soDTGui,
                Sender = null,
                Request = JsonConvert.SerializeObject(request),
                Response = JsonConvert.SerializeObject(new
                {
                    Message = $"Có lỗi ghi gửi tin nhắn: {JsonConvert.SerializeObject(resultBO)}",
                }),
                Service = ServiceLoggerServiceType.SMS,
            });
        }
        else if (result == "1")
        {
            await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams()
            {
                MaHoSo = maHoSo,
                isSucceed = false,
                Receiver = soDTGui,
                Sender = null,
                Request = JsonConvert.SerializeObject(request),
                Response = JsonConvert.SerializeObject(new
                {
                    Message = "Success"
                }),
                Service = ServiceLoggerServiceType.SMS,
            });
        }

        return result; // "1" - Thành công
    }

    /*
    private async Task<string> CallWebserviceSOAP()
    {
        string url = "http://example.com/service.asmx";
        string soapAction = "http://tempuri.org/YourAction";
        string soapRequest = @"<?xml version=""1.0"" encoding=""utf-8""?>
        <soap:Envelope xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance""
                       xmlns:xsd=""http://www.w3.org/2001/XMLSchema""
                       xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
          <soap:Body>
            <YourMethod xmlns=""http://tempuri.org/"">
              <param1>value1</param1>
              <param2>value2</param2>
            </YourMethod>
          </soap:Body>
        </soap:Envelope>";

        using (HttpClient client = new HttpClient())
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);
            request.Headers.Add("SOAPAction", soapAction);
            request.Content = new StringContent(soapRequest, Encoding.UTF8, "text/xml");

            HttpResponseMessage response = await client.SendAsync(request);
            string result = await response.Content.ReadAsStringAsync();
            return result;
        }
    }*/
}
