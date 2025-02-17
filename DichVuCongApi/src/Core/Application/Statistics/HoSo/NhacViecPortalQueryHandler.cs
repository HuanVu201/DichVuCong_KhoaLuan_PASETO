using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Identity.Users;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class NhacViecPortalQueryHandler : IQueryHandler<NhacViecPortalQuery, NhacViecPortalDto>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _currentUser;

    public NhacViecPortalQueryHandler(IDapperRepository dapperRepository, IUserService currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<Result<NhacViecPortalDto>> Handle(NhacViecPortalQuery request, CancellationToken cancellationToken)
    {
        var currentUser = await _currentUser.GetCurrentUserAsync(cancellationToken);
        var whereNguoiGui = string.Empty;
        if (request.NguoiGui == true)
        {
            whereNguoiGui = @$"NguoiGui = '{currentUser.SoDinhDanh}'";
        }
        string sql = @$"SELECT 
                        SUM (CASE WHEN TrangThaiHoSoId = '2'  THEN 1 ELSE 0 END) as DuocTiepNhan,
                        SUM (CASE WHEN TrangThaiHoSoId = '6'  THEN 1 ELSE 0 END) as ChoThanhToan,
                        SUM (CASE WHEN TrangThaiHoSoId = '3'  THEN 1 ELSE 0 END) as KhongDuocTiepNhan,
                        SUM (CASE WHEN TrangThaiHoSoId = '10' THEN 1 ELSE 0 END) as DaCoKetQua,
                        SUM (CASE WHEN TrangThaiHoSoId = '5'  THEN 1 ELSE 0 END) as YeuCauBoSung
                        FROM Business.HoSos WHERE DeletedOn is null AND {whereNguoiGui} AND (LaHoSoChungThuc = 0 OR LaHoSoChungThuc is null)";
        //AND ({nguoiDangXuLyCond} OR {nguoiDaXuLyCond})
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<NhacViecPortalDto>(sql, request);

        return Result<NhacViecPortalDto>.Success(data);
    }
}
