using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
public class GetUrlMauPhoiDefaultQueryHandler : IRequestHandler<GetUrlMauPhoiDefaultQuery, string>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public GetUrlMauPhoiDefaultQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<string> Handle(GetUrlMauPhoiDefaultQuery request, CancellationToken cancellationToken)
    {
        string where = " LaPhoiMacDinh = '1' AND MaDonVi is null AND MaLinhVuc is null AND MaThuTuc is null ";
        if (!string.IsNullOrEmpty(request.LoaiPhoi))
            where += "AND LoaiPhoi = @LoaiPhoi ";
        if (!string.IsNullOrEmpty(request.Code))
            where += "AND Code = @Code ";
        where += "AND DeletedOn is null ";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);

        string sql = $@"Select * from [Business].[MauPhois] where {where}";
        var mauPhois = await _dapperRepository.QueryAsync<MauPhoiDto>(sql, new
        {
            Code = request.Code,
            LoaiPhoi = request.LoaiPhoi
        });

        return mauPhois[0].UrlMauPhoi ?? string.Empty;
    }
}