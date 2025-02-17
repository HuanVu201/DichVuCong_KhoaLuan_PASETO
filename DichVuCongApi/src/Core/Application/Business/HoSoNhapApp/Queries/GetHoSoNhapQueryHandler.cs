
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.PhiLePhiApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoNhapApp.Dtos;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Queries;
public class GetHoSoNhapQueryHandler : IQueryHandler<GetHoSoNhapQuery, HoSoNhapDetailDto>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly GenerateQueryString_GetHoSo _dataHandler;
    public GetHoSoNhapQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<Result<HoSoNhapDetailDto>> Handle(GetHoSoNhapQuery request, CancellationToken cancellationToken)
    {
        var hoSoDic = new Dictionary<Guid, HoSoNhapDetailDto>();
        var thanhPhanHoSoNhapDic = new Dictionary<Guid, ThanhPhanHoSoNhapDto>();
        await _dapperRepository.QueryAsync<HoSoNhapDetailDto, ThanhPhanHoSoNhapDto, TruongHopThuTucQuyTrinhWithCurrentNode, HoSoNhapDetailDto>(
            @$"SELECT hs.Id as Id, hs.CoQuanBanHanhKetQua,hs.XaPhuongChuHoSo,hs.QuanHuyenChuHoSo,hs.TinhThanhChuHoSo ,hs.TinhThanhDiaBan, hs.QuanHuyenDiaBan, hs.XaPhuongDiaBan, hs.LyDoTuChoi, hs.DinhKemTuChoi, hs.LoaiVanBanKetQua, hs.NgayBanHanhKetQua, hs.NguoiKyKetQua, hs.SoKyHieuKetQua, hs.NgayKyKetQua, hs.KenhThucHien, hs.NguoiDaXuLy, hs.LaHoSoChungThuc ,hs.TrangThaiHoSoId, hs.TrichYeuHoSo, hs.LoaiDoiTuong, hs.SoGiayToChuHoSo,  hs.DonViId,
            hs.ChuHoSo, hs.MaTTHC, hs.NgaySinhChuHoSo, hs.SoDienThoaiChuHoSo, hs.EmailChuHoSo, hs.HinhThucTra, hs.UyQuyen,
            hs.DiaChiChuHoSo, hs.NguoiUyQuyen, hs.SoGiayToNguoiUyQuyen, hs.SoDienThoaiNguoiUyQuyen, hs.DangKyNhanHoSoQuaBCCIData,
            hs.ThongBaoEmail, hs.ThongBaoZalo, hs.ThongBaoSMS, hs.SoDinhDanh, hs.TenDiaBan, hs.MaTruongHop, hs.DinhKemKetQua, hs.TrichYeuKetQua, hs.YKienNguoiChuyenXuLy, hs.DinhKemYKienNguoiChuyenXuLy, hs.ThongTinTiepNhanBoSung, hs.EFormData, hs.EmailNguoiUyQuyen, hs.TinhThanhNguoiUyQuyen, hs.QuanHuyenNguoiUyQuyen, hs.XaPhuongNguoiUyQuyen,hs.DiaChiNguoiUyQuyen,
            tphs.Id as Id, tphs.Ten, tphs.HoSoId, tphs.NhanBanGiay, tphs.SoBanChinh, tphs.SoBanSao, tphs.DinhKem, tphs.MaGiayToKhoQuocGia, tphs.MaGiayToSoHoa, tphs.TrangThaiSoHoa, tphs.MaGiayTo, tphs.DuocLayTuKhoDMQuocGia, tphs.MaKetQuaThayThe, tphs.CreatedOn, tphs.NoiDungBoSung, tphs.SoTrang, tphs.SoBanGiay, tphs.DaChungThucDienTu, tphs.KyDienTuBanGiay, tphs.TrangThaiDuyet,  dmgtct.Ten as TenGiayTo,
            thtt.EdgeQuyTrinh, thtt.NodeQuyTrinh, thtt.EForm, thtt.ThoiGianThucHien, thtt.LoaiThoiGianThucHien
            FROM {SchemaNames.Business}.{TableNames.HoSoNhaps} hs
            left join {SchemaNames.Business}.{TableNames.ThanhPhanHoSoNhaps} tphs on tphs.HoSoId = hs.Id
            left join {SchemaNames.Business}.{TableNames.TruongHopThuTucs} thtt on thtt.Ma = hs.MaTruongHop
            left join {SchemaNames.Business}.{TableNames.DanhMucGiayToChungThucs} dmgtct on dmgtct.Ma = tphs.MaGiayTo
            WHERE hs.Id = @Id AND hs.DeletedOn is null AND tphs.DeletedOn is null
            ", (hs, tphsn, thtt) =>
            {
                if (!hoSoDic.TryGetValue(hs.Id, out var hoSo))
                {
                    hoSoDic.Add(hs.Id, hoSo = hs);
                }
                if (request.ReturnNodeQuyTrinh == true && thtt != null)
                {
                    hoSo.EdgeQuyTrinh = thtt.EdgeQuyTrinh ?? "";
                    hoSo.NodeQuyTrinh = thtt.NodeQuyTrinh ?? "";
                    hoSo.EForm = thtt.EForm ?? "";
                    hoSo.ThoiGianThucHien = thtt.ThoiGianThucHien ?? 0;
                    hoSo.LoaiThoiGianThucHien = thtt.LoaiThoiGianThucHien ?? "";
                }
                if (tphsn != null)
                    {
                    if (!thanhPhanHoSoNhapDic.TryGetValue(tphsn.Id, out var thanhPhanHoSoNhap))
                    {
                        hoSo.ThanhPhanHoSos.Add(tphsn);
                        thanhPhanHoSoNhapDic.Add(tphsn.Id, thanhPhanHoSoNhap = tphsn);
                    }
                }


                return hoSo;
            }, splitOn: "Id,Id,EdgeQuyTrinh", param: request);



        if (hoSoDic.Count > 0)
        {
            return Result<HoSoNhapDetailDto>.Success(hoSoDic.Values.ToList()[0]);
        }
        return Result<HoSoNhapDetailDto>.Fail("");
    }
}
