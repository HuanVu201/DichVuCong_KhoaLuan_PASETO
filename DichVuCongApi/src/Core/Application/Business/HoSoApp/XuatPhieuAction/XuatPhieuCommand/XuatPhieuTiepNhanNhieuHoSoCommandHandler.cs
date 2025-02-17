using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;
public class XuatPhieuTiepNhanNhieuHoSoCommandHandler : IQueryHandler<XuatPhieuTiepNhanNhieuHoSoCommand, object>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IQrCodeService _qrCodeService;
    private readonly IMediator _mediator;
    private readonly IMinioService _minioService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private const string usingQrCode = "use-qr-code";
    public XuatPhieuTiepNhanNhieuHoSoCommandHandler(IDapperRepository dapperRepository, IQrCodeService qrCodeService, IMediator mediator, IMinioService minioService, IReadRepository<Config> readRepositoryConfig)
    {
        _dapperRepository = dapperRepository;
        _qrCodeService = qrCodeService;
        _mediator = mediator;
        _minioService = minioService;
        _readRepositoryConfig = readRepositoryConfig;
    }

    private async Task<List<XuatPhieuTiepNhanNhieuHoSoDto>> GetDanhSach(XuatPhieuTiepNhanNhieuHoSoCommand request, CancellationToken cancellationToken)
    {
        List<XuatPhieuTiepNhanNhieuHoSoDto> hoSos = new List<XuatPhieuTiepNhanNhieuHoSoDto>();

        foreach (string Id in request.Ids)
        {

            var hoSoDic = new Dictionary<DefaultIdType, XuatPhieuTiepNhanNhieuHoSoDto>();

            string sql = @"SELECT hs.Id as Id, hs.NgayTiepNhan, hs.DinhKemKetQua, hs.TrichYeuKetQua, hs.NgayHenTra,hs.NgayTra, hs.TrichYeuHoSo, hs.SoGiayToChuHoSo, hs.MaHoSo,
                hs.ChuHoSo, hs.SoDinhDanh, hs.MaHoSo, hs.NgaySinhChuHoSo, hs.SoDienThoaiChuHoSo, hs.EmailChuHoSo, hs.KenhThucHien, hs.MaTTHC,hs.DonViId,
                hs.DiaChiChuHoSo, hs.LoaiGiayToChuHoSo, hs.DangKyNhanHoSoQuaBCCIData, hs.ThongTinTiepNhanBoSung, hs.SoBoHoSo, hs.NgayNopHoSo,
                hs.UyQuyen, hs.NguoiUyQuyen, hs.SoDienThoaiNguoiUyQuyen, hs.EmailNguoiUyQuyen, hs.SoGiayToNguoiUyQuyen, hs.DiaChiNguoiUyQuyen,
                ntn.Id as Id, ntn.FullName, 
                nghs.Id as Id, nghs.FullName,
                tphs.Id as Id, tphs.Ten, tphs.SoBanChinh, tphs.SoBanSao,
                gr.GroupName, gr.GroupCode, gr.Catalog, gr.MaDinhDanh, gr.SoDienThoai, gr.MaTinh,
                tt.MaLinhVucChinh,
                thtt.ThoiGianThucHien, thtt.LoaiThoiGianThucHien
                FROM Business.HoSos as hs
                LEFT JOIN Business.ThanhPhanHoSos tphs on hs.MaHoSo = tphs.HoSo
                LEFT JOIN [Catalog].[ThuTucs]  tt ON hs.MaTTHC = tt.MaTTHC
                LEFT JOIN [Identity].[Users] as ntn ON hs.NguoiNhanHoSo = ntn.Id
                LEFT JOIN [Identity].[Users] as nghs ON hs.NguoiGui = nghs.UserName
                LEFT JOIN [Catalog].[Groups] as gr ON hs.DonViId = gr.GroupCode
                LEFT JOIN [Business].[TruongHopThuTucs]  thtt ON hs.MaTruongHop = thtt.Ma

                WHERE hs.Id = @Id and hs.DeletedOn is null and tphs.DeletedOn is null
                Order By tphs.Id";

            var data = await _dapperRepository.QueryAsync<XuatPhieuTiepNhanNhieuHoSoDto, XuatPhieu_User, XuatPhieu_User, ThanhPhanHoSoDto, GroupDto, ThuTucDto, TruongHopThuTucDto, XuatPhieuTiepNhanNhieuHoSoDto>(
                sql, (hs, ntn, nghs, tphs, g, tt, thtt) =>
                {
                    if (!hoSoDic.TryGetValue(hs.Id, out var hoSo) && hs != null)
                    {
                        hoSoDic.Add(hs.Id, hoSo = hs);
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
                    hoSo.SoDienThoaiDonVi = g.SoDienThoai;
                    hoSo.Catalog = g.Catalog;
                    hoSo.MaDinhDanh = g.MaDinhDanh;
                    hoSo.ThoiGianThucHien = thtt.ThoiGianThucHien.ToString();
                    hoSo.LoaiThoiGianThucHien = thtt.LoaiThoiGianThucHien;
                    hoSo.MaTinh = g.MaTinh;

                    return hoSo;
                }, splitOn: "Id,Id,Id,Id,GroupName,MaLinhVucChinh,ThoiGianThucHien", param: new { Id = Id });

            if (data.Any())
            {
                XuatPhieuTiepNhanNhieuHoSoDto hoSo = data.ToList()[0];
                hoSos.Add(hoSo);
            }
            else
            {
                throw new NotFoundException($"Hồ sơ với id: {Id} chưa được thêm trên hệ thống hoặc đã bị xóa");
            }

        }

        return hoSos;
    }

    public async Task<Result<object>> Handle(XuatPhieuTiepNhanNhieuHoSoCommand request, CancellationToken cancellationToken)
    {
        List<XuatPhieuTiepNhanNhieuHoSoDto> hoSos = await GetDanhSach(request, cancellationToken);
        var result = new XuatPhieuTiepNhanNhieuHoSoResponseDto();
        result.HoSos = hoSos;

        if (result.HoSos.Any())
        {
            var firstItem = result.HoSos.ToList()[0];
            string tenTinhUpper = string.Empty;
            if (!string.IsNullOrEmpty(firstItem.MaTinh))
            {
                try
                {
                    string sqlQueryDiaBan = $@"SELECT Id, TenDiaBan FROM Catalog.DiaBans Where MaDiaBan =@MaDiaBan";
                    var diaBan = await _dapperRepository.QueryFirstOrDefaultAsync<DiaBanDto>(sqlQueryDiaBan, new { MaDiaBan = firstItem.MaTinh });
                    if (diaBan is not null)
                    {
                        tenTinhUpper = diaBan.TenDiaBan.ToUpper();
                    }

                    result.TenTinh = diaBan.TenDiaBan;
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
                result.IdQrCode = idQr.ToString();
                var tenGiayTo = string.Empty;
                var maDinhDanh = string.Empty;
                var soGiayToChuHoSo = string.Empty;
                if (!string.IsNullOrEmpty(request.TenGiayTo))
                {
                    tenGiayTo = request.TenGiayTo;
                }
                if (!string.IsNullOrEmpty(firstItem.MaDinhDanh))
                {
                    maDinhDanh = firstItem.MaDinhDanh;
                }
                if (!string.IsNullOrEmpty(firstItem.SoGiayToChuHoSo))
                {
                    soGiayToChuHoSo = firstItem.SoGiayToChuHoSo;
                }

                string thoiGianHienTai = DateTime.Now.ToString("H 'giờ' mm 'phút', 'ngày' dd/MM/yyyy");
                string thongTin = $@"<b>HỆ THỐNG THÔNG TIN GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH {tenTinhUpper}</b><br/>
                        Tên giấy tờ: {tenGiayTo}<br/>
                        Mã định danh chủ hồ sơ: {soGiayToChuHoSo}<br/>
                        Mã định danh cơ quan thực hiện: {maDinhDanh}<br/>
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

            // Lấy URL Phôi

            var urlPhoi = string.Empty;
            try
            {
                urlPhoi = await _mediator.Send(new GetUrlMauPhoiQuery()
                {
                    LoaiPhoi = request.LoaiPhoi,
                    Code = request.Code,
                    MaDonVi = firstItem.DonViId,
                });
                if (!string.IsNullOrEmpty(urlPhoi))
                {
                    result.UrlPhoi = urlPhoi;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Có lỗi trong quá trình lấy mẫu phôi.");
                Console.WriteLine(ex.Message);
            }
        }


        return Result<object>.Success(result);
    }


}