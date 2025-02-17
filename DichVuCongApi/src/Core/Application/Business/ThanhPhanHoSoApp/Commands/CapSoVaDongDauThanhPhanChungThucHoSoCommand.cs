using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
public class CapSoVaDongDauThanhPhanChungThucHoSoCommand : ICommand
{
    public Guid Id { get; set; }
    public Guid SoChungThucDT { get; set; }
    public Guid SoChungThucG { get; set; }
}
public class CapSoThanhPhanChungThucHoSoRequestParams
{

}