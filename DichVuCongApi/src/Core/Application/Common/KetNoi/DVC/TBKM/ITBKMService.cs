using TD.DichVuCongApi.Application.Common.ServiceLogger;

namespace TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
public interface ITBKMService : ITransientService, IEnableServiceLogger
{
    Task<Common.Classes.Result> AddTBKM(AddTKBMRequestParams req, ThongBaoKhuyenMaiSettings settings, CancellationToken cancellationToken = default);
    Task<Common.Classes.Result> AddBSTBKM(AddBSTBKMRequestParams req, ThongBaoKhuyenMaiSettings settings, CancellationToken cancellationToken = default);
}
