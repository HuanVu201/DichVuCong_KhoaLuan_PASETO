using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Reflection;
using System.Text.RegularExpressions;
using TD.DichVuCongApi.Application.Common.Extensions;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.ServiceLogger;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Infrastructure.Zalo;

namespace TD.DichVuCongApi.Infrastructure.SMS;
public class SMSService : ISMSService
{
    private readonly SMSSettings _settings;
    private readonly ISMSBrandnameService _sMSBrandnameService;
    private readonly IServiceLogger _serviceLogger;
    private readonly IJobService _jobService;
    public SMSService(IOptions<SMSSettings> settings, IServiceLogger serviceLogger, ISMSBrandnameService sMSBrandnameService, IJobService jobService)
    {
        _settings = settings.Value;
        _serviceLogger = serviceLogger;
        _sMSBrandnameService = sMSBrandnameService;
        _jobService = jobService;
    }

    public string getPhoneNumberType(string phoneNumber)
    {
        var dauso = string.Empty;
        if (!string.IsNullOrEmpty(phoneNumber) && phoneNumber.Length > 3)
        {
            dauso = phoneNumber.Substring(0, 3);
        }
        string resultIsViettel = _settings.Viettel.FirstOrDefault(x => x == dauso);
        if(resultIsViettel != null)
            return "Viettel";
        string resultIsVina = _settings.VinaPhone.FirstOrDefault(x => x == dauso);
        if (resultIsVina != null)
            return "Vina";
        return "Mobifone";
    }
    public string GetLoiNhan (object entity, string content)
    {
        string pattern = @"#(\w+)";

        // Use Regex.Replace to replace matches with corresponding values from the HoSo object
        string formattedHtml = Regex.Replace(content, pattern, match =>
        {
            // Get the matched entity name
            string entityNameWithSlash = match.Value;
            string entityName = entityNameWithSlash.Replace("#", "");
            PropertyInfo property = entity.GetType().GetProperty(entityName);
            if (property != null)
            {
                object propertyValue = property.GetValue(entity);
                if (propertyValue is DateTime dateTimeValue)
                {
                    // Format DateTime to dd/MM/yyyy HH:mm:ss
                    return dateTimeValue.ToString("dd/MM/yyyy HH:mm:ss");
                }
                return propertyValue?.ToString() ?? "";
            }
            else
            {
                // If no corresponding property found, return the original match
                return match.Value;
            }
        });

        return formattedHtml;
    }

    public async Task SendJobWrapperAsync(SMSRequest request, string type, HoSo hoSo, CancellationToken ct)
    {
        bool isPropertyExist = SMSSettingNoiDungTinNhan.IsPropertyExist(type);
        if(!isPropertyExist)
        {
            return;
        }
        var propertyValue = _settings.NoiDungTinNhan.GetPropertyValue(type);
        string loiNhan = string.Empty;
        if (propertyValue is SMSSettingNoiDungTinNhan.Option option)
        {
            if (!option.Active)
            {
                return;
            }
            loiNhan = option.Template;
        }
        else if (propertyValue is SMSSettingNoiDungTinNhan.KenhThucHien kenhThucHien)
        {
            string kenhKey = hoSo.KenhThucHien switch
            {
                "1" => nameof(SMSSettingNoiDungTinNhan.KenhThucHien.TrucTiep),
                "2" => nameof(SMSSettingNoiDungTinNhan.KenhThucHien.TrucTuyen),
                "3" => nameof(SMSSettingNoiDungTinNhan.KenhThucHien.BCCI),
                _ => null
            };

            if (kenhKey != null)
            {
                var kenhOption = kenhThucHien.GetType().GetProperty(kenhKey)?.GetValue(kenhThucHien) as SMSSettingNoiDungTinNhan.Option;
                if (kenhOption != null && kenhOption.Active)
                {
                    loiNhan = kenhOption.Template;
                }
            }
        }
        if (!string.IsNullOrEmpty(loiNhan))
        {
            request.noiDungthamSo = GetLoiNhan(hoSo, loiNhan);
            _jobService.Enqueue(() => SendAsync(request, ct));
        }
    }

    public async Task SendAsync(SMSRequest request, CancellationToken ct)
    {
        if (string.IsNullOrEmpty(request.soDienThoai))
        {
            await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams()
            {
                MaHoSo = request.MaHoSo,
                isSucceed = false,
                Receiver = request.soDienThoai,
                Sender = null,
                Request = JsonConvert.SerializeObject(request),
                Response = "Số điện thoại trống",
                Service = ServiceLoggerServiceType.SMS,
            });
            return;
        }
        if(_settings.GoiTrucTiep == true) // nếu gửi thành công thì return. nếu gửi thất bại thì gửi = hình thức bth
        {
            //    string loaiNhaMang = getPhoneNumberType(request.soDienThoai);
            //    string? res = string.Empty;
            //    if(loaiNhaMang == "Viettel")
            //    {
            //        res = await _sMSBrandnameService.SendSMSItemViettel(request.soDienThoai, request.noiDungthamSo.RemoveDiacritics(), request.DonVi, request.MaHoSo);
            //    }
            //    else if(loaiNhaMang == "Vina")
            //    {
            //        res = await _sMSBrandnameService.SendSMSItemVina(request.soDienThoai, request.noiDungthamSo.RemoveDiacritics(), "", request.DonVi, request.MaHoSo);
            //    }
            await _sMSBrandnameService.SendSMS(request.soDienThoai, request.noiDungthamSo.RemoveDiacritics(), "", request.DonVi, request.MaHoSo);
        } else
        {
            if (string.IsNullOrEmpty(_settings.UrlSendMessage))
            {
                return;
            }
            using (var httpClient = new HttpClient())
            {
                try
                {
                    request.maPhanMem = "DVC";
                    request.idMauTin = _settings.TemplateId;
                    request.gioGui = DateTime.Now.ToString();
                    request.nhaMang = getPhoneNumberType(request.soDienThoai);
                    request.noiDungthamSo = request.noiDungthamSo.RemoveDiacritics();
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _settings.TokenSendMessage);
                    var res = await httpClient.PostAsJsonAsync(_settings.UrlSendMessage, request);
                    await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams()
                    {
                        MaHoSo = request.MaHoSo,
                        isSucceed = res.IsSuccessStatusCode,
                        Receiver = request.soDienThoai,
                        Sender = null,
                        Request = JsonConvert.SerializeObject(request),
                        Response = res.IsSuccessStatusCode ? "Success" : JsonConvert.SerializeObject(res),
                        Service = ServiceLoggerServiceType.SMS,
                    });
                }
                catch (Exception ex)
                {
                    await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams()
                    {
                        MaHoSo = request.MaHoSo,
                        isSucceed = false,
                        Receiver = request.soDienThoai,
                        Sender = null,
                        Request = JsonConvert.SerializeObject(request),
                        Response = JsonConvert.SerializeObject(ex),
                        Service = ServiceLoggerServiceType.SMS,
                    });
                }
            }
        }
    }
}
