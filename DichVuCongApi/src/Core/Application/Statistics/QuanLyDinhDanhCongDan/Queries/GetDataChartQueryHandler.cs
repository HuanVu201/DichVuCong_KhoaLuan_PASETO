using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using MediatR;
using System.Threading;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

public class GetDataChartQueryHandler : IRequestHandler<GetDataChartQuery, DataChart>
{
    private readonly IDapperRepository _dapperRepository;
    public GetDataChartQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<DataChart> Handle(GetDataChartQuery request, CancellationToken cancellationToken)
    {
        var data = new DataChart();
        string[] rangeAge = request.DoTuoi.Split('#');

        int currentYear = DateTime.Now.Year;
        string sql = $@"SELECT ID, GioiTinh, NamSinh, SoDinhDanh FROM [Identity].[Users] Where TypeUser='CongDan'";
        var users = await _dapperRepository.QueryAsync<UserAppDto>(sql);

        for (int i = 0; i < rangeAge.Length - 1; i++)
        {
            data.NamDaDinhDanh += users.Count(x =>
            x.GioiTinh == "1" && !string.IsNullOrEmpty(x.SoDinhDanh) &&
            (currentYear - int.Parse(x.NamSinh)) >= int.Parse(rangeAge[i]) &&
            (currentYear - int.Parse(x.NamSinh)) <= int.Parse(rangeAge[i + 1]) - 1) + "##";

            data.NamChuaDinhDanh += users.Count(x =>
            x.GioiTinh == "1" && string.IsNullOrEmpty(x.SoDinhDanh) &&
            (currentYear - int.Parse(x.NamSinh)) >= int.Parse(rangeAge[i]) &&
            (currentYear - int.Parse(x.NamSinh)) <= int.Parse(rangeAge[i + 1]) - 1) + "##";

            data.NuDaDinhDanh += users.Count(x =>
            x.GioiTinh == "2" && !string.IsNullOrEmpty(x.SoDinhDanh) &&
            (currentYear - int.Parse(x.NamSinh)) >= int.Parse(rangeAge[i]) &&
            (currentYear - int.Parse(x.NamSinh)) <= int.Parse(rangeAge[i + 1]) - 1) + "##";

            data.NuChuaDinhDanh += users.Count(x =>
            x.GioiTinh == "2" && string.IsNullOrEmpty(x.SoDinhDanh) &&
            (currentYear - int.Parse(x.NamSinh)) >= int.Parse(rangeAge[i]) &&
            (currentYear - int.Parse(x.NamSinh)) <= int.Parse(rangeAge[i + 1]) - 1) + "##";
        }

        return data;
    }
}
