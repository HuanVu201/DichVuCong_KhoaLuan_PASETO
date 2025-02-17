namespace TD.DichVuCongApi.Application.Common.KetNoi.Classes;
public class BaseTokenSettings
{
    public string? StaticToken { get; set; }
    public DynamicTokenSettings? DynamicToken { get; set; }
}

public class DynamicTokenSettings
{
    public string Url { get; set; }
    public string User { get; set; }
    public string Password { get; set; }
}