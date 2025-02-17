using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;

public class HoSo_MaTruongHop
{
    public string MaTruongHop { get; set; }
    public string BuocHienTai { get; set; }
    public string NguoiNhanHoSo { get; set; }
    public string FullName { get; set; }
    public string? QuyetDinh { get; set; }
    public string? DinhKemQuyetDinh { get; set; }
    public string? TenTTHC { get; set; }


}

public class TruongHopThuTucQuyTrinhWithCurrentNode
{
    public string? NodeQuyTrinh { get; set; }
    public string? TenTruongHopThuTuc { get; set; }
    public string? EForm { get; set; }
    public double? ThoiGianThucHien { get; set; }
    public bool? KhongCoNgayHenTra { get; set; }
    public string? LoaiThoiGianThucHien { get; set; }
    public string? QuyetDinh { get; set; }
    public string? DinhKemQuyetDinh { get; set; }
    public string? EdgeQuyTrinh { get; set; }
    public string? BuocHienTai { get; set; }
    public string? NguoiNhanHoSo { get; set; }
    public string? FullName { get; set; }
    public string? TenTTHC { get; set; }

}
public class GetTruongHopThuTucByHoSoQueryHandler : IQueryHandler<GetTruongHopThuTucByHoSoQuery, TruongHopThuTucQuyTrinhWithCurrentNode>
{
    private readonly IDapperRepository _dapperRepository;
    public GetTruongHopThuTucByHoSoQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<TruongHopThuTucQuyTrinhWithCurrentNode>> Handle(GetTruongHopThuTucByHoSoQuery request, CancellationToken cancellationToken)
    {
        var sqlHoSo = @"SELECT top 1 MaTruongHop, BuocHienTai, NguoiNhanHoSo, u.FullName, tt.QuyetDinh, tt.DinhKemQuyetDinh, tt.TenTTHC
                        FROM Business.HoSos hs
                        Left JOIN [Identity].[Users] u ON hs.NguoiNhanHoSo = u.Id
                        Left JOIN [Catalog].[ThuTucs] tt ON hs.MaTTHC = tt.MaTTHC
                        WHERE hs.Id = @hoSoId ";
        var sqlTruongHopThuTuc = "SELECT top 1 NodeQuyTrinh, EdgeQuyTrinh FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";

        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo_MaTruongHop>(sqlHoSo, request);
        if(hoSo == null)
        {
            throw new NotFoundException($"Không tìm thấy hồ sơ với mã: {request.hoSoId}");
        }
        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTucQuyTrinhWithCurrentNode>(sqlTruongHopThuTuc, hoSo);
        if(truongHopThuTuc == null)
        {
            throw new NotFoundException($"Không tìm thấy trường hợp thủ tục với mã {hoSo.MaTruongHop}");
        }
        truongHopThuTuc.BuocHienTai = hoSo.BuocHienTai;
        truongHopThuTuc.NguoiNhanHoSo = hoSo.NguoiNhanHoSo;
        truongHopThuTuc.FullName = hoSo.FullName;
        truongHopThuTuc.QuyetDinh = hoSo.QuyetDinh;
        truongHopThuTuc.DinhKemQuyetDinh = hoSo.DinhKemQuyetDinh;
        truongHopThuTuc.TenTTHC = hoSo.TenTTHC;

        return Result<TruongHopThuTucQuyTrinhWithCurrentNode>.Success(truongHopThuTuc);
    }
}
