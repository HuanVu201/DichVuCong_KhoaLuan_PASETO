using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;
public class GetDiaBanByMa : ICommand<IReadOnlyList<DiaChiNguoiDung>>
{
    public List<string> MaDiaBans { get; set; }
}

public class DiaChiNguoiDung
{
    public string MaDiaBan { get; set; }
    public string TenDiaBan { get; set; }
}
