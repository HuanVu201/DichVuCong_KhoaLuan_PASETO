using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC;
public class ThongKeNamHandler : IRequestHandler<ThongKeNamQuery, ThongKeIOCResponse<ThongKeNamElement>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    public ThongKeNamHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    }

    private async Task<ThongKeNamElement> GetThongKeNam(int yearRequest, CancellationToken cancellationToken)
    {
        List<ThongKeNamElement> data = new List<ThongKeNamElement>();

        DateTime firstDayOfYear = new DateTime(yearRequest, 1, 1);
        DateTime lastDayOfYear = new DateTime(yearRequest, 12, 31);

        string tuNgay = firstDayOfYear.ToString("yyyy-MM-dd");
        string denNgay = lastDayOfYear.ToString("yyyy-MM-dd 23:59:59");

        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);

        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";

        string sql = $"SELECT " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrongKy}) THEN {hoSoTableName}.Id END) HoSoDaTiepNhan, " +

            $"COUNT(CASE WHEN ({builder.where.DaXuLy}) THEN {hoSoTableName}.Id END) HoSoDaXuLy, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyDungHan}) THEN {hoSoTableName}.Id END) HoSoDaXuLyDungHan, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {hoSoTableName}.Id END) HoSoDaXuLyQuaHan " +

            $"FROM {hoSoTableName} " +
            $"{totalWhere} ";

        var resBaoCao = await _dapperRepository.QueryAsync<ThongKeNamElement>(sql, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
        }, null, cancellationToken);

        if (resBaoCao == null || resBaoCao.Count == 0)
            throw new Exception("ThongKeNam not found");

        ThongKeNamElement result = new ThongKeNamElement();
        result = resBaoCao[0];
        if (result.HoSoDaXuLy > 0)
        {
            result.TyLeDaXuLyDungHan = ((double)result.HoSoDaXuLyDungHan / result.HoSoDaXuLy) * 100;
        }

        return result;
    }

    public async Task<ThongKeIOCResponse<ThongKeNamElement>> Handle(ThongKeNamQuery request, CancellationToken cancellationToken)
    {
        List<ThongKeNamElement> result = new List<ThongKeNamElement>();
        ThongKeNamElement data = await GetThongKeNam(request.Year, cancellationToken);
        if (data != null)
            result.Add(data);

        return new ThongKeIOCResponse<ThongKeNamElement>(result);
    }
}
