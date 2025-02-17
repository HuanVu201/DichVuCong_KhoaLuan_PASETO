using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.DanhMucTrangThai;
public class DanhMucTrangThaiVBDLISHandler : IRequestHandler<DanhMucTrangThaiVBDLISRequest, VBDLISBaseResponse<List<DanhMucTrangThaiVBDLISResponse>>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly string _trangThaiHoSoTable = "[Business].[TrangThaiHoSos]";
    private readonly IVBDLISServices _vbdlisServices;
    public DanhMucTrangThaiVBDLISHandler(IDapperRepository dapperRepository, IVBDLISServices vbdlisServices)
    {
        _dapperRepository = dapperRepository;
        _vbdlisServices = vbdlisServices;
    }

    public async Task<VBDLISBaseResponse<List<DanhMucTrangThaiVBDLISResponse>>> Handle(DanhMucTrangThaiVBDLISRequest request, CancellationToken cancellationToken)
    {
        VBDLISSettings settings = _vbdlisServices.Get();
        if (string.IsNullOrEmpty(request.SecurityCode)) throw new ArgumentNullException(nameof(request.SecurityCode));
        if (request.SecurityCode != settings.SecurityCode) throw new Exception("Mã xác thực không chính xác");
        VBDLISBaseResponse<List<DanhMucTrangThaiVBDLISResponse>> result = new VBDLISBaseResponse<List<DanhMucTrangThaiVBDLISResponse>>();
        string sql = $"SELECT Ten TenTrangThai, Ma MaTrangThai FROM {_trangThaiHoSoTable} WHERE DeletedOn IS NULL";
        var res = await _dapperRepository.QueryAsync<DanhMucTrangThaiVBDLISResponse>(sql, cancellationToken);
        if(res != null)
        {
            result.Success(res.ToList());
        }
        else
        {
            result.Fail();
        }

        return result;
    }
}
