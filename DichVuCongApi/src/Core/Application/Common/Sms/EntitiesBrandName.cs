namespace TD.DichVuCongApi.Application.Common.Sms;
public class InputSMS
{
    public ThongSoSMS? RQST { get; set; }
}

public class ThongSoSMS
{
    public List<ThamSoSMS>? PARAMS { get; set; }
    public string? AGENTID { get; set; }
    public string? LABELID { get; set; }
    public string? name { get; set; }
    public string? REQID { get; set; }
    public string? CONTRACTTYPEID { get; set; }
    public string? CONTRACTID { get; set; }
    public string? ISTELCOSUB { get; set; }
    public string? SCHEDULETIME { get; set; }
    public string? TEMPLATEID { get; set; }
    public string? USERNAME { get; set; }
    public string? MOBILELIST { get; set; }
    public string? APIUSER { get; set; }
    public string? APIPASS { get; set; }
    public string? DATACODING { get; set; }
}

public class ThamSoSMS
{
    public string? NUM { get; set; }
    public string? CONTENT { get; set; }
}

public class OutPutCauHinhSMSVina
{
    public string? AGENTID { get; set; }
    public string? APIURL { get; set; }
    public string? LABELID { get; set; }
    public string? APIUSERTemp { get; set; }
    public string? APIPASSTemp { get; set; }
    public string? CONTRACTTYPEID { get; set; }
    public string? CONTRACTID { get; set; }
    public string? ISTELCOSUB { get; set; }
    public string? APIUSERSMS { get; set; }
    public string? APIPASSSMS { get; set; }
    public string? USERNAME { get; set; }
    public string? TEMPLATEID { get; set; }
}
public class OutPutCauHinhSMSWrap
{
    public string NhaMang { get; set; }
    public OutPutCauHinhSMSViettel? CauHinhViettel { get; set; }
    public OutPutCauHinhSMSVina? CauHinhVina { get; set; }
}
public class OutPutCauHinhSMSViettel
{
    public string? User { get; set; }
    public string? Password { get; set; }
    public string? CPCode { get; set; }
    public string? RequestID { get; set; }
    public string? ServiceID { get; set; }
    public string? CommandCode { get; set; }
    public string? ContentType { get; set; }
}

public class OutPutSMS
{
    public ReturnSMS? RPLY { get; set; }
}

public class ReturnSMS
{
    public string? ERROR { get; set; }
    public string? ERROR_DESC { get; set; }
    public string? name { get; set; }
}