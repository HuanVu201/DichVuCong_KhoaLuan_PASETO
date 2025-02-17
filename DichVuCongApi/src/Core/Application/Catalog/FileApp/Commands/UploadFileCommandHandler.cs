using Microsoft.Extensions.Configuration;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ConfigApp;
using TD.DichVuCongApi.Application.Common.Minio;

namespace TD.DichVuCongApi.Application.Catalog.FileApp.Commands;
public class UploadFileCommandHandler : ICommandHandler<UploadFileCommand, string>
{
    private readonly string? FileUploadLocalPath;
    private readonly IMinioService _minioService;
    public UploadFileCommandHandler(IMinioService minioService, IInjectConfiguration configuration)
    {
        _minioService = minioService;
        FileUploadLocalPath = configuration.GetValue<string>("FileConfig:FileUploadLocalPath");
    }
    public async Task<Result<string>> Handle(UploadFileCommand request, CancellationToken cancellationToken)
    {
        request.FileUploadLocalPath = FileUploadLocalPath;
        var validateRes = await _minioService.PostValidate(request.Files);
        if (!validateRes.Succeed)
        {
            return Result<string>.Fail(validateRes.Description);
        }
        string localPathUpload = !string.IsNullOrEmpty(request.FileUploadLocalPath) ? request.FileUploadLocalPath : AppDomain.CurrentDomain.BaseDirectory + "Files";
        string Identity = Guid.NewGuid().ToString();
        string dir = Path.Combine(localPathUpload, request.FolderName, Identity);
        if (!Directory.Exists(dir))
            Directory.CreateDirectory(dir);
        if (request.Files.Length > 0)
        {
            string filePath = Path.Combine(dir, request.Files.FileName);
            using (Stream fileStream = File.Create(filePath))
            {
                await request.Files.CopyToAsync(fileStream);
            }
            return Result<string>.Success($"/Files/{request.FolderName}/{Identity}/{request.Files.FileName}", "");
        }
        return Result<string>.Fail("Vui lòng chọn tệp");
    }
}
