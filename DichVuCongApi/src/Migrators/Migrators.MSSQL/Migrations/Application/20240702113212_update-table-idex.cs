using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class updatetableidex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameIndex(
                name: "IX_HoSos_MaTTHC",
                schema: "Business",
                table: "HoSos",
                newName: "Idx_MaTTHC");

            migrationBuilder.RenameIndex(
                name: "IX_HoSos_MaHoSo",
                schema: "Business",
                table: "HoSos",
                newName: "Idx_MaHoSo");

            migrationBuilder.RenameIndex(
                name: "IX_DonViThuTucs_DonViId",
                schema: "Catalog",
                table: "DonViThuTucs",
                newName: "Idx_DonViId");

            migrationBuilder.AlterColumn<string>(
                name: "NguoiXuLyTiep",
                schema: "Business",
                table: "HoSos",
                type: "varchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(3000)",
                oldMaxLength: 3000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NguoiDangXuLy",
                schema: "Business",
                table: "HoSos",
                type: "varchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NguoiDaXuLy",
                schema: "Business",
                table: "HoSos",
                type: "varchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LoaiKetQua",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_DeletedOn",
                schema: "Business",
                table: "YeuCauThanhToans",
                column: "DeletedOn");

            migrationBuilder.CreateIndex(
                name: "Idx_GroupCode",
                schema: "Identity",
                table: "Users",
                column: "GroupCode");

            migrationBuilder.CreateIndex(
                name: "Idx_MaDinhDanhOfficeCode",
                schema: "Identity",
                table: "Users",
                column: "MaDinhDanhOfficeCode");

            migrationBuilder.CreateIndex(
                name: "Idx_OfficeCode",
                schema: "Identity",
                table: "Users",
                column: "OfficeCode");

            migrationBuilder.CreateIndex(
                name: "Idx_TypeUser",
                schema: "Identity",
                table: "Users",
                column: "TypeUser");

            migrationBuilder.CreateIndex(
                name: "Idx_UserName",
                schema: "Identity",
                table: "Users",
                column: "UserName");

            migrationBuilder.CreateIndex(
                name: "Idx_Ma",
                schema: "Business",
                table: "TruongHopThuTucs",
                column: "Ma");

            migrationBuilder.CreateIndex(
                name: "Idx_DeleteOn",
                schema: "Business",
                table: "ThanhPhanHoSos",
                column: "DeletedOn");

            migrationBuilder.CreateIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "ThanhPhanHoSos",
                column: "HoSo");

            migrationBuilder.CreateIndex(
                name: "Idx_DeletedOn",
                schema: "Business",
                table: "HoSos",
                column: "DeletedOn");

            migrationBuilder.CreateIndex(
                name: "Idx_DonViId",
                schema: "Business",
                table: "HoSos",
                column: "DonViId");

            migrationBuilder.CreateIndex(
                name: "Idx_MaTruongHop",
                schema: "Business",
                table: "HoSos",
                column: "MaTruongHop");

            migrationBuilder.CreateIndex(
                name: "Idx_NguoiDangXuLy",
                schema: "Business",
                table: "HoSos",
                column: "NguoiDangXuLy");

            migrationBuilder.CreateIndex(
                name: "Idx_NguoiDaXuLy",
                schema: "Business",
                table: "HoSos",
                column: "NguoiDaXuLy");

            migrationBuilder.CreateIndex(
                name: "Idx_NguoiNhanHoSo",
                schema: "Business",
                table: "HoSos",
                column: "NguoiNhanHoSo");

            migrationBuilder.CreateIndex(
                name: "Idx_SearchCongDanPortal",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "NguoiGui", "LaHoSoChungThuc", "DeletedOn" });

            migrationBuilder.CreateIndex(
                name: "Idx_SearchMain",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "NguoiDangXuLy", "TrangThaiHoSoId", "LaHoSoChungThuc", "ChoBanHanh", "DeletedOn" });

            migrationBuilder.CreateIndex(
                name: "Idx_SearchTraKetQua",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "TrangThaiHoSoId", "HinhThucTra", "TrangThaiTraKq", "TrangThaiBoSung", "LaHoSoChungThuc", "DonViTraKq", "DeletedOn" });

            migrationBuilder.CreateIndex(
                name: "Idx_GroupCode",
                schema: "Catalog",
                table: "Groups",
                column: "GroupCode");

            migrationBuilder.CreateIndex(
                name: "Idx_GroupName",
                schema: "Catalog",
                table: "Groups",
                column: "GroupName");

            migrationBuilder.CreateIndex(
                name: "Idx_MaDinhDanh",
                schema: "Catalog",
                table: "Groups",
                column: "MaDinhDanh");

            migrationBuilder.CreateIndex(
                name: "Idx_OfGroupCode",
                schema: "Catalog",
                table: "Groups",
                column: "OfGroupCode");

            migrationBuilder.CreateIndex(
                name: "Idx_MaTTHC",
                schema: "Catalog",
                table: "DonViThuTucs",
                column: "MaTTHC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_DeletedOn",
                schema: "Business",
                table: "YeuCauThanhToans");

            migrationBuilder.DropIndex(
                name: "Idx_GroupCode",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "Idx_MaDinhDanhOfficeCode",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "Idx_OfficeCode",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "Idx_TypeUser",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "Idx_UserName",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "Idx_Ma",
                schema: "Business",
                table: "TruongHopThuTucs");

            migrationBuilder.DropIndex(
                name: "Idx_DeleteOn",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropIndex(
                name: "Idx_DeletedOn",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_DonViId",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_MaTruongHop",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_NguoiDangXuLy",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_NguoiDaXuLy",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_NguoiNhanHoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_SearchCongDanPortal",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_SearchMain",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_SearchTraKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_GroupCode",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropIndex(
                name: "Idx_GroupName",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropIndex(
                name: "Idx_MaDinhDanh",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropIndex(
                name: "Idx_OfGroupCode",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropIndex(
                name: "Idx_MaTTHC",
                schema: "Catalog",
                table: "DonViThuTucs");

            migrationBuilder.RenameIndex(
                name: "Idx_MaTTHC",
                schema: "Business",
                table: "HoSos",
                newName: "IX_HoSos_MaTTHC");

            migrationBuilder.RenameIndex(
                name: "Idx_MaHoSo",
                schema: "Business",
                table: "HoSos",
                newName: "IX_HoSos_MaHoSo");

            migrationBuilder.RenameIndex(
                name: "Idx_DonViId",
                schema: "Catalog",
                table: "DonViThuTucs",
                newName: "IX_DonViThuTucs_DonViId");

            migrationBuilder.AlterColumn<string>(
                name: "NguoiXuLyTiep",
                schema: "Business",
                table: "HoSos",
                type: "varchar(3000)",
                maxLength: 3000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NguoiDangXuLy",
                schema: "Business",
                table: "HoSos",
                type: "varchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NguoiDaXuLy",
                schema: "Business",
                table: "HoSos",
                type: "varchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LoaiKetQua",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);
        }
    }
}
