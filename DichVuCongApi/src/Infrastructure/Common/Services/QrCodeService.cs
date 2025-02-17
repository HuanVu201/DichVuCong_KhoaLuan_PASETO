using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Data;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.QrCodeServive;

namespace TD.DichVuCongApi.Infrastructure.Common.Services;
public class QrCodeService : IQrCodeService
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ILogger<QrCodeService> _logger;
    //private readonly string? _connectionStr;

    public QrCodeService(IDapperRepository dapperRepository, IConfiguration configuration, ILogger<QrCodeService> logger)
    {
        _dapperRepository = dapperRepository;
        _logger = logger;
        //_connectionStr = configuration.GetValue<string>("QRCodeConnectString");
        //if (_connectionStr.StartsWith("Crypt:"))
        //{
        //    _connectionStr = _connectionStr.Replace("Crypt:", string.Empty);
        //    _connectionStr = Encryption.Decrypt(_connectionStr);
        //}
    }

    private bool Validate()
    {
        //if (_connectionStr == null)
        //{
        //    return false;
        //}

        return true;
    }

    public async Task LogAsync(QrCodeServiceRequestParams req)
    {
        bool hasConnectStr = Validate();
        if (!hasConnectStr)
        {
            _logger.LogError("Chưa cấu hình QRCodeConnetString");

            return;
        }

        try
        {
            //using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            //{
            //    targetConnection.Open();
            //    string createTableIfNotExistSql = @"
            //        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'QrCodeServices')
            //            BEGIN
            //                CREATE TABLE QrCodeServices (
            //                    Id UNIQUEIDENTIFIER PRIMARY KEY,
            //                    Content NVARCHAR(MAX) NOT NULL,
            //                    Expiry datetime2(7),
            //                    CreatedAt datetime2(7)
            //                );
            //            END;";
            //    string sql = @$"
            //        {createTableIfNotExistSql}
            //        INSERT INTO QrCodeServices
            //        (CreatedAt, Id, Content, Expiry) VAlUES
            //        (GetDate(), @Id,@Content, @Expiry);";
            //    await targetConnection.ExecuteAsync(sql, req);
            //}

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lưu QrCode thất bại:");
        }
    }

    public async Task<iQrCode?> GetQrAsync(GetQrCodeById req)
    {
        bool hasConnectStr = Validate();

        if (!hasConnectStr)
        {
            _logger.LogError("Chưa cấu hình QRCodeConnetString");
            return null;
        }

        try
        {
            //using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            //{
            //    targetConnection.Open();
            //    string sql = @$"
            //        SELECT [Id], [Content], [CreatedAt]
            //        FROM QrCodeServices
            //        WHERE Id = '{req.Id}'";

            //    return await targetConnection.QuerySingleAsync<iQrCode>(sql);
            //}

            return null;

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lấy QrCode thất bại: " + req.Id);
            return null;
        }
    }
}
