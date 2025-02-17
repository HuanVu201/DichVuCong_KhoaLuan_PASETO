using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Common;

public class GetNgayNghiSpec : Specification<NgayNghi>
{
    public GetNgayNghiSpec(int year)
    {
        Query.Where(x => x.Date >= DateTime.Now);
    }
}