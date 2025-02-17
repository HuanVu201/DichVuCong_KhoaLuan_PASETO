using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_kqtt_thoihan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LoaiThoiHan",
                schema: "Business",
                table: "KetQuaThuTucs",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ThoiHanMacDinh",
                schema: "Business",
                table: "KetQuaThuTucs",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LoaiThoiHan",
                schema: "Business",
                table: "KetQuaThuTucs");

            migrationBuilder.DropColumn(
                name: "ThoiHanMacDinh",
                schema: "Business",
                table: "KetQuaThuTucs");
        }
    }
}
