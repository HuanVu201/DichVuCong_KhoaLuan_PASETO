using Microsoft.AspNetCore.Http;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.FileApp.Commands;
public class UploadFileCommand : ICommand<string>
{
    public IFormFile Files { get; set; }
    public string FolderName { get; set; }
    public string? FileUploadLocalPath { get; set; }

    // Constructor mặc định
    public UploadFileCommand()
    {

    }

    // Constructor với tham số để khởi tạo thuộc tính
    public UploadFileCommand(IFormFile files, string folderName, string? fileUploadLocalPath = null)
    {
        Files = files;
        FolderName = folderName;
        FileUploadLocalPath = fileUploadLocalPath;
    }

}

public class FormioUploadFileCommand : ICommand<string>
{
    public IFormFile File { get; set; }
    public string Name { get; set; }
    public string? Dir { get; set; }

    // Constructor mặc định
    public FormioUploadFileCommand()
    {

    }

    // Constructor với tham số để khởi tạo thuộc tính
    public FormioUploadFileCommand(IFormFile file, string name, string? dir)
    {
        File = file;
        Name = name;
        Dir = dir;
    }

}
public class FormioResponse
{
    public string Url { get; set; }
    public string BaseUrl { get; set; }
}
public class FormioQueryString
{
    public string? Project { get; set; }
    public string? Form { get; set; }
    public string BaseUrl { get; set; }
}

public class UploadFileOldCommand : UploadFileCommand
{
    public string? BucketName { get; set; }
    public string? Key { get; set; }
}

public class UploadFileAsBase64Command
{
    public string? Data { get; set; }
    public string? FileName { get; set; }
    public string? FolderName { get; set; }
}

public class UploadFileAsStreamCommand
{
    public IFormFile? Data { get; set; }
    public string? FileName { get; set; }
    public string? FolderName { get; set; }
    public string? AddGTHS { get; set; } = "1";
    public string? MaHoSo { get; set; }
    public string? LoaiGiayTo { get; set; }
    public string? NguoiXuatPhieu { get; set; }
    public DateTime? NgayXuatPhieu { get; set; }
    public string? MaGiayTo { get; set; }

}
