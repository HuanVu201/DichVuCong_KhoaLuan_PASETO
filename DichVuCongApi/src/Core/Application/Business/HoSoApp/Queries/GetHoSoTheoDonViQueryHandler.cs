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
public class GetHoSoTheoDonViQueryHandler : ICommandHandler<GetHoSoTheoDonViQuery, HoSoTheoCanBoXuLyDto>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public GetHoSoTheoDonViQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<HoSoTheoCanBoXuLyDto>> Handle(GetHoSoTheoDonViQuery request, CancellationToken cancellationToken)
    {
        var sqlTakeDonVi = "SELECT TOP(1) OfficeCode FROM [Identity].[Users] where Id = @UserId";
        var resTakeDonVi = await _dapperRepository.QueryFirstOrDefaultAsync<UserPortalDto>(sqlTakeDonVi, new
        {
            UserId = request.UserId,
        });
        if (resTakeDonVi == null)
        {
            throw new Exception("UserId không tồn tại!");
        }
        var sql = @$"SELECT TOP 1 tt.ID as TTHCId,tt.TenTTHC ,ChuHoSo, SoDinhDanh,g.GroupName as TenDonVi,hs.DonViId
                    FROM Business.HoSos as hs
                    INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                    LEFT JOIN Catalog.Groups g on hs.DonViId = g.GroupCode
                    WHERE MaHoSo = @MaHoSo and DonViId = @DonViId";
        var res = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoTheoCanBoXuLyDto>(sql, new
        {
            MaHoSo = request.MaHoSo,
            DonViId = resTakeDonVi.OfficeCode,
        });
        if(res == null)
        {
            throw new Exception("Mã hồ sơ không thuộc đơn vị xử lý của người dùng!");
        }
        else
        {
            return Result<HoSoTheoCanBoXuLyDto>.Success(data: res);

        }
    }
}
