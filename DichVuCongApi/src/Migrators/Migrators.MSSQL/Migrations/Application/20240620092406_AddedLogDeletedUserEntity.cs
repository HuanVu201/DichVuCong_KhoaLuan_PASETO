using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedLogDeletedUserEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LogDeletedUsers",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    TypeUser = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    GroupCode = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    GroupName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    OfficeCode = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    OfficeName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    PositionCode = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    PositionName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    SoDinhDanh = table.Column<string>(type: "varchar(35)", maxLength: 35, nullable: true),
                    SoCMND = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: true),
                    GioiTinh = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    DanToc = table.Column<string>(type: "varchar(5)", maxLength: 5, nullable: true),
                    TonGiao = table.Column<string>(type: "varchar(12)", maxLength: 12, nullable: true),
                    NgayThangNamSinh = table.Column<string>(type: "varchar(80)", maxLength: 80, nullable: true),
                    NoiDangKyKhaiSinh = table.Column<string>(type: "nvarchar(750)", maxLength: 750, nullable: true),
                    QueQuan = table.Column<string>(type: "nvarchar(750)", maxLength: 750, nullable: true),
                    ThuongTru = table.Column<string>(type: "nvarchar(750)", maxLength: 750, nullable: true),
                    NoiOHienTai = table.Column<string>(type: "nvarchar(750)", maxLength: 750, nullable: true),
                    Cha = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Me = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    VoChong = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    NguoiDaiDien = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    ChuHo = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    HoVaTen = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    SoSoHoKhau = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    MaDinhDanhOfficeCode = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    ChucDanh = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ThoiGianXoa = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogDeletedUsers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LogDeletedUsers_Id",
                schema: "Business",
                table: "LogDeletedUsers",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LogDeletedUsers",
                schema: "Business");
        }
    }
}
