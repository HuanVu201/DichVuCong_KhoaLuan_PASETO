using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
public class UpdateThanhPhanChungThucHoSoCommand : ICommand
{
    public IReadOnlyList<UpdateThanhPhanChungThucHoSoRequestParams> ThanhPhanHoSos { get; set; }
}

public class UpdateThanhPhanChungThucHoSoRequestParams
{
    public Guid Id { get; set; }
    public string TrangThaiDuyet { get; set; }
    public string DinhKem { get; set; }
}
