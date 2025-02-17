using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.DanhMucNguoiDung;
public class DanhMucNguoiDungVBDLISHandler : IRequestHandler<DanhMucNguoiDungVBDLISRequest, VBDLISBaseResponse<List<DanhMucNguoiDungVBDLISResponse>>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly string _vbdlisUserTable = "[Identity].[UserVBDLIS]";
    private readonly IVBDLISServices _vbdlisServices;
    public DanhMucNguoiDungVBDLISHandler(IDapperRepository dapperRepository, IVBDLISServices vbdlisServices)
    {
        _dapperRepository = dapperRepository;
        _vbdlisServices = vbdlisServices;
    }

    public async Task<VBDLISBaseResponse<List<DanhMucNguoiDungVBDLISResponse>>> Handle(DanhMucNguoiDungVBDLISRequest request, CancellationToken cancellationToken)
    {
        VBDLISSettings settings = _vbdlisServices.Get();
        if(string.IsNullOrEmpty(request.SecurityCode)) throw new ArgumentNullException(nameof(request.SecurityCode));
        if (request.SecurityCode != settings.SecurityCode) throw new Exception("Mã xác thực không chính xác");
        VBDLISBaseResponse<List<DanhMucNguoiDungVBDLISResponse>> result = new VBDLISBaseResponse<List<DanhMucNguoiDungVBDLISResponse>>();
        string sql = $"SELECT FullName TenNguoiDung, UserName MaNguoiDung, GroupName TenPhongBan, PositionCode ChucDanh FROM {_vbdlisUserTable} WHERE DeletedOn IS NULL";
        var res = await _dapperRepository.QueryAsync<DanhMucNguoiDungVBDLISResponse>(sql, cancellationToken);
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
