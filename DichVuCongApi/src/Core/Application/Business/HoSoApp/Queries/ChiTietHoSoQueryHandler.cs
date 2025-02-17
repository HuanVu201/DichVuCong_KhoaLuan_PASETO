using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class ChiTietHoSo_User
{
    public string Id { get; set; }
    public string FullName { get; set; }
}

public class ChiTietHoSoQueryHandler : IQueryHandler<ChiTietHoSoQuery, ChiTietHoSoDto>
{
    private readonly IDapperRepository _dapperRepository;
    public ChiTietHoSoQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<ChiTietHoSoDto>> Handle(ChiTietHoSoQuery request, CancellationToken cancellationToken)
    {
        var hoSoDic = new Dictionary<Guid, ChiTietHoSoDto>();
        var thanhPhanHoSoDic = new Dictionary<Guid, ThanhPhanHoSoDto>();

        string sql = @"SELECT hs.Id as Id, hs.NgayTiepNhan, hs.DinhKemKetQua, hs.TrichYeuKetQua, hs.NgayHenTra,hs.NgayTra, hs.TrichYeuHoSo, hs.SoGiayToChuHoSo, hs.MaHoSo,
            hs.ChuHoSo, hs.SoDinhDanh, hs.MaHoSo, hs.NgaySinhChuHoSo, hs.SoDienThoaiChuHoSo, hs.EmailChuHoSo, hs.KenhThucHien, hs.MaTTHC,
            hs.DiaChiChuHoSo, hs.LoaiGiayToChuHoSo, hs.DangKyNhanHoSoQuaBCCIData, hs.ThongTinTiepNhanBoSung, hs.SoBoHoSo, hs.NgayNopHoSo, hs.NguoiDangXuLy, hs.NguoiDaXuLy, hs.NguoiNhanHoSo, hs.DonViId, hs.NguoiGui, hs.DonViDaChuyenXuLy,
            ntn.Id as Id, ntn.FullName,
            nghs.Id as Id, nghs.FullName,
            tphs.Id as Id, tphs.Ten, tphs.SoBanChinh, tphs.SoBanSao,
            gr.GroupName , gr.Catalog, gr.MaDinhDanh, gr.SoDienThoai,
            yctt.HinhThucThu,
            thtt.ThoiGianThucHien, thtt.LoaiThoiGianThucHien, thtt.ThoiGianThucHienTrucTuyen
            FROM Business.HoSos as hs
            LEFT JOIN Business.ThanhPhanHoSos tphs on hs.MaHoSo = tphs.HoSo
            LEFT JOIN Business.YeuCauThanhToans yctt on hs.MaHoSo = yctt.MaHoSo
            LEFT JOIN [Identity].[Users] as ntn ON hs.NguoiNhanHoSo = ntn.Id
            LEFT JOIN [Identity].[Users] as nghs ON hs.NguoiGui = nghs.UserName
            LEFT JOIN [Catalog].[Groups] as gr ON hs.DonViId = gr.GroupCode
            LEFT JOIN [Business].[TruongHopThuTucs]  thtt ON hs.MaTruongHop = thtt.Ma

            WHERE hs.Id = @Id and hs.DeletedOn is null and tphs.DeletedOn is null";

        var data = await _dapperRepository.QueryAsync<ChiTietHoSoDto, ChiTietHoSo_User, ChiTietHoSo_User, ThanhPhanHoSoDto, GroupDto, YeuCauThanhToanDto, TruongHopThuTucDto, ChiTietHoSoDto>(
            sql, (hs, ntn, nghs, tphs, g, yctt, thtt) =>
            {
                if (!hoSoDic.TryGetValue(hs.Id, out var hoSo) && hs != null)
                {
                    hoSoDic.Add(hs.Id, hoSo = hs);
                }
                if (!thanhPhanHoSoDic.TryGetValue(tphs.Id, out var thanhPhanHoSo) && tphs != null)
                {
                    hoSo.ThanhPhanHoSos.Add(tphs);
                    thanhPhanHoSoDic.Add(tphs.Id, thanhPhanHoSo = tphs);
                }
                if (ntn != null)
                {
                    hoSo.NguoiTiepNhan = ntn.FullName;
                }
                if (nghs != null)
                {
                    hoSo.NguoiNopHoSo = nghs.FullName;
                }
                hoSo.SoBoHoSo = hoSo.SoBoHoSo != null ? hoSo.SoBoHoSo : "01";
                hoSo.GroupName = g.GroupName;
                hoSo.GroupCode = g.GroupCode;
                hoSo.SoDienThoaiDonVi = g.SoDienThoai;
                hoSo.Catalog = g.Catalog;
                hoSo.MaDinhDanh = g.MaDinhDanh;
                if (yctt != null)
                    hoSo.HinhThucThu = yctt.HinhThucThu;
                else
                    hoSo.HinhThucThu = null;

                hoSo.ThoiGianThucHien = thtt.ThoiGianThucHien;
                hoSo.ThoiGianThucHienTrucTuyen = thtt.ThoiGianThucHienTrucTuyen;
                hoSo.LoaiThoiGianThucHien = thtt.LoaiThoiGianThucHien;

                return hoSo;
            }, splitOn: "Id,Id,Id,Id,GroupName,HinhThucThu,ThoiGianThucHien", param: request);
        if (data.Any())
        {
            return Result<ChiTietHoSoDto>.Success(data.ToList()[0]);
        }
        throw new NotFoundException($"Hồ sơ với id: {request.Id} chưa được thêm trên hệ thống hoặc đã bị xóa");
    }
}
