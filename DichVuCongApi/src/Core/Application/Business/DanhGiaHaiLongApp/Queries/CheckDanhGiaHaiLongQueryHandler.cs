using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Queries;
public class CheckDanhGiaHaiLongQueryHandler : IQueryHandler<CheckDanhGiaHaiLongQuery, CheckDanhGiahaiLong>
{
    private readonly IReadRepository<DanhGiaHaiLong> _readRepository;
    private readonly IDapperRepository _dapperRepository;
    public CheckDanhGiaHaiLongQueryHandler(IReadRepository<DanhGiaHaiLong> readRepository, IDapperRepository dapperRepository)
    {
        _readRepository = readRepository;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<CheckDanhGiahaiLong>> Handle(CheckDanhGiaHaiLongQuery request, CancellationToken cancellationToken)
    {

        var sql = @$"SELECT hs.Id, hs.MaHoSo, hs.KenhThucHien,
                     CASE WHEN EXISTS 
                        (SELECT 1 FROM [Business].[DanhGiaHaiLongs] dghl WHERE dghl.MaHoSo = hs.MaHoSo) 
                               THEN 1 ELSE 0 
                         END AS DaDanhGia
                      FROM [Business].[HoSos] hs
                      WHERE hs.Id = @Id";
        var item = await _dapperRepository.QueryFirstOrDefaultAsync<CheckDanhGiahaiLong>(sql, new { Id = request.Id });
        if (item == null)
            throw new Exception("Lỗi kiểm tra đánh giá hài lòng: id = " + request.Id);

        return Result<CheckDanhGiahaiLong>.Success(item);
    }
}