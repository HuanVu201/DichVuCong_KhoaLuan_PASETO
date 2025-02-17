using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
public interface ISyncDVCQGService : ITransientService
{
    Task DongBoDVCQG(HoSo hoSoQuaMang);

}
