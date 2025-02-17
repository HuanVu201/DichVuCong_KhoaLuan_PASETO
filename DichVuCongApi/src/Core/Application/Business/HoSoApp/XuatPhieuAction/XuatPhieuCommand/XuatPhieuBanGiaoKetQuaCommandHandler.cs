using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTienDo;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;
using TD.DichVuCongApi.Application.Common.QrCodeServive;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;

public class XuatPhieuBanGiaoKetQuaCommandHandler : IQueryHandler<XuatPhieuBanGiaoKetQuaCommand, object>
{

    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IQrCodeService _qrCodeService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private const string usingQrCode = "use-qr-code";
    public XuatPhieuBanGiaoKetQuaCommandHandler(IDapperRepository dapperRepository, IMediator mediator, IQrCodeService qrCodeService, IReadRepository<Config> readRepositoryConfig)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _qrCodeService = qrCodeService;
        _readRepositoryConfig = readRepositoryConfig;
    }

    private async Task<List<XuatPhieuBanGiaoKetQuaDto>> GetDanhSach(XuatPhieuBanGiaoKetQuaCommand request, CancellationToken cancellationToken)
    {
        List<XuatPhieuBanGiaoKetQuaDto> result = new List<XuatPhieuBanGiaoKetQuaDto>();
        string sql = @"SELECT hs.Id as Id, hs.MaTTHC, hs.DonViId, hs.TrichYeuKetQua, hs.TrichYeuHoSo, hs.SoGiayToChuHoSo, hs.MaHoSo,
            hs.ChuHoSo, hs.DiaChiChuHoSo, hs.DangKyNhanHoSoQuaBCCIData, hs.KenhThucHien, hs.LoaiKetQua, hs.NgayXacNhanKetQua,
            gr.GroupName, gr.Catalog, gr.MaTinh, gr.MaDinhDanh, tt.TrangThaiPhiLePhi, tt.MaLinhVucChinh, yctt.soTien, yctt.TrangThai
            FROM Business.HoSos as hs
            LEFT JOIN [Catalog].[Groups] as gr ON hs.DonViId = gr.GroupCode
            LEFT JOIN [Catalog].[ThuTucs] as tt ON hs.MaTTHC = tt.MaTTHC
            LEFT JOIN [Business].[YeuCauThanhToans]  yctt ON hs.MaHoSo = yctt.MaHoSo
            WHERE hs.Id = @Id and hs.DeletedOn is null";

        foreach (string id in request.Ids)
        {
            var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<XuatPhieuBanGiaoKetQuaDto>(sql, new { Id = id });

            if (hoSo != null)
            {
                result.Add(hoSo);
            }
            else
            {
                throw new Exception($"Hồ sơ với Id: {id} chưa được thêm vào hệ thống hoặc đã bị xóa!");
            }
        }

        return result;
    }

    public async Task<Result<object>> Handle(XuatPhieuBanGiaoKetQuaCommand request, CancellationToken cancellationToken)
    {
        List<XuatPhieuBanGiaoKetQuaDto> hoSos = await GetDanhSach(request, cancellationToken);
        var result = new XuatPhieuBanGiaoKetQuaResponseDto();
        result.HoSos = hoSos.OrderByDescending(h => h.NgayXacNhanKetQua).ToList();
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
                string tenGiayTo = string.Empty;
                string maDinhDanh = string.Empty;
                if (!string.IsNullOrEmpty(request.TenGiayTo))
                {
                    tenGiayTo = request.TenGiayTo;
                }

                if (!string.IsNullOrEmpty(firstItem.MaDinhDanh))
                {
                    maDinhDanh = firstItem.MaDinhDanh;
                }

                string thoiGianHienTai = DateTime.Now.ToString("H 'giờ' mm 'phút', 'ngày' dd/MM/yyyy");
                string thongTin = $@"<b>HỆ THỐNG THÔNG TIN GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH {tenTinhUpper}</b><br/>
                        Tên giấy tờ: {tenGiayTo}<br/>
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
