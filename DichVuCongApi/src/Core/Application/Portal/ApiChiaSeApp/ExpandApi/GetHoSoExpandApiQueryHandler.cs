using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Common;
using TD.DichVuCongApi.Application.Business.PhiLePhiApp;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
internal class GenerateQueryString_GetHoSo
{
    public GenerateQueryString_GetHoSo()
    {
        ViewQueryString = new();
        FormatResponseData = new();
    }
    public Dictionary<string, string> ViewQueryString { get; set; }
    public Dictionary<string, Func<FormatResponseData, Task<dynamic?>>> FormatResponseData { get; set; }
}
public class FormatResponseData
{
    public string Sql { get; set; }
    public object Param { get; set; }
}

public class GetHoSoExpandApiQueryHandler : IQueryHandler<GetHoSoExpandApiQuery, object>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly GenerateQueryString_GetHoSo _dataHandler;
    private readonly IInjectConfiguration _iInjectConfiguration;
    private readonly IMediator _mediator;
    private readonly IReadRepository<NgayNghi> _ngayNghiRepository;
    public GetHoSoExpandApiQueryHandler(IReadRepository<NgayNghi> ngayNghiRepository, IInjectConfiguration iInjectConfiguration, IDapperRepository dapperRepository, ICurrentUser currentUser, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _dataHandler = generateQueryString();
        _ngayNghiRepository = ngayNghiRepository;
        _iInjectConfiguration = iInjectConfiguration;
        _mediator = mediator;
    }
    private GenerateQueryString_GetHoSo generateQueryString()
    {
        GenerateQueryString_GetHoSo res = new GenerateQueryString_GetHoSo();
        string capNhatKetQuaXuLyHoSoQuery = @"SELECT Top 1 hs.donViChuyenXuLy, hs.id, hs.dinhKemSoHoa, hs.soGiayToChuHoSo, hs.maTTHC, tt.choPhepLayFileTuTHPS, hs.maHoSo, hs.trichYeuKetQua, hs.dinhKemKetQua,  hs.coQuanBanHanhKetQua, hs.loaiVanBanKetQua, hs.ngayBanHanhKetQua, hs.nguoiKyKetQua, hs.soKyHieuKetQua, hs.ngayKyKetQua, hs.eFormKetQuaData, hs.LoaiKetQua,
                                            thtt.eFormKetQua FROM Business.HoSos as hs INNER JOIN Catalog.ThuTucs as tt ON hs.MaTTHC = tt.MaTTHC LEFT JOIN Business.TruongHopThuTucs as thtt ON hs.MaTruongHop = thtt.Ma WHERE hs.Id = @Id ";
        string chuyenBuocXuLyQuery = @$"SELECT top 1 hs.donViChuyenXuLy, hs.dinhKemKetQua, hs.nguoiXuLyTiep, hs.coQuanBanHanhKetQua, hs.loaiVanBanKetQua, hs.ngayBanHanhKetQua, hs.nguoiKyKetQua, hs.soKyHieuKetQua, hs.ngayKyKetQua, hs.nguoiDaXuLy, hs.chuHoSo, hs.maHoSo, hs.trangThaiHoSoId, hs.dinhKemYKienNguoiChuyenXuLy, hs.trichYeuKetQua, hs.yKienNguoiChuyenXuLy, hs.maTruongHop, hs.buocHienTai, hs.nguoiNhanHoSo, u.fullName,
                                            thtt.edgeQuyTrinh, thtt.nodeQuyTrinh, thtt.eForm, thtt.thoiGianThucHien, thtt.loaiThoiGianThucHien, g.catalog
                                            FROM Business.HoSos hs Left JOIN [Identity].[Users] u ON hs.NguoiNhanHoSo = u.Id
                                            left join Business.TruongHopThuTucs thtt on thtt.Ma = hs.MaTruongHop
                                            left join {SchemaNames.Catalog}.{TableNames.Groups} g on u.OfficeCode = g.GroupCode
                                            WHERE hs.Id = @Id";
        string lienThongHeThongLLTP = @"SELECT hs.maHoSo, hs.eFormData, thtt.eForm FROM Business.HoSos hs INNER JOIN Business.TruongHopThuTucs thtt on hs.MaTruongHop = thtt.Ma WHERE hs.Id = @Id";
        string kySoChungThucQuery = @"SELECT hs.maHoSo, hs.nguoiDaXuLy, hs.chuHoSo, hs.dinhKemKetQua, hs.trangThaiHoSoId, hs.dinhKemYKienNguoiChuyenXuLy, hs.trichYeuKetQua, hs.yKienNguoiChuyenXuLy, hs.maTruongHop, hs.buocHienTai, hs.nguoiNhanHoSo, hs.donViId,
                                            u.fullName,
                                            thtt.edgeQuyTrinh, thtt.nodeQuyTrinh, thtt.eForm, thtt.thoiGianThucHien, thtt.loaiThoiGianThucHien,
                                            tphs.id, tphs.ten, tphs.maGiayTo, tphs.soTrang, tphs.soBanGiay, tphs.dinhKem, tphs.daChungThucDienTu, tphs.kyDienTuBanGiay, tphs.trangThaiDuyet, tphs.SoChungThucDienTu, tphs.SoChungThucDT, tphs.SoChungThucGiay, tphs.SoChungThucG,  dmgtct.Ten as TenGiayTo
                                            FROM Business.HoSos hs Left JOIN [Identity].[Users] u ON hs.NguoiNhanHoSo = u.Id
                                            left join Business.TruongHopThuTucs thtt on thtt.Ma = hs.MaTruongHop
                                            left join Business.ThanhPhanHoSos tphs on tphs.HoSo = hs.MaHoSo
                                            left join Business.DanhMucGiayToChungThucs dmgtct on dmgtct.Ma = tphs.MaGiayTo
                                            WHERE hs.Id = @Id and tphs.DeletedOn is null";
        string yeuCauThanhToanQuery = @"SELECT hs.id as id, hs.chuHoSo, hs.trichYeuHoSo,
            p.id as id, p.loai, p.moTa, p.soTien, p.ten,
            yctt.id as id, yctt.phi, yctt.lePhi, yctt.soTien, yctt.hinhThucThu, yctt.trangThai
            FROM Business.HoSos hs
            left join (SELECT id, loai, moTa, soTien, ten, thuTucId FROM Business.PhiLePhis WHERE DeletedOn is null) as p ON hs.maTTHC = p.thuTucId
            left join Business.yeuCauThanhToans yctt on yctt.MaHoSo = hs.MaHoSo
            WHERE hs.Id = @Id AND hs.DeletedOn is null AND yctt.DeletedOn is null";
        res.ViewQueryString.Add("capNhatKetQuaXuLyHoSo", capNhatKetQuaXuLyHoSoQuery);
        res.ViewQueryString.Add("chuyenBuocXuLy", chuyenBuocXuLyQuery);
        res.ViewQueryString.Add("lienThongHeThongLLTP", lienThongHeThongLLTP);
        res.ViewQueryString.Add("kySoChungThuc", kySoChungThucQuery);
        res.ViewQueryString.Add("yeuCauThanhToan", yeuCauThanhToanQuery);


        res.FormatResponseData.Add("kySoChungThuc", async (FormatResponseData req) => await FormatKySoChungThuc(req));
        res.FormatResponseData.Add("yeuCauThanhToan", async (FormatResponseData req) => await FormatYeuCauThanhToan(req));
        return res;
    }

    private async Task<HoSoKySoChungThucDetailDto> FormatKySoChungThuc(FormatResponseData req)
    {
        var hoSoDic = new Dictionary<Guid, HoSoKySoChungThucDetailDto>();
        var thanhPhanHoSoDic = new Dictionary<Guid, HoSoKySoChungThucDetail_ThanhPhanHoSo>();

        await _dapperRepository.QueryAsync<HoSoKySoChungThucDetailDto, UserDetailsDto, TruongHopThuTucQuyTrinhWithCurrentNode, HoSoKySoChungThucDetail_ThanhPhanHoSo, HoSoKySoChungThucDetailDto>(req.Sql,
            (hs, u, thtt, tphs) =>
            {
                if (!hoSoDic.TryGetValue(hs.Id, out var hoSo))
                {
                    hoSoDic.Add(hs.Id, hoSo = hs);
                }
                if (u != null)
                {
                    hoSo.FullName = u.FullName;
                }
                if (thtt != null)
                {
                    hoSo.EdgeQuyTrinh = thtt.EdgeQuyTrinh ?? "";
                    hoSo.NodeQuyTrinh = thtt.NodeQuyTrinh ?? "";
                    hoSo.EForm = thtt.EForm ?? "";
                    hoSo.ThoiGianThucHien = thtt.ThoiGianThucHien ?? 0;
                    hoSo.LoaiThoiGianThucHien = thtt.LoaiThoiGianThucHien ?? "";

                }
                if (tphs != null)
                {
                    if (!thanhPhanHoSoDic.TryGetValue(tphs.Id, out var thanhPhanChungThuc))
                    {
                        var tien = TinhTien.GetTongTienThanhPhanChungThuc(tphs);
                        tphs.TongTien = tien.TongTien;
                        hoSo.ThanhPhanHoSos.Add(tphs);
                        thanhPhanHoSoDic.Add(tphs.Id, thanhPhanChungThuc = tphs);
                    }
                }
                return hoSo;
            }, splitOn: "maHoSo,fullName,edgeQuyTrinh,id", param: req.Param);
        if (hoSoDic.Count > 0)
        {
            return hoSoDic.Values.ToList()[0];
        }
        return null;
    }

    private async Task<HoSoDetailDto> FormatYeuCauThanhToan(FormatResponseData req)
    {
        var hoSoDic = new Dictionary<Guid, HoSoDetailDto>();
        var phiLePhiDic = new Dictionary<Guid, PhiLePhiDto>();
        var yeuCauThanhToanDic = new Dictionary<Guid, YeuCauThanhToanDto>();
        await _dapperRepository.QueryAsync<HoSoDetailDto, PhiLePhiDto, YeuCauThanhToanDto, HoSoDetailDto>(req.Sql,
            (hs, p, yctt) =>
            {
                if (!hoSoDic.TryGetValue(hs.Id, out var hoSo))
                {
                    hoSoDic.Add(hs.Id, hoSo = hs);
                }

                if (p != null)
                {
                    if (!phiLePhiDic.TryGetValue(p.Id, out var phiLePhi))
                    {
                        hoSo.PhiLePhis.Add(p);
                        phiLePhiDic.Add(p.Id, phiLePhi = p);
                    }
                }
                if (yctt != null)
                {
                    if (!yeuCauThanhToanDic.TryGetValue(yctt.Id, out var yeuCauThanhToan))
                    {
                        hoSo.YeuCauThanhToans.Add(yctt);
                        yeuCauThanhToanDic.Add(yctt.Id, yeuCauThanhToan = yctt);
                    }
                }

                return hoSo;
            }, splitOn: "id,id,id", param: req.Param);
        if (hoSoDic.Count > 0)
        {
            return hoSoDic.Values.ToList()[0];
        }
        return null;
    }

    public async Task<Result<object>> Handle(GetHoSoExpandApiQuery request, CancellationToken cancellationToken)
    {

        try
        {
            var res = await _mediator.Send(new UpdateLuotGoiApiChiaSeCommand()
            {
                MaApiChiaSe = request.ApiEx,
            });
            if (res.Failed)
            {
               return Result<object>.Fail(res.Message);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return Result<object>.Fail("Lỗi kiểm tra giới hạn lượt gọi api!");
        }

        // nên thay đổi dần để tối ưu hiệu suất
        var _viewQueryString = _dataHandler.ViewQueryString;
        var _formatResponseData = _dataHandler.FormatResponseData;


        if (!string.IsNullOrEmpty(request.View) && _viewQueryString.ContainsKey(request.View))
        {
            string query = _viewQueryString[request.View];
            if (_formatResponseData.ContainsKey(request.View)) // dữ liệu muốn format trước khi trả về 
            {
                var formatFunc = _formatResponseData[request.View];
                var data = await formatFunc(new FormatResponseData
                {
                    Sql = query,
                    Param = request
                });
                if (data != null)
                {
                    return Result<object>.Success(data);
                }
            }
            else
            {
                var data = await _dapperRepository.QueryFirstOrDefaultAsync<object>(query, request); // truy vấn trực tiếp trả về kq
                if (data != null)
                {
                    return Result<object>.Success(data: data);
                }
            }
        }

        var hoSoDic = new Dictionary<Guid, HoSoDetailDto>();
        var phiLePhiDic = new Dictionary<Guid, PhiLePhiDto>();
        var yeuCauThanhToanDic = new Dictionary<Guid, YeuCauThanhToanDto>();
        await _dapperRepository.QueryAsync<HoSoDetailDto, TruongHopThuTucQuyTrinhWithCurrentNode, HoSoDetailDto>(
            @$"SELECT hs.Id as id, hs.coQuanBanHanhKetQua, hs.tinhThanhDiaBan, hs.quanHuyenDiaBan, hs.xaPhuongDiaBan, hs.lyDoTuChoi, hs.dinhKemTuChoi, hs.loaiVanBanKetQua, hs.ngayBanHanhKetQua, hs.nguoiKyKetQua, hs.soKyHieuKetQua, hs.ngayKyKetQua, hs.kenhThucHien, hs.nguoiDaXuLy, hs.laHoSoChungThuc, hs.ngayTiepNhan, hs.ngayHenTra,hs.ngayTra ,hs.trangThaiHoSoId, hs.trichYeuHoSo, hs.loaiDoiTuong, hs.soGiayToChuHoSo, hs.maHoSo, hs.donViId,
            hs.chuHoSo, hs.maTTHC, hs.ngaySinhChuHoSo, hs.soDienThoaiChuHoSo, hs.emailChuHoSo, hs.hinhThucTra, hs.uyQuyen,tt.tenTTHC,
            hs.diaChiChuHoSo, hs.nguoiUyQuyen, hs.soGiayToNguoiUyQuyen, hs.soDienThoaiNguoiUyQuyen, hs.dangKyNhanHoSoQuaBCCIData,
            hs.thongBaoEmail, hs.thongBaoZalo, hs.thongBaoSMS, hs.soDinhDanh, hs.tenDiaBan, hs.maTruongHop, hs.dinhKemKetQua, hs.trichYeuKetQua, hs.yKienNguoiChuyenXuLy, hs.dinhKemYKienNguoiChuyenXuLy, hs.thongTinTiepNhanBoSung, hs.eFormData, hs.emailNguoiUyQuyen, hs.tinhThanhNguoiUyQuyen, hs.quanHuyenNguoiUyQuyen, hs.xaPhuongNguoiUyQuyen,hs.diaChiNguoiUyQuyen,
            thtt.nodeQuyTrinh, thtt.edgeQuyTrinh, thtt.eForm, thtt.thoiGianThucHien, thtt.loaiThoiGianThucHien, thtt.khongCoNgayHenTra,thtt.ten as tenTruongHopThuTuc
            FROM Business.HoSos hs
            INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
            left join Business.TruongHopThuTucs thtt on thtt.Ma = hs.MaTruongHop 
            WHERE hs.Id = @Id AND hs.DeletedOn is null
            ", (hs, thtt) =>
            {
                if (!hoSoDic.TryGetValue(hs.Id, out var hoSo))
                {
                    hoSoDic.Add(hs.Id, hoSo = hs);
                }
                if (request.ReturnNodeQuyTrinh == true && thtt != null)
                {
                    hoSo.EdgeQuyTrinh = thtt.EdgeQuyTrinh ?? "";
                    hoSo.NodeQuyTrinh = thtt.NodeQuyTrinh ?? "";
                    hoSo.TenTruongHopThuTuc = thtt.TenTruongHopThuTuc ?? "";
                    hoSo.EForm = thtt.EForm ?? "";
                    hoSo.ThoiGianThucHien = thtt.ThoiGianThucHien ?? 0;
                    hoSo.LoaiThoiGianThucHien = thtt.LoaiThoiGianThucHien ?? "";
                    hoSo.KhongCoNgayHenTra = thtt.KhongCoNgayHenTra;
                }

                return hoSo;
            }, splitOn: "id,nodeQuyTrinh", param: request);



        if (hoSoDic.Count > 0)
        {
            var hoSoRes = hoSoDic.Values.ToList()[0];
            if (request.View == "tiepNhanTrucTuyen")
            {
                DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
                var caculateTime = new CaculateTime(_iInjectConfiguration);
                var ngayNghis = await _ngayNghiRepository.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year));
                var ngayHenTra = caculateTime.TinhNgayHenTra(ngayNghis.AsReadOnly(), currentTime, hoSoRes.ThoiGianThucHien, hoSoRes.LoaiThoiGianThucHien);
                hoSoRes.NgayHenTra = ngayHenTra;
            }
            return Result<object>.Success(hoSoRes);
        }
        return Result<object>.Fail("");
    }
}
