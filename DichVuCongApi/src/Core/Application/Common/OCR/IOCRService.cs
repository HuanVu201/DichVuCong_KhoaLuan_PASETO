namespace TD.DichVuCongApi.Application.Common.OCR;
public interface IOCRService : ITransientService
{
    Task<OCRResponse> GetData(string maNhanDienOCR, string fileUrl);
    Task<OCRResponse> GetData(OCRRequest request);
    Task<string> GetMaNhanDienOCR(string maTruongHop);
}
