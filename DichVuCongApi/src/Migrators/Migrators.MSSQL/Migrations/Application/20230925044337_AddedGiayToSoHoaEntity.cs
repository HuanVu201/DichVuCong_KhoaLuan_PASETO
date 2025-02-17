using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedGiayToSoHoaEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GiayToSoHoas",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Ma = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MaGiayToKhoQuocGia = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    MaDinhDanh = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MaGiayTo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    DonViId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    NguoiSoHoa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ThoiGianSoHoa = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ThoiHanHieuLuc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayBanHanh = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PhamViHieuLuc = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    TrichYeuNoiDung = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    CoQuanBanHanh = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    NguoiKy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LoaiSoHoa = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiayToSoHoas", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_GiayToSoHoa",
                schema: "Business",
                table: "GiayToSoHoas",
                columns: new[] { "MaGiayTo", "Ma", "MaGiayToKhoQuocGia", "MaDinhDanh" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GiayToSoHoas",
                schema: "Business");
        }
    }
}
