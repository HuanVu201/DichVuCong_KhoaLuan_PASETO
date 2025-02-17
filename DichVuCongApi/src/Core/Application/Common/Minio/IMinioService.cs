using Microsoft.AspNetCore.Http;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Params;

namespace TD.DichVuCongApi.Application.Common.Minio;

public interface IMinioService : IScopedService
{
    Task<string> UploadFileAsync(IFormFile file, string bucketName, string? prefix, double? overideFileSize = null, bool? overideFolderName = null);
    Task<string> UploadFileServerAsync(IFormFile file, string? bucketName, string? folderName, double? overideFileSize);
    public Task<List<AttachmentResponse>> UploadFilesAsync(List<IFormFile> files, string? bucketName, string? prefix, CancellationToken cancellationToken = default);
    public Task<AttachmentResponse> UploadFileAsync<T>(IFormFile? file, string? bucketName, string? prefix, CancellationToken cancellationToken = default)
    where T : class;
    Task<StreamDataFile> GetFileByKeyAsync(string? bucketName, string key);
    Task<StreamDataFile> AddPagePDF(string? bucketName, string key);
    Task RemoveFileByKeyAsync(string bucketName, string key);
    Task<Base64DataFile> GetFileByKeyAsBase64Async(string? bucketName, string key);
    public Task<string> UploadFileDocxAsPdfAsync(string docxBase64, string fileName, string? bucketName, string? folderName, CancellationToken cancellationToken = default);
    public Task<StreamDataFile> UploadFileWithBlobDocxReturnBlobPdfAsync(Stream stream, string fileName, string? bucketName, string? folderName, string? addGTHS, string? maHoSo, string? loaiGiayTo, string? nguoiXuatPhieu, DateTime? ngayXuatPhieu, string? maGiayTo, CancellationToken cancellationToken = default);
    public Task<string> UploadFileAsBase64Async(string base64Str, string fileName, string? bucketName, string? folderName, CancellationToken cancellationToken = default);
    StreamDataFile DocToPdf(string base64, string fileName);
    StreamDataFile StreamToPdf(Stream data, string fileName);
    Task<string> ConvertToBase64Async(IFormFile file);
    IFormFile ConvertStreamToIFormFile(Stream stream, string fileName, string contentType = null);
    Task<IFormFile> GetFileAndConvertToIFormFile(string bucketName, string key);
    byte[] ConvertStreamToBytes(Stream data);
    Task RemoveFilesByKeyAsync(string? bucketName, IReadOnlyList<string> keys);
    Task<VerifyDigitalSinatureResponse> VerifyPdfSignature(IReadOnlyList<string> filePath, bool breakIfHasSignedFile = false);
    Task<VerifyDigitalSinatureResponse> VerifyPdfSignatureITextSharp(IReadOnlyList<string> filePath, bool breakIfHasSignedFile = false);
    IFormFile ConvertBase64ToIFormFile(string base64, string fileName);
    Task<string> GetFileInExternalResource(string? url, object? body = null);
    Task<ConfigFileUploadResponse> PostValidate(IFormFile data, double? overideFileSize = null);
    Task<FileRes> GetFileByKey2Async(string bucketName, string key);
    Task<string> UploadStringToMinioAsync(string fileContent, string bucketName, string folderName);
    Task<string> GetFileInExternalResourceByGetMethod(string? url);
    Task<Result<List<GetDataSignatureResponse>>> GetSignatureData(string filePath);
}