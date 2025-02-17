using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class KetThucXuLyNhieuHoSosHandler : IRequestHandler<KetThucXuLyNhieuHoSosRequest, Result>
{
    public readonly string hoSosTableName = "Business.HoSos";
    private readonly IDapperRepository _dapperRepository;
    private readonly ICommonServices _commonServices;
    public KetThucXuLyNhieuHoSosHandler(IDapperRepository dapperRepository, ICommonServices commonServices )
    {
        _dapperRepository = dapperRepository;
        _commonServices = commonServices;
    }
    public async Task<Result> Handle(KetThucXuLyNhieuHoSosRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
            string ngayKetThucXuLy = string.Empty;
            if (!request.NgayKetThucXuLy.HasValue && request.SetDungHan != true) throw new Exception("Không có thông tin ngày kết thúc xử lý");
            if (request.NgayKetThucXuLy.HasValue)
            {
                ngayKetThucXuLy = request.NgayKetThucXuLy.Value.ToString("yyyy-MM-dd HH:mm:ss");
                if (request.NgayKetThucXuLy.Value > currentTime) throw new Exception("Ngày kết thúc xử lý lớn hơn ngày hiện tại");

            }
            CommonSettings commonSettings = _commonServices.Get();
            string tmpHoSoTableName = !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : string.Empty;
            string query = $"UPDATE {hoSosTableName} " +
                $"SET TrangThaiHoSoId = @TrangThaiHoSoId," +
                $"TrangThaiTraKq = @TrangThaiTraKq, " +
                $"LastModifiedOn = '{currentTime}' ";
            if (!string.IsNullOrEmpty(ngayKetThucXuLy) && request.SetDungHan != true)
            {
                query += ", NgayKetThucXuLy = @NgayKetThucXuLy ";
            }

            if (request.SetDungHan == true)
            {
                query += ", NgayKetThucXuLy = NgayHenTra";
            }

            query += $"WHERE Id IN @Ids AND  NgayTiepNhan IS NOT NULL AND NgayTiepNhan <= @NgayKetThucXuLy";
            await _dapperRepository.ExcuteAsync(query, new
            {
                request.TrangThaiTraKq,
                request.TrangThaiHoSoId,
                NgayKetThucXuLy = ngayKetThucXuLy,
                request.Ids
            });
            try
            {
                if (!string.IsNullOrEmpty(tmpHoSoTableName))
                {
                    string updateThongKeTable = query.Replace(hoSosTableName, tmpHoSoTableName);
                    var updateTkRes = await _dapperRepository.ExcuteAsync(updateThongKeTable, new
                    {
                        request.TrangThaiTraKq,
                        request.TrangThaiHoSoId,
                        NgayKetThucXuLy = ngayKetThucXuLy,
                        request.Ids
                    });
                }
            }
            catch(Exception ex)
            {

            }

            string sqlQuery = $"SELECT MaHoSo FROM {hoSosTableName} WHERE Id IN @Ids AND  NgayTiepNhan IS NOT NULL AND NgayTiepNhan > @NgayKetThucXuLy";
            var data = await _dapperRepository.QueryAsync<HoSoDto>(sqlQuery, new
            {
                request.TrangThaiTraKq,
                request.TrangThaiHoSoId,
                NgayKetThucXuLy = ngayKetThucXuLy,
                request.Ids
            }, null, cancellationToken);
            if (data != null && data.ToList().Count > 0)
            {
                return (Result)Result.Success($"Có {data.ToList().Count} hồ sơ ngày kết thúc không hợp lệ.(Kết thúc trước ngày tiếp nhận) ");
            }
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}
