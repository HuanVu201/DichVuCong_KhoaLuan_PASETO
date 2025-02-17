using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Interfaces;
public interface IGiayToSoHoaService : ITransientService
{
    Task<string> GetMaSuffix(string ma);
    Task ThemGiayToSoHoaKetQua(AddGiayToSoHoaCommand req, string ma);
    Task ThemGiayToSoHoaThanhPhan(AddGiayToSoHoaCommand req, string ma);
    Task ThemGiayToSoHoaKetQuaByDinhKems(string? dinhKems, string maHoSo, string maTTHC, string maLinhVuc, string? coQuanBanHanh,
        string soDinhDanhChuHoSo, CancellationToken cancellationToken = default);
    Task<bool> CapNhatTrangThaiSoHoa(CapNhatTrangThaiSoHoaReq req);
}

public class CapNhatTrangThaiSoHoaReq
{
    public DefaultIdType Id { get; set; }
    public string TrangThaiSoHoa { get; set; }
}