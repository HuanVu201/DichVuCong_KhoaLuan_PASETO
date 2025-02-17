using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ActionApp.Queries;
using TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp;
using TD.DichVuCongApi.Application.Business.PhiLePhiApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class GetHoSoDanhGiaHaiLongQueryHandler : IRequestHandler<GetHoSoDanhGiaHaiLongQuery, Result<HoSoDto>>
{
    private readonly IReadRepository<HoSo> _readRepository;
    private readonly IDapperRepository _dapperRepository;


    public GetHoSoDanhGiaHaiLongQueryHandler(IReadRepository<HoSo> readRepository, IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
        _readRepository = readRepository;
    }
    public async Task<Result<HoSoDto>> Handle(GetHoSoDanhGiaHaiLongQuery request, CancellationToken cancellationToken)
    {
        string sql = $@"SELECT ID, ChuHoSo, SoDienThoaiChuHoSo, EmailChuHoSo, MaTruongHop,DonViId , TrangThaiHoSoId FROM Business.HoSos where MaHoSo = @MaHoSo  and DeletedOn is null";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoDto>(sql, request);
        return Result<HoSoDto>.Success(data);
    }


}
