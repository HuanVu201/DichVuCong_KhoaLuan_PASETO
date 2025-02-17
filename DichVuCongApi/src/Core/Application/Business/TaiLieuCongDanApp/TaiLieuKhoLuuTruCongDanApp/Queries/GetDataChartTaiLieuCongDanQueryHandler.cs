using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Queries;
public class GetDataChartTaiLieuCongDanQueryHandler : IRequestHandler<GetDataChartTaiLieuCongDanQuery, Result<GetDataChartTaiLieuCongDanRes>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    public GetDataChartTaiLieuCongDanQueryHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
    }

    public async Task<Result<GetDataChartTaiLieuCongDanRes>> Handle(GetDataChartTaiLieuCongDanQuery request, CancellationToken cancellationToken)
    {
        var resSearchDataValue = await _mediator.Send(new SearchTaiLieuKhoLuuTruCongDanQuery()
        {
            TuNgay = request.TuNgay,
            DenNgay = request.DenNgay,
            Nguon = request.Nguon,
            MaLinhVuc = request.MaLinhVuc,
        });

        var resSearchDataAll = await _mediator.Send(new SearchTaiLieuKhoLuuTruCongDanQuery());

        if (resSearchDataValue == null || resSearchDataAll == null)
        {
            return Result<GetDataChartTaiLieuCongDanRes>.Fail(message: "Không có dữ liệu");
        }

        return Result<GetDataChartTaiLieuCongDanRes>.Success(data: new GetDataChartTaiLieuCongDanRes()
        {
            DataValue = resSearchDataValue.TotalCount,
            ConLai = resSearchDataAll.TotalCount - resSearchDataValue.TotalCount

        });
    }
}