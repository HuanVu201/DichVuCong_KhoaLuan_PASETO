using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.PhiLePhiApp;
using TD.DichVuCongApi.Application.Business.PhiLePhiApp.Queries;
using TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Queries;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;

public class GetBaoCao01QueryHandler : IQueryHandler<GetBaoCao01Query, BaoCao01Dto>
{
    private readonly IReadRepository<PhieuKhaoSat> _readRepository;
    private readonly IDapperRepository _dapperRepository;

    public GetBaoCao01QueryHandler(IReadRepository<PhieuKhaoSat> readRepository, IDapperRepository dapperRepository)
    {
        _readRepository = readRepository;
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<BaoCao01Dto>> Handle(GetBaoCao01Query request, CancellationToken cancellationToken)
    {
        var sql = $@" SELECT Id,[MaHoSo],DonVi,
                    CAST([TraLoi1] AS INT) AS ChiSo1,
                    CAST([TraLoi2] AS INT) AS ChiSo2,
                    CAST([TraLoi3] AS INT) AS ChiSo3,
                    CAST([TraLoi4] AS INT) AS ChiSo4,
                    CAST([TraLoi6] AS INT) AS ChiSo6,
                    CAST([TraLoi7] AS INT) AS ChiSo7,
                    CAST([TraLoi10] AS INT) AS ChiSo10,
                    CAST([TraLoi11] AS INT) AS ChiSo11,
                    CAST([TraLoi1] AS INT) + CAST([TraLoi2] AS INT) + CAST([TraLoi3] AS INT) + CAST([TraLoi4] AS INT) + CAST([TraLoi6] AS INT) + CAST([TraLoi7] AS INT)   AS TongDiem,
	                MucDoHL,
	                MucDoKHL,
	                MucDoRHL
                    FROM [Business].[PhieuKhaoSats] where Id = '{request.Id}' ";
        var item = await _dapperRepository.QueryFirstOrDefaultAsync<BaoCao01Dto>(sql,request);
        if (item == null)
            throw new NotFoundException($"BaoCao01 với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<BaoCao01Dto>.Success(item);
    }
}
