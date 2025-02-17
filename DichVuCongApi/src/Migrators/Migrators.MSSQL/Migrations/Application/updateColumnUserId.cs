using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Migrators.MSSQL.Migrations.Application;
public partial class updateColumnUserId : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        string sql = @"
                    IF NOT EXISTS (
                        SELECT * 
                        FROM sys.columns 
                        WHERE object_id = OBJECT_ID(N'[Portal].[PhanAnhKienNghis]')
                        AND name = 'UserId'
                    )
                    BEGIN
                        ALTER TABLE [Portal].[PhanAnhKienNghis]
                        ADD UserId UNIQUEIDENTIFIER NULL;
                    END";

        migrationBuilder.Sql(sql);
    }
}
