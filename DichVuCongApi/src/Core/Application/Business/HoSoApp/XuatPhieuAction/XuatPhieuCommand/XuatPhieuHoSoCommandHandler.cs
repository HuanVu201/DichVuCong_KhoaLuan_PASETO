using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.QrCodeServive;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;

public class XuatPhieuHoSoCommandHandler : IQueryHandler<XuatPhieuHoSoCommand, object>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IQrCodeService _qrCodeService;
    private readonly IMediator _mediator;
    private readonly IMinioService _minioService;
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IInjectConfiguration _configuration;
    private const string ngayHenTraConfigCode = "ngay-hen-tra-config";
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly ICurrentUser _currentUser;
    private const string usingQrCode = "use-qr-code";
    public XuatPhieuHoSoCommandHandler(IDapperRepository dapperRepository, IQrCodeService qrCodeService, IMediator mediator, IMinioService minioService, IReadRepository<NgayNghi> repositoryNgayNghi, IInjectConfiguration configuration, IReadRepository<Config> readRepositoryConfig, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _qrCodeService = qrCodeService;
        _mediator = mediator;
        _minioService = minioService;
        _repositoryNgayNghi = repositoryNgayNghi;
        _configuration = configuration;
        _readRepositoryConfig = readRepositoryConfig;
        _currentUser = currentUser;
    }

    public async Task<Result<object>> Handle(XuatPhieuHoSoCommand request, CancellationToken cancellationToken)
    {
        string sqlQueryHoSo = $@"SELECT ID, MaHoSo FROM Business.HoSos Where Id=@Id";
        var hoSoQuery = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoDto>(sqlQueryHoSo, new { id = request.Id });
        string maGiayTo = string.Empty;

        if (hoSoQuery is not null && !string.IsNullOrEmpty(hoSoQuery.MaHoSo))
        {
            maGiayTo = hoSoQuery.MaHoSo + "_" + request.MaLoaiPhieu;
        }
        else
        {
            maGiayTo = request.Id + "_" + request.MaLoaiPhieu;
        }

        string sqlGiayToHoSo = $@"SELECT Id, PDFPhieu, MaGiayTo, DocxPhieu FROM Business.GiayToHoSos Where MaGiayTo=@MaGiayTo And SuDung = '1'";
        var gths = await _dapperRepository.QueryFirstOrDefaultAsync<GiayToHoSoDto>(sqlGiayToHoSo, new { MaGiayTo = maGiayTo });

        // Không có Pdf phiếu đã tạo trước đó
        // Tiến hành tạo mới
        var hoSoDic = new Dictionary<DefaultIdType, XuatPhieuHoSoDto>();
        var thanhPhanHoSoDic = new Dictionary<DefaultIdType, ThanhPhanHoSoDto>();

        string sql = @"SELECT hs.Id as Id, hs.NgayTiepNhan, hs.DinhKemKetQua, hs.TrichYeuKetQua, hs.NgayHenTra,hs.NgayTra, hs.TrichYeuHoSo, hs.SoGiayToChuHoSo, hs.MaHoSo,
            hs.ChuHoSo, hs.SoDinhDanh, hs.MaHoSo, hs.NgaySinhChuHoSo, hs.SoDienThoaiChuHoSo, hs.EmailChuHoSo, hs.KenhThucHien, hs.MaTTHC,hs.DonViId,
            hs.DiaChiChuHoSo, hs.LoaiGiayToChuHoSo, hs.DangKyNhanHoSoQuaBCCIData, hs.ThongTinTiepNhanBoSung, hs.SoBoHoSo, hs.NgayNopHoSo,
            hs.UyQuyen, hs.NguoiUyQuyen, hs.SoDienThoaiNguoiUyQuyen, hs.EmailNguoiUyQuyen, hs.SoGiayToNguoiUyQuyen, hs.DiaChiNguoiUyQuyen,
            ntn.Id as Id, ntn.FullName, 
            nghs.Id as Id, nghs.FullName,
            tphs.Id as Id, tphs.Ten, tphs.SoBanChinh, tphs.SoBanSao,
            gr.GroupName, gr.GroupCode, gr.Catalog, gr.MaDinhDanh, gr.SoDienThoai, gr.MaTinh,
            tt.MaLinhVucChinh,
            thtt.ThoiGianThucHien, thtt.LoaiThoiGianThucHien, thtt.noteNgayLamViec, thtt.noteTraKetQua
            FROM Business.HoSos as hs
            LEFT JOIN Business.ThanhPhanHoSos tphs on hs.MaHoSo = tphs.HoSo
            LEFT JOIN [Catalog].[ThuTucs]  tt ON hs.MaTTHC = tt.MaTTHC
            LEFT JOIN [Identity].[Users] as ntn ON hs.NguoiNhanHoSo = ntn.Id
            LEFT JOIN [Identity].[Users] as nghs ON hs.NguoiGui = nghs.UserName
            LEFT JOIN [Catalog].[Groups] as gr ON hs.DonViId = gr.GroupCode
            LEFT JOIN [Business].[TruongHopThuTucs]  thtt ON hs.MaTruongHop = thtt.Ma

            WHERE hs.Id = @Id and hs.DeletedOn is null and tphs.DeletedOn is null
            Order By tphs.Id";

        var data = await _dapperRepository.QueryAsync<XuatPhieuHoSoDto, XuatPhieu_User, XuatPhieu_User, ThanhPhanHoSoDto, GroupDto, ThuTucDto, TruongHopThuTucDto, XuatPhieuHoSoDto>(
            sql, (hs, ntn, nghs, tphs, g, tt, thtt) =>
            {
                if (!hoSoDic.TryGetValue(hs.Id, out var hoSo) && hs != null)
                    hoSoDic.Add(hs.Id, hoSo = hs);

                if (!thanhPhanHoSoDic.TryGetValue(hs.Id, out var thanhPhanHoSo) && tphs != null)
                {
                    hoSo.ThanhPhanHoSos.Add(tphs);
                    thanhPhanHoSoDic.Add(tphs.Id, thanhPhanHoSo = tphs);
                }

                if (ntn != null)
                    hoSo.NguoiTiepNhan = ntn.FullName;

                if (nghs != null)
                    hoSo.NguoiNopHoSo = nghs.FullName;

                hoSo.SoBoHoSo = hoSo.SoBoHoSo != null ? hoSo.SoBoHoSo : "01";
                hoSo.GroupName = g.GroupName;
                hoSo.GroupCode = g.GroupCode;
                hoSo.SoDienThoaiDonVi = g.SoDienThoai;
                hoSo.Catalog = g.Catalog;
                hoSo.MaDinhDanh = g.MaDinhDanh;
                hoSo.MaLinhVucChinh = tt.MaLinhVucChinh;
                hoSo.ThoiGianThucHien = thtt.ThoiGianThucHien.ToString();
                hoSo.LoaiThoiGianThucHien = thtt.LoaiThoiGianThucHien;
                hoSo.MaTinh = g.MaTinh;
                hoSo.NoteNgayLamViec = thtt.NoteNgayLamViec;
                hoSo.NoteTraKetQua = thtt.NoteTraKetQua;

                return hoSo;
            }, splitOn: "Id,Id,Id,Id,GroupName,MaLinhVucChinh,ThoiGianThucHien", param: request);
        if (data.Any())
        {
            XuatPhieuHoSoDto hoSo = data.ToList()[0];
            if (gths is not null && !string.IsNullOrEmpty(gths.PDFPhieu))
            {
                hoSo.UrlPhieu = gths.PDFPhieu;
                hoSo.DocxPhieu = gths.DocxPhieu;
            }

            if (request.PhoneNumberCurUser == true && !string.IsNullOrEmpty(hoSo.Catalog) && hoSo.Catalog != "so-ban-nganh")
            {
                var userId = _currentUser.GetUserId();
                string sqlQueryNguoiXuatPhieu = @"SELECT TOP (1) PhoneNumber
                                          FROM [Identity].[Users]
                                          WHERE Id= @Id";
                var res = await _dapperRepository.QueryFirstOrDefaultAsync<UserAppDto>(sqlQueryNguoiXuatPhieu, new
                {
                    Id = userId
                });

                if (res != null && !string.IsNullOrEmpty(res.PhoneNumber))
                    hoSo.SoDienThoaiDonVi = res.PhoneNumber;
            }

            string tenTinhUpper = string.Empty;
            if (!string.IsNullOrEmpty(hoSo.MaTinh))
            {
                try
                {
                    string sqlQueryDiaBan = $@"SELECT Id, TenDiaBan FROM Catalog.DiaBans Where MaDiaBan =@MaDiaBan";
                    var diaBan = await _dapperRepository.QueryFirstOrDefaultAsync<DiaBanDto>(sqlQueryDiaBan, new { MaDiaBan = hoSo.MaTinh });
                    if (diaBan is not null)
                    {
                        tenTinhUpper = diaBan.TenDiaBan.ToUpper();
                    }

                    hoSo.TenTinh = diaBan.TenDiaBan;
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi trong quá trình lấy địa bàn");
                    Console.WriteLine(ex.ToString());
                }
            }

            Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(usingQrCode), cancellationToken);

            if (config.Content == "1")
            {
                // Xử lý tạo QRCode
                Guid idQr = DefaultIdType.NewGuid();
                hoSo.IdQrCode = idQr.ToString();
                string tenGiayTo = string.Empty;
                string soGiayToChuHoSo = string.Empty;
                string maHoSo = string.Empty;
                string maDinhDanh = string.Empty;
                string maTTHC = string.Empty;
                string trichYeuHoSo = string.Empty;
                if (!string.IsNullOrEmpty(request.TenGiayTo))
                    tenGiayTo = request.TenGiayTo;

                if (!string.IsNullOrEmpty(hoSo.SoGiayToChuHoSo))
                    soGiayToChuHoSo = hoSo.SoGiayToChuHoSo;

                if (!string.IsNullOrEmpty(hoSo.MaHoSo))
                    maHoSo = hoSo.MaHoSo;

                if (!string.IsNullOrEmpty(hoSo.MaDinhDanh))
                    maDinhDanh = hoSo.MaDinhDanh;

                if (!string.IsNullOrEmpty(hoSo.MaTTHC))
                    maTTHC = hoSo.MaTTHC;

                if (!string.IsNullOrEmpty(hoSo.TrichYeuHoSo))
                    trichYeuHoSo = hoSo.TrichYeuHoSo;

                string thoiGianHienTai = DateTime.Now.ToString("H 'giờ' mm 'phút', 'ngày' dd/MM/yyyy");
                string thongTin = $@"<b>HỆ THỐNG THÔNG TIN GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH {tenTinhUpper}</b><br/>
                        Tên giấy tờ: {tenGiayTo}<br/>
                        Mã định danh chủ hồ sơ: {soGiayToChuHoSo}<br/>
                        Mã hồ sơ: {maHoSo}<br/>
                        Mã định danh cơ quan thực hiện: {maDinhDanh}<br/>
                        Mã thủ tục: {maTTHC}<br/>
                        Thủ tục: {trichYeuHoSo}<br/>
                        Thời gian: {thoiGianHienTai}";

                // Thời gian của ngày này trong tháng tiếp theo
                DateTime curentTime = DateTime.Now;
                DateTime thoiGianNgayTrongThangTiepTheo = curentTime.AddMonths(1);

                // Lưu QR vào db
                await _qrCodeService.LogAsync(new QrCodeServiceRequestParams()
                {
                    Id = idQr.ToString(),
                    Content = thongTin,
                    Expiry = thoiGianNgayTrongThangTiepTheo,
                });
            }

            string kenhThucHien = string.Empty;
            if (hoSo.KenhThucHien == "2" && request.Code.Contains("phieu-tiep-nhan-ho-so-va-hen-tra-ket-qua"))
            {
                kenhThucHien = "-truc-tuyen";
            }

            // Lấy URL Phôi
            string urlPhoi = string.Empty;
            try
            {
                urlPhoi = await _mediator.Send(new GetUrlMauPhoiQuery()
                {
                    LoaiPhoi = request.LoaiPhoi,
                    Code = request.Code + kenhThucHien,
                    MaDonVi = hoSo.DonViId,
                    MaThuTuc = hoSo.MaTTHC,
                    MaLinhVuc = hoSo.MaLinhVucChinh
                });
                if (!string.IsNullOrEmpty(urlPhoi))
                {
                    hoSo.UrlPhoi = urlPhoi;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Có lỗi trong quá trình lấy mẫu phôi.");
                Console.WriteLine(ex.Message);
            }

            return Result<object>.Success(hoSo);
        }

        throw new NotFoundException($"Hồ sơ với id: {request.Id} chưa được thêm trên hệ thống hoặc đã bị xóa");
    }

}
