using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class LoaiGiayToKhoLuuTru : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EformData",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LoaiGiayToId",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LoaiGiayToKhoLuuTrus",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ma = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Eform = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SuDung = table.Column<bool>(type: "bit", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoaiGiayToKhoLuuTrus", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_LoaiGiayToKhoLuuTru_Name",
                schema: "Business",
                table: "LoaiGiayToKhoLuuTrus",
                column: "Ma");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LoaiGiayToKhoLuuTrus",
                schema: "Business");

            migrationBuilder.DropColumn(
                name: "EformData",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans");

            migrationBuilder.DropColumn(
                name: "LoaiGiayToId",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans");
        }
    }
}
