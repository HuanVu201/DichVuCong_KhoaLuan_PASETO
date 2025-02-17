
using Microsoft.AspNetCore.Http;

namespace TD.DichVuCongApi.Application.Common.OCR;
public class OCRRequest
{
    public string textCode { get; set; }
    public Stream file { get; set; }
}

public class OCRResponse
{
    public int errorCode { get; set; }
    public string errorMessage { get; set; }
    public dynamic results { get; set; }
}

public class TruongHopThuTucOCR
{
    public string? EformKetQua { get; set; }
    public string? MaNhanDienOCR { get; set; }
}