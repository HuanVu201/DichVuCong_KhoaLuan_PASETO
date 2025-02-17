using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoBoSungApp.Queries;

public class GetHoSoBoSungQuerySpec : Specification<HoSoBoSung>, ISingleResultSpecification
{
    public GetHoSoBoSungQuerySpec(string maHoSo, List<string> trangThaiBoSung)
    {
        Query.Where(x => x.MaHoSo == maHoSo);
        Query.Where(x => trangThaiBoSung.Contains(x.TrangThaiBoSung));
    }
}

internal class GetHoSoBoSungQueryHandler
{
}
