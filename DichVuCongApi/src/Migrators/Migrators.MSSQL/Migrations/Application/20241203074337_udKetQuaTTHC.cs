using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class udKetQuaTTHC : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CreatedBy",
                schema: "Business",
                table: "KetQuaThuTucs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                schema: "Business",
                table: "KetQuaThuTucs",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeletedBy",
                schema: "Business",
                table: "KetQuaThuTucs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                schema: "Business",
                table: "KetQuaThuTucs",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LastModifiedBy",
                schema: "Business",
                table: "KetQuaThuTucs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedOn",
                schema: "Business",
                table: "KetQuaThuTucs",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                schema: "Business",
                table: "KetQuaThuTucs");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                schema: "Business",
                table: "KetQuaThuTucs");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                schema: "Business",
                table: "KetQuaThuTucs");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                schema: "Business",
                table: "KetQuaThuTucs");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                schema: "Business",
                table: "KetQuaThuTucs");

            migrationBuilder.DropColumn(
                name: "LastModifiedOn",
                schema: "Business",
                table: "KetQuaThuTucs");
        }
    }
}
