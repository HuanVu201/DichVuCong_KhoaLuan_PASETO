
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Commands;
public class AddDuThaoXuLyHoSoCommand : ICommand<DefaultIdType>
{
    public Guid Id { get; set; }
    public string Loai { get; set; }
    public string FileDinhKem { get; set; }
    public string NguoiXuLy { get; set; }
    public string? LanhDaoThongQua { get; set; }
    public string TenNguoiXuLy { get; set; }
    public string? TrichYeu { get; set; }
    public string? TrangThaiLienThongQLVB { get; set; }
    public string MaDinhDanhOfficeCode { get; set; }
    public DateTime? NgayHenTraMoi { get; set; }
}
