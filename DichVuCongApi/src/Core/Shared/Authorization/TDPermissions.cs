using System.Collections.ObjectModel;

namespace TD.DichVuCongApi.Shared.Authorization;

public static class TDAction
{
    public const string View = nameof(View);
    public const string Search = nameof(Search);
    public const string Create = nameof(Create);
    public const string Update = nameof(Update);
    public const string Delete = nameof(Delete);
    public const string Export = nameof(Export);
    public const string Generate = nameof(Generate);
    public const string Clean = nameof(Clean);
    public const string UpgradeSubscription = nameof(UpgradeSubscription);
    public const string Report = nameof(Report);
    public const string Full = nameof(Full);
}

public static class TDResource
{
    public const string Tenants = nameof(Tenants);
    public const string Dashboard = nameof(Dashboard);
    public const string Hangfire = nameof(Hangfire);
    public const string Users = nameof(Users);
    public const string UserRoles = nameof(UserRoles);
    public const string Roles = nameof(Roles);
    public const string RoleClaims = nameof(RoleClaims);
    public const string HoSo = nameof(HoSo);
    public const string NhomCanBoMotCua = nameof(NhomCanBoMotCua);
    public const string NhomChuyenVien = nameof(NhomChuyenVien);
    public const string NhomLanhDaoPhong = nameof(NhomLanhDaoPhong);
    public const string NhomLanhDaoDonVi = nameof(NhomLanhDaoDonVi);
    public const string NhomQuanTriDonVi = nameof(NhomQuanTriDonVi);
    public const string NhomQuanTriHeThong = nameof(NhomQuanTriHeThong);
    public const string NhomCanBoThuPhiTTHCC = nameof(NhomCanBoThuPhiTTHCC);
    public const string NhomCanBoTraKQTTHCC = nameof(NhomCanBoTraKQTTHCC);
    public const string NhomCanBoTTHCC = nameof(NhomCanBoTTHCC);
    public const string NhomCanBoXuLyChungThucDienTu = nameof(NhomCanBoXuLyChungThucDienTu);
    public const string NhomVanThuDonVi = nameof(NhomVanThuDonVi);
    public const string NhomCanBoBCCI = nameof(NhomCanBoBCCI);
    public const string NhomTraKetQuaCapHuyen = nameof(NhomTraKetQuaCapHuyen);
    public const string NhomVanThuUBNDTinh = nameof(NhomVanThuUBNDTinh);
    public const string NhomThongKeBaoCaoDonVi = nameof(NhomThongKeBaoCaoDonVi);
    public const string NhomTheoDoiHoSoDonVi = nameof(NhomTheoDoiHoSoDonVi);
    public const string NhomTraCuuHoSoToanDonVi = nameof(NhomTraCuuHoSoToanDonVi);
    public const string NhomDanhGiaHaiLongToanDonVi = nameof(NhomDanhGiaHaiLongToanDonVi);
    public const string NhomTraCuuCSDLQuocGiaDanCu = nameof(NhomTraCuuCSDLQuocGiaDanCu);
    public const string NhomVBDLIS = nameof(NhomVBDLIS);
    public const string NhomCanBoUpdatePhiDiaGioi = nameof(NhomCanBoUpdatePhiDiaGioi);
    public const string NhomCanBoViewPhiDiaGioi = nameof(NhomCanBoViewPhiDiaGioi);

    // public const string Products = nameof(Products);
    // public const string Brands = nameof(Brands);
}

public static class TDPermissions
{
    private static readonly TDPermission[] _all = new TDPermission[]
    {
        new("View Dashboard", TDAction.View, TDResource.Dashboard, IsBasic: true),
        new("View Hangfire", TDAction.View, TDResource.Hangfire),
        new("View Users", TDAction.View, TDResource.Users, IsQuanTriDonVi: true),
        new("Search Users", TDAction.Search, TDResource.Users),
        new("Create Users", TDAction.Create, TDResource.Users, IsQuanTriDonVi: true),
        new("Update Users", TDAction.Update, TDResource.Users, IsQuanTriDonVi: true),
        new("Delete Users", TDAction.Delete, TDResource.Users, IsQuanTriDonVi: true),
        new("Export Users", TDAction.Export, TDResource.Users, IsQuanTriDonVi: true),
        new("View UserRoles", TDAction.View, TDResource.UserRoles, IsQuanTriDonVi: true),
        new("Update UserRoles", TDAction.Update, TDResource.UserRoles),
        new("View Roles", TDAction.View, TDResource.Roles, IsQuanTriDonVi: true),
        new("Create Roles", TDAction.Create, TDResource.Roles),
        new("Update Roles", TDAction.Update, TDResource.Roles),
        new("Delete Roles", TDAction.Delete, TDResource.Roles),
        new("View RoleClaims", TDAction.View, TDResource.RoleClaims),
        new("Thêm mới hồ sơ", TDAction.Create, TDResource.HoSo, IsCanBoMotCua: true),
        new("Cập nhật hồ sơ", TDAction.Update, TDResource.HoSo, IsBasic: true),
        new("Xóa hồ sơ", TDAction.Delete, TDResource.HoSo, IsCanBoMotCua: true),
        new("Báo cáo, thống kê hồ sơ", TDAction.Report, TDResource.HoSo, IsCanBoMotCua: true, IsLanhDaoPhong: true, IsLanhDaoDonVi: true),
        new("Nhóm cán bộ một cửa", TDAction.View, TDResource.NhomCanBoMotCua, IsCanBoMotCua: true),
        new("Nhóm chuyên viên", TDAction.View, TDResource.NhomChuyenVien, IsChuyenVien: true),
        new("Nhóm lãnh đạo phòng", TDAction.View, TDResource.NhomLanhDaoPhong, IsLanhDaoPhong: true),
        new("Nhóm lãnh đạo đơn vị", TDAction.View, TDResource.NhomLanhDaoDonVi, IsLanhDaoDonVi: true),
        new("Nhóm cán bộ thu phí TTHCC", TDAction.View, TDResource.NhomCanBoThuPhiTTHCC, IsCanBoThuPhiTTHCC: true),
        new("Nhóm cán bộ trả kết quả TTHCC", TDAction.View, TDResource.NhomCanBoTraKQTTHCC, IsCanBoTraKQTTHCC: true),
        new("Nhóm cán bộ TTHCC", TDAction.View, TDResource.NhomCanBoTTHCC),
        new("Nhóm cán bộ xử lý chứng thực điện tử", TDAction.View, TDResource.NhomCanBoXuLyChungThucDienTu),
        new("Nhóm cán bộ bưu chính công ích", TDAction.View, TDResource.NhomCanBoBCCI),
        new("Nhóm cán bộ trả kết quả cấp huyện", TDAction.View, TDResource.NhomTraKetQuaCapHuyen),
        new("Nhóm văn thư VPUB Tỉnh", TDAction.View, TDResource.NhomVanThuUBNDTinh),
        new("Nhóm văn thư đơn vị", TDAction.View, TDResource.NhomVanThuDonVi, IsVanThuDonVi: true),
        new("Nhóm thống kê báo cáo đơn vị", TDAction.View, TDResource.NhomThongKeBaoCaoDonVi, IsQuanTriDonVi: true, IsCanBoMotCua: true, IsLanhDaoDonVi: true),
        new("Nhóm theo dõi hồ sơ tới hạn, quá hạn đơn vị", TDAction.View, TDResource.NhomTheoDoiHoSoDonVi, IsCanBoMotCua: true, IsLanhDaoDonVi: true),
        new("Nhóm tra cứu hồ sơ toàn đơn vị", TDAction.View, TDResource.NhomTraCuuHoSoToanDonVi, IsQuanTriDonVi: true),
        new("Nhóm đánh giá hài lòng toàn đơn vị", TDAction.View, TDResource.NhomDanhGiaHaiLongToanDonVi, IsQuanTriDonVi: true),
        new("Nhóm tra cứu CSDL quốc gia về dân cư", TDAction.View, TDResource.NhomTraCuuCSDLQuocGiaDanCu),
        new("Nhóm cán bộ VBDLIS", TDAction.View, TDResource.NhomVBDLIS),
        new("Nhóm quản trị đơn vị", TDAction.View, TDResource.NhomQuanTriDonVi, IsQuanTriDonVi: true),
        new("Nhóm quản trị hệ thống", TDAction.View, TDResource.NhomQuanTriHeThong),
        new("Nhóm cán bộ thực hiện phi địa giới", TDAction.View, TDResource.NhomCanBoUpdatePhiDiaGioi),
        new("Nhóm cán bộ xem phi địa giới", TDAction.View, TDResource.NhomCanBoViewPhiDiaGioi),
        new("Toàn quyền hệ thống", TDAction.Full, TDResource.Tenants, IsRoot: true)
    };

    public static IReadOnlyList<TDPermission> All { get; } = new ReadOnlyCollection<TDPermission>(_all);
    public static IReadOnlyList<TDPermission> Root { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsRoot).ToArray());
    public static IReadOnlyList<TDPermission> Admin { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => !p.IsRoot).ToArray());
    public static IReadOnlyList<TDPermission> NhomCanBoMotCua { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsCanBoMotCua || p.IsBasic).ToArray());
    public static IReadOnlyList<TDPermission> NhomChuyenVien { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsChuyenVien || p.IsBasic).ToArray());
    public static IReadOnlyList<TDPermission> NhomLanhDaoPhong { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsLanhDaoPhong || p.IsBasic).ToArray());
    public static IReadOnlyList<TDPermission> NhomLanhDaoDonVi { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsLanhDaoDonVi || p.IsBasic).ToArray());
    public static IReadOnlyList<TDPermission> NhomQuanTriDonVi { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsQuanTriDonVi || p.IsBasic).ToArray());
    public static IReadOnlyList<TDPermission> NhomCanBoThuPhiTTHCC { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsCanBoThuPhiTTHCC || p.IsBasic).ToArray());
    public static IReadOnlyList<TDPermission> NhomCanBoTraKQTTHCC { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsCanBoTraKQTTHCC || p.IsBasic).ToArray());
    public static IReadOnlyList<TDPermission> NhomVanThuDonVi { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsVanThuDonVi || p.IsBasic).ToArray());
    public static IReadOnlyList<TDPermission> NhomCanBoTTHCC { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomCanBoTTHCC).ToArray());
    public static IReadOnlyList<TDPermission> NhomCanBoXuLyChungThucDienTu { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomCanBoXuLyChungThucDienTu).ToArray());
    public static IReadOnlyList<TDPermission> NhomCanBoBCCI { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomCanBoBCCI).ToArray());
    public static IReadOnlyList<TDPermission> NhomTraKetQuaCapHuyen { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomTraKetQuaCapHuyen).ToArray());
    public static IReadOnlyList<TDPermission> NhomVanThuUBNDTinh { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomVanThuUBNDTinh).ToArray());
    public static IReadOnlyList<TDPermission> NhomThongKeBaoCaoDonVi { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomThongKeBaoCaoDonVi).ToArray());
    public static IReadOnlyList<TDPermission> NhomTheoDoiHoSoDonVi { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomTheoDoiHoSoDonVi).ToArray());
    public static IReadOnlyList<TDPermission> NhomTraCuuHoSoToanDonVi { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomTraCuuHoSoToanDonVi).ToArray());
    public static IReadOnlyList<TDPermission> NhomDanhGiaHaiLongToanDonVi { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomDanhGiaHaiLongToanDonVi).ToArray());
    public static IReadOnlyList<TDPermission> NhomTraCuuCSDLQuocGiaDanCu { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomTraCuuCSDLQuocGiaDanCu).ToArray());
    public static IReadOnlyList<TDPermission> NhomVBDLIS { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomVBDLIS).ToArray());
    public static IReadOnlyList<TDPermission> NhomCanBoViewPhiDiaGioi { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomCanBoViewPhiDiaGioi).ToArray());
    public static IReadOnlyList<TDPermission> NhomCanBoUpdatePhiDiaGioi { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.Resource == TDResource.NhomCanBoUpdatePhiDiaGioi).ToArray());
}

public record TDPermission(string Description, string Action, string Resource, bool IsBasic = false, bool IsCanBoMotCua = false, bool IsChuyenVien = false, bool IsLanhDaoPhong = false,
     bool IsLanhDaoDonVi = false, bool IsQuanTriDonVi = false, bool IsCanBoThuPhiTTHCC = false, bool IsCanBoTraKQTTHCC = false, bool IsVanThuDonVi = false, bool IsRoot = false)
{
    public string Name => NameFor(Action, Resource);
    public static string NameFor(string action, string resource) => $"Permissions.{resource}.{action}";
}
