using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.KetQuaThuTucApp.Dto;

namespace TD.DichVuCongApi.Application.Business.KetQuaThuTucApp.Queries;
public class SearchKetQuaThuTucQuery : PaginationFilter, IRequest<PaginationResponse<KetQuaThuTucDto>>
{
    public string? MaTTHC { get; set; }
    public string? MaKetQua { get; set; }
    public string? TenKetQua { get; set; }
    public bool? Removed { get; set; } = false;
}
