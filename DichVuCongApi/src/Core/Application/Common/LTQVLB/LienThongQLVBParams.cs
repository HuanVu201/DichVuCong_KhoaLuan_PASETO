namespace TD.DichVuCongApi.Application.Common.LTQVLB;

public class LienThongQLVB_ThamSoAn
{
    public bool LaHoSoLienThong { get; set; } = false;
    public string DuThao { get; set; }
    public string DuThaoId { get; set; }
    public DateTime NgayHenTraMoi { get; set; }
    public LienThongQLVB_ThamSoAn(bool laHoSoLienThong, string duThao, string duThaoId)
    {
        LaHoSoLienThong = laHoSoLienThong;
        DuThao = duThao;
        DuThaoId = duThaoId;
    }
}
