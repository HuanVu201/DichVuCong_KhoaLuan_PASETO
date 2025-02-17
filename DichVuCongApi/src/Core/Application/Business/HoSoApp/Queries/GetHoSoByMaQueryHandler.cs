using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.PhiLePhiApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class GetHoSoByMaHoSoSpec : Specification<HoSo>, ISingleResultSpecification
{
    public GetHoSoByMaHoSoSpec(string maHoSo)
    {
        Query.Where(x => x.MaHoSo == maHoSo);
        Query.Where(x => x.DeletedOn == null);
    }
}

public class GetHoSoByMaQueryHandler : IQueryHandler<GetHoSoByMaQuery, HoSoDetailDto>
{
    private readonly IDapperRepository _dapperRepository;
    public GetHoSoByMaQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<Result<HoSoDetailDto>> Handle(GetHoSoByMaQuery request, CancellationToken cancellationToken)
    {
        var hoSoDic = new Dictionary<Guid, HoSoDetailDto>();
        var phiLePhiDic = new Dictionary<Guid, PhiLePhiDto>();
        var thanhPhanThuTucDic = new Dictionary<Guid, ThanhPhanThuTucDto>();
        var thanhPhanHoSoDic = new Dictionary<Guid, ThanhPhanHoSoDto>();
        var yeuCauThanhToanDic = new Dictionary<Guid, YeuCauThanhToanDto>();
        await _dapperRepository.QueryAsync<HoSoDetailDto, PhiLePhiDto, ThanhPhanThuTucDto, YeuCauThanhToanDto, ThanhPhanHoSoDto, HoSoDetailDto>(
            @"SELECT hs.Id as Id, hs.KenhThucHien, hs.MucDo, hs.NgayTiepNhan, hs.DinhKemTuChoi, hs.LyDoTuChoi, hs.NgayTra, hs.TrangThaiHoSoId, hs.DonViId, hs.NgayHenTra, hs.TrichYeuHoSo, hs.LoaiDoiTuong, hs.SoGiayToChuHoSo, hs.MaHoSo,
            hs.ChuHoSo, hs.MaTTHC, hs.NgaySinhChuHoSo, hs.SoDienThoaiChuHoSo, hs.EmailChuHoSo, hs.HinhThucTra, hs.UyQuyen, tthc.TenTTHC,
            hs.DiaChiChuHoSo, hs.NguoiUyQuyen, hs.SoGiayToNguoiUyQuyen, hs.SoDienThoaiNguoiUyQuyen, hs.DangKyNhanHoSoQuaBCCIData,
            hs.ThongBaoEmail, hs.ThongBaoZalo, hs.ThongBaoSMS, hs.MaTruongHop, hs.DinhKemKetQua, hs.TrichYeuKetQua, hs.YKienNguoiChuyenXuLy, hs.DinhKemYKienNguoiChuyenXuLy, hs.ThongTinTiepNhanBoSung, hs.EFormData, hs.NguoiDangXuLy, hs.NguoiDaXuLy, hs.NguoiNhanHoSo, hs.NguoiGui, hs.DonViDaChuyenXuLy,
            p.Id as Id, p.Loai, p.MoTa, p.SoTien, p.Ten,
            tptt.Id as Id, tptt.Ten, tptt.Ma, tptt.BatBuoc, tptt.SoBanChinh, tptt.SoBanSao, tptt.DinhKem,
           
            yctt.Id as Id, yctt.Phi, yctt.LePhi, yctt.SoTien, yctt.HinhThucThu, yctt.TrangThai,
            tphs.Id as Id, tphs.Ten, tphs.DinhKem
            FROM Business.HoSos hs
            INNER JOIN Catalog.ThuTucs tthc ON hs.MaTTHC = tthc.MaTTHC
            left join Business.PhiLePhis p on hs.MaTTHC = p.ThuTucId AND p.DeletedOn is null 
            left join Business.ThanhPhanThuTucs tptt on tptt.TruongHopId = hs.MaTruongHop
         
            left join Business.YeuCauThanhToans yctt on yctt.MaHoSo = hs.MaHoSo
            left join Business.ThanhPhanHoSos tphs on hs.MaHoSo = tphs.HoSo
            WHERE hs.MaHoSo = @MaHoSo AND hs.DeletedOn is null AND tptt.DeletedOn is null   AND yctt.DeletedOn is null
            ", (hs, p, tptt, yctt, tphs) =>
            {
                if (!hoSoDic.TryGetValue(hs.Id, out var hoSo))
                {
                    hoSoDic.Add(hs.Id, hoSo = hs);
                }


                return hoSo;
            }, splitOn: "Id,Id,Id,Id,Id", param: request);



        if (hoSoDic.Count > 0)
        {
            return Result<HoSoDetailDto>.Success(hoSoDic.Values.ToList()[0]);
        }
        return Result<HoSoDetailDto>.Fail("");
    }
}
