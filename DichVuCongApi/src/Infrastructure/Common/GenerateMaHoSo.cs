using Microsoft.Extensions.Configuration;
using System.Threading;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Infrastructure.Common;
public class GenerateMaHoSoHandler : IGenerateMaHoSo
{
    private static readonly object _lock = new object();
    private static readonly Dictionary<string, SemaphoreSlim> _locks = new Dictionary<string, SemaphoreSlim>();
    private readonly IDapperRepository _dapperRepository;
    private readonly int soHienTaiConfig;

    public GenerateMaHoSoHandler(
        IDapperRepository dapperRepository,
        IConfiguration configuration)
    {
        _dapperRepository = dapperRepository;
        int? soHienTai = configuration.GetValue<int?>("GLOBAL_CONFIG:ResetSTTMaHoSoTo");
        soHienTaiConfig = soHienTai != null && soHienTai > 0 ? (int)soHienTai : 1;
    }
    private static SemaphoreSlim GetLockObj(string unit)
    {
        lock (_lock)
        {
            return _locks.ContainsKey(unit)
                ? _locks[unit]
                : _locks[unit] = new SemaphoreSlim(1);
        }
    }

    public async Task<string> GenerateMaHoSo(string maDinhDanh, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string sqlUpdateSoHienTai = @"Update Catalog.Groups SET SoHienTai = @SoHienTai, NgayHienTai = @NgayHienTai Where Id = @Id";
        string sqlGetMaDinhDanh = @"SELECT Top 1 Id, MaDinhDanh, SoHienTai, NgayHienTai from Catalog.Groups where MaDinhDanh = @MaDinhDanh";

        if (string.IsNullOrEmpty(maDinhDanh))
        {
            throw new Exception("Đơn vị chưa cấu hình mã định danh");
        }
        var semaphore = GetLockObj(maDinhDanh);

        await semaphore.WaitAsync(cancellationToken);
        string maHoSo = string.Empty;
        try
        {
            var group = await _dapperRepository.QueryFirstOrDefaultAsync<Group>(sqlGetMaDinhDanh, new
            {
                MaDinhDanh = maDinhDanh
            });
            if (group == null)
            {
                throw new Exception("Không tìm thấy đơn vị");
            }
            var soHienTai = (group?.SoHienTai == 0 || group?.SoHienTai == null) ? soHienTaiConfig : group?.SoHienTai;
            if (group?.NgayHienTai?.Year != currentTime.Year || group?.NgayHienTai?.Month != currentTime.Month || group?.NgayHienTai?.Day != currentTime.Day)
            {
                soHienTai = soHienTaiConfig;
            }
            maHoSo = $"{group.MaDinhDanh}-{currentTime.ToString("yyMMdd")}-{soHienTai.ToString().PadLeft(4, '0')}";
            var updateCount = await _dapperRepository.ExcuteAsync(sqlUpdateSoHienTai, new
            {
                SoHienTai = soHienTai + 1,
                NgayHienTai = currentTime,
                Id = group.Id
            });
            if (updateCount == 0)
            {
                throw new Exception("Có lỗi xảy ra khi thêm mới hồ sơ");
            }
        }
        finally
        {
            semaphore.Release();
        }
        return maHoSo;
    }
}
