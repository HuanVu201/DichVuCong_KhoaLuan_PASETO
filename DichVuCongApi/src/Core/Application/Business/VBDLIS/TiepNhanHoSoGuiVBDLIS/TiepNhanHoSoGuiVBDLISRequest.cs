namespace TD.DichVuCongApi.Application.Business.VBDLIS.TiepNhanHoSoGuiVBDLIS;
public class TiepNhanHoSoGuiVBDLISRequest : IRequest<Result>
{
    public DefaultIdType Id { get; set; }
    public int TinhId { get; set; }
    public int HuyenId { get; set; }
    public int XaId { get; set; }

}
