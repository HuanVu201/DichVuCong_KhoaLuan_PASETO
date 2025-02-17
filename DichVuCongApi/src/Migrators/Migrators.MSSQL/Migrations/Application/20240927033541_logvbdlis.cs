using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class logvbdlis : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "LaThuTucLienThongDatDai",
                schema: "Catalog",
                table: "ThuTucs",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LogVBDLISs",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Api = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaHoSo = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogVBDLISs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_LogVBDLIS_Name",
                schema: "Business",
                table: "LogVBDLISs",
                column: "MaHoSo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LogVBDLISs",
                schema: "Business");

            migrationBuilder.DropColumn(
                name: "LaThuTucLienThongDatDai",
                schema: "Catalog",
                table: "ThuTucs");
        }
    }
}
