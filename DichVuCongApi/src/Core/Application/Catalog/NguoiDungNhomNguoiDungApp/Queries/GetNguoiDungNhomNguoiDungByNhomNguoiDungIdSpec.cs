using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NguoiDungNhomNguoiDungApp.Queries;
public class GetNguoiDungNhomNguoiDungByNhomNguoiDungIdSpec : Specification<NguoiDungNhomNguoiDung>, ISingleResultSpecification
{
    public GetNguoiDungNhomNguoiDungByNhomNguoiDungIdSpec(string nhomNguoiDungId)
    {
        Query.Where(x => x.NhomNguoiDungId == nhomNguoiDungId,!string.IsNullOrEmpty(nhomNguoiDungId));
    }
}
