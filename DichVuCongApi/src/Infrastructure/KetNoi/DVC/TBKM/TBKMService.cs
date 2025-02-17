using Microsoft.Extensions.Options;
using System.Transactions;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Classes;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Business.Events;
using Microsoft.Extensions.Logging;
using DocumentFormat.OpenXml.VariantTypes;
using DocumentFormat.OpenXml.Drawing.Charts;
using TD.DichVuCongApi.Application.Common.ServiceLogger;
using Newtonsoft.Json;
using TD.DichVuCongApi.Infrastructure.EMC;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp;
using BusinessThanhPhanHoSo = TD.DichVuCongApi.Domain.Business.ThanhPhanHoSo;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Infrastructure.KetNoi.SLD;
using TD.DichVuCongApi.Infrastructure.Common.Services;
using TD.DichVuCongApi.Infrastructure.SMS;
namespace TD.DichVuCongApi.Infrastructure.KetNoi.DVC.TBKM;
public class TBKMService : ITBKMService
{
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<BusinessThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IReadRepository<TruongHopThuTuc> _repositoryTruongHopThuTuc;
    private readonly IDapperRepository _dapperRepository;
    private readonly IEMCService _eMCService;
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IMinioService _minioService;
    private readonly IInjectConfiguration _iInjectConfiguration;

    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private readonly IServiceLogger _serviceLogger;
    public TBKMService(
        IReadRepository<TruongHopThuTuc> repositoryTruongHopThuTuc,
        IMinioService minioService,
        IReadRepository<NgayNghi> repositoryNgayNghi,
        IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,
        IRepository<BusinessThanhPhanHoSo> repositoryThanhPhanHoSo,
        IRepository<HoSo> repositoryHoSo,
        IDapperRepository dapperRepository,
        IInjectConfiguration iInjectConfiguration,
        INguoiXuLyHoSoService nguoiXuLyHoSoService,
        IEMCService eMCService,
        IServiceLogger serviceLogger)
    {
        _repositoryTruongHopThuTuc = repositoryTruongHopThuTuc;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _repositoryHoSo = repositoryHoSo;
        _dapperRepository = dapperRepository;
        _eMCService = eMCService;
        _repositoryNgayNghi = repositoryNgayNghi;
        _minioService = minioService;
        _iInjectConfiguration = iInjectConfiguration;
        _serviceLogger = serviceLogger;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }
    private async Task AddThanhPhanHoSos(AddBSTBKMRequestParams request, ThongBaoKhuyenMaiSettings settings)
    {
        if (!string.IsNullOrEmpty(request.data.TenTepDangKy) && !string.IsNullOrEmpty(request.data.URLTepDangKy))
        {
            var base64Str = await _minioService.GetFileInExternalResource(settings.Url_ConnectApiDVC + "/KetNoiMotCuaQuocGia/getfile", new
            {
                DuongDan = request.data.URLTepDangKy
            });
            var dinhKem = await _minioService.UploadFileAsBase64Async(base64Str, request.data.TenTepDangKy, "", request.data.MaHoSoQG);
            var thanhPhanHoSo = BusinessThanhPhanHoSo.Create("Thông báo sửa đổi, bổ sung nội dung chương trình khuyến mại theo mẫu quy định.", request.data.MaHoSoQG, 1,
                0, null, dinhKem, false, null, "0", settings.MaTTHC_BoSungThongBaoKhuyenMai, null, null, null, null, null, null);
            thanhPhanHoSo.SetDinhKemGoc(dinhKem);
            await _repositoryThanhPhanHoSo.AddAsync(thanhPhanHoSo);
        }
    }
    public async Task<Result> AddBSTBKM(AddBSTBKMRequestParams request, ThongBaoKhuyenMaiSettings settings, CancellationToken cancellationToken = default)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string sqlGetNguoiTiepNhan = @"SELECT STRING_AGG (CONVERT(NVARCHAR(1000),NguoiTiepNhanId) , '##') as TaiKhoanTiepNhan FROM [Catalog].[DonViThuTucs]
            where MaTTHC = @MaTTHC and DeletedOn is null and DonViId = @DonViId";
        string sqlGetTTHC = @"SELECT TOP 1 TenTTHC, MucDo, MaLinhVucChinh, LinhVucChinh FROM [Catalog].[ThuTucs] WHERE DeletedOn is null AND MaTTHC = @MaTTHC";
        string sqlGetHoSo = @"SELECT TOP 1 * from Business.HoSos where MaHoSo = @MaHoSo and DeletedOn is null and LoaiDuLieuKetNoi = @LoaiDuLieuKetNoi";
        var truongHopThuTuc = await _repositoryTruongHopThuTuc.GetBySpecAsync(new GetTruongHopThuTucByMaTTHCSpec(settings.MaTTHC_BoSungThongBaoKhuyenMai));
        var nguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<TaiKhoanNguoiTiepNhan_Select>(sqlGetNguoiTiepNhan, new
        {
            MaTTHC = settings.MaTTHC_BoSungThongBaoKhuyenMai,
            DonViId = settings.MaDonVi
        });
        var uyQuyen = !string.IsNullOrEmpty(request.data.NguoiLienHe);
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlGetHoSo, new
        {
            MaHoSo = request.data.MaHoSoQG,
            LoaiDuLieuKetNoi = "TBKMBS"
        });
        //var hoSo = await _repositoryHoSo.GetBySpecAsync(new GetHoSoByMaHoSoSpec(request.data.MaHoSoQG));
        if (hoSo != null)
        {
            var tphsTBKM = await _dapperRepository.QueryFirstOrDefaultAsync<BusinessThanhPhanHoSo>($"SELECT TOP 1 HoSo FROM {SchemaNames.Business}.{TableNames.ThanhPhanHoSos} WHERE HoSo = @MaHoSo", new
            {
                MaHoSo = hoSo.MaHoSo
            });
            //var trangThaiHoSoId = hoSo.TrangThaiHoSoId == "5" ? "1" : null;
            //DateTime? ngayNopHoSo = hoSo.TrangThaiHoSoId == "5" ? currentTime : null;
            hoSo.UpdateThongBaoKhuyenMai(settings.MaDonVi, request.data.MaHoSoQG, LoaiChuHoSoConstant.DoanhNghiep, request.data.TenThuongNhan, request.data.DienThoai, request.data.Email,
                request.data.MaSoThue, "TBKMBS", request.data.DiaChiDoanhNghiep.MaTinh, request.data.DiaChiDoanhNghiep.MaHuyen, request.data.DiaChiDoanhNghiep.MaXa, request.data.DiaChiDoanhNghiep.DiaChiChiTiet,
                request.data.MaSoThue, settings.MaTTHC_BoSungThongBaoKhuyenMai, truongHopThuTuc.Ma, truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(), JsonConvert.SerializeObject(request.data),
                nguoiTiepNhan.TaiKhoanTiepNhan, request.data.LyDoDieuChinh, uyQuyen, request.data.NguoiLienHe, request.data.SoDienThoaiNguoiLienHe, null, null);
            await _repositoryHoSo.UpdateAsync(hoSo);
            if(tphsTBKM == null)
            {
                if (!string.IsNullOrEmpty(request.data.TenTepDangKy) && !string.IsNullOrEmpty(request.data.URLTepDangKy))
                {
                    var base64Str = await _minioService.GetFileInExternalResource(settings.Url_ConnectApiDVC + "/KetNoiMotCuaQuocGia/getfile", new
                    {
                        DuongDan = request.data.URLTepDangKy
                    });
                    var dinhKem = await _minioService.UploadFileAsBase64Async(base64Str, request.data.TenTepDangKy, "", request.data.MaHoSoQG);
                    var thanhPhanHoSo = BusinessThanhPhanHoSo.Create("Thông báo sửa đổi, bổ sung nội dung chương trình khuyến mại theo mẫu quy định.", request.data.MaHoSoQG, 1,
                        0, null, dinhKem, false, null, "0", settings.MaTTHC_BoSungThongBaoKhuyenMai, null, null, null, null, null, null);
                    thanhPhanHoSo.SetDinhKemGoc(dinhKem);
                    await _repositoryThanhPhanHoSo.AddAsync(thanhPhanHoSo);
                }
            }
            return new Result(200, "Cập nhật hồ sơ thành công", "");
        }
        var thuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<ThuTuc>(sqlGetTTHC, new
        {
            MaTTHC = settings.MaTTHC_BoSungThongBaoKhuyenMai
        });
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken);
        var caculateTime = new CaculateTime(_iInjectConfiguration);
        var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, 8, "Ngày làm việc");

        var thanhPhanHoSos = new List<BusinessThanhPhanHoSo>();
        if (!string.IsNullOrEmpty(request.data.TenTepDangKy) && !string.IsNullOrEmpty(request.data.URLTepDangKy))
        {
            var base64Str = await _minioService.GetFileInExternalResource(settings.Url_ConnectApiDVC + "/KetNoiMotCuaQuocGia/getfile", new
            {
                DuongDan = request.data.URLTepDangKy
            });
            var dinhKem = await _minioService.UploadFileAsBase64Async(base64Str, request.data.TenTepDangKy, "", request.data.MaHoSoQG);
            var thanhPhanHoSo = BusinessThanhPhanHoSo.Create("Thông báo sửa đổi, bổ sung nội dung chương trình khuyến mại theo mẫu quy định.", request.data.MaHoSoQG, 1,
                0, null, dinhKem, false, null, "0", settings.MaTTHC_BoSungThongBaoKhuyenMai, null, null, null, null, null, null);
            thanhPhanHoSo.SetDinhKemGoc(dinhKem);
            thanhPhanHoSos.Add(thanhPhanHoSo);
        }

        HoSo hoSoNopTrucTuyen = new HoSo(settings.MaDonVi, request.data.MaHoSoQG, LoaiChuHoSoConstant.DoanhNghiep, request.data.TenThuongNhan, request.data.DienThoai, request.data.Email, request.data.MaSoThue,
                                            null, null, request.data.DiaChiDoanhNghiep.MaTinh, request.data.DiaChiDoanhNghiep.MaHuyen,
                                            request.data.DiaChiDoanhNghiep.MaXa, request.data.DiaChiDoanhNghiep.DiaChiChiTiet, request.data.MaSoThue, settings.MaTTHC_BoSungThongBaoKhuyenMai, truongHopThuTuc.Ma,
                                            truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(), JsonConvert.SerializeObject(request.data), null, nguoiTiepNhan.TaiKhoanTiepNhan,
                                            request.data.ThongTinDaNop.TenChuongTrinhKhuyenMaiDNP, null, uyQuyen, request.data.NguoiLienHe, request.data.SoDienThoaiNguoiLienHe, request.data.Email, null,
                                            null, null, null, null, settings.MaTTHC_BoSungThongBaoKhuyenMai, currentTime, ngayHenTraCaNhan, thuTuc.MucDo, "0");

        
        try
        {
            hoSoNopTrucTuyen.UpdateLoaiDuLieuKetNoi("TBKMBS");
            hoSoNopTrucTuyen.SetLinhVuc(thuTuc.MaLinhVucChinh, thuTuc.LinhVucChinh);
            await _repositoryHoSo.AddAsync(hoSoNopTrucTuyen, cancellationToken);
            await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(nguoiTiepNhan.TaiKhoanTiepNhan, hoSoNopTrucTuyen.Id, cancellationToken: cancellationToken);
            await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos, cancellationToken);
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(request.data.MaHoSoQG, null, null, null, null, request.data.MaSoThue, request.data.TenThuongNhan, "", "", currentTime, trangThai: "1", thaoTac: "Nộp hồ sơ trực tuyến");
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            //transactionScope.Complete();
                

        }
        catch (Exception ex)
        {
            return new Result(500, ex.Message, "Loi them moi");
        }

        await _eMCService.SendAction(new EMCRequestBody()
        {
            CodeProfile = request.data.MaHoSoQG,
            CodeTTHC = hoSoNopTrucTuyen.MaTTHC,
            NameTTHC = thuTuc.TenTTHC ?? hoSoNopTrucTuyen.TrichYeuHoSo,
            Status = hoSoNopTrucTuyen.TrangThaiHoSoId,
            FormsReception = hoSoNopTrucTuyen.KenhThucHien,
            Level = thuTuc.MucDo,
            MaHoSo = request.data.MaHoSoQG,
            IsFromDVCQG = hoSoNopTrucTuyen.LoaiDuLieuKetNoi,
            IsDVCBC = hoSo.DangKyNhanHoSoQuaBCCIData,
            User = hoSo.SoGiayToChuHoSo,
        });
        return new Result(201, "Thêm mới hồ sơ thành công", "");

    }
    private async Task AddThanhPhanHoSos(AddTKBMRequestParams request, ThongBaoKhuyenMaiSettings settings)
    {
        var thanhPhanHoSos = new List<BusinessThanhPhanHoSo>();
        if (request.TaiLieuNop.Count > 0)
        {
            request.TaiLieuNop.ForEach(async item =>
            {
                var dinhKem = await _minioService.UploadFileAsBase64Async(item.Base64, item.TenTepDinhKem, "", request.MaHoSo);
                var thanhPhanHoSo = BusinessThanhPhanHoSo.Create("Thông báo thực hiện khuyến mại theo mẫu quy định.", request.MaHoSo, 1,
                    0, null, dinhKem, false, null, "0",
                    settings.MaTTHC_ThongBaoKhuyenMai, null, null, null, null, null, null);
                thanhPhanHoSo.SetDinhKemGoc(dinhKem);
                thanhPhanHoSos.Add(thanhPhanHoSo);
            });
        }
        if (!string.IsNullOrEmpty(request.TenTepDonDangKy) && !string.IsNullOrEmpty(request.TepDonDangKy))
        {
            var dinhKem = await _minioService.UploadFileAsBase64Async(request.TepDonDangKy, request.TenTepDonDangKy, "", request.MaHoSo);
            var thanhPhanHoSo = BusinessThanhPhanHoSo.Create("Thông báo thực hiện khuyến mại theo mẫu quy định.", request.MaHoSo, 1,
                0, null, dinhKem, false, null, "0",
                settings.MaTTHC_ThongBaoKhuyenMai, null, null, null, null, null, null);
            thanhPhanHoSo.SetDinhKemGoc(dinhKem);
            thanhPhanHoSos.Add(thanhPhanHoSo);
        }
        await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos);
    }
    public async Task<Result> AddTBKM(AddTKBMRequestParams request, ThongBaoKhuyenMaiSettings settings, CancellationToken cancellationToken = default)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string sqlGetNguoiTiepNhan = @"SELECT STRING_AGG (CONVERT(NVARCHAR(1000),NguoiTiepNhanId) , '##') as TaiKhoanTiepNhan FROM [Catalog].[DonViThuTucs]
            where MaTTHC = @MaTTHC and DeletedOn is null and DonViId = @DonViId";
        string sqlGetTTHC = @"SELECT TOP 1 TenTTHC, MucDo, MaLinhVucChinh, LinhVucChinh FROM [Catalog].[ThuTucs] WHERE DeletedOn is null AND MaTTHC = @MaTTHC";
        string sqlGetHoSo = @"SELECT TOP 1 * from Business.HoSos where MaHoSo = @MaHoSo and DeletedOn is null and LoaiDuLieuKetNoi = @LoaiDuLieuKetNoi";
        var truongHopThuTuc = await _repositoryTruongHopThuTuc.GetBySpecAsync(new GetTruongHopThuTucByMaTTHCSpec(settings.MaTTHC_ThongBaoKhuyenMai));
        if (truongHopThuTuc == null)
        {
            return new Result(500, "Cập nhật hồ sơ thành công", "");
        }
        var nguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<TaiKhoanNguoiTiepNhan_Select>(sqlGetNguoiTiepNhan, new
        {
            MaTTHC = settings.MaTTHC_ThongBaoKhuyenMai,
            DonViId = settings.MaDonVi
        });
        var uyQuyen = !string.IsNullOrEmpty(request.NguoiLienHe);
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlGetHoSo, new
        {
            MaHoSo = request.MaHoSo,
            LoaiDuLieuKetNoi = "TBKM"
        });
        if (hoSo != null)
        {
            var trangThaiHoSoId = hoSo.TrangThaiHoSoId == "5" ? "1" : null;
            DateTime? ngayNopHoSo = hoSo.TrangThaiHoSoId == "5" ? currentTime : null;
            hoSo.UpdateThongBaoKhuyenMai(settings.MaDonVi, request.MaHoSo, LoaiChuHoSoConstant.DoanhNghiep, request.TenThuongNhan, request.DienThoai, request.Email,
                request.MaSoThue, "TBKM", request.DiaChiDoanhNghiep.MaTinh, request.DiaChiDoanhNghiep.MaHuyen, request.DiaChiDoanhNghiep.MaXa, request.DiaChiDoanhNghiep.DiaChiChiTiet,
                request.MaSoThue, settings.MaTTHC_ThongBaoKhuyenMai, truongHopThuTuc.Ma, truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(), JsonConvert.SerializeObject(request),
                nguoiTiepNhan.TaiKhoanTiepNhan, request.TenChuongTrinhKhuyenMai, uyQuyen, request.NguoiLienHe, request.SoDienThoaiNguoiLienHe, ngayNopHoSo, trangThaiHoSoId);

            await _repositoryHoSo.UpdateAsync(hoSo);
            return new Result(200, "Cập nhật hồ sơ thành công", "");
        }
        var thuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<ThuTuc>(sqlGetTTHC, new
        {
            MaTTHC =settings.MaTTHC_ThongBaoKhuyenMai
        });
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken);
        var caculateTime = new CaculateTime(_iInjectConfiguration);

        var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, 8, "Ngày làm việc");
        var hoSoNopTrucTuyen = new HoSo(settings.MaDonVi, request.MaHoSo, LoaiChuHoSoConstant.DoanhNghiep, request.TenThuongNhan, request.DienThoai, request.Email, request.MaSoThue,
                                            null, null, request.DiaChiDoanhNghiep.MaTinh, request.DiaChiDoanhNghiep.MaHuyen,
                                            request.DiaChiDoanhNghiep.MaXa, request.DiaChiDoanhNghiep.DiaChiChiTiet, request.MaSoThue, settings.MaTTHC_ThongBaoKhuyenMai, truongHopThuTuc.Ma,
                                            truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(), JsonConvert.SerializeObject(request), null, nguoiTiepNhan.TaiKhoanTiepNhan,
                                            request.TenChuongTrinhKhuyenMai, currentTime, uyQuyen, request.NguoiLienHe, request.SoDienThoaiNguoiLienHe, request.Email, null,
                                            null, null, null, null, settings.MaTTHC_ThongBaoKhuyenMai, currentTime, ngayHenTraCaNhan, thuTuc.MucDo, "0");

        var thanhPhanHoSos = new List<BusinessThanhPhanHoSo>();
        try
        {
            if (request.TaiLieuNop != null && request.TaiLieuNop.Count > 0)
            {
                request.TaiLieuNop.ForEach(async item =>
                {
                    var dinhKem = await _minioService.UploadFileAsBase64Async(item.Base64, item.TenTepDinhKem, "", request.MaHoSo);
                    var thanhPhanHoSo = BusinessThanhPhanHoSo.Create("Thông báo thực hiện khuyến mại theo mẫu quy định.", request.MaHoSo, 1,
                        0, null, dinhKem, false, null, "0",
                        settings.MaTTHC_ThongBaoKhuyenMai, null, null, null, null, null, null);
                    thanhPhanHoSo.SetDinhKemGoc(dinhKem);
                    thanhPhanHoSos.Add(thanhPhanHoSo);
                });
            }
            if (!string.IsNullOrEmpty(request.TenTepDonDangKy) && !string.IsNullOrEmpty(request.TepDonDangKy))
            {
                var dinhKem = await _minioService.UploadFileAsBase64Async(request.TepDonDangKy, request.TenTepDonDangKy, "", request.MaHoSo);
                var thanhPhanHoSo = BusinessThanhPhanHoSo.Create("Thông báo thực hiện khuyến mại theo mẫu quy định.", request.MaHoSo, 1,
                    0, null, dinhKem, false, null, "0",
                    settings.MaTTHC_ThongBaoKhuyenMai, null, null, null, null, null, null);
                thanhPhanHoSo.SetDinhKemGoc(dinhKem);
                thanhPhanHoSos.Add(thanhPhanHoSo);
            }
        } catch (Exception ex)
        {
            await _serviceLogger.LogAsync<TBKMService>(new ServiceLoggerRequestParams()
            {
                MaHoSo = request.MaHoSo,
                isSucceed = false,
                Receiver = null,
                Sender = null,
                Request = JsonConvert.SerializeObject(request),
                Response = JsonConvert.SerializeObject(ex),
                Service = ServiceLoggerServiceType.TBKM,
            });
        }
        if (thanhPhanHoSos.Count == 0)
        {
            await _serviceLogger.LogAsync<TBKMService>(new ServiceLoggerRequestParams()
            {
                MaHoSo = request.MaHoSo,
                isSucceed = false,
                Receiver = null,
                Sender = null,
                Request = JsonConvert.SerializeObject(request),
                Response = JsonConvert.SerializeObject(new
                {
                    Err = "Không có đính kèm"
                }),
                Service = ServiceLoggerServiceType.TBKM,
            });
        }

        try
        {
            hoSoNopTrucTuyen.UpdateLoaiDuLieuKetNoi("TBKM");
            hoSoNopTrucTuyen.SetLinhVuc(thuTuc.MaLinhVucChinh, thuTuc.LinhVucChinh);
            await _repositoryHoSo.AddAsync(hoSoNopTrucTuyen, cancellationToken);
            await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(nguoiTiepNhan.TaiKhoanTiepNhan, hoSoNopTrucTuyen.Id, cancellationToken: cancellationToken);
            await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos, cancellationToken);
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(request.MaHoSo, null, null, null, null, request.MaSoThue, request.TenThuongNhan, "", "", currentTime, trangThai: "1", thaoTac: "Nộp hồ sơ trực tuyến");
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
        }
        catch (Exception ex)
        {
            return new Result(500, ex.Message, "Loi them moi");
        }
        await _eMCService.SendAction(new EMCRequestBody()
        {
            CodeProfile = request.MaHoSo,
            CodeTTHC = hoSoNopTrucTuyen.MaTTHC,
            NameTTHC = thuTuc.TenTTHC ?? hoSoNopTrucTuyen.TrichYeuHoSo,
            Status = hoSoNopTrucTuyen.TrangThaiHoSoId,
            FormsReception = hoSoNopTrucTuyen.KenhThucHien,
            Level = thuTuc.MucDo,
            MaHoSo = request.MaHoSo,
            IsFromDVCQG = hoSoNopTrucTuyen.LoaiDuLieuKetNoi,
            IsDVCBC = hoSo.DangKyNhanHoSoQuaBCCIData,
            User = hoSo.SoGiayToChuHoSo
        });
        return new Result(201, "Thêm mới hồ sơ thành công", "");

    }
}
