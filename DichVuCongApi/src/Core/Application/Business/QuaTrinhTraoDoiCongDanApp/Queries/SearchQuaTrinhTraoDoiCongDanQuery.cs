using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Dto;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Queries;
public class SearchQuaTrinhTraoDoiCongDanQuery : PaginationFilter, IRequest<PaginationResponse<QuaTrinhTraoDoiCongDanDto>>
{
    public string? MaHoSo { get; set; }
    public string? NguoiGuiTraoDoi { get; set; }
}
