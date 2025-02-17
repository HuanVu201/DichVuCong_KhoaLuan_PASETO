namespace TD.DichVuCongApi.Application.Common.Sms;
public class SMSSettings
{
    public List<string> Viettel { get; set; }
    public List<string> VinaPhone { get; set; }
    public List<string> MobilePhone { get; set; }
    public string UrlSendMessage { get; set; }
    public string TokenSendMessage { get; set; }
    public string TemplateId { get; set; }
    public bool GoiTrucTiep { get; set; } = false;

    public SMSSettingNoiDungTinNhan NoiDungTinNhan { get; set; }
}

public class SMSSettingNoiDungTinNhan
{
    public Option NopTrucTuyen { get; set; }
    public Option TuChoiTrucTuyen { get; set; }
    public KenhThucHien TiepNhan { get; set; }
    public KenhThucHien CoKetQua { get; set; }
    public KenhThucHien TraKetQua { get; set; }
    public KenhThucHien YeuCauBoSung { get; set; }
    public KenhThucHien TraLai { get; set; }
    public class Option
    {
        public bool Active { get; set; } = false;
        public string Template { get; set; }
    }
    public class KenhThucHien
    {
        public Option TrucTuyen { get; set; }
        public Option TrucTiep { get; set; }
        public Option BCCI { get; set; }
    }
    public static bool IsPropertyExist(string typeName)
    {
        var propertyNames = typeof(SMSSettingNoiDungTinNhan)
            .GetProperties()
            .Select(p => p.Name);

        return propertyNames.Contains(typeName, StringComparer.OrdinalIgnoreCase);
    }

    public object? GetPropertyValue(string propertyName)
    {
        var property = typeof(SMSSettingNoiDungTinNhan).GetProperty(propertyName);
        return property?.GetValue(this);
    }
}
