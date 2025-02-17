using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedThanhPhanHoSoEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ThanhPhanHoSoes",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    HoSo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SoBanChinh = table.Column<int>(type: "int", nullable: true),
                    SoBanSao = table.Column<int>(type: "int", nullable: true),
                    MaGiayToKhoQuocGia = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    DinhKem = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    NhanBanGiay = table.Column<bool>(type: "bit", nullable: false),
                    MaGiayToSoHoa = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    TrangThaiSoHoa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MaGiayTo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    DuocLayTuKhoDMQuocGia = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MaKetQuaThayThe = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThanhPhanHoSoes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_ThanhPhanHoSo",
                schema: "Business",
                table: "ThanhPhanHoSoes",
                columns: new[] { "MaGiayTo", "MaGiayToSoHoa", "MaGiayToKhoQuocGia", "MaKetQuaThayThe" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ThanhPhanHoSoes",
                schema: "Business");
        }
    }
}
