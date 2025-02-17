using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class udTenPhiLePhi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Ten",
                schema: "Business",
                table: "PhiLePhis",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150);

            migrationBuilder.CreateTable(
                name: "HoSoNhaps",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DonViId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    DonViQuanLy = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ChoXacNhan = table.Column<bool>(type: "bit", nullable: true),
                    KenhThucHien = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    LoaiDoiTuong = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MaDoiTuong = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    ChuHoSo = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    SoDienThoaiChuHoSo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    EmailChuHoSo = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    SoGiayToChuHoSo = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    LoaiGiayToChuHoSo = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    NgaySinhChuHoSo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    TinhThanhChuHoSo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    QuanHuyenChuHoSo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    XaPhuongChuHoSo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    DiaChiChuHoSo = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    UyQuyen = table.Column<bool>(type: "bit", nullable: true),
                    NguoiUyQuyen = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    SoDienThoaiNguoiUyQuyen = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    EmailNguoiUyQuyen = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    SoGiayToNguoiUyQuyen = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    LoaiGiayToNguoiUyQuyen = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    NgaySinhNguoiUyQuyen = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    TinhThanhNguoiUyQuyen = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    QuanHuyenNguoiUyQuyen = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    XaPhuongNguoiUyQuyen = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    DiaChiNguoiUyQuyen = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    TrichYeuHoSo = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    NgayTiepNhan = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayHenTra = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TrangThaiHoSoId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    NgayTra = table.Column<DateTime>(type: "datetime2", nullable: true),
                    HinhThucTra = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    NgayKetThucXuLy = table.Column<DateTime>(type: "datetime2", nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    NoiNopHoSo = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    HoSoCoThanhPhanSoHo = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    TaiKhoanDuocXacThucVoiVNeID = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    DuocThanhToanTrucTuyen = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    NgayTuChoi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LoaiDinhDanh = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    SoDinhDanh = table.Column<string>(type: "varchar(40)", maxLength: 40, nullable: true),
                    NgayNopHoSo = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MaTTHC = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    MaLinhVuc = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    TenLinhVuc = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    TenTruongHop = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    MaTruongHop = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    TruongHopId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    ThoiGianThucHien = table.Column<double>(type: "float", nullable: true),
                    LoaiThoiGianThucHien = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ThongBaoEmail = table.Column<bool>(type: "bit", nullable: true),
                    ThongBaoZalo = table.Column<bool>(type: "bit", nullable: true),
                    ThongBaoSMS = table.Column<bool>(type: "bit", nullable: true),
                    NguoiXuLyTiep = table.Column<string>(type: "varchar(3000)", maxLength: 3000, nullable: true),
                    BuocXuLyTiep = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    NguoiNhanHoSo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    NguoiDaXuLy = table.Column<string>(type: "varchar(2000)", maxLength: 2000, nullable: true),
                    MucDo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SoBoHoSo = table.Column<int>(type: "int", nullable: true),
                    TenBuocHienTai = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    BuocHienTai = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    NguoiXuLyTruoc = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    BuocXuLyTruoc = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    DangKyNhanHoSoQuaBCCIData = table.Column<string>(type: "nvarchar(1500)", maxLength: 1500, nullable: true),
                    TrichYeuKetQua = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    DinhKemKetQua = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    LoaiVanBanKetQua = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    SoKyHieuKetQua = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: true),
                    NguoiKyKetQua = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CoQuanBanHanhKetQua = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    NgayBanHanhKetQua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayKyKetQua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    YKienNguoiChuyenXuLy = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    DinhKemYKienNguoiChuyenXuLy = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    NguoiDangXuLy = table.Column<string>(type: "varchar(2000)", maxLength: 2000, nullable: true),
                    ChuyenNoiBo = table.Column<bool>(type: "bit", nullable: true),
                    LyDoXoa = table.Column<string>(type: "nvarchar(1500)", maxLength: 1500, nullable: true),
                    NgayTiepNhanCaNhan = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayHenTraCaNhan = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TrangThaiBoSung = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TrangThaiTruoc = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    NgayYeuCauBoSung = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LyDoBoSung = table.Column<string>(type: "nvarchar(1500)", maxLength: 1500, nullable: true),
                    DinhKemBoSung = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ThongTinTiepNhanBoSung = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ThanhPhanBoSung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NguoiGui = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    EFormData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EFormKetQuaData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LyDoTuChoi = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DinhKemTuChoi = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ChoBanHanh = table.Column<bool>(type: "bit", nullable: true),
                    KetQuaDaySangQLVB = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayCongDanBoSung = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ThoiHanBoSung = table.Column<int>(type: "int", nullable: true),
                    NoiDungBoSung = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DaSoHoaKetQua = table.Column<bool>(type: "bit", nullable: true),
                    DinhKemSoHoa = table.Column<string>(type: "nvarchar(1200)", maxLength: 1200, nullable: true),
                    TrangThaiTraKq = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: true),
                    DonViTraKq = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    LaHoSoChungThuc = table.Column<bool>(type: "bit", nullable: true),
                    DonViChuyenXuLy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    HanTiepNhan = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TinhThanhDiaBan = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    QuanHuyenDiaBan = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    XaPhuongDiaBan = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    TenDiaBan = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoSoNhaps", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_HoSoNhap",
                schema: "Business",
                table: "HoSoNhaps",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HoSoNhaps",
                schema: "Business");

            migrationBuilder.AlterColumn<string>(
                name: "Ten",
                schema: "Business",
                table: "PhiLePhis",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(2000)",
                oldMaxLength: 2000);
        }
    }
}
