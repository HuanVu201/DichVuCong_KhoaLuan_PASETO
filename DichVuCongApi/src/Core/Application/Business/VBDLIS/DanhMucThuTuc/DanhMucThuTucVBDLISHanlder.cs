namespace TD.DichVuCongApi.Application.Business.VBDLIS.DanhMucThuTuc;
internal class DanhMucThuTucVBDLISHanlder : IRequestHandler<DanhMucThuTucVBDLISRequest, VBDLISBaseResponse<List<DanhMucThuTucVBDLISResponse>>>
{
    private readonly IDapperRepository _dapperRepository;

    private readonly string _truongHopThuTucTable = "[Business].[TruongHopThuTucs]";
    private readonly string _thuTucTable = "[Catalog].[ThuTucs]";
    private readonly IVBDLISServices _vbdlisServices;
    public DanhMucThuTucVBDLISHanlder(IDapperRepository dapperRepository, IVBDLISServices vbdlisServices)
    {
        _dapperRepository = dapperRepository;
        _vbdlisServices = vbdlisServices;
    }

    public async Task<VBDLISBaseResponse<List<DanhMucThuTucVBDLISResponse>>> Handle(DanhMucThuTucVBDLISRequest request, CancellationToken cancellationToken)
    {
        VBDLISSettings settings = _vbdlisServices.Get();
        if (string.IsNullOrEmpty(request.SecurityCode)) throw new ArgumentNullException(nameof(request.SecurityCode));
        if (request.SecurityCode != settings.SecurityCode) throw new Exception("Mã xác thực không chính xác");
        VBDLISBaseResponse<List<DanhMucThuTucVBDLISResponse>> result = new VBDLISBaseResponse<List<DanhMucThuTucVBDLISResponse>>();
        string sql = $"SELECT Ma MaThuTucHanhChinh, CONCAT(Ten, '_', TenTTHC ) TenThuTucHanhChinh FROM {_truongHopThuTucTable} " +
            $"INNER JOIN {_thuTucTable} ON {_truongHopThuTucTable}.ThuTucId = {_thuTucTable}.MaTTHC WHERE {_truongHopThuTucTable}.DeletedOn IS NULL AND {_thuTucTable}.DeletedOn IS NULL " +
            $"AND SuDung =1 AND LaThuTucLienThongDatDai =1 ";
        var res = await _dapperRepository.QueryAsync<DanhMucThuTucVBDLISResponse>(sql, cancellationToken);
        if (res != null)
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