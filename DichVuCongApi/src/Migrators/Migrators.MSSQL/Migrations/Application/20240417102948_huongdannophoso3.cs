using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class huongdannophoso3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_ThanhPhanHuongDanNopHoSo",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropIndex(
                name: "IX_ThanhPhanHuongDanNopHoSos_SoChungThucDT_SoChungThucDienTu",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DaChungThucDienTu",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DinhKem",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DuocLayTuKhoDMQuocGia",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "KyDienTuBanGiay",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "MaGiayTo",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "MaGiayToKhoQuocGia",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "MaGiayToSoHoa",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "MaKetQuaThayThe",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NguoiKyChungThuc",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NhanBanGiay",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NoiDungBoSung",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "SoBanGiay",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "SoChungThucDT",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "SoChungThucDienTu",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "SoChungThucG",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "SoChungThucGiay",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "SoTrang",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "TrangThaiSoHoa",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "BuocHienTai",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "BuocXuLyTiep",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "BuocXuLyTruoc",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "ChoBanHanh",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "ChoXacNhan",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "ChuyenNoiBo",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "CoQuanBanHanhKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DaSoHoaKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DangKyNhanHoSoQuaBCCIData",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DiaChiNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DinhKemBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DinhKemKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DinhKemSoHoa",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DinhKemTuChoi",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DinhKemYKienNguoiChuyenXuLy",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DonViQuanLy",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DonViTraKq",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "DuocThanhToanTrucTuyen",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "EFormData",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "EFormKetQuaData",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "EmailNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "HinhThucTra",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "KenhThucHien",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "KetQuaDaySangQLVB",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "LaHoSoChungThuc",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "LoaiGiayToNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "LoaiThoiGianThucHien",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "LoaiVanBanKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "MucDo",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NgayBanHanhKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NgayCongDanBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NgayHenTra",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NgayHenTraCaNhan",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NgayKetThucXuLy",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NgayNopHoSo",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NgaySinhNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NgayTiepNhanCaNhan",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NgayTra",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NgayYeuCauBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NguoiDaXuLy",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NguoiDangXuLy",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NguoiGui",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NguoiKyKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NguoiXuLyTiep",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NguoiXuLyTruoc",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "NoiDungBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "QuanHuyenNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "SoBoHoSo",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "SoDienThoaiNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "SoGiayToNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "SoKyHieuKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "TaiKhoanDuocXacThucVoiVNeID",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "TenBuocHienTai",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "ThanhPhanBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "ThoiGianThucHien",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "ThoiHanBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "ThongBaoEmail",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "ThongBaoSMS",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "ThongBaoZalo",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "ThongTinTiepNhanBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "TinhThanhNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "TrangThaiBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "TrangThaiHoSoId",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "TrangThaiTraKq",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "TrangThaiTruoc",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "TrichYeuKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "UyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "XaPhuongNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.DropColumn(
                name: "YKienNguoiChuyenXuLy",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.RenameColumn(
                name: "TrangThaiDuyet",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                newName: "GhiChu");

            migrationBuilder.RenameColumn(
                name: "LyDoXoa",
                schema: "Business",
                table: "HuongDanNopHoSos",
                newName: "TenTTHC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GhiChu",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                newName: "TrangThaiDuyet");

            migrationBuilder.RenameColumn(
                name: "TenTTHC",
                schema: "Business",
                table: "HuongDanNopHoSos",
                newName: "LyDoXoa");

            migrationBuilder.AddColumn<bool>(
                name: "DaChungThucDienTu",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DinhKem",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "nvarchar(1200)",
                maxLength: 1200,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "DuocLayTuKhoDMQuocGia",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "KyDienTuBanGiay",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaGiayTo",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaGiayToKhoQuocGia",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaGiayToSoHoa",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaKetQuaThayThe",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "NguoiKyChungThuc",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "NhanBanGiay",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NoiDungBoSung",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoBanGiay",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoChungThucDT",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoChungThucDienTu",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoChungThucG",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoChungThucGiay",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoTrang",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrangThaiSoHoa",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BuocHienTai",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BuocXuLyTiep",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BuocXuLyTruoc",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ChoBanHanh",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ChoXacNhan",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ChuyenNoiBo",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CoQuanBanHanhKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "DaSoHoaKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DangKyNhanHoSoQuaBCCIData",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(1500)",
                maxLength: 1500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DiaChiNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DinhKemBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DinhKemKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DinhKemSoHoa",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(1200)",
                maxLength: 1200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DinhKemTuChoi",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DinhKemYKienNguoiChuyenXuLy",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DonViQuanLy",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DonViTraKq",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DuocThanhToanTrucTuyen",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(2)",
                maxLength: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EFormData",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EFormKetQuaData",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmailNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HinhThucTra",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KenhThucHien",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(2)",
                maxLength: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KetQuaDaySangQLVB",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "LaHoSoChungThuc",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LoaiGiayToNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LoaiThoiGianThucHien",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LoaiVanBanKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MucDo",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayBanHanhKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayCongDanBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayHenTra",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayHenTraCaNhan",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayKetThucXuLy",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayNopHoSo",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NgaySinhNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayTiepNhanCaNhan",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayTra",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayYeuCauBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiDaXuLy",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiDangXuLy",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiGui",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiKyKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiXuLyTiep",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiXuLyTruoc",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NoiDungBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuanHuyenNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoBoHoSo",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoDienThoaiNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoGiayToNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoKyHieuKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(60)",
                maxLength: 60,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TaiKhoanDuocXacThucVoiVNeID",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(2)",
                maxLength: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TenBuocHienTai",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThanhPhanBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ThoiGianThucHien",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ThoiHanBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ThongBaoEmail",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ThongBaoSMS",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ThongBaoZalo",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThongTinTiepNhanBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TinhThanhNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrangThaiBoSung",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrangThaiHoSoId",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrangThaiTraKq",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "varchar(3)",
                maxLength: 3,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrangThaiTruoc",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrichYeuKetQua",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "UyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "XaPhuongNguoiUyQuyen",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "YKienNguoiChuyenXuLy",
                schema: "Business",
                table: "HuongDanNopHoSos",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_ThanhPhanHuongDanNopHoSo",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                columns: new[] { "MaGiayTo", "MaGiayToSoHoa", "MaGiayToKhoQuocGia", "MaKetQuaThayThe" });

            migrationBuilder.CreateIndex(
                name: "IX_ThanhPhanHuongDanNopHoSos_SoChungThucDT_SoChungThucDienTu",
                schema: "Business",
                table: "ThanhPhanHuongDanNopHoSos",
                columns: new[] { "SoChungThucDT", "SoChungThucDienTu" },
                unique: true,
                filter: "[SoChungThucDT] IS NOT NULL AND [SoChungThucDienTu] IS NOT NULL");
        }
    }
}
