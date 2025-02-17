using System.Data;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
public interface INguoiXuLyHoSoService : ITransientService
{
    Task<int> AddNguoiXuLyHoSo(NguoiXuLyHoSo nguoiXuLyHoSo, IDbTransaction? transaction = null, CancellationToken cancellationToken = default);
    Task<int> AddNguoiXuLyHoSos(List<NguoiXuLyHoSo> nguoiXuLyHoSos, IDbTransaction? transaction = null, CancellationToken cancellationToken = default);
    Task<int> AddNguoiXuLyHoSos(string nguoiXuLys, DefaultIdType hoSoId, string trangThai = NguoiXuLyHoSo.NguoiXuLyHoSo_TrangThai.DangXuLy, IDbTransaction? transaction = null, CancellationToken cancellationToken = default);
    Task<int> UpdateAndRemoveOtherHandlers(DefaultIdType hoSoId, string nguoiXuLyTieps, CancellationToken cancellationToken = default);
    Task<int> OverrideNguoiDangXuLy(DefaultIdType hoSoId, string nguoiXuLyTieps, string trangThaiDefault);
    Task<int> SetCurrentUserAsNguoiDangXuLy(DefaultIdType hoSoId);
    Task<int> SetCurrentUserAsNguoiDaXuLy(DefaultIdType hoSoId);
    Task<int> SwapNguoiDangXuLyAndNguoiDaXuLy(DefaultIdType hoSoId, string nguoiDaXuLy, string trangThaiNguoiDangXuLy = NguoiXuLyHoSo.NguoiXuLyHoSo_TrangThai.DaXuLy);
    Task<int> SetNguoiDangXuLyAsNguoiDaXuLy(DefaultIdType hoSoId);
    Task<int> SetCurrentUserAsRemoved(DefaultIdType hoSoId);
    Task<int> SetUserAsNguoiDangXuLy(DefaultIdType hoSoId, string userId);
    Task<int> SwapNguoiDangXuLyAndNguoiDaXuLyByNguoiNhanHoSo(string maHoSo);
    Task<int> ReplaceUsersToNguoiDangXuLy(DefaultIdType hoSoId, string nguoiXuLyTieps);
}
