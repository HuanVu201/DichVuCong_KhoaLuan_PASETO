using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_truonghopthutuc_trangthaihs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrangThaiHoSoId",
                schema: "Business",
                table: "QuyTrinhXuLys");

            migrationBuilder.AddColumn<string>(
                name: "MaTrangThaiHoSo",
                schema: "Business",
                table: "QuyTrinhXuLys",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaTrangThaiHoSo",
                schema: "Business",
                table: "QuyTrinhXuLys");

            migrationBuilder.AddColumn<Guid>(
                name: "TrangThaiHoSoId",
                schema: "Business",
                table: "QuyTrinhXuLys",
                type: "uniqueidentifier",
                nullable: true);
        }
    }
}
