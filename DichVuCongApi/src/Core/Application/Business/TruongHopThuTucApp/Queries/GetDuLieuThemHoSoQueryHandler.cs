using Newtonsoft.Json;
using System.Data;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.PhiLePhiApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;

public class DuLieuThemHoSo_ThuTuc_Select
{
    public Guid Id { get; set; }
    public string TenTTHC { get; set; }
    public string MucDo { get; set; }
    public string MaTTHC { get; set; }
    public bool LaThuTucChungThuc { get; set; }

}
public class DuLieuThemHoSo_Group_Select
{
    public string GroupName { get; set; }
    public string GroupCode { get; set; }
    public string Catalog { get; set; }
    public string MaTinh { get; set; }
    public string MaHuyen { get; set; }
    public string MaXa { get; set; }
    public string? DiaChi { get; set; }
}
public class DuLieuThemHoSo_KetQuaThuTuc_Select
{
    public string TenKetQua { get; set; }
    public Guid Id { get; set; }
}

public class GetDuLieuThemHoSoQueryHandler : IQueryHandler<GetDuLieuThemHoSo, DuLieuThemHoSoDto>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IInjectConfiguration _configuration;
    private readonly IReadRepository<NgayNghi> _ngayNghiRepository;
    private readonly string tenTinhThanh;
    public GetDuLieuThemHoSoQueryHandler(IReadRepository<NgayNghi> ngayNghiRepository, IDapperRepository dapperRepository, IInjectConfiguration configuration)
    {
        _dapperRepository = dapperRepository;
        _configuration = configuration;
        tenTinhThanh = configuration.GetValue<string>("GLOBAL_CONFIG:Ten_Tinh_Thanh");
        _ngayNghiRepository = ngayNghiRepository;
    }

    public async Task<Result<DuLieuThemHoSoDto>> Handle(GetDuLieuThemHoSo request, CancellationToken cancellationToken)
    {
        DuLieuThemHoSoDto response = new DuLieuThemHoSoDto();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var sqlNgayNghi = "SELECT Date FROM Catalog.NgayNghis WHERE D";
        //var sqlTruongHopThuTuc = @$"SELECT Top 1 Id, Ten, Ma, ThoiGianThucHien, LoaiThoiGianThucHien, EForm, YeuCauNopPhiTrucTuyen, AnThongTinLienHeNopTrucTuyen, NodeQuyTrinh, EdgeQuyTrinh, EFormTemplate FROM Business.TruongHopThuTucs 
        //                            WHERE Ma = @TruongHopId and DeletedOn is null";
        //var sqlPhiLePhi = $"SELECT ID, Loai, MoTa, SoTien, Ten FROM Business.PhiLePhis WHERE ThuTucId = @ThuTucId and DeletedOn is null";
        //var sqlThanhPhanThuTuc = $"SELECT ID, Ten, Ma, BatBuoc, SoBanChinh, SoBanSao, ChoPhepThemToKhai, DinhKem as MauDinhKem FROM Business.ThanhPhanThuTucs WHERE TruongHopId = @TruongHopId and DeletedOn is null";
        var sqlGetUserInfo = @"SELECT Top 1 ID, SoDinhDanh, HoVaTen, FullName, Cha, Me, DanToc, GioiTinh, NgayThangNamSinh, NoiDangKyKhaiSinh,
                                NoiOHienTai, ThuongTru, TinhTrangHonNhan, TonGiao, NguoiDaiDien, VoChong,ChuHo, QueQuan, PhoneNumber, Email FROM [Identity].[Users] WHERE ID = @UserId";
        //var sqlGetThuTuc = @"SELECT TenTTHC, MucDo, MaTTHC, LaThuTucChungThuc from Catalog.ThuTucs WHERE MaTTHC = @ThuTucId";
        var sqlGetDonVi = @"SELECT Top 1 GroupName, GroupCode, Catalog, DiaChi, MaTinh, MaHuyen, MaXa from Catalog.Groups WHERE GroupCode = @DonViId and DeletedOn is null";
        var resDic = new Dictionary<Guid, DuLieuThemHoSoDto>();
        var phiLePhiDic = new Dictionary<Guid, PhiLePhiDto>();
        var thanhPhanThuTucDic = new Dictionary<Guid, GetDuLieuThemHoSo_ThanhPhanThuTucDto>();
        var ketQuaThuTucDic = new Dictionary<Guid, DuLieuThemHoSo_KetQuaThuTuc_Select>();

        string sql = @$"SELECT 
                tt.Id as Id, tt.TenTTHC, tt.MucDo, tt.MaTTHC, tt.LaThuTucChungThuc,tt.TrangThaiPhiLePhi, tt.UrlVideoTutorial,
                thtt.Id as Id, thtt.Ten,thtt.KhongThuBanGiay ,thtt.Ma, thtt.ThoiGianThucHien, thtt.ThoiGianThucHienTrucTuyen, thtt.LoaiThoiGianThucHien, thtt.EForm, thtt.YeuCauNopPhiTrucTuyen, thtt.AnThongTinLienHeNopTrucTuyen, thtt.NodeQuyTrinh, thtt.EdgeQuyTrinh, thtt.EFormTemplate ,thtt.KhongCoNgayHenTra,
                plp.Id as Id, plp.Loai, plp.MoTa, plp.SoTien, plp.Ten,
                tptt.Id as Id, tptt.Ten, tptt.Ma, tptt.BatBuoc, tptt.SoBanChinh, tptt.SoBanSao, tptt.ChoPhepThemToKhai, tptt.MauDinhKem,
                kqtt.Id as Id, kqtt.TenKetQua

                from Catalog.ThuTucs tt 
                LEFT JOIN Business.TruongHopThuTucs thtt ON tt.MaTTHC = thtt.ThuTucId 
                LEFT JOIN (SELECT Id, Loai, MoTa, SoTien, Ten, ThuTucId FROM Business.PhiLePhis WHERE ThuTucId = @ThuTucId and DeletedOn is null) as plp ON tt.MaTTHC = plp.ThuTucId
                LEFT JOIN (SELECT Id, Ten, Ma, BatBuoc, SoBanChinh, SoBanSao, ChoPhepThemToKhai, DinhKem as MauDinhKem, ThuTucId FROM Business.ThanhPhanThuTucs WHERE TruongHopId = @TruongHopId and DeletedOn is null) as tptt ON tt.MaTTHC = tptt.ThuTucId
                LEFT JOIN Business.KetQuaThuTucs kqtt ON tt.MaTTHC = kqtt.MaTTHC

                WHERE tt.MaTTHC = @ThuTucId and thtt.Ma = @TruongHopId and thtt.DeletedOn is null";

        await _dapperRepository.QueryAsync<DuLieuThemHoSoDto, TruongHopThuTucDetail, PhiLePhiDto, GetDuLieuThemHoSo_ThanhPhanThuTucDto, DuLieuThemHoSo_KetQuaThuTuc_Select, DuLieuThemHoSoDto>(sql,
            (dlths, thtt, plp, tptt, kqtt) =>
            {
                if (!resDic.TryGetValue(dlths.Id, out var duLieu))
                {
                    resDic.Add(dlths.Id, duLieu = dlths);
                }
                //if (request.ReturnThuTuc == true && tt != null)
                //{
                //    dlths.Id = tt.Id;
                //    dlths.TenTTHC = tt.TenTTHC;
                //    dlths.MucDo = tt.MucDo;
                //    dlths.MaTTHC = tt.MaTTHC;
                //    dlths.LaThuTucChungThuc = tt.LaThuTucChungThuc;
                //}
                if (thtt != null && dlths.TruongHopthuTuc == null)
                {
                    //var tpttDetail = new TruongHopThuTucDetail()
                    //{
                    //    YeuCauNopPhiTrucTuyen = thtt?.YeuCauNopPhiTrucTuyen,
                    //    NodeQuyTrinh = thtt?.NodeQuyTrinh,
                    //    EdgeQuyTrinh = thtt?.EdgeQuyTrinh,
                    //    ThuTucId = thtt?.ThuTucId,
                    //    AnThongTinLienHeNopTrucTuyen = thtt?.AnThongTinLienHeNopTrucTuyen,
                    //    BatBuocDinhKemKetQua = thtt?.BatBuocDinhKemKetQua,
                    //    DonViTiepNhanRieng = thtt?.DonViTiepNhanRieng,
                    //    EForm = thtt?.EForm,
                    //    EFormTemplate = thtt?.EFormTemplate,
                    //    Id = thtt.Id,
                    //    ThoiGianThucHien = thtt?.ThoiGianThucHien,
                    //    LoaiThoiGianThucHien = thtt?.LoaiThoiGianThucHien,
                    //    Ma = thtt?.Ma,
                    //    Ten = thtt?.Ten,
                    //};
                    duLieu.TruongHopthuTuc = thtt;
                }
                if (request.ReturnPhiLePhi == true && plp != null)
                {
                    if (!phiLePhiDic.TryGetValue(plp.Id, out var phiLePhi))
                    {
                        duLieu.PhiLePhis.Add(plp);
                        phiLePhiDic.Add(plp.Id, phiLePhi = plp);
                    }
                }
                if (tptt != null)
                {
                    if (!thanhPhanThuTucDic.TryGetValue(tptt.Id, out var thanhPhanThuTuc))
                    {
                        duLieu.ThanhPhanThuTucs.Add(tptt);
                        thanhPhanThuTucDic.Add(tptt.Id, thanhPhanThuTuc = tptt);
                    }
                }
                if (kqtt != null)
                {
                    if (!ketQuaThuTucDic.TryGetValue(kqtt.Id, out var ketQuaThuTuc))
                    {
                        duLieu.KetQuaThuTucs.Add(kqtt);
                        ketQuaThuTucDic.Add(kqtt.Id, ketQuaThuTuc = kqtt);
                    }
                }
                return duLieu;
            }, request, null, cancellationToken, splitOn: "Id,Id,Id,Id,Id"
        );
        if (resDic.Count > 0)
        {
            var firstItem = resDic.Values.ToList()[0];
            if (request.ReturnUserInfo == true)
            {
                var user = await _dapperRepository.QueryFirstOrDefaultAsync<UserInfoPortal>(sqlGetUserInfo, request);
                firstItem.TaiKhoan = user;
            }
            if (request.ReturnDonVi == true)
            {
                var donVi = await _dapperRepository.QueryFirstOrDefaultAsync<DuLieuThemHoSo_Group_Select>(sqlGetDonVi, request);
                if (donVi != null)
                {
                    firstItem.TenDonVi = donVi.GroupName;
                    firstItem.TinhThanhDiaBan = donVi.MaTinh;
                    firstItem.QuanHuyenDiaBan = donVi.MaHuyen;
                    firstItem.XaPhuongDiaBan = donVi.MaXa;

                    if (!string.IsNullOrEmpty(donVi.Catalog) && !string.IsNullOrEmpty(donVi.GroupCode))
                    {
                        if (donVi.Catalog.Contains("so-ban-nganh"))
                        {
                            string tenTinh = char.ToLower(tenTinhThanh[0]) + tenTinhThanh.Substring(1);
                            if (!string.IsNullOrEmpty(donVi.DiaChi) && donVi.GroupCode.ToUpper().Contains("C55B97AA-FC6A-7817-2C88-983E00BD5996"))
                            {
                                firstItem.DiaChiNhanKetQuaTrucTiep = $@"<b>Tại</b>: Bộ phận Tiếp nhận và Trả kết quả {donVi.GroupName}.<br/>
                                                                        <b>Địa chỉ</b>: {donVi.DiaChi}.";
                            }
                            else
                            {
                                firstItem.DiaChiNhanKetQuaTrucTiep = $@"<b>Tại</b>: Trung tâm Phục vụ hành chính công {tenTinh}.<br/>
                                                                        <b>Địa chỉ</b>: {donVi.DiaChi}.";
                            }
                        }
                        else
                        {
                            if (!string.IsNullOrEmpty(donVi.DiaChi))
                            {
                                firstItem.DiaChiNhanKetQuaTrucTiep = $@"<b>Tại</b>: Bộ phận Tiếp nhận và Trả kết quả {donVi.GroupName}.<br/>
                                                                        <b>Địa chỉ</b>: {donVi.DiaChi}.";
                            }
                        }
                    }
                }
            }
            var ngayNghis = await _ngayNghiRepository.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year));
            var caculateTime = new CaculateTime(_configuration);
            firstItem.NgayHenTra = firstItem.TruongHopthuTuc.KhongCoNgayHenTra == true ? null : caculateTime.TinhNgayHenTra(ngayNghis, currentTime, (int)firstItem.TruongHopthuTuc.ThoiGianThucHien, firstItem.TruongHopthuTuc.LoaiThoiGianThucHien);
            firstItem.NgayTiepNhan = currentTime;
            return Result<DuLieuThemHoSoDto>.Success(firstItem);
        }

        //var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTucDetail>(sqlTruongHopThuTuc, request);
        //if(truongHopThuTuc == null)
        //{
        //    throw new NotFoundException($"Trường hợp thủ tục với mã: {request.TruongHopId} chưa được thêm vào hệ thống");
        //}

        //if (request.ReturnThuTuc == true)
        //{
        //    var thuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<DuLieuThemHoSo_ThuTuc_Select>(sqlGetThuTuc, request);
        //    if(thuTuc != null)
        //    {
        //        response.TenTTHC = thuTuc.TenTTHC;
        //        response.MucDo = thuTuc.MucDo;
        //        response.MaTTHC = thuTuc.MaTTHC;
        //        response.LaThuTucChungThuc = thuTuc.LaThuTucChungThuc;
        //    }
        //}
        //if (request.ReturnPhiLePhi == true)
        //{
        //    var phiLePhis = await _dapperRepository.QueryAsync<PhiLePhiDto>(sqlPhiLePhi, request);
        //    response.PhiLePhis = phiLePhis;
        //}
        //var thanhPhanThuTucs = await _dapperRepository.QueryAsync<GetDuLieuThemHoSo_ThanhPhanThuTucDto>(sqlThanhPhanThuTuc, request);
        return Result<DuLieuThemHoSoDto>.Fail("");
    }
}
