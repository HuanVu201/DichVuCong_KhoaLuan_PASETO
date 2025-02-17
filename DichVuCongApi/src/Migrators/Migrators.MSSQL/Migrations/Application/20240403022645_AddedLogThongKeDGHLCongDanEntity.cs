using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedLogThongKeDGHLCongDanEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LogThongKeDGHLCongDans",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DonVi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaHoSo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NguoiDanhGia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi4 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi5 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi6 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi7 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi8 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi9 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi10 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi11 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogThongKeDGHLCongDans", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LogThongKeDGHLCongDans_DeletedOn",
                schema: "Business",
                table: "LogThongKeDGHLCongDans",
                column: "DeletedOn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LogThongKeDGHLCongDans",
                schema: "Business");
        }
    }
}
