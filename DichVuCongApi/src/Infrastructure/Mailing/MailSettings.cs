namespace TD.DichVuCongApi.Infrastructure.Mailing;

public class MailSettings
{
    public string? From { get; set; }

    public string? Host { get; set; }

    public int Port { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public string? DisplayName { get; set; }
}

public class MailSettingsList
{
    public List<MailSettings> MailSettings { get; set; }
}