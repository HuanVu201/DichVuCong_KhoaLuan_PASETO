using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
public class GetDuLieuThemHoSo : IQuery<DuLieuThemHoSoDto>
{
    public GetDuLieuThemHoSo(string truongHopId, string thuTucId, string userId, string? donViId = "", bool? returnUserInfo = false, bool? returnPhiLePhi = false, bool? returnDonVi = false, bool? returnThuTuc = false)
    {
        TruongHopId = truongHopId;
        ThuTucId = thuTucId;
        ReturnUserInfo = returnUserInfo;
        ReturnPhiLePhi = returnPhiLePhi;
        ReturnDonVi = returnDonVi;
        ReturnThuTuc = returnThuTuc;
        UserId = userId;
        DonViId = donViId;
    }
    public string TruongHopId { get; set; }
    public string? DonViId { get; set; }
    public bool? ReturnDonVi { get; set; } = false;
    public bool? ReturnThuTuc { get; set; } = false;
    public string? UserId { get; set; }
    public bool? ReturnUserInfo { get; set; } = false;
    public bool? ReturnPhiLePhi { get; set; } = false;
    public string ThuTucId { get; set; }
}
