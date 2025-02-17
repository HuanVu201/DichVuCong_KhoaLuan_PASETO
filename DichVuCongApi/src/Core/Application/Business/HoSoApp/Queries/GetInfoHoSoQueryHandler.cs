using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class InfoHoSoQuery
{
    public Guid? Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public bool? UyQuyen { get; set; }
    public string? NguoiUyQuyen { get; set; }
    public string? DinhKemKetQua { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public string? NguoiNhapDanhGiaText { get; set; }
}

public class GetInfoHoSoQueryHandler : IRequestHandler<GetInfoHoSoQuery, InfoHoSoQuery>
{
    private readonly IDapperRepository _dapperRepository;
    public GetInfoHoSoQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<InfoHoSoQuery> Handle(GetInfoHoSoQuery request, CancellationToken cancellationToken)
    {
        var hoSoInfo = new InfoHoSoQuery();
        string sqlQuery = $@"Select hs.MaHoSo, hs.ChuHoSo, hs.SoGiayToChuHoSo, hs.UyQuyen, hs.NguoiUyQuyen, hs.DinhKemKetQua, hs.TrichYeuKetQua, pks.NguoiNhapDanhGiaText, hs.NguoiDangXuLy, hs.NguoiDaXuLy, hs.NguoiNhanHoSo, hs.DonViId, hs.NguoiGui, hs.DonViDaChuyenXuLy
                            from [Business].[HoSos] as hs
                            LEFT JOIN [Business].[PhieuKhaoSats] pks ON pks.MaHoSo = hs.MaHoSo
                            where hs.Id = @Id";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoDto>(sqlQuery, new { Id = request.Id });
        if (data != null)
        {
            hoSoInfo.Id = request.Id;
            hoSoInfo.MaHoSo = data.MaHoSo;
            hoSoInfo.ChuHoSo = data.ChuHoSo;
            hoSoInfo.SoGiayToChuHoSo = data.SoGiayToChuHoSo;
            hoSoInfo.UyQuyen = data.UyQuyen;
            hoSoInfo.NguoiUyQuyen = data.NguoiUyQuyen;
            hoSoInfo.DinhKemKetQua = data.DinhKemKetQua;
            hoSoInfo.TrichYeuKetQua = data.TrichYeuKetQua;
            hoSoInfo.NguoiNhapDanhGiaText = data.NguoiNhapDanhGiaText;
            return hoSoInfo;
        }
        throw new Exception($"Hồ sơ với Id: {request.Id} chưa được thêm vào hệ thống hoặc đã bị xóa");


    }
}
