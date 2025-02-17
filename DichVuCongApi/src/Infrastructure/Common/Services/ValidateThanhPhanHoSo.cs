using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.HoSoApp.Validate;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Infrastructure.Common.Services;

public class Post_Create_HoSo
{
    public bool UploadSignedFile { get; set; }
    public bool AllowSameFileName { get; set; }
}
    public class ValidateThanhPhanHoSo : IValidateThanhPhanHoSo
{
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMinioService _minioService;
    public ValidateThanhPhanHoSo(IReadRepository<Config> readRepositoryConfig, IMinioService minioService)
    {
        _readRepositoryConfig = readRepositoryConfig;
        _minioService = minioService;
    }

    public ValidateThanhPhanHoSoResponse HasThanhPhanHoSos(List<AddThanhPhanHoSoCommand>? _thanhPhanHoSos)
    {
        return new ValidateThanhPhanHoSoResponse()
        {
            IsSucceed = _thanhPhanHoSos != null && _thanhPhanHoSos.Count > 0,
            Message = "Vui lòng thêm ít nhất một thành phần hồ sơ"
        };
    }

    public ValidateThanhPhanHoSoResponse HasAtLeastOneFile(List<AddThanhPhanHoSoCommand>? _thanhPhanHoSos)
    {
        var checkTPHS = HasThanhPhanHoSos(_thanhPhanHoSos);
        if (!checkTPHS.IsSucceed)
        {
            return checkTPHS;
        }
        bool hasFile = _thanhPhanHoSos.Any(x => !string.IsNullOrEmpty(x.DinhKem));
        return new ValidateThanhPhanHoSoResponse
        {
            IsSucceed = hasFile,
            Message = hasFile ? string.Empty : "Vui lòng đính kèm ít nhất một tệp"
        };
    }
    public ValidateThanhPhanHoSoResponse HasFileOnEveryItem(List<AddThanhPhanHoSoCommand>? _thanhPhanHoSos)
    {
        var checkTPHS = HasThanhPhanHoSos(_thanhPhanHoSos);
        if (!checkTPHS.IsSucceed)
        {
            return checkTPHS;
        }
        bool file = _thanhPhanHoSos.Any(x => string.IsNullOrEmpty(x.DinhKem));
        return new ValidateThanhPhanHoSoResponse
        {
            IsSucceed = !file,
            Message = !file ? string.Empty : "Vui lòng đính kèm tệp đầy đủ vào các thành phần hồ sơ"
        };
    }

    public async Task<ValidateThanhPhanHoSoResponse> HasSignedFileOnEveryItem(List<AddThanhPhanHoSoCommand>? _thanhPhanHoSos)
    {
        var checkTPHS = HasThanhPhanHoSos(_thanhPhanHoSos);
        if (!checkTPHS.IsSucceed)
        {
            return checkTPHS;
        }
        var checkTPHSItem = HasFileOnEveryItem(_thanhPhanHoSos);
        if (!checkTPHSItem.IsSucceed)
        {
            return checkTPHSItem;
        }
        var files = _thanhPhanHoSos.Select(x => x.DinhKem).ToList();
        var fileItem = new List<string>();
        foreach (var file in files)
        {
            var splitFiles = file.Split("##");
            foreach (var splitFile in splitFiles)
            {
                fileItem.Add(splitFile);
            }
        }
        var res = await _minioService.VerifyPdfSignatureITextSharp(files);
        if (res.DigitalSignatureFiles.Count == fileItem.Count)
        //if (res.DigitalSignatureFiles.Count == fileItem.Count - res.NormalFiles.Count) // chỉ tính các file pdf
        {
            return new ValidateThanhPhanHoSoResponse
            {
                IsSucceed = true,
                Message = string.Empty
            };
        }
        else
        {
            var normalFileStr = res.NormalFiles.Select(x => Path.GetFileName(x));
            return new ValidateThanhPhanHoSoResponse
            {
                IsSucceed = false,
                Message = $"Các tệp đính kèm sau chưa được ký số : {string.Join(", ", normalFileStr)}"
            };
        }
    }

    public async Task<ValidateThanhPhanHoSoResponse> ValidateBaseOnConfig(List<AddThanhPhanHoSoCommand>? _thanhPhanHoSos, ValidateThanhPhanHoSoLoaiNguoiDung loaiNguoiDung, string configCode = "post_create_hoso")
    {

        if (string.IsNullOrEmpty(configCode))
        {
            return HasAtLeastOneFile(_thanhPhanHoSos);
        }
        else
        {
            var config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(configCode));
            if (config != null && !string.IsNullOrEmpty(config.Content))
            {
                var parseConfig = JsonConvert.DeserializeObject<Post_Create_HoSo>(config.Content);
                if(parseConfig.UploadSignedFile == true)
                {
                    if (ValidateThanhPhanHoSoLoaiNguoiDung.CanBo == loaiNguoiDung)
                    {
                        return await HasSignedFileOnEveryItem(_thanhPhanHoSos);
                    }
                    else if (ValidateThanhPhanHoSoLoaiNguoiDung.CongDan == loaiNguoiDung)
                    {
                        return HasFileOnEveryItem(_thanhPhanHoSos);
                    }
                }
            }
            return HasAtLeastOneFile(_thanhPhanHoSos);
        }
    }
}