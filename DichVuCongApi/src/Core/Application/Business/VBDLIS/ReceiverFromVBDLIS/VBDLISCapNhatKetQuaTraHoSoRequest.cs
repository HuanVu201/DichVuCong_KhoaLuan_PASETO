namespace TD.DichVuCongApi.Application.Business.VBDLIS.Services;
public class VBDLISCapNhatKetQuaTraHoSoRequest
{
    public VBDLISCapNhatKetQuaTraHoSoRequest(string soBienNhan, DateTime ngayTra)
    {
        SoBienNhan = soBienNhan;
        NgayTra = ngayTra;
    }



    public string SoBienNhan { get; set; }
    public DateTime NgayTra { get; set; }
}
