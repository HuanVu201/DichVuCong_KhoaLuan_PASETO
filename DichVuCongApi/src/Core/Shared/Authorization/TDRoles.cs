using System.Collections.ObjectModel;

namespace TD.DichVuCongApi.Shared.Authorization;

public static class TDRoles
{
    public const string QuanTriHeThong = "Quản trị hệ thống";
    public const string CanBoMotCua = "Cán bộ một cửa";
    public const string ChuyenVien = "Chuyên viên";
    public const string LanhDaoPhong = "Lãnh đạo phòng";
    public const string LanhDaoDonVi = "Lãnh đạo đơn vị";
    public const string QuanTriDonVi = "Quản trị đơn vị";

    // public const string SupperAdmin = "SupperAdmin";
    public const string CanBoThuPhiTTHCC = "Cán bộ Thu phí TTHCC";
    public const string CanBoTraKQTTHCC = "Cán bộ Trả kết quả TTHCC";
    public const string CanBoTTHCC = "Cán bộ TTHCC";
    public const string CanBoXuLyChungThucDienTu = "Cán bộ xử lý chứng thực điện tử";
    public const string VanThuDonVi = "Văn thư đơn vị";
    public const string CanBoBCCI = "Cán bộ bưu chính công ích";
    public const string CanBoTraKetQuaCapHuyen = "Cán bộ trả kết quả cấp huyện";
    public const string VanThuUBNDTinh = "Văn thư VPUB Tỉnh";
    public const string TheoDoiHoSoDonVi = "Theo dõi hồ sơ tới hạn, quá hạn đơn vị";
    public const string TraCuuHoSoToanDonVi = "Tra cứu hồ sơ toàn đơn vị";
    public const string DanhGiaHaiLongToanDonVi = "Đánh giá hài lòng toàn đơn vị";
    public const string ThongKeBaoCaoDonVi = "Thống kê báo cáo đơn vị";
    public const string TraCuuCSDLQuocGiaDanCu = "Tra cứu CSDL quốc gia về dân cư";
    public const string NhomVBDLIS = "Nhóm VBDLIS";
    public const string NhomCanBoThucHienPhiDiaGioi = "Nhóm cán bộ thực hiện phi địa giới";

    public static IReadOnlyList<string> DefaultRoles { get; } = new ReadOnlyCollection<string>(new[]
    {
        QuanTriHeThong,
        CanBoMotCua,
        ChuyenVien,
        LanhDaoPhong,
        LanhDaoDonVi,
        QuanTriDonVi,
        CanBoThuPhiTTHCC,
        CanBoTraKQTTHCC,
        CanBoTTHCC,
        CanBoXuLyChungThucDienTu,
        VanThuDonVi,
        CanBoBCCI,
        CanBoTraKetQuaCapHuyen,
        VanThuUBNDTinh,
        TheoDoiHoSoDonVi,
        TraCuuHoSoToanDonVi,
        DanhGiaHaiLongToanDonVi,
        ThongKeBaoCaoDonVi,
        TraCuuCSDLQuocGiaDanCu,
        NhomVBDLIS,
        NhomCanBoThucHienPhiDiaGioi,
    });

    public static bool IsDefault(string roleName) => DefaultRoles.Any(r => r == roleName);
}