using Microsoft.AspNetCore.Http;

namespace TD.DichVuCongApi.Infrastructure.OCR;
public class OCRSetting
{
    public string ApiEndPoint { get; set; }
    public string? BearerToken { get; set; }
}

