using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class update_tbl_ketqualienquan_auditable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SuDung",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.RenameColumn(
                name: "NgayBanHanh",
                schema: "Business",
                table: "HoSos",
                newName: "NgayBanHanhKetQua");

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedBy",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeletedBy",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LastModifiedBy",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedOn",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.DropColumn(
                name: "LastModifiedOn",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.RenameColumn(
                name: "NgayBanHanhKetQua",
                schema: "Business",
                table: "HoSos",
                newName: "NgayBanHanh");

            migrationBuilder.AddColumn<bool>(
                name: "SuDung",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
