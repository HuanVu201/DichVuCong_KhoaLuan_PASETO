using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC;
public class ThongKeThangHandler : IRequestHandler<ThongKeThangQuery, ThongKeIOCResponse<ThongKeThangElement>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    public ThongKeThangHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    }

    private async Task<ThongKeThangElement> GetThongKeThang(int monthRequest, int yearRequest, CancellationToken cancellationToken)
    {
        List<ThongKeThangElement> data = new List<ThongKeThangElement>();

        DateTime firstDayOfMonth = new DateTime(yearRequest, monthRequest, 1);
        DateTime lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
        string tuNgay = firstDayOfMonth.ToString("yyyy-MM-dd");
        string denNgay = lastDayOfMonth.ToString("yyyy-MM-dd 23:59:59");

        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);

        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";

        string sql = $"SELECT " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrongKy} OR {builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) TongHoSoDaTiepNhan, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrongKy}) THEN {hoSoTableName}.Id END) HoSoDaTiepNhan, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) HoSoTiepNhanKyTruoc, " +


            $"COUNT(CASE WHEN ({builder.where.DaXuLy}) THEN {hoSoTableName}.Id END) HoSoDaXuLy, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyDungHan}) THEN {hoSoTableName}.Id END) HoSoDaXuLyDungHan, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {hoSoTableName}.Id END) HoSoDaXuLyQuaHan " +

            $"FROM {hoSoTableName} " +
            $"{totalWhere} ";

        var resBaoCao = await _dapperRepository.QueryAsync<ThongKeThangElement>(sql, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
        }, null, cancellationToken);

        if (resBaoCao == null || resBaoCao.Count == 0)
            throw new Exception("ThongKeThang not found");

        ThongKeThangElement result = new ThongKeThangElement();
        result = resBaoCao[0];
        result.Thang = monthRequest;
        result.Nam = yearRequest;
        if (result.HoSoDaXuLy > 0)
        {
            result.TyLeDaXuLyDungHan = ((double)result.HoSoDaXuLyDungHan / result.HoSoDaXuLy) * 100;
        }

        return result;
    }

    public async Task<ThongKeIOCResponse<ThongKeThangElement>> Handle(ThongKeThangQuery request, CancellationToken cancellationToken)
    {
        List<ThongKeThangElement> result = new List<ThongKeThangElement>();
        int currentMonth = DateTime.Now.Month;
        for (int i = 1; i <= currentMonth; i++)
        {
            ThongKeThangElement data = await GetThongKeThang(i, request.Year, cancellationToken);
            if (data != null)
                result.Add(data);
        }

        return new ThongKeIOCResponse<ThongKeThangElement>(result);
    }
}
