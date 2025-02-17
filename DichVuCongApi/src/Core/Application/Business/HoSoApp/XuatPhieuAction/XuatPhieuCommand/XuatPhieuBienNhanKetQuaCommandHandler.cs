using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.QrCodeServive;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;

public class XuatPhieuBienNhanKetQuaCommandHandler : IQueryHandler<XuatPhieuBienNhanKetQuaCommand, object>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IQrCodeService _qrCodeService;
    private readonly IMediator _mediator;
    private readonly IMinioService _minioService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private const string usingQrCode = "use-qr-code";
    public XuatPhieuBienNhanKetQuaCommandHandler(IDapperRepository dapperRepository, IQrCodeService qrCodeService, IMediator mediator, IMinioService minioService, IReadRepository<Config> readRepositoryConfig)
    {
        _dapperRepository = dapperRepository;
        _qrCodeService = qrCodeService;
        _mediator = mediator;
        _minioService = minioService;
        _readRepositoryConfig = readRepositoryConfig;
    }

    public async Task<Result<object>> Handle(XuatPhieuBienNhanKetQuaCommand request, CancellationToken cancellationToken)
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


        var hoSoDic = new Dictionary<DefaultIdType, XuatPhieuBienNhanKetQuaDto>();
        var thanhPhanHoSoDic = new Dictionary<DefaultIdType, ThanhPhanHoSoDto>();



        string sql = @"SELECT hs.Id as Id, hs.TrichYeuKetQua,hs.NgayTra, hs.TrichYeuHoSo, hs.MaHoSo,
            hs.ChuHoSo, hs.SoDinhDanh, hs.MaHoSo, hs.MaTTHC, hs.DonViId, hs.SoDienThoaiChuHoSo, hs.SoDienThoaiNguoiUyQuyen,
            hs.HoTenNguoiNhanKetQua, hs.LoaiNguoiNhanKetQua,
            hs.LoaiVanBanKetQua, hs.SoKyHieuKetQua, hs.TrichYeuKetQua,
            gr.GroupName, gr.GroupCode, gr.Catalog, gr.MaDinhDanh, gr.SoDienThoai, gr.MaTinh,
            tt.MaLinhVucChinh, tt.TenTTHC
            FROM Business.HoSos as hs
            LEFT JOIN [Catalog].[ThuTucs]  tt ON hs.MaTTHC = tt.MaTTHC
            LEFT JOIN [Catalog].[Groups] as gr ON hs.DonViId = gr.GroupCode

            WHERE hs.Id = @Id and hs.DeletedOn is null";


        var data = await _dapperRepository.QueryAsync<XuatPhieuBienNhanKetQuaDto, GroupDto, ThuTucDto, XuatPhieuBienNhanKetQuaDto>(
            sql, (hs, g, tt) =>
            {
                if (!hoSoDic.TryGetValue(hs.Id, out var hoSo) && hs != null)
                {
                    hoSoDic.Add(hs.Id, hoSo = hs);
                }

                hoSo.GroupName = g.GroupName;
                hoSo.GroupCode = g.GroupCode;
                hoSo.SoDienThoaiDonVi = g.SoDienThoai;
                hoSo.Catalog = g.Catalog;
                hoSo.MaDinhDanh = g.MaDinhDanh;
                hoSo.MaLinhVucChinh = tt.MaLinhVucChinh;
                hoSo.TenTTHC = tt.TenTTHC;
                hoSo.MaTinh = g.MaTinh;

                return hoSo;
            }, splitOn: "Id,GroupName,MaLinhVucChinh", param: request);

        if (data.Any())
        {
            XuatPhieuBienNhanKetQuaDto hoSo = data.ToList()[0];
            if (!string.IsNullOrEmpty(hoSo.LoaiNguoiNhanKetQua) && hoSo.LoaiNguoiNhanKetQua.Contains("chuHoSo"))
            {
                hoSo.SoDienThoaiNguoiNhanKetQua = hoSo.SoDienThoaiChuHoSo;
            }
            else if (!string.IsNullOrEmpty(hoSo.LoaiNguoiNhanKetQua) && hoSo.LoaiNguoiNhanKetQua.Contains("nguoiDuocUyQuyen"))
            {
                hoSo.SoDienThoaiNguoiNhanKetQua = hoSo.SoDienThoaiNguoiUyQuyen;
            }

            if (gths is not null && !string.IsNullOrEmpty(gths.PDFPhieu))
            {
                hoSo.UrlPhieu = gths.PDFPhieu;
                hoSo.DocxPhieu = gths.DocxPhieu;
            }

            var tenTinhUpper = string.Empty;
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
                //Xử lý tạo QRCode
                Guid idQr = DefaultIdType.NewGuid();
                hoSo.IdQrCode = idQr.ToString();
                var tenGiayTo = string.Empty;
                var soGiayToChuHoSo = string.Empty;
                var maHoSo = string.Empty;
                var maDinhDanh = string.Empty;
                var maTTHC = string.Empty;
                var trichYeuHoSo = string.Empty;
                if (!string.IsNullOrEmpty(request.TenGiayTo))
                {
                    tenGiayTo = request.TenGiayTo;
                }
                if (!string.IsNullOrEmpty(hoSo.SoGiayToChuHoSo))
                {
                    soGiayToChuHoSo = hoSo.SoGiayToChuHoSo;
                }
                if (!string.IsNullOrEmpty(hoSo.MaHoSo))
                {
                    maHoSo = hoSo.MaHoSo;
                }
                if (!string.IsNullOrEmpty(hoSo.MaDinhDanh))
                {
                    maDinhDanh = hoSo.MaDinhDanh;
                }
                if (!string.IsNullOrEmpty(hoSo.MaTTHC))
                {
                    maTTHC = hoSo.MaTTHC;
                }
                if (!string.IsNullOrEmpty(hoSo.TrichYeuHoSo))
                {
                    trichYeuHoSo = hoSo.TrichYeuHoSo;
                }
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

                //Lưu QR vào db
                await _qrCodeService.LogAsync(new QrCodeServiceRequestParams()
                {
                    Id = idQr.ToString(),
                    Content = thongTin,
                    Expiry = thoiGianNgayTrongThangTiepTheo,
                });
            }


            //Lấy URL Phôi
            var urlPhoi = string.Empty;
            try
            {
                urlPhoi = await _mediator.Send(new GetUrlMauPhoiQuery()
                {
                    LoaiPhoi = request.LoaiPhoi,
                    Code = request.Code,
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
