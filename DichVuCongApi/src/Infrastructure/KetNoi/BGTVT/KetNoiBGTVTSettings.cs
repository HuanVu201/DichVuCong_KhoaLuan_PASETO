using TD.DichVuCongApi.Application.Common.KetNoi.Classes;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.BGTVT;
public class KetNoiBGTVTSettings
{
    public string ApiKey { get; set; }
    public string URLEndPoint { get; set; }
    public string MaDonViDVCQG { get; set; }
    public string MaDonVi { get; set; }
    public bool Enable { get; set; }
    public bool? LaTrucTuyen { get; set; } = false;
    //public BaseTokenSettings? Token { get; set; }

}
