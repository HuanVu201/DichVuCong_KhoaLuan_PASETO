using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Data;
using System.Threading;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Domain.Portal;
using NguoiXuLyHoSoEntity = TD.DichVuCongApi.Domain.Business.NguoiXuLyHoSo;

namespace TD.DichVuCongApi.Infrastructure.EntityServices.NguoiXuLyHoSo;
public class NguoiXuLyHoSoService : INguoiXuLyHoSoService
{
    private readonly IRepository<NguoiXuLyHoSoEntity> _nguoiXuLyHoSoRepo;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly ILogger<NguoiXuLyHoSoService> _logger;
    public NguoiXuLyHoSoService(
        IRepository<NguoiXuLyHoSoEntity> nguoiXuLyHoSoRepo,
        IDapperRepository dapperRepository,
        ICurrentUser currentUser,
         ILogger<NguoiXuLyHoSoService> logger
        )
    {
        _nguoiXuLyHoSoRepo = nguoiXuLyHoSoRepo;
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _logger = logger;
    }
    /// <summary>
    /// A: Thêm hồ sơ => DangXuLy:A
    /// </summary>
    /// <param name="nguoiXuLyHoSo"></param>
    /// <param name="transaction"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<int> AddNguoiXuLyHoSo(NguoiXuLyHoSoEntity nguoiXuLyHoSo, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
    {
        string sqlInsertIfnotExists =
            @$"IF NOT EXISTS (
                SELECT 1 
                FROM {SchemaNames.Business}.{TableNames.NguoiXuLyHoSos} 
                WHERE {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} = @NguoiXuLy AND {nameof(NguoiXuLyHoSoEntity.HoSoId)} = @HoSoId AND {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThai
            )
            BEGIN
                INSERT INTO {SchemaNames.Business}.{TableNames.NguoiXuLyHoSos}
                ({nameof(NguoiXuLyHoSoEntity.Id)}, {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)}, {nameof(NguoiXuLyHoSoEntity.HoSoId)}, {nameof(NguoiXuLyHoSoEntity.TrangThai)})
                VALUES (NEWID(), @NguoiXuLy, @HoSoId, @TrangThai);
            END";
        try
        {
            return await _dapperRepository.ExcuteAsync(sqlInsertIfnotExists, nguoiXuLyHoSo, transaction);
        }
        catch(Exception ex)
        {
            return 0;
            throw;
        }
    }
    /// <summary>
    /// Thêm danh sách người xử lý
    /// </summary>
    /// <param name="nguoiXuLyHoSos"></param>
    /// <param name="transaction"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<int> AddNguoiXuLyHoSos(List<NguoiXuLyHoSoEntity> nguoiXuLyHoSos, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
    {
        if (nguoiXuLyHoSos == null || !nguoiXuLyHoSos.Any())
            return 0;
        try
        {
            return await _dapperRepository.BatchInsertWithDuplicateCheckAsync(nguoiXuLyHoSos, $"{SchemaNames.Business}.{TableNames.NguoiXuLyHoSos}", new[]
        {
            nameof(NguoiXuLyHoSoEntity.NguoiXuLy),
            nameof(NguoiXuLyHoSoEntity.TrangThai),
            nameof(NguoiXuLyHoSoEntity.HoSoId)
        }, transaction, cancellationToken);
        } catch (Exception ex)
        {
            _logger.LogError(JsonConvert.SerializeObject(new
            {
                Req = JsonConvert.SerializeObject(nguoiXuLyHoSos),
                Err = ex.ToString()
            }));
            throw;
        }
    }
    /// <summary>
    /// Thêm danh sách người xử lý
    /// </summary>
    /// <param name="nguoiXuLys"></param>
    /// <param name="hoSoId"></param>
    /// <param name="trangThai"></param>
    /// <param name="transaction"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<int> AddNguoiXuLyHoSos(string nguoiXuLys, DefaultIdType hoSoId, string trangThai = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DangXuLy, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
    {
        if(hoSoId == null || hoSoId == Guid.Empty)
        {
            return 0;
        }
        List<NguoiXuLyHoSoEntity> nguoiXuLyHoSos = new List<NguoiXuLyHoSoEntity>();
        var taiKhoanTiepNhans = nguoiXuLys.Split("##", StringSplitOptions.RemoveEmptyEntries).ToList();
        taiKhoanTiepNhans.ForEach(taiKhoan =>
        {
            if (Guid.TryParse(taiKhoan, out var nguoiXuLyId))
            {
                nguoiXuLyHoSos.Add(new NguoiXuLyHoSoEntity(nguoiXuLyId, hoSoId, trangThai));
            }
            else
            {
                _logger.LogWarning($"Invalid GUID: {taiKhoan} - hoSoId: {hoSoId}");
            }
        });
        return await AddNguoiXuLyHoSos(nguoiXuLyHoSos, transaction: transaction, cancellationToken: cancellationToken);
    }

    public async Task<int> SetCurrentUserAsNguoiDaXuLy(DefaultIdType hoSoId)
    {
        string sqlUpdate = $@"UPDATE {SchemaNames.Business}.{TableNames.NguoiXuLyHoSos} SET {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThai
                            WHERE {nameof(NguoiXuLyHoSoEntity.HoSoId)} = @HoSoId AND {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} = @NguoiXuLy";
        return await _dapperRepository.ExcuteAsync(sqlUpdate, new
        {
            HoSoId = hoSoId,
            NguoiXuLy = _currentUser.GetUserId(),
            TrangThai = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DaXuLy
        });
    }

    public async Task<int> SetCurrentUserAsRemoved(DefaultIdType hoSoId)
    {
        string sqlUpdate = $@"UPDATE {SchemaNames.Business}.{TableNames.NguoiXuLyHoSos} SET {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThai
                            WHERE {nameof(NguoiXuLyHoSoEntity.HoSoId)} = @HoSoId AND {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} = @NguoiXuLy";
        return await _dapperRepository.ExcuteAsync(sqlUpdate, new
        {
            HoSoId = hoSoId,
            NguoiXuLy = _currentUser.GetUserId(),
            TrangThai = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.TrungGian
        });
    }

    public async Task<int> SetNguoiDangXuLyAsNguoiDaXuLy(DefaultIdType hoSoId)
    {
        string sqlUpdate = $@"UPDATE {SchemaNames.Business}.{TableNames.NguoiXuLyHoSos} SET {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiDaXuLy
                            WHERE {nameof(NguoiXuLyHoSoEntity.HoSoId)} = @HoSoId AND {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiDangXuLy";
        return await _dapperRepository.ExcuteAsync(sqlUpdate, new
        {
            HoSoId = hoSoId,
            TrangThaiDaXuLy = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DaXuLy,
            TrangThaiDangXuLy = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DangXuLy
        });
    }
    private class HoSoIdSelect
    {
        public DefaultIdType Id { get; set; }
        public string NguoiNhanHoSo { get; set; }
    }
    public async Task<int> SwapNguoiDangXuLyAndNguoiDaXuLyByNguoiNhanHoSo(string maHoSo)
    {
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoIdSelect>($@"SELECT Id, NguoiNhanHoSo FROM {SchemaNames.Business}.{TableNames.HoSos} WHERE MaHoSo = @MaHoSo", new
        {
            MaHoSo = maHoSo
        });
        if(hoSo == null)
        {
            _logger.LogError(JsonConvert.SerializeObject(new
            {
                MaHoSo = maHoSo,
                Err = "Có lỗi xảy ra khi tìm hồ sơ: " + maHoSo ,
                Module = nameof(SwapNguoiDangXuLyAndNguoiDaXuLyByNguoiNhanHoSo)
            }));
            return 0;
        }
        return await SwapNguoiDangXuLyAndNguoiDaXuLy(hoSo.Id, hoSo.NguoiNhanHoSo);
    }

    /// <summary>
    /// A,B,C: A Tiếp nhận => DangXuLy: A; Removed: B,C
    /// </summary>
    /// <param name="hoSoIds"></param>
    /// <returns></returns>
    public async Task<int> SetCurrentUserAsNguoiDangXuLy(DefaultIdType hoSoId)
    {
        // lọc cả đã xử lý, đang xử lý để case when
        string sqlUpdate = $@"UPDATE {SchemaNames.Business}.{TableNames.NguoiXuLyHoSos}
                            SET {nameof(NguoiXuLyHoSoEntity.TrangThai)} = 
                                CASE 
                                    WHEN {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} = @NguoiXuLy THEN @TrangThaiDangXuLy
                                    WHEN {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} != @NguoiXuLy 
                                         AND {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiDangXuLy THEN @TrangThaiRemoved
                                    ELSE {nameof(NguoiXuLyHoSoEntity.TrangThai)} 
                                END
                            WHERE {nameof(NguoiXuLyHoSoEntity.HoSoId)} = @HoSoId AND {nameof(NguoiXuLyHoSoEntity.TrangThai)} != @TrangThaiRemoved;";
        return await _dapperRepository.ExcuteAsync(sqlUpdate, new
        {
            TrangThaiDangXuLy = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DangXuLy,
            TrangThaiRemoved = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.TrungGian,
            HoSoId = hoSoId,
            NguoiXuLy = _currentUser.GetUserId(),
        });
    }

    public async Task<int> SetUserAsNguoiDangXuLy(DefaultIdType hoSoId, string userId)
    {
        if(Guid.TryParse(userId, out var nguoiXuLyId))
        {
            string sqlUpdate = $@"UPDATE {SchemaNames.Business}.{TableNames.NguoiXuLyHoSos}
                            SET {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiDangXuLy
                            WHERE {nameof(NguoiXuLyHoSoEntity.HoSoId)} = @HoSoId AND {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} = @NguoiXuLy;";
            return await _dapperRepository.ExcuteAsync(sqlUpdate, new
            {
                TrangThaiDangXuLy = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DangXuLy,
                HoSoId = hoSoId,
                NguoiXuLy = nguoiXuLyId,
            });
        }
        else
        {
            _logger.LogError(JsonConvert.SerializeObject(new
            {
                MaHoSo = hoSoId,
                Err = "Có lỗi xảy ra khi parse Guid:" + userId,
                Module = nameof(SetUserAsNguoiDangXuLy)
            }));
        }
        return 0;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="hoSoId"></param>
    /// <param name="nguoiDaXuLy">truyền người đã xử lý của hồ sơ</param>
    /// <param name="trangThaiNguoiDangXuLy"> trạng thái của người đang xử lý sau khi cập nhật</param>
    /// <returns></returns>
    public async Task<int> SwapNguoiDangXuLyAndNguoiDaXuLy(DefaultIdType hoSoId, string nguoiDaXuLy, string trangThaiNguoiDangXuLy = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DaXuLy)
    {
        if (string.IsNullOrEmpty(nguoiDaXuLy))
        {
            _logger.LogError(JsonConvert.SerializeObject(new
            {
                MaHoSo = hoSoId,
                Err = "Không có người đã xử lý",
                Module = nameof(SwapNguoiDangXuLyAndNguoiDaXuLy)
            }));
            return 0;
        }
        try
        {
            string sqlUpdate = $@"UPDATE {SchemaNames.Business}.{TableNames.NguoiXuLyHoSos}
                            SET {nameof(NguoiXuLyHoSoEntity.TrangThai)} = 
                                CASE 
                                    WHEN {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} = @NguoiDaXuLy THEN @TrangThaiDangXuLy
                                    WHEN {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} != @NguoiDaXuLy AND {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiDangXuLy THEN @TrangThaiDaXuLy
                                    ELSE {nameof(NguoiXuLyHoSoEntity.TrangThai)} 
                                END
                            WHERE {nameof(NguoiXuLyHoSoEntity.HoSoId)} = @HoSoId AND ({nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} = @NguoiDaXuLy OR {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiDangXuLy)";
            return await _dapperRepository.ExcuteAsync(sqlUpdate, new
            {
                HoSoId = hoSoId,
                TrangThaiDangXuLy = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DangXuLy,
                TrangThaiDaXuLy = trangThaiNguoiDangXuLy,
                NguoiDaXuLy = nguoiDaXuLy
            });
        } catch (Exception ex)
        {
            _logger.LogError(JsonConvert.SerializeObject(new
            {
                MaHoSo = hoSoId,
                Err = JsonConvert.SerializeObject(ex),
                Module = nameof(SwapNguoiDangXuLyAndNguoiDaXuLy)
            }));
            throw;
        }
    }

    /// <summary>
    /// cập nhật lại người đang xử lý: A=> B,C,D: DaXuLy: Danh sách cũ
    /// </summary>
    /// <param name="hoSoId"></param>
    /// <param name="nguoiXuLyTieps"></param>
    /// <param name="trangThaiDefault"></param>
    /// <returns></returns>
    public async Task<int> OverrideNguoiDangXuLy(DefaultIdType hoSoId, string nguoiXuLyTieps, string trangThaiDefault)
    {
        if (hoSoId == null || hoSoId == Guid.Empty || string.IsNullOrEmpty(nguoiXuLyTieps))
        {
            _logger.LogError(JsonConvert.SerializeObject(new
            {
                MaHoSo = hoSoId,
                Err = "Không có người đã xử lý",
                Module = nameof(OverrideNguoiDangXuLy)
            }));
            return 0;
        }
        if(trangThaiDefault != NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DaXuLy && trangThaiDefault != NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DangXuLy && trangThaiDefault != NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.TrungGian)
        {
            return 0;
        }
        var danhSachNguoiXuLyTiep = nguoiXuLyTieps.Split("##", StringSplitOptions.RemoveEmptyEntries);
        string sqlUpdate = $@"UPDATE {SchemaNames.Business}.{TableNames.NguoiXuLyHoSos}
        SET {nameof(NguoiXuLyHoSoEntity.TrangThai)} = 
            CASE 
                WHEN {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} IN @NguoiXuLyTiep THEN {nameof(NguoiXuLyHoSoEntity.TrangThai)}
                ELSE @TrangThaiDefault
            END
        WHERE {nameof(NguoiXuLyHoSoEntity.HoSoId)} = @HoSoId AND {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiDangXuLy";
        int updatedRows = await _dapperRepository.ExcuteAsync(sqlUpdate, new
        {
            TrangThaiDangXuLy = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DangXuLy,
            TrangThaiDefault = trangThaiDefault,
            HoSoId = hoSoId,
            NguoiXuLyTiep = danhSachNguoiXuLyTiep.ToList()
        });
        if(danhSachNguoiXuLyTiep.Count() == 1) // thêm người này là người đang xử lý
        {
            int setNguoiDaXuLyRows = await SetUserAsNguoiDangXuLy(hoSoId, danhSachNguoiXuLyTiep[0]);
            if(setNguoiDaXuLyRows == 0) // không có người đã xử lý nào đc cập nhật thành ng đang xử lý => thêm mới ng đó là ng đang xử lý
            {
                return await AddNguoiXuLyHoSos(nguoiXuLyTieps, hoSoId);
            }
            return 1;
        }
        return await AddNguoiXuLyHoSos(nguoiXuLyTieps, hoSoId); // thêm mới các người dùng này là người đang xử lý
    }

    public async Task<int> ReplaceUsersToNguoiDangXuLy(DefaultIdType hoSoId, string nguoiXuLyTieps)
    {
        if (hoSoId == null || hoSoId == Guid.Empty || string.IsNullOrEmpty(nguoiXuLyTieps))
        {
            return 0;
        }
        var danhSachNguoiXuLyTiep = nguoiXuLyTieps.Split("##", StringSplitOptions.RemoveEmptyEntries);
        string sqlUpdate = $@"UPDATE {SchemaNames.Business}.{TableNames.NguoiXuLyHoSos}
        SET {nameof(NguoiXuLyHoSoEntity.TrangThai)} = 
            CASE 
                WHEN {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiDaXuLy OR {nameof(NguoiXuLyHoSoEntity.TrangThai)} = '{NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.TrungGian}' THEN @TrangThaiDangXuLy
                WHEN {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiDangXuLy AND NguoiXuLy NOT IN @NguoiXuLyTiep THEN @TrangThaiDaXuLy
                ELSE {nameof(NguoiXuLyHoSoEntity.TrangThai)}
            END
        WHERE {nameof(NguoiXuLyHoSoEntity.HoSoId)} = @HoSoId AND ({nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} In @NguoiXuLyTiep OR {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiDangXuLy)";
        int updatedRows = await _dapperRepository.ExcuteAsync(sqlUpdate, new
        {
            TrangThaiDangXuLy = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DangXuLy,
            TrangThaiDaXuLy = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DaXuLy,
            HoSoId = hoSoId,
            NguoiXuLyTiep = danhSachNguoiXuLyTiep.ToList()
        });
        return await AddNguoiXuLyHoSos(nguoiXuLyTieps, hoSoId); // thêm mới các người dùng này là người đang xử lý
    }

    /// <summary>
    /// + A,B,C: A Chuyển D 
    /// + A thu hồi | D trả lại 
    /// + A chuyển
    /// </summary>
    /// <param name="hoSoId"></param>
    /// <param name="nguoiXuLyTieps"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<int> UpdateAndRemoveOtherHandlers(DefaultIdType hoSoId, string nguoiXuLyTieps, CancellationToken cancellationToken = default)
    {
        if(hoSoId == null || hoSoId == Guid.Empty || string.IsNullOrEmpty(nguoiXuLyTieps))
        {
            return 0;
        }
        var danhSachNguoiXuLyTiep = nguoiXuLyTieps.Split("##", StringSplitOptions.RemoveEmptyEntries);
        string sqlUpdate = $@"UPDATE {SchemaNames.Business}.{TableNames.NguoiXuLyHoSos}
                            SET {nameof(NguoiXuLyHoSoEntity.TrangThai)} = 
                                CASE 
                                    WHEN {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} = @NguoiXuLy 
                                         AND {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiDangXuLy THEN @TrangThaiDaXuLy
                                    WHEN {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} != @NguoiXuLy 
                                         AND {nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiDangXuLy THEN @TrangThaiRemoved
                                    WHEN {nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} IN @NguoiXuLyTiep
                                         AND ({nameof(NguoiXuLyHoSoEntity.TrangThai)} = @TrangThaiRemoved ) THEN @TrangThaiDangXuLy
                                    ELSE {nameof(NguoiXuLyHoSoEntity.TrangThai)} 
                                END
                            WHERE {nameof(NguoiXuLyHoSoEntity.HoSoId)} = @HoSoId AND ({nameof(NguoiXuLyHoSoEntity.NguoiXuLy)} IN @NguoiXuLyTiep OR {nameof(NguoiXuLyHoSoEntity.TrangThai)} != @TrangThaiDaXuLy)";
        using var transaction = _dapperRepository.BeginTransaction();
        try
        { 
            int updatedRows = await _dapperRepository.ExcuteAsync(sqlUpdate, new
            {
                TrangThaiDangXuLy = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DangXuLy,
                TrangThaiDaXuLy = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.DaXuLy,
                TrangThaiRemoved = NguoiXuLyHoSoEntity.NguoiXuLyHoSo_TrangThai.TrungGian,
                HoSoId = hoSoId,
                NguoiXuLy = _currentUser.GetUserId(),
                NguoiXuLyTiep = danhSachNguoiXuLyTiep.ToList()
            }, transaction: transaction);
            if (updatedRows > 0)
            {
                await AddNguoiXuLyHoSos(nguoiXuLyTieps, hoSoId, cancellationToken: cancellationToken, transaction: transaction);
            }
            transaction.Commit();
            return updatedRows;
        } catch (Exception ex)
        {
            _logger.LogError(JsonConvert.SerializeObject(new
            {
                MaHoSo = hoSoId,
                Err = JsonConvert.SerializeObject(ex),
            }));
            transaction.Rollback();
            throw;
        }
    }
}

