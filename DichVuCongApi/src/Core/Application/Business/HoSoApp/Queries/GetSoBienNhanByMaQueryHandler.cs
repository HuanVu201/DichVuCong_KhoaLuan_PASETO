using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users.Password;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class GetSoBienNhanByMaQueryHandler : ICommandHandler<GetSoBienNhanByMaQuery, SoBienNhanDto>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public GetSoBienNhanByMaQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<SoBienNhanDto>> Handle(GetSoBienNhanByMaQuery request, CancellationToken cancellationToken)
    {
        var sql = @$"SELECT TOP 1 tt.ID as TTHCId,tt.TenTTHC ,ChuHoSo, SoDinhDanh,g.GroupName as TenDonVi,hs.DonViId,MaHoSo,SoDienThoaiChuHoSo,SoGiayToChuHoSo,NgayNopHoSo,EmailChuHoSo,TrichYeuHoSo
                    FROM Business.HoSos as hs
                    INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                    LEFT JOIN Catalog.Groups g on hs.DonViId = g.GroupCode
                    WHERE MaHoSo = @MaHoSo";
        var res = await _dapperRepository.QueryFirstOrDefaultAsync<SoBienNhanDto>(sql, new
        {
            MaHoSo = request.MaHoSo,
        });
        if (res == null)
        {
            throw new Exception("Mã hồ sơ không tồn tại!");
        }
        else
        {
            return Result<SoBienNhanDto>.Success(data: res);

        }
    }
}
