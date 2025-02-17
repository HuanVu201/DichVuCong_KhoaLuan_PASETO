using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Classes;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using static TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS.LienThongILISParams;

namespace TD.DichVuCongApi.Application.Business.HoSoApp;
public interface IHoSoServices : ITransientService
{
    Task<LienThongTrucDVCQLVB> GuiHoSoLTQLVB(HoSoQLVB hoSo, NguoiKyLienThongQLVB nguoiKy, NguoiKyLienThongQLVB nguoiTrinhKy, string? reqDinhKemKetQua, string? reqTrichYeuKetQua, string officeName, string maDinhDanhOfficeCode, object? thamSoAn, string? trichYeu, string? reqLoaiVanBanKetQua, string? reqCoQuanBanHanh = null, string? reqNguoiKyVanBan = null, string? reqSoKyHieuVanBan = null, DateTime? ngayHenTraCaNhan = null);
    QuyTrinhXuLyResponse GetNextNode(TruongHopThuTuc truongHopThuTuc, string buocHienTai, string currentNodeId = null);
    ReactFlowNodeQuyTrinhXuLy GetCurrentNode(TruongHopThuTuc truongHopThuTuc, string currentNodeId);
    ReactFlowNodeQuyTrinhXuLy GetFirstNode(TruongHopThuTuc truongHopThuTuc);
    //Task YeuCauMotCuaBoSungHoSo(HoSo hoSo, MotCuaYeuCauBoSungCommand req, string? userId);
    Task<ChuyenBuocXuLyType> ChuyenBuoc(DateTime currentTime, TruongHopThuTuc truongHopThuTuc, HoSoQLVB? hoSo, string? buocHienTai, List<NgayNghi>? ngayNghis, double soGioMacDinhBuocXuLy, UserDetailsDto currUser, string? reqDinhKemKetQua, string? reqTrichYeuKetQua, string? nguoiXuLyTiep, string? reqLoaiVanBanKetQua, string? reqCoQuanBanHanh = null, string? reqNguoiKyVanBan = null, string? reqSoKyHieuVanBan = null);
    Task<bool> ChuyenBuocXuLyQuanLyVanBan(ChuyenBuocXuLyQLVB req, HoSoQLVB hoSo, bool addKetQuaLienQuan = false);

    Task<bool> YeuCauMotCuaBoSungHoSo(MotCuaYeuCauBoSungCommand request, HoSo hoSo, DateTime currentTime, string userFullName, string? userId, string? tenBuocXuLy);
    Task<bool> ChuyenTraHoSo(ChuyenTraHoSoCommand request, HoSo hoSo, DateTime currentTime, string userFullName, string thaoTacVet);
    Task<bool> DuThaoXinLoi(DuThaoXinLoiResponse request, HoSoQLVB hoSo, DateTime currentTime, string userFullName, DateTime ngayHenTraMoi);
    Task<bool> HasPermissionHandleHoSo(HoSo hoSo, CancellationToken cancellationToken = default);
    Task<HoSoPer?> GetRequiredFieldForCheckPersHoSo(DefaultIdType? Id, string? maHoSo);
    Task<CapNhatKetQuaThongBaoThueResponse> CapNhatKetQuaILIS(CapNhatKetQuaThongBaoThueRequest request, CancellationToken cancellationToken = default);
}
