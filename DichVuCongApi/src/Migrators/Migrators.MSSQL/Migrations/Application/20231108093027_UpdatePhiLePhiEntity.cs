using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class UpdatePhiLePhiEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_PhiLePhi",
                schema: "Business",
                table: "PhiLePhis");

            migrationBuilder.DropColumn(
                name: "DonVi",
                schema: "Business",
                table: "PhiLePhis");

            migrationBuilder.AlterColumn<string>(
                name: "Ma",
                schema: "Business",
                table: "PhiLePhis",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);

            migrationBuilder.CreateIndex(
                name: "Idx_PhiLePhi",
                schema: "Business",
                table: "PhiLePhis",
                columns: new[] { "ThuTucId", "Loai" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_PhiLePhi",
                schema: "Business",
                table: "PhiLePhis");

            migrationBuilder.AlterColumn<string>(
                name: "Ma",
                schema: "Business",
                table: "PhiLePhis",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DonVi",
                schema: "Business",
                table: "PhiLePhis",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "Idx_PhiLePhi",
                schema: "Business",
                table: "PhiLePhis",
                columns: new[] { "ThuTucId", "Loai", "DonVi" });
        }
    }
}
