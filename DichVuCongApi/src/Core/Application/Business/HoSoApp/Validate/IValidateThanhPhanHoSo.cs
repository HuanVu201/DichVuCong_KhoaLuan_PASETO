using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Validate;
public interface IValidateThanhPhanHoSo : ITransientService
{
    ValidateThanhPhanHoSoResponse HasThanhPhanHoSos(List<AddThanhPhanHoSoCommand>? _thanhPhanHoSos);
    ValidateThanhPhanHoSoResponse HasAtLeastOneFile(List<AddThanhPhanHoSoCommand>? _thanhPhanHoSos);
    Task<ValidateThanhPhanHoSoResponse> HasSignedFileOnEveryItem(List<AddThanhPhanHoSoCommand>? _thanhPhanHoSos);
    Task<ValidateThanhPhanHoSoResponse> ValidateBaseOnConfig(List<AddThanhPhanHoSoCommand>? _thanhPhanHoSos, ValidateThanhPhanHoSoLoaiNguoiDung loaiNguoiDung, string configCode = "post_create_hoso");
}

public class ValidateThanhPhanHoSoResponse
{
    public bool IsSucceed { get; set; }
    public string Message { get; set; }
}

public enum ValidateThanhPhanHoSoLoaiNguoiDung
{
    CongDan = 0,
    CanBo = 1
}