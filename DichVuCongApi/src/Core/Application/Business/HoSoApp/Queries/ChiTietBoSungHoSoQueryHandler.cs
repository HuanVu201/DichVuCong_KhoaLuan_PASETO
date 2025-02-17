using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Common.Zalo;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class ChiTietBoSungHoSoQueryHandler : IQueryHandler<ChiTietBoSungHoSoQuery, ChiTietBoSungHoSoDto>
{
    private readonly IDapperRepository _dapperRepository;
    public ChiTietBoSungHoSoQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<ChiTietBoSungHoSoDto>> Handle(ChiTietBoSungHoSoQuery request, CancellationToken cancellationToken)
    {
        var hoSoDic = new Dictionary<Guid, ChiTietBoSungHoSoDto>();
        var thanhPhanHoSoDic = new Dictionary<Guid, ThanhPhanHoSoDto>();
        var data = await _dapperRepository.QueryAsync<ChiTietBoSungHoSoDto, ThanhPhanHoSoDto, ChiTietBoSungHoSoDto>(
            @"SELECT hs.Id as Id, hs.NoiDungBoSung, hs.NguoiDangXuLy, hs.NguoiDaXuLy, hs.NguoiNhanHoSo, hs.DonViId, hs.NguoiGui, hs.DonViDaChuyenXuLy, hs.DinhKemBoSung, hs.ThongTinTiepNhanBoSung, hs.TrichYeuHoSo, hs.MaHoSo, hs.ChuHoSo, hs.LyDoBoSung, hs.ThoiHanBoSung, DATEADD(day, ThoiHanBoSung, NgayYeuCauBoSung) as HanBoSung,
                     tphs.Id as Id, tphs.NoiDungBoSung, tphs.Ten, tphs.TrangThaiSoHoa, tphs.MaGiayTo, tphs.DinhKem
                     FROM Business.HoSos as hs LEFT JOIN Business.ThanhPhanHoSos tphs on hs.MaHoSo = tphs.HoSo WHERE hs.Id = @Id",
            (hs, tphs) =>
            {
                if(!hoSoDic.TryGetValue(hs.Id, out var hoSo) && hs != null)
                {
                    hoSoDic.Add(hs.Id, hoSo = hs);
                }
                if (tphs != null && !thanhPhanHoSoDic.TryGetValue(tphs.Id, out var thanhPhanHoSo))
                {
                    hoSo.ThanhPhanHoSos.Add(tphs);
                     thanhPhanHoSoDic.Add(tphs.Id, thanhPhanHoSo = tphs);
                }
                return hoSo;
            }, splitOn: "Id,Id", param: request);
        if (data.Any())
        {
            return Result<ChiTietBoSungHoSoDto>.Success(data.ToList()[0]);
        }
        throw new NotFoundException($"Hồ sơ với id: {request.Id} chưa được thêm trên hệ thống hoặc đã bị xóa");
    }
}
