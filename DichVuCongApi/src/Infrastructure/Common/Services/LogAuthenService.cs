using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Data;
using TD.DichVuCongApi.Application.Catalog.LogAuthen;
using TD.DichVuCongApi.Application.Catalog.LogAuthen.Queries;
using TD.DichVuCongApi.Application.Catalog.LogAuthen.Service;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Catalog.Catalog.LogAuthen.Queries;
using TD.DichVuCongApi.Infrastructure.Persistence.Repository;

namespace TD.DichVuCongApi.Infrastructure.Common.Services;
public class LogAuthenService : ILogAuthenService
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ILogger<LogAuthenService> _logger;
    //private string? _connectionStr;

    public LogAuthenService(IDapperRepository dapperRepository, IConfiguration configuration, ILogger<LogAuthenService> logger)
    {
        _dapperRepository = dapperRepository;
        _logger = logger;
        //_connectionStr = configuration.GetValue<string>("ServiceLoggerConnectString");
        //if (_connectionStr.StartsWith("Crypt:"))
        //{
        //    _connectionStr = _connectionStr.Replace("Crypt:", string.Empty);
        //    _connectionStr = Encryption.Decrypt(_connectionStr);
        //}
    }

    private bool ValidateConnectionStr()
    {
        //if (_connectionStr == null)
        //{
        //    return false;
        //}

        return true;
    }

    public async Task<PaginationResponse<LogAuthenDto>> SearchLogAuthenAsync(string sqlQuery, SearchLogAuthenQuery request, CancellationToken cancellationToken)
    {
        bool hasConnectStr = ValidateConnectionStr();
        if (!hasConnectStr)
        {
            _logger.LogError("Chưa cấu hình ServiceLoggerConnectString");

            return null;
        }

        try
        {
            //using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            //{
            //    targetConnection.Open();
            //    return await targetConnection.PaginatedListSingleQueryAsync<LogAuthenDto>(sqlQuery, request.PageSize, "CreatedAt DESC", cancellationToken, request.PageNumber, request);
            //}
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError("Lấy thông tin LogAuthen Service thất bại!" + ex.ToString());
            return null;
        }
    }

    public async Task<LogAuthenDetailDto> GetLogAuthenDetailAsync(GetLogAuthenQuery request)
    {
        bool hasConnectStr = ValidateConnectionStr();
        if (!hasConnectStr)
        {
            _logger.LogError("Chưa cấu hình ServiceLoggerConnectString");

            return null;
        }

        try
        {
            //using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            //{
            //    targetConnection.Open();

            //    string sqlAuthenLog = $@"SELECT Id, UserName, FullName, TypeLogin, TypeUser, CreatedAt, IP, Device
            //            FROM [LogAuthens]
            //            WHERE ( Id = @Id )";
            //    return await targetConnection.QueryFirstOrDefaultAsync<LogAuthenDetailDto>(sqlAuthenLog, request);
            //}

            return null;

        }
        catch (Exception ex)
        {
            _logger.LogError("Lấy thông tin cá nhân LogAuthen Service thất bại: " + ex.ToString());
            return null;
        }
    }

    public async Task<Result<CountAccessPortalDto>> CountAccessPortal(string sqlQuery)
    {
        bool hasConnectStr = ValidateConnectionStr();
        if (!hasConnectStr)
        {
            _logger.LogError("Chưa cấu hình ServiceLoggerConnectString");

            return Result<CountAccessPortalDto>.Fail("Chưa cấu hình ServiceLoggerConnectString!");
        }

        try
        {
            //using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            //{
            //    targetConnection.Open();
            //    var res = await targetConnection.QueryFirstOrDefaultAsync<CountAccessPortalDto>(sqlQuery);
            //    return Result<CountAccessPortalDto>.Success(res);
            //}
            return Result<CountAccessPortalDto>.Success(new CountAccessPortalDto());
        }
        catch (Exception ex)
        {
            _logger.LogError("Lấy thông tin LogAuthen Service thất bại: " + ex.ToString());
            return Result<CountAccessPortalDto>.Fail("Exception: " + ex);
        }
    }
}