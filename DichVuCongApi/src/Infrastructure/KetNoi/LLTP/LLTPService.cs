using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.VariantTypes;
using FluentValidation.Validators;
using Hangfire;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Org.BouncyCastle.Bcpg.OpenPgp;
using Org.BouncyCastle.Ocsp;
using System;
using System.Globalization;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.BGTVT;
using TD.DichVuCongApi.Application.Common.KetNoi.KhaiSinhKhaiTu;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Domain.Portal;
using TD.DichVuCongApi.Infrastructure.Auth;
using TD.DichVuCongApi.Infrastructure.EntityServices.NguoiXuLyHoSo;
using TD.DichVuCongApi.Infrastructure.Persistence.Repository;
using ThirdParty.Json.LitJson;
using YamlDotNet.Core;
using static Syncfusion.XlsIO.Parser.Biff_Records.ExternSheetRecord;
using static TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS.LienThongILISParams.TiepNhanHoSoRequest;
using static TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS.LienThongILISParams;
using static TD.DichVuCongApi.Application.Common.KetNoi.LLTP.LLTP_VNEIDParams;
using static TD.DichVuCongApi.Application.Common.KetNoi.LLTP.LLTP_VNEIDParams.Request;
using Group = TD.DichVuCongApi.Domain.Catalog.Group;
using ThanhPhanHoSo = TD.DichVuCongApi.Domain.Business.ThanhPhanHoSo;


namespace TD.DichVuCongApi.Infrastructure.KetNoi.LLTP;
public class LLTPService : ILLTPService
{
    private readonly TrangThaiTraKetQuaHoSoConstant _trangThaiTraHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();
    private readonly LLTPServiceSettings _settings;
    private readonly IRepositoryWithEvents<HoSo> _hoSoRepository;
    private readonly ILogger<LLTPService> _logger;
    private readonly IGenerateMaHoSo _generateMaHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMinioService _minioService;
    private readonly IReadRepository<ThuTuc> _repositoryThuTuc;
    private readonly IReadRepository<TruongHopThuTuc> _repositoryTruongHopThuTuc;
    private readonly IRepository<YeuCauThanhToan> _repositoryYeuCauThanhToan;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IRepository<KetQuaLienQuan> _repositoryKetQuaLienQuan;
    private readonly IInjectConfiguration _injectConfiguration;
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private readonly IMediator _mediator;
    private readonly ICurrentUser _currentUser;
    private readonly string LLTPVneidUyQuyen = "LLTPVneidUyQuyen";
    private readonly string LLTPVneid = "LLTPVneid";
    private readonly string LLTPMCDT = "LLTPMCDT";
    private readonly string formatDateString = "dd/mm/yyyy";
    private Dictionary<string, string> trangThaiDic = new Dictionary<string, string>();
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();

    public LLTPService(
        IMinioService minioService,
        IOptions<LLTPServiceSettings> options,
        IRepositoryWithEvents<HoSo> hoSoRepository,
        ILogger<LLTPService> logger,
        IGenerateMaHoSo generateMaHoSo,
        IDapperRepository dapperRepository,
        IReadRepository<ThuTuc> repositoryThuTuc,
        IInjectConfiguration injectConfiguration,
        IReadRepository<TruongHopThuTuc> repositoryTruongHopThuTuc,
        IReadRepository<NgayNghi> repositoryNgayNghi,
        ICurrentUser currentUser,
        IRepository<YeuCauThanhToan> repositoryYeuCauThanhToan,
        IMediator mediator,
        IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo,
        IRepository<KetQuaLienQuan> repositoryKetQuaLienQuan,
        INguoiXuLyHoSoService nguoiXuLyHoSoService)
    {
        _repositoryKetQuaLienQuan = repositoryKetQuaLienQuan;
        _settings = options.Value;
        _hoSoRepository = hoSoRepository;
        _logger = logger;
        _generateMaHoSo = generateMaHoSo;
        _minioService = minioService;
        _dapperRepository = dapperRepository;
        _repositoryThuTuc = repositoryThuTuc;
        _injectConfiguration = injectConfiguration;
        _repositoryTruongHopThuTuc = repositoryTruongHopThuTuc;
        _repositoryNgayNghi = repositoryNgayNghi;
        _currentUser = currentUser;
        _repositoryYeuCauThanhToan = repositoryYeuCauThanhToan;
        _mediator = mediator;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
        trangThaiDic.Add("1", "Mới đăng ký");
        trangThaiDic.Add("2", "Được tiếp nhận");
        trangThaiDic.Add("3", "Không được tiếp nhận");
        trangThaiDic.Add("4", "Đang xử lý");
        trangThaiDic.Add("5", "Yêu cầu bổ sung giấy tờ");
        trangThaiDic.Add("6", "Yêu cầu thực hiện nghĩa vụ tài chính");
        trangThaiDic.Add("7", "Công dân yêu cầu rút hồ sơ");
        trangThaiDic.Add("8", "Dừng xử lý");
        trangThaiDic.Add("9", "Đã xử lý xong");
        trangThaiDic.Add("10", "Đã trả kết quả");
    }
    public async Task<object> SendAsync(LienThongLLTPRequest req)
    {
        return await SendAsync(req.idHoSo, req.eformBase64Data);
    }
    public void CheckThaoTac(string loaiDuLieuKetNoi)
    {
        if (loaiDuLieuKetNoi == LLTPVneid || loaiDuLieuKetNoi == LLTPVneidUyQuyen)
        {
            throw new Exception("Hồ sơ thuộc VNeID, vui lòng không sử dụng chức năng này");
        }
    }
    private async Task<string> RequestHandlerReturnPlainText<TReq>(TReq req, string suffix)
    {
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Post, _settings.BaseUrl + suffix);
            var reqContent = JsonConvert.SerializeObject(req);
            httpRequest.Content = new StringContent(reqContent, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));

            var res = await httpClient.SendAsync(httpRequest);
            var stringContent = await res.Content.ReadAsStringAsync();
            return stringContent;
        }
    }
    private async Task<TRes> RequestHandler<TReq, TRes>(TReq req, string hostName, string token, HttpMethod method, string suffix)
    {
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            if (!string.IsNullOrEmpty(token))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }
            HttpRequestMessage httpRequest = new HttpRequestMessage(method, hostName + suffix);
            var reqContent = JsonConvert.SerializeObject(req);
            httpRequest.Content = new StringContent(reqContent, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));

            var res = await httpClient.SendAsync(httpRequest);
            var stringContent = await res.Content.ReadAsStringAsync();
            try
            {
                var jsonData = JsonConvert.DeserializeObject<TRes>(stringContent);
                return jsonData;
            }
            catch (Exception ex) {
                _logger.LogError($"RequestHandler_LLTP_ParseError_{hostName + suffix}_{stringContent}");
                return default;
            }
        }
    }

    public async Task<string> GenerateMaHoSo(CancellationToken cancellationToken)
    {
        return await _generateMaHoSo.GenerateMaHoSo(_settings.MaDinhDanhDonVi, cancellationToken);
    }
    public string GetCodeGet()
    {
        return _settings.CodeGet;
    }
    public async Task<LLTP_VNEIDParams.Response> VneidSendData(LLTP_VNEIDParams.Request data, CancellationToken cancellationToken = default)
    {
        string tableName = $"{SchemaNames.Business}.{TableNames.HoSos}";
        string sqlCheckExist = $"SELECT TOP 1 Id, MaHoSo, TrangThaiHoSoId FROM {tableName} WHERE MaHoSo = @MaHoSo AND LoaiDuLieuKetNoi in ('{LLTPVneid}', '{LLTPVneidUyQuyen}') And DeletedOn is null";
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlCheckExist, new
        {
            MaHoSo = data.maHoSoMCDT
        });
        if (hoSo != null && hoSo.TrangThaiHoSoId != "5")
        {
            return new LLTP_VNEIDParams.Response()
            {
                data = null,
                errorDetail = "Hồ sơ không ở trạng thái bổ sung, không thể thực hiện cập nhật",
                statusCode = "01"
            };
        }
        bool thucHienCapNhat = hoSo != null;
        bool boSungHoSo = hoSo != null && hoSo.TrangThaiHoSoId == "5";
        try
        {
            bool insertHoSoSucceed = await InsertDataVneid(data, thucHienCapNhat, boSungHoSo, hoSo?.Id, cancellationToken);
            return new LLTP_VNEIDParams.Response()
            {
                data = null,
                errorDetail = null,
                statusCode = "00"
            };
        }
        catch (Exception ex)
        {
            _logger.LogError($"{data.maHoSoMCDT}_VneidSendData_UNKNOWNEX_{JsonConvert.SerializeObject(data)}_ex:{ex.ToString()}");
            return new LLTP_VNEIDParams.Response()
            {
                data = null,
                errorDetail = ex.Message,
                statusCode = "01"
            };
        }
    }
    private DataEform ConvertFromVNeID2Eform(LLTP_VNEIDParams.Request hosoObj)
    {
        RootDataEform result = new RootDataEform();
        result.metadata = "";
        DataEform dataToKhai = new DataEform();
        dataToKhai.FormType = "VNeID";
        dataToKhai.LoaiToKhai = hosoObj.toKhai.loaiPhieu?.ToString();
        try
        {
            if(dataToKhai.LoaiToKhai == "1")
            {
                dataToKhai.LoaiPhieuYeuCau = new DanhMucEform()
                {
                    Code = "So1",
                    Name = "Số 1"
                };
            } else if(dataToKhai.LoaiToKhai == "2")
            {
                dataToKhai.LoaiPhieuYeuCau = new DanhMucEform()
                {
                    Code = "So2",
                    Name = "Số 2"
                };
            }
        } catch
        {

        }
        //dataToKhai.yeuCauCDNCV = hosoObj.toKhai.yeuCauCDNCV;
        DanhMucEform mucDich = new DanhMucEform() { Name = hosoObj.toKhai.tenMucDich, Code = hosoObj.toKhai.maMucDich?.ToString() };
        dataToKhai.MucDichCapPhieu = mucDich;

        DanhMucEform soLuongCap = new DanhMucEform() { Name = hosoObj.toKhai.soLuongCap?.ToString(), Code = hosoObj.toKhai.soLuongCap?.ToString() };
        dataToKhai.SoLuongCapThem = soLuongCap;

        dataToKhai.HoVaTen = hosoObj.toKhai.nycHoTen;
        dataToKhai.TenGoiKhac = hosoObj.toKhai.nycTenGoiKhac;

        DanhMucEform gioiTinh = new DanhMucEform() { Name = hosoObj.toKhai.nycTenGioiTinh, Code = hosoObj.toKhai.nycGioiTinh?.ToString() };
        dataToKhai.GioiTinh = gioiTinh;

        DanhMucEform giayTo = new DanhMucEform() { Name = hosoObj.toKhai.nycTenLoaiGiayTo, Code = hosoObj.toKhai.nycLoaiGiayTo?.ToString() };
        dataToKhai.GiayToTuyThan = giayTo;

        dataToKhai.NgaySinh = hosoObj.toKhai.nycNgaySinh;
        try
        {
            dataToKhai.NgaySinh = DateTime.ParseExact(dataToKhai.NgaySinh, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("s") + "+07:00";
        }
        catch { }
        dataToKhai.SoDienThoai = hosoObj.toKhai.nycDienThoai;
        dataToKhai.Email = hosoObj.toKhai.nycEmail?.Trim();
        dataToKhai.SoGiayTo = hosoObj.toKhai.nycSoGiayTo;
        dataToKhai.NgayCapGiayTo = hosoObj.toKhai.nycNgayCapGiayTo;
        try
        {
            dataToKhai.NgayCapGiayTo = DateTime.ParseExact(dataToKhai.NgayCapGiayTo, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("s") + "+07:00";
        }
        catch { }

        DanhMucEform noiCapGiayTo = new DanhMucEform() { Name = hosoObj.toKhai.nycNoiCapGiayTo, Code = hosoObj.toKhai.nycNoiCapGiayTo };
        dataToKhai.NoiCapGiayTo = noiCapGiayTo;

        DanhMucEform quocTich = new DanhMucEform() { Name = hosoObj.toKhai.nycTenQuocTich, Code = hosoObj.toKhai.nycQuocTich };
        dataToKhai.QuocTich = quocTich;

        DanhMucEform danToc = new DanhMucEform() { Name = hosoObj.toKhai.nycTenDanToc, Code = hosoObj.toKhai.nycDanToc };
        dataToKhai.DanToc = danToc;

        dataToKhai.HoVaTenCha = hosoObj.toKhai.nycHoTenCha;
        dataToKhai.NgaySinhCha = hosoObj.toKhai.chaNamSinh?.ToString();
        dataToKhai.HoVaTenMe = hosoObj.toKhai.nycHoTenMe;
        dataToKhai.NgaySinhMe = hosoObj.toKhai.meNamSinh?.ToString();
        dataToKhai.HoVaTenVoChong = hosoObj.toKhai.nycHoTenVoChong;
        dataToKhai.NgaySinhVoChong = hosoObj.toKhai.voChongNamSinh?.ToString();
        if (hosoObj.toKhai.uyQuyen == 1)
        {
            dataToKhai.LoaiToKhai = "UyQuyen";
            dataToKhai.nycHoVaTen = hosoObj.toKhai.thongTinUyQuyen.nuqHoTen;


            DanhMucEform gioiTinhUQ = new DanhMucEform() { Name = hosoObj.toKhai.thongTinUyQuyen.nuqTenGioiTinh, Code = hosoObj.toKhai.thongTinUyQuyen.nuqGioiTinh?.ToString() };
            dataToKhai.nycGioiTinh = gioiTinhUQ;

            dataToKhai.nycNgaySinh = hosoObj.toKhai.thongTinUyQuyen.nuqNgaySinh;
            try
            {
                dataToKhai.nycNgaySinh = DateTime.ParseExact(dataToKhai.nycNgaySinh, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("s") + "+07:00";
            }
            catch { }
            //DanhMucEform danTocUQ = new DanhMucEform() { Name = hosoObj.toKhai.thongTinUyQuyen.nuqTenDanToc, Code = hosoObj.toKhai.thongTinUyQuyen.nuqDanToc };
            //dataToKhai.nycDanToc = danTocUQ;

            //DanhMucEform quocTichUQ = new DanhMucEform() { Name = hosoObj.toKhai.thongTinUyQuyen.nuqTenQuocTich, Code = hosoObj.toKhai.thongTinUyQuyen.nuqQuocTich };
            //dataToKhai.nycQuocTich = quocTichUQ;

            dataToKhai.nycEmail = hosoObj.toKhai.thongTinUyQuyen.nuqEmail?.Trim();

            DanhMucEform quanHeUQ = new DanhMucEform() { Name = hosoObj.toKhai.thongTinUyQuyen.nuqQuanHe.ten, Code = hosoObj.toKhai.thongTinUyQuyen.nuqQuanHe.ma?.ToString() };
            dataToKhai.nycQuanHe = quanHeUQ;

            dataToKhai.nycSoDienThoai = hosoObj.toKhai.thongTinUyQuyen.nuqDienThoai;

            DanhMucEform loaiGiayToUQ = new DanhMucEform() { Name = hosoObj.toKhai.thongTinUyQuyen.nuqTenLoaiGiayTo, Code = hosoObj.toKhai.thongTinUyQuyen.nuqLoaiGiayTo?.ToString() };
            dataToKhai.nycGiayToTuyThan = loaiGiayToUQ;


            dataToKhai.KhaiAnTich = hosoObj.toKhai.thongTinAnTich;
            dataToKhai.nycSoGiayTo = hosoObj.toKhai.thongTinUyQuyen.nuqSoGiayTo;
            dataToKhai.nycNgayCapGiayTo = hosoObj.toKhai.thongTinUyQuyen.nuqNgayCapGiayTo;
            try
            {
                dataToKhai.nycNgayCapGiayTo = DateTime.ParseExact(dataToKhai.nycNgayCapGiayTo, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("s") + "+07:00";
            }
            catch { }
            DanhMucEform noiCapUQ = new DanhMucEform() { Name = hosoObj.toKhai.thongTinUyQuyen.nuqNoiCapGiayTo, Code = hosoObj.toKhai.thongTinUyQuyen.nuqNoiCapGiayTo };
            dataToKhai.nycNoiCapGiayTo = noiCapUQ;

            dataToKhai.nycNoiOHienTai = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.chiTiet;
            dataToKhai.nycNoiOHienTaiTinhThanh = new DanhMucDiaBanEform() { tenDiaBan = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.tenTinhThanh, maDiaBan = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maTinhThanh };
            dataToKhai.nycNoiOHienTaiQuanHuyen = new DanhMucDiaBanEform() { tenDiaBan = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.tenQuanHuyen, maDiaBan = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maQuanHuyen };
            dataToKhai.nycNoiOHienTaiXaPhuong = new DanhMucDiaBanEform() { tenDiaBan = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.tenPhuongXa, maDiaBan = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maPhuongXa };

        }
        else
        {
            dataToKhai.LoaiToKhai = "CaNhan";
        }
        dataToKhai.NoiThuongTru = hosoObj.toKhai.nycThuongTru.chiTiet;
        dataToKhai.NoiThuongTruTinhThanh = new DanhMucDiaBanEform() { tenDiaBan = hosoObj.toKhai.nycThuongTru.tenTinhThanh, maDiaBan = hosoObj.toKhai.nycThuongTru.maTinhThanh };
        dataToKhai.NoiThuongTruQuanHuyen = new DanhMucDiaBanEform() { tenDiaBan = hosoObj.toKhai.nycThuongTru.tenQuanHuyen, maDiaBan = hosoObj.toKhai.nycThuongTru.maQuanHuyen };
        dataToKhai.NoiThuongTruXaPhuong = new DanhMucDiaBanEform() { tenDiaBan = hosoObj.toKhai.nycThuongTru.tenPhuongXa, maDiaBan = hosoObj.toKhai.nycThuongTru.maPhuongXa };

        if(hosoObj.toKhai.nycTamTru != null)
        {
            dataToKhai.DiaChiTamTru = hosoObj.toKhai.nycTamTru.chiTiet;
            dataToKhai.DiaChiTamTruTinhThanh = new DanhMucDiaBanEform() { tenDiaBan = hosoObj.toKhai.nycTamTru.tenTinhThanh, maDiaBan = hosoObj.toKhai.nycTamTru.maTinhThanh };
            dataToKhai.DiaChiTamTruQuanHuyen = new DanhMucDiaBanEform() { tenDiaBan = hosoObj.toKhai.nycTamTru.tenQuanHuyen, maDiaBan = hosoObj.toKhai.nycTamTru.maQuanHuyen };
            dataToKhai.DiaChiTamTruXaPhuong = new DanhMucDiaBanEform() { tenDiaBan = hosoObj.toKhai.nycTamTru.tenPhuongXa, maDiaBan = hosoObj.toKhai.nycTamTru.maPhuongXa };
        }
       
        if (hosoObj.toKhai.nycNoiSinh != null)
        {
            if (!string.IsNullOrEmpty(hosoObj.toKhai.nycNoiSinh.maTinhThanh))
            {
                dataToKhai.NoiSinh = new DanhMucDiaBanEform() { tenDiaBan = hosoObj.toKhai.nycNoiSinh.tenTinhThanh, maDiaBan = hosoObj.toKhai.nycNoiSinh.maTinhThanh };
            }
        }

        if ((hosoObj.toKhai.nycNoiSinh.maQuocGia == "VN"))
        {
            dataToKhai.NoiSinhNuocNgoai = false;
        }
        else
        {
            dataToKhai.NoiSinhNuocNgoai = true;
            dataToKhai.NoiSinhNuocNgoaiChiTiet = hosoObj.toKhai.nycNoiSinh.tenQuocGia;
        }

        dataToKhai.DoiTuongUuTien = hosoObj.toKhai.nycDoiTuongNopPhi;
        List<QuaTrinhCuTruEform> listCuTru = new List<QuaTrinhCuTruEform>();
        listCuTru.Clear();
        if (hosoObj.toKhai.quaTrinhCTNNNLV != null && hosoObj.toKhai.quaTrinhCTNNNLV.Count > 0)
        {
            foreach (QuaTrinhCTNNNLV quaTrinhCuTru in hosoObj.toKhai.quaTrinhCTNNNLV)
            {
                string tuThangNam = quaTrinhCuTru.tuThangNam;
                try { tuThangNam = tuThangNam.Split('/')[1]; }
                catch { }
                string denThangNam = quaTrinhCuTru.denThangNam;
                try { denThangNam = denThangNam.Split('/')[1]; }
                catch { }
                QuaTrinhCuTruEform dataCuTru = new QuaTrinhCuTruEform()
                {
                    TuNam = tuThangNam,
                    DenNam = denThangNam,
                    NoiThuongTru = quaTrinhCuTru.diaChiCuTru.chiTiet + ", " + quaTrinhCuTru.diaChiCuTru.tenPhuongXa + ", " + quaTrinhCuTru.diaChiCuTru.tenQuanHuyen + ", " + quaTrinhCuTru.diaChiCuTru.tenTinhThanh + ", " + quaTrinhCuTru.diaChiCuTru.tenQuocGia,
                    NgheNghiep = quaTrinhCuTru.ngheNghiep,
                    NoiLamViec = quaTrinhCuTru.noiLamViec
                };
                listCuTru.Add(dataCuTru);
            }
        }
        dataToKhai.QuaTrinhCuTru = listCuTru;
        result.data = dataToKhai;
        return dataToKhai;
    }
    private DataLGSP ConvertFromVNeID2LGSP(LLTP_VNEIDParams.Request hosoObj, DateTime? ngayHenTra)
    {
        if (string.IsNullOrEmpty(_settings.AuthKeyLLTP))
        {
            _logger.LogError($"{hosoObj.maHoSoMCDT}_{nameof(ConvertFromVNeID2LGSP)}_Chưa cấu hình AuthKeyLLTP ");
            throw new Exception("Chưa cấu hình AuthKeyLLTP");
        }
        DataLGSP data = new DataLGSP();
        data.authKey = _settings.AuthKeyLLTP;
        data.maTinh = hosoObj.maTinh;
        data.tenTinh = hosoObj.tenTinh;
        data.maHoSoMCDT = hosoObj.maHoSoMCDT;
        data.nguonDangKy = hosoObj.nguonDangKy?.ToString();
        data.tenNguonDangKy = hosoObj.tenNguonDangKy;
        data.ngayTiepNhan = hosoObj.ngayTiepNhan;
        ToKhaiLGSP dataToKhai = new ToKhaiLGSP();
        dataToKhai.ngayHenTra = ngayHenTra?.ToString("dd/MM/yyyy");
        dataToKhai.loaiPhieu = hosoObj.toKhai.loaiPhieu?.ToString();
        dataToKhai.yeuCauCDNCV = hosoObj.toKhai.yeuCauCDNCV?.ToString();
        dataToKhai.maMucDich = hosoObj.toKhai.maMucDich?.ToString();
        dataToKhai.mucDich = "";
        dataToKhai.tenMucDich = hosoObj.toKhai.tenMucDich;
        dataToKhai.soLuongCap = hosoObj.toKhai.soLuongCap?.ToString();
        dataToKhai.nycHoTen = hosoObj.toKhai.nycHoTen;
        dataToKhai.nycTenGoiKhac = hosoObj.toKhai.nycTenGoiKhac;
        dataToKhai.nycGioiTinh = hosoObj.toKhai.nycGioiTinh?.ToString();
        dataToKhai.nycTenGioiTinh = hosoObj.toKhai.nycTenGioiTinh;
        dataToKhai.nycTenLoaiGiayTo = hosoObj.toKhai.nycTenLoaiGiayTo;
        dataToKhai.nycNgaySinh = hosoObj.toKhai.nycNgaySinh;
        dataToKhai.nycDienThoai = hosoObj.toKhai.nycDienThoai;
        dataToKhai.nycEmail = hosoObj.toKhai.nycEmail?.Trim();
        dataToKhai.nycSoGiayTo = hosoObj.toKhai.nycSoGiayTo;
        dataToKhai.nycLoaiGiayTo = hosoObj.toKhai.nycLoaiGiayTo?.ToString();
        dataToKhai.nycNgayCapGiayTo = hosoObj.toKhai.nycNgayCapGiayTo;
        dataToKhai.nycNoiCapGiayTo = hosoObj.toKhai.nycNoiCapGiayTo;
        dataToKhai.nycQuocTich = hosoObj.toKhai.nycQuocTich;
        dataToKhai.nycTenQuocTich = hosoObj.toKhai.nycTenQuocTich;
        dataToKhai.nycDanToc = hosoObj.toKhai.nycDanToc;
        dataToKhai.nycTenDanToc = hosoObj.toKhai.nycTenDanToc;
        dataToKhai.nycHoTenCha = hosoObj.toKhai.nycHoTenCha;
        dataToKhai.chaNgaySinh = hosoObj.toKhai.chaNamSinh?.ToString();
        dataToKhai.chaLoaiGiayTo = "";
        dataToKhai.chaSoGiayTo = "";
        dataToKhai.nycHoTenMe = hosoObj.toKhai.nycHoTenMe;
        dataToKhai.meNgaySinh = hosoObj.toKhai.meNamSinh?.ToString();
        dataToKhai.meLoaiGiayTo = "";
        dataToKhai.meSoGiayTo = "";
        dataToKhai.nycHoTenVoChong = hosoObj.toKhai.nycHoTenVoChong;
        dataToKhai.voChongNgaySinh = hosoObj.toKhai.voChongNamSinh?.ToString();
        dataToKhai.voChongLoaiGiayTo = "";
        dataToKhai.voChongSoGiayTo = "";
        dataToKhai.uyQuyen = hosoObj.toKhai.uyQuyen?.ToString();
        dataToKhai.mucDichKhac = hosoObj.toKhai.mucDichKhac?.ToString();
        if (hosoObj.toKhai.uyQuyen?.ToString() == "1")
        {
            dataToKhai.uyQuyenHoTen = hosoObj.toKhai.thongTinUyQuyen.nuqHoTen;
            dataToKhai.nuqTenGoiKhac = "";
            dataToKhai.nuqGioiTinh = hosoObj.toKhai.thongTinUyQuyen.nuqGioiTinh?.ToString();
            dataToKhai.nuqNgaySinh = hosoObj.toKhai.thongTinUyQuyen.nuqNgaySinh;
            dataToKhai.nuqTenDanToc = hosoObj.toKhai.thongTinUyQuyen.nuqTenDanToc;
            dataToKhai.nuqDanToc = hosoObj.toKhai.thongTinUyQuyen.nuqDanToc;
            dataToKhai.nuqTenQuocTich = hosoObj.toKhai.thongTinUyQuyen.nuqTenQuocTich;
            dataToKhai.nuqQuocTich = hosoObj.toKhai.thongTinUyQuyen.nuqQuocTich;
            dataToKhai.nuqEmail = hosoObj.toKhai.thongTinUyQuyen.nuqEmail?.Trim();
            dataToKhai.nyqQuanHe = hosoObj.toKhai.thongTinUyQuyen.nuqQuanHe.ten;

            dataToKhai.nuqDienThoai = hosoObj.toKhai.thongTinUyQuyen.nuqDienThoai;
            dataToKhai.nuqLoaiGiayto = hosoObj.toKhai.thongTinUyQuyen.nuqLoaiGiayTo?.ToString();
            dataToKhai.thongTinAnTich = hosoObj.toKhai.thongTinAnTich;
            dataToKhai.nuqSoGiayTo = hosoObj.toKhai.thongTinUyQuyen.nuqSoGiayTo;
            dataToKhai.nuqNgayCapGiayTo = hosoObj.toKhai.thongTinUyQuyen.nuqNgayCapGiayTo;
            dataToKhai.nuqNoiCapGiayTo = hosoObj.toKhai.thongTinUyQuyen.nuqNoiCapGiayTo;


            //data.toKhai.nuqThuongTruChiTiet = new DiaBanLGSP()
            //{
            //    maTinhThanh = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maTinhThanh,
            //    tenTinhThanh = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.tenTinhThanh,
            //    maQuanHuyen = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maQuanHuyen,
            //    tenQuanHuyen = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.tenQuanHuyen,
            //    maPhuongXa = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maPhuongXa,
            //    tenPhuongXa = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.tenPhuongXa,
            //    dcChiTiet = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.chiTiet
            //};

            DiaBanLGSP nuqThuongTruChiTiet = new DiaBanLGSP();
            if (!string.IsNullOrEmpty(hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maTinhThanh))
            {
                nuqThuongTruChiTiet.maTinhThanh = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maTinhThanh;
                nuqThuongTruChiTiet.tenTinhThanh = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.tenTinhThanh;
            }
            if (!string.IsNullOrEmpty(hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maQuanHuyen))
            {
                nuqThuongTruChiTiet.maQuanHuyen = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maQuanHuyen;
                nuqThuongTruChiTiet.tenQuanHuyen = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.tenQuanHuyen;
            }
            if (!string.IsNullOrEmpty(hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maPhuongXa))
            {
                nuqThuongTruChiTiet.maPhuongXa = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maPhuongXa;
                nuqThuongTruChiTiet.tenPhuongXa = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.tenPhuongXa;
            }
            if (!string.IsNullOrEmpty(hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.chiTiet))
            {
                nuqThuongTruChiTiet.dcChiTiet = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.chiTiet;
            }
            dataToKhai.nuqThuongTruChiTiet = nuqThuongTruChiTiet;
            //data.toKhai.nuqNoiSinh = new DiaBanLGSP()
            //{
            //    maTinhThanh = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maTinhThanh,
            //    tenTinhThanh = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.tenTinhThanh,
            //    maQuanHuyen = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maQuanHuyen,
            //    tenQuanHuyen = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.tenQuanHuyen,
            //    maPhuongXa = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.maPhuongXa,
            //    tenPhuongXa = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.tenPhuongXa,
            //    dcChiTiet = hosoObj.toKhai.thongTinUyQuyen.nuqNoiOHienTai.chiTiet
            //};
        }

        DiaBanLGSP nycThuongTru = new DiaBanLGSP();
        if (!string.IsNullOrEmpty(hosoObj.toKhai.nycThuongTru.maTinhThanh))
        {
            nycThuongTru.maTinhThanh = hosoObj.toKhai.nycThuongTru.maTinhThanh;
            nycThuongTru.tenTinhThanh = hosoObj.toKhai.nycThuongTru.tenTinhThanh;
        }
        if (!string.IsNullOrEmpty(hosoObj.toKhai.nycThuongTru.maQuanHuyen))
        {
            nycThuongTru.maQuanHuyen = hosoObj.toKhai.nycThuongTru.maQuanHuyen;
            nycThuongTru.tenQuanHuyen = hosoObj.toKhai.nycThuongTru.tenQuanHuyen;
        }
        if (!string.IsNullOrEmpty(hosoObj.toKhai.nycThuongTru.maPhuongXa))
        {
            nycThuongTru.maPhuongXa = hosoObj.toKhai.nycThuongTru.maPhuongXa;
            nycThuongTru.tenPhuongXa = hosoObj.toKhai.nycThuongTru.tenPhuongXa;
        }
        if (!string.IsNullOrEmpty(hosoObj.toKhai.nycThuongTru.chiTiet))
        {
            nycThuongTru.dcChiTiet = hosoObj.toKhai.nycThuongTru.chiTiet;
        }
        dataToKhai.nycThuongTru = nycThuongTru;

        DiaBanLGSP nycTamTru = new DiaBanLGSP();
        if(hosoObj.toKhai.nycTamTru != null)
        {
            if (!string.IsNullOrEmpty(hosoObj.toKhai.nycTamTru.maTinhThanh))
            {
                nycTamTru.maTinhThanh = hosoObj.toKhai.nycTamTru.maTinhThanh;
                nycTamTru.tenTinhThanh = hosoObj.toKhai.nycTamTru.tenTinhThanh;
            }
            if (!string.IsNullOrEmpty(hosoObj.toKhai.nycTamTru.maQuanHuyen))
            {
                nycTamTru.maQuanHuyen = hosoObj.toKhai.nycTamTru.maQuanHuyen;
                nycTamTru.tenQuanHuyen = hosoObj.toKhai.nycTamTru.tenQuanHuyen;
            }
            if (!string.IsNullOrEmpty(hosoObj.toKhai.nycTamTru.maPhuongXa))
            {
                nycTamTru.maPhuongXa = hosoObj.toKhai.nycTamTru.maPhuongXa;
                nycTamTru.tenPhuongXa = hosoObj.toKhai.nycTamTru.tenPhuongXa;
            }
            if (!string.IsNullOrEmpty(hosoObj.toKhai.nycTamTru.chiTiet))
            {
                nycTamTru.dcChiTiet = hosoObj.toKhai.nycTamTru.chiTiet;
            }
        }
        dataToKhai.nycTamTru = nycTamTru;

        DiaBanLGSP nycNoiSinh = new DiaBanLGSP();
        if ((hosoObj.toKhai.nycNoiSinh.maQuocGia == "VN"))
        {
            dataToKhai.nycNoiSinhNuocNgoai = "1";
            nycNoiSinh.maTinhThanh = hosoObj.toKhai.nycNoiSinh.maTinhThanh;
            nycNoiSinh.tenTinhThanh = hosoObj.toKhai.nycNoiSinh.tenTinhThanh;
        }
        else
        {
            dataToKhai.nycNoiSinhNuocNgoai = "2";
            nycNoiSinh.dcChiTiet = hosoObj.toKhai.nycNoiSinh.tenQuocGia;
        }
        dataToKhai.nycNoiSinh = nycNoiSinh;

        dataToKhai.nycCuTru = new List<NycCuTruLGSP>();
        dataToKhai.nycCuTru.Clear();
        if (hosoObj.toKhai.quaTrinhCTNNNLV != null && hosoObj.toKhai.quaTrinhCTNNNLV.Count > 0)
        {
            foreach (QuaTrinhCTNNNLV quaTrinhCuTru in hosoObj.toKhai.quaTrinhCTNNNLV)
            {
                NycCuTruLGSP dataCuTru = new NycCuTruLGSP()
                {
                    tuNgay = quaTrinhCuTru.tuThangNam.Replace("-", "/"),
                    denNgay = quaTrinhCuTru.denThangNam.Replace("-", "/"),
                    noiCuTru = quaTrinhCuTru.diaChiCuTru.chiTiet + ", " + quaTrinhCuTru.diaChiCuTru.tenPhuongXa + ", " + quaTrinhCuTru.diaChiCuTru.tenQuanHuyen + ", " + quaTrinhCuTru.diaChiCuTru.tenTinhThanh + ", " + quaTrinhCuTru.diaChiCuTru.tenQuocGia,
                    ngheNghiep = quaTrinhCuTru.ngheNghiep,
                    noiLamViec = quaTrinhCuTru.noiLamViec
                };
                dataToKhai.nycCuTru.Add(dataCuTru);
            }
        }
        dataToKhai.fileHoSo = new List<FileHoSoLGSP>();
        dataToKhai.fileHoSo.Clear();

        if (hosoObj.toKhai.giayToDinhKem != null && hosoObj.toKhai.giayToDinhKem.Count > 0)
        {
            foreach (GiayToDinhKem giayToDinhKem in hosoObj.toKhai.giayToDinhKem)
            {
                if (giayToDinhKem.danhSach != null && giayToDinhKem.danhSach.Count > 0)
                {
                    foreach (DanhSachGiayTo giayTo in giayToDinhKem.danhSach)
                    {
                        string tenTep = "DinhKem";
                        if (giayTo.loai.ToLower().Contains("pdf"))
                        {
                            tenTep += ".pdf";
                        }
                        else if (giayTo.loai.ToLower().Contains("image"))
                        {
                            string loai = giayTo.loai.ToLower().Replace("image/", "");
                            tenTep += "." + loai;
                        }
                        FileHoSoLGSP file = new FileHoSoLGSP();
                        file.tenLoaiFile = giayToDinhKem.ten;
                        file.tenFile = tenTep;
                        file.noiDungFile = giayTo.duLieu;

                        dataToKhai.fileHoSo.Add(file);
                    }
                }
            }
        }
        data.toKhai = dataToKhai;
        return data;
    }
    private async Task<bool> InsertDataVneid(LLTP_VNEIDParams.Request data, bool thucHienCapNhat, bool boSungHoSo, DefaultIdType? Id, CancellationToken cancellationToken = default)
    {
        string sqlDonVi = $"SELECT Top 1 YeuCauXacNhanCoKetQua, GroupCode, DonViQuanLy from {SchemaNames.Catalog}.{TableNames.Groups} WHERE DeletedOn is null And MaDinhDanh = @MaDinhDanh";
        string sqlGetNguoiTiepNhan = @"SELECT STRING_AGG (CONVERT(NVARCHAR(1000),NguoiTiepNhanId) , '##') as TaiKhoanTiepNhan FROM [Catalog].[DonViThuTucs]
            where MaTTHC = @MaTTHC and DeletedOn is null and DonViId = @DonViId";
        var sqlSoftDeleteThanhPhanHoSos = $"Update {SchemaNames.Business}.{TableNames.ThanhPhanHoSos} SET DeletedOn = GetDate() WHERE HoSo = @MaHoSo AND DeletedOn is null";

        if (string.IsNullOrEmpty(_settings.MaDinhDanhDonVi))
        {
            _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_Chưa cấu hình mã định danh");
            throw new Exception("Chưa cấu hình mã đơn vị tiếp nhận");
        }
        if (string.IsNullOrEmpty(_settings.MaTTHC))
        {
            _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_Chưa cấu hình mã thủ tục");
            throw new Exception("Chưa cấu hình mã thủ tục hành chính");
        }
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var thuTuc = await _repositoryThuTuc.GetBySpecAsync(new GetThuTucByMaTTHCSpec(_settings.MaTTHC));

        if (thuTuc == null)
        {
            _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_Mã thủ tục không tồn tại");
            throw new Exception($"Mã thủ tục: {_settings.MaTTHC} không tồn tại trên hệ thống");
        }

        var donVi = await _dapperRepository.QueryFirstOrDefaultAsync<Group>(sqlDonVi, new
        {
            MaDinhDanh = _settings.MaDinhDanhDonVi
        });
        if (donVi == null)
        {
            _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_Đơn vị cấu hình đã bị xóa hoặc không tồn tại");
            throw new Exception($"Đơn vị tiếp nhận hồ sơ không tồn tại trên hệ thống hoặc đã bị xóa");
        }
        var nguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<TaiKhoanNguoiTiepNhan_Select>(sqlGetNguoiTiepNhan, new
        {
            MaTTHC = thuTuc.MaTTHC,
            DonViId = donVi.GroupCode
        });
        if (nguoiTiepNhan == null)
        {
            _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_Chưa cấu hình người tiếp nhận hồ sơ");
            throw new Exception($"Chưa cấu hình người tiếp nhận xử lý cho mã thủ tục: {thuTuc.MaTTHC}");
        }
        string loaiDuLieuKetNoi = data.toKhai.uyQuyen == 1 ? LLTPVneidUyQuyen : LLTPVneid;
        var truongHopThuTuc = await _repositoryTruongHopThuTuc.GetBySpecAsync(new GetTruongHopThuTucByMaTTHCSpec(thuTuc.MaTTHC, loaiDuLieuKetNoi));
        if (truongHopThuTuc == null)
        {
            _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_Không tìm thấy trường hợp thủ tục");
            throw new Exception($"Không tìm thấy trường hợp xử lý với mã thủ tục: {thuTuc.MaTTHC} ");
        }
        var caculateTime = new CaculateTime(_injectConfiguration);
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken);
        var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, 8, "Ngày làm việc");

        var ngaySinhList = data.toKhai.nycNgaySinh.Split("/");
        var ngaySinh = "";
        try
        {
            ngaySinh = ngaySinhList[ngaySinhList.Length - 1];
        } catch (Exception ex) { };
        string tinhThanhChuHoSo = data.toKhai.nycThuongTru.maTinhThanh;
        string quanHuyenChuHoSo = tinhThanhChuHoSo + "." + data.toKhai.nycThuongTru.maQuanHuyen;
        string xaPhuongChuHoSo = quanHuyenChuHoSo + "." + data.toKhai.nycThuongTru.maPhuongXa;
        List<string?> diaChiChuHoSoList = new List<string?>()
        {
            data.toKhai.nycThuongTru.chiTiet,
            data.toKhai.nycThuongTru.tenPhuongXa,
            data.toKhai.nycThuongTru.tenQuanHuyen,
            data.toKhai.nycThuongTru.tenTinhThanh
        };
        string diaChiThuongChuChuHoSo = string.Join(", ", diaChiChuHoSoList.Where(x => !string.IsNullOrEmpty(x)));
        string? tinhThanhNguoiUyQuyen = data.toKhai.thongTinUyQuyen?.nuqNoiOHienTai?.maTinhThanh;
        string? quanHuyenNguoiUyQuyen = tinhThanhNguoiUyQuyen + "." + data.toKhai.thongTinUyQuyen?.nuqNoiOHienTai?.maQuanHuyen;
        string? xaPhuongNguoiUyQuyen = quanHuyenNguoiUyQuyen + "." + data.toKhai.thongTinUyQuyen?.nuqNoiOHienTai?.maPhuongXa;
        string diaChiThuongNguoiUyQuyen = string.Empty;
        bool uyQuyen = data.toKhai.uyQuyen == 1;
        if (uyQuyen && data.toKhai.thongTinUyQuyen?.nuqNoiOHienTai != null)
        {
            List<string?> diaChiThuongNguoiUyQuyenList = new List<string?>()
        {
            data.toKhai.thongTinUyQuyen?.nuqNoiOHienTai?.chiTiet,
            data.toKhai.thongTinUyQuyen?.nuqNoiOHienTai?.tenPhuongXa,
            data.toKhai.thongTinUyQuyen?.nuqNoiOHienTai?.tenQuanHuyen,
            data.toKhai.thongTinUyQuyen?.nuqNoiOHienTai?.tenTinhThanh
        };
            diaChiThuongNguoiUyQuyen = string.Join(", ", diaChiThuongNguoiUyQuyenList.Where(x => !string.IsNullOrEmpty(x)));
        }
        string? dangKyNhanKetQuaQuaBCCIData = null;
        string? hinhThucTra = "0";

        if(data.toKhai.thongTinThanhToan.hinhThucNhanBanGiay == 2 && !string.IsNullOrEmpty(data.toKhai.thongTinThanhToan.diaChiNhan))
        {
            dangKyNhanKetQuaQuaBCCIData = JsonConvert.SerializeObject(new
            {
                hoVaTen = data.toKhai.nycHoTen,
                soDienThoai = data.toKhai.nycDienThoai,
                email = data.toKhai.nycEmail,
                diaChi = data.toKhai.thongTinThanhToan.diaChiNhan,
                tinhThanh = string.Empty,
                quanHuyen = string.Empty,
                xaPhuong = string.Empty,
                ghiChu = string.Empty,
                tenTinhThanh = string.Empty,
                tenQuanHuyen = string.Empty,
                tenXaPhuong = string.Empty
            });
            hinhThucTra = "1";
        }
        string donViQuanLy = !string.IsNullOrEmpty(donVi.DonViQuanLy) ? donVi.DonViQuanLy : donVi.GroupCode;
        string stringData = JsonConvert.SerializeObject(data);
        var hoSo = new HoSo(donVi.GroupCode, data.maHoSoMCDT, LoaiChuHoSoConstant.CongDan, data.toKhai.nycHoTen, data.toKhai.nycDienThoai, data.toKhai.nycEmail?.Trim(), data.toKhai.nycSoGiayTo,
               null, ngaySinh, tinhThanhChuHoSo, quanHuyenChuHoSo, xaPhuongChuHoSo, diaChiThuongChuChuHoSo, data.toKhai.nycSoGiayTo, thuTuc.MaTTHC, truongHopThuTuc.Ma,
               truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(), JsonConvert.SerializeObject(ConvertFromVNeID2Eform(data)), dangKyNhanKetQuaQuaBCCIData, nguoiTiepNhan.TaiKhoanTiepNhan,
               thuTuc.TenTTHC, null, uyQuyen, data.toKhai.thongTinUyQuyen?.nuqHoTen, data.toKhai.thongTinUyQuyen?.nuqDienThoai, data.toKhai.thongTinUyQuyen?.nuqEmail?.Trim(),
               data.toKhai.thongTinUyQuyen?.nuqSoGiayTo, tinhThanhNguoiUyQuyen, quanHuyenNguoiUyQuyen, xaPhuongNguoiUyQuyen, diaChiThuongNguoiUyQuyen, thuTuc.MaTTHC, currentTime,
               ngayHenTraCaNhan, thuTuc.MucDo, hinhThucTra, donViTraKq: donViQuanLy);
        hoSo.SetLoaiDuLieuKetNoi(loaiDuLieuKetNoi);
        hoSo.SetLinhVuc(thuTuc.MaLinhVucChinh, thuTuc.LinhVucChinh);
        if (donVi?.YeuCauXacNhanCoKetQua == null || donVi?.YeuCauXacNhanCoKetQua == false)
        {
            hoSo.SetTrangThaiTraKq(_trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ);
        }
        else
        {
            hoSo.SetTrangThaiTraKq(_trangThaiTraHoSoConstant.CHO_XAC_NHAN);
        }
        //hoSo.SetThoiGianThucHien(truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.ThoiGianThucHienTrucTuyen, truongHopThuTuc.LoaiThoiGianThucHien);

        List<ThanhPhanHoSo> thanhPhanHoSos = new List<ThanhPhanHoSo>();
        string trangThaiQTXL = "1";
        string thaoTacQTXL = "Nhận hồ sơ từ VNeID";
        string tenNguoiGui = data.toKhai?.nycHoTen ?? string.Empty;
        string nguoiGui = data.toKhai.nycSoGiayTo;
        if (boSungHoSo)
        {
            trangThaiQTXL = "5";
            thaoTacQTXL = "Công dân bổ sung hồ sơ (VNeID)";
            nguoiGui = string.Empty;
            tenNguoiGui = data.toKhai?.nycHoTen;
        }
        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(data.maHoSoMCDT, null, null, null, null, nguoiGui, tenNguoiGui, "", "", currentTime, trangThai: trangThaiQTXL, thaoTac: thaoTacQTXL);


        if (data.toKhai.giayToDinhKem != null && data.toKhai.giayToDinhKem.Count > 0)
        {
            for (int i = 0; i < data.toKhai.giayToDinhKem.Count; i++)
            {
                GiayToDinhKem thanhPhan = data.toKhai.giayToDinhKem[i];
                List<string> fileDinhKem = new List<string>();
                for (int j = 0; j < thanhPhan.danhSach?.Count; j++)
                {
                    DanhSachGiayTo giayTo = thanhPhan.danhSach[j];
                    string tenTep = "DinhKem" + j;
                    if (giayTo.loai.ToLower().Contains("pdf"))
                    {
                        tenTep += ".pdf";
                    }
                    else if (giayTo.loai.ToLower().Contains("image"))
                    {
                        string loai = giayTo.loai.ToLower().Replace("image/", "");
                        tenTep += "." + loai;
                    }
                    fileDinhKem.Add(await _minioService.UploadFileAsBase64Async(giayTo.duLieu, tenTep, null, "VneidLLTP"));
                }
                thanhPhanHoSos.Add(new ThanhPhanHoSo(thanhPhan.ten, data.maHoSoMCDT, null, null, null, string.Join("##", fileDinhKem), null, null, null, null, null, null, null, null, null, null));
            }
        }
        string url = await _minioService.UploadStringToMinioAsync(stringData, "", "Vneid_TaoHoSo_LLTP");
        _logger.LogInformation($"{nameof(InsertDataVneid)}_{data.maHoSoMCDT}_HoSoLienThongLLTPURL: {url}");
        if (string.IsNullOrEmpty(url))
        {
            _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_UPLOADFILEER_{stringData}");
            throw new Exception("Có lỗi xảy ra khi lưu thông tin");
        }
        if (thucHienCapNhat)
        {
            if (Id != default && Id != null)
            {
                hoSo.SetId((Guid)Id);
            }
            var hoSoLienThongLLTP = new HoSoLienThongLLTP(data.maHoSoMCDT, url);
            int updateHoSoRow = await _dapperRepository.UpdateEntityAsync<HoSo>(hoSo, new
            {
                MaHoSoUpdate = data.maHoSoMCDT
            }, SchemaNames.Business + "." + TableNames.HoSos, null, "MaHoSo = @MaHoSoUpdate", cancellationToken: cancellationToken);
            if (updateHoSoRow != 1)
            {
                throw new Exception("Cập nhật hồ sơ thất bại");
            }
            await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(nguoiTiepNhan.TaiKhoanTiepNhan, hoSo.Id, cancellationToken: cancellationToken);
            hoSoLienThongLLTP.SetDuongDanTaiLieuLog(hoSoLienThongLLTP.DuongDanDuLieu);
            int updatedHoSoLienThongLLTPCount = await _dapperRepository.UpdateEntityAsync<HoSoLienThongLLTP>(hoSoLienThongLLTP, new
            {
                MaHoSoUpdate = data.maHoSoMCDT
            }, SchemaNames.Business + "." + TableNames.HoSoLienThongLLTPs, null, "MaHoSo = @MaHoSoUpdate", cancellationToken: cancellationToken);
            if (updatedHoSoLienThongLLTPCount != 1)
            {
                throw new Exception("Có lỗi xảy ra khi lưu dữ liệu mới");
            }
            await _dapperRepository.ExcuteAsync(sqlSoftDeleteThanhPhanHoSos, new
            {
                MaHoSo = data.maHoSoMCDT
            });

        } else
        {
            HoSoLienThongLLTP hoSoLienThongLLTP = new HoSoLienThongLLTP(data.maHoSoMCDT, url);
            int insertedHSLTLLTPRow = await _dapperRepository.InsertEntityAsync(hoSoLienThongLLTP, SchemaNames.Business + "." + TableNames.HoSoLienThongLLTPs, cancellationToken: cancellationToken);
            if (insertedHSLTLLTPRow == 0)
            {
                _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_HoSoLienThongLLTP_{JsonConvert.SerializeObject(hoSoLienThongLLTP)}");
                throw new Exception("Có lỗi xảy ra khi lưu dữ liệu");
            }
            var hoSoId = Guid.NewGuid();
            hoSo.SetId(hoSoId);
            int insetedHoSoCount = await _dapperRepository.InsertEntityAsync<HoSo>(hoSo, SchemaNames.Business + "." + TableNames.HoSos, cancellationToken: cancellationToken);
            if (insetedHoSoCount != 1)
            {
                _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_Thêm mới hồ sơ thất bại: hoSo: {JsonConvert.SerializeObject(hoSo)}");
                throw new Exception("Thêm mới hồ sơ thất bại");
            }
            //await _hoSoRepository.AddAsync(hoSo, cancellationToken);
            await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(nguoiTiepNhan.TaiKhoanTiepNhan, hoSoId, cancellationToken: cancellationToken);

            var trangThaiThanhToan = new YeuCauThanhToanConstants();
            if (data.toKhai.thongTinThanhToan != null)
            {
                int tongPhi = Int32.Parse(data.toKhai.thongTinThanhToan.tongPhi);
                if (tongPhi > 0)
                {
                    var yeuCauThanhToan = new YeuCauThanhToan(hoSo.MaHoSo, $"{data.maHoSoMCDT}-{DateTime.Now.ToString("yyyyMMddhhmmss")}", tongPhi, tongPhi, 0,
                    trangThaiThanhToan.TRANG_THAI.DA_THANH_TOAN, DateTime.Now, null, donViQuanLy, trangThaiThanhToan.HINH_THUC_THANH_TOAN.TRUC_TUYEN, trangThaiThanhToan.HINH_THUC_THU.THU_TRUOC,
                    null, null, null, null, null, DateTime.Now, null, null, null, null, null, null, null, null, donVi.GroupCode);
                    yeuCauThanhToan.SetLLTPVneid(data.thongTinBienLai?.urlBienLai, "Phí " + thuTuc.TenTTHC, uyQuyen ? data.toKhai.thongTinUyQuyen?.nuqHoTen : data.toKhai.nycHoTen,
                    uyQuyen ? diaChiThuongNguoiUyQuyen : diaChiThuongChuChuHoSo);
                    yeuCauThanhToan.SetDoiTacThanhToan(YeuCauThanhToanConstant.DoiTacThanhToan_VNeID);
                    try
                    {
                        await _repositoryYeuCauThanhToan.AddAsync(yeuCauThanhToan, cancellationToken);
                        await _mediator.Send(new InitBienLaiDienTuQuery(yeuCauThanhToan.Id, "phi"));
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_YCTT_{JsonConvert.SerializeObject(yeuCauThanhToan)}_{ex.ToString()}");
                    }
                } else
                {
                    var yeuCauThanhToan = new YeuCauThanhToan(hoSo.MaHoSo, 0, 0, 0, trangThaiThanhToan.TRANG_THAI.DA_THANH_TOAN, currentTime, string.Empty, donViQuanLy, trangThaiThanhToan.HINH_THUC_THU.DOI_TUONG_MIEN_PHI, string.Empty, donVi: donVi.GroupCode, ngayThuPhi: DateTime.Now);
                    yeuCauThanhToan.SetDoiTacThanhToan(YeuCauThanhToanConstant.DoiTacThanhToan_VNeID);
                    try
                    {
                        await _repositoryYeuCauThanhToan.AddAsync(yeuCauThanhToan, cancellationToken);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_YCTT_Đối tượng miễn phí_{JsonConvert.SerializeObject(yeuCauThanhToan)}_{ex.ToString()}");
                        throw new Exception("Có lỗi xảy ra khi thêm yêu cầu thanh toán");
                    }
                }
            } else
            {
                var yeuCauThanhToan = new YeuCauThanhToan(hoSo.MaHoSo, 0, 0, 0, trangThaiThanhToan.TRANG_THAI.DA_THANH_TOAN, currentTime, string.Empty, donViQuanLy, trangThaiThanhToan.HINH_THUC_THU.DOI_TUONG_MIEN_PHI, string.Empty, donVi: donVi.GroupCode, ngayThuPhi: DateTime.Now);
                yeuCauThanhToan.SetDoiTacThanhToan(YeuCauThanhToanConstant.DoiTacThanhToan_VNeID);
                try
                {
                    await _repositoryYeuCauThanhToan.AddAsync(yeuCauThanhToan, cancellationToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_YCTT_Đối tượng miễn phí_{JsonConvert.SerializeObject(yeuCauThanhToan)}_{ex.ToString()}");
                    throw new Exception("Có lỗi xảy ra khi thêm yêu cầu thanh toán");
                }
            }

            
        }
        //int insertedTPHSCount = await _dapperRepository.InsertMultipleEntityAsync<Domain.Business.ThanhPhanHoSo>(thanhPhanHoSos, SchemaNames.Business + "." + TableNames.ThanhPhanHoSos);
        //if (insertedTPHSCount != thanhPhanHoSos.Count)
        //{
        //    _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_Thêm mới thành phần hồ sơ thất bại: hoSo: {JsonConvert.SerializeObject(thanhPhanHoSos)}");
        //    throw new Exception("Thêm mới thành phần hồ sơ thất bại");
        //}
        try
        {
            await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos, cancellationToken);
        }
        catch (Exception ex) {
            _logger.LogError($"{data.maHoSoMCDT}_{nameof(InsertDataVneid)}_Thêm mới thành phần hồ sơ thất bại: hoSo: {JsonConvert.SerializeObject(thanhPhanHoSos)}");
        }
        int insertedQTXLCount = await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLyHoSo, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos, cancellationToken: cancellationToken);
        if (insertedQTXLCount != 1)
        {
            throw new Exception("Thêm mới quá trình xử lý thất bại");
        }
        return true;
    }
    private class ScanResult_HoSoSelect
    {
        public string MaHoSo { get; set; }
    }
    [DisableConcurrentExecution(timeoutInSeconds: 10 * 60)]
    public async Task ScanResultLLTP()
    {
        if (!_settings.EnableScan || string.IsNullOrEmpty(_settings.AuthKeyLLTP) || string.IsNullOrEmpty(_settings.MaTinh))
        {
            return;
        }
        string sqlGetDanhSachHoSoDangTrenBo =
            $@"SELECT TOP {_settings.LLTPConfig.SoLuong ?? "1000"} MaHoSo FROM {SchemaNames.Business}.{TableNames.HoSos} hs
                WHERE NguoiDangXuLy = '' AND TrangThaiHoSoId = '4' And LoaiDuLieuKetNoi IN ('{LLTPVneid}', '{LLTPVneidUyQuyen}') and hs.DeletedOn is null";
        var danhSachHoSo = await _dapperRepository.QueryAsync<ScanResult_HoSoSelect>(sqlGetDanhSachHoSoDangTrenBo, new
        {

        });
        var danhSach = danhSachHoSo.Select(x => x.MaHoSo).ToList();
        if (danhSach != null && danhSach.Count > 0)
        {
            for (int i = 0; i < danhSach.Count; i++)
            {
                var maHoSo = danhSach[i];
                var req = new ScanBoParams.Request()
                {
                    maHoSoMCDT = maHoSo,
                    maTinh = _settings.MaTinh,
                    authKey = _settings.AuthKeyLLTP
                };
                try
                {
                    var res = await RequestHandler<ScanBoParams.Request, ScanBoParams.Response>(req, _settings.BaseUrl, "", HttpMethod.Post, _settings.LLTPConfig.UrlNhanTrangThai);
                    await LLTPGetHandler(res, LLTPVneid);
                }
                catch (Exception ex)
                {
                    _logger.LogError($"{nameof(ScanResultLLTP)}_{maHoSo}_req: {JsonConvert.SerializeObject(req)}_{ex.ToString()}");
                }
            }
        }
    }
    [DisableConcurrentExecution(timeoutInSeconds: 10 * 60)]
    public async Task ScanResultLLTPMCDT()
    {
        if (!_settings.EnableScan || string.IsNullOrEmpty(_settings.AuthKeyLLTP) || string.IsNullOrEmpty(_settings.MaTinh))
        {
            return;
        }
        string sqlGetDanhSachHoSoDangTrenBo =
            $@"SELECT TOP {_settings.LLTPConfig.SoLuong ?? "1000"} MaHoSo FROM {SchemaNames.Business}.{TableNames.HoSos} hs
                WHERE NguoiDangXuLy = '' AND TrangThaiHoSoId = '4' And LoaiDuLieuKetNoi = '{LLTPMCDT}' and hs.DeletedOn is null";
        var danhSachHoSo = await _dapperRepository.QueryAsync<ScanResult_HoSoSelect>(sqlGetDanhSachHoSoDangTrenBo, new
        {

        });
        var danhSach = danhSachHoSo.Select(x => x.MaHoSo).ToList();
        if (danhSach != null && danhSach.Count > 0)
        {
            for (int i = 0; i < danhSach.Count; i++)
            {
                var maHoSo = danhSach[i];
                var req = new ScanBoParams.Request()
                {
                    maHoSoMCDT = maHoSo,
                    maTinh = _settings.MaTinh,
                    authKey = _settings.AuthKeyLLTP
                };
                try
                {
                    var res = await RequestHandler<ScanBoParams.Request, ScanBoParams.Response>(req, _settings.BaseUrl, "", HttpMethod.Post, _settings.LLTPConfig.UrlNhanTrangThai);
                    await LLTPGetHandler(res, LLTPMCDT);
                }
                catch (Exception ex)
                {
                    _logger.LogError($"{nameof(ScanResultLLTP)}_{maHoSo}_req: {JsonConvert.SerializeObject(req)}_{ex.ToString()}");
                }
            }
        }
    }

    private async Task LLTPGetHandler(ScanBoParams.Response datas, string loaiDuLieuKetNoi)
    {
        if (datas == null || datas.value == null || datas.value.Count == 0) return;
        for (int i = 0; i < datas.value.Count; i++)
        {
            var data = datas.value[i];
            if (data.trangThaiXuLy == "9" || data.trangThaiXuLy == "10")
            {
                DateTime ngayKetThucXuLy = DateTime.Now;
                if (!string.IsNullOrEmpty(data.ketQuaXuLy.ngayCapPhieu))
                {
                    try
                    {
                        ngayKetThucXuLy = DateTime.ParseExact(data.ketQuaXuLy.ngayCapPhieu, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                    }
                    catch (Exception ex)
                    {
                    }
                }
                var dinhKemKetQua = string.Empty;
                try
                {
                    DateTime? ngayBanHanhKetQua = DateTime.TryParseExact(
                        data.ketQuaXuLy.ngayCapPhieu,
                        "dd/MM/yyyy",
                        CultureInfo.InvariantCulture,
                        DateTimeStyles.None,
                        out DateTime parsedDate
                    ) ? parsedDate : (DateTime?)null;
                    dinhKemKetQua = await _minioService.UploadFileAsBase64Async(data.ketQuaXuLy.phieuLLTP, "phieuLLTP.pdf", null, "PhieuLLTP");
                    await UpdateTrangThaiHoSo(data.maHoSoMCDT, "9", ngayKetThucXuLy, dinhKemKetQua, loaiVanBanKetQua: "Phiếu Lý lịch tư pháp", coQuanBanHanhKetQua: "Sở Tư pháp",
                        nguoiKyKetQua: data.ketQuaXuLy?.nguoiKy, soKyHieuKetQua: data.ketQuaXuLy?.soPhieuLLTP, ngayBanHanhKetQua: ngayBanHanhKetQua, trichYeuKetQua: "Phiếu lý lịch tư pháp");
                    var quaTrinhXuLy = new QuaTrinhXuLyHoSo(data.maHoSoMCDT, null, null, null, null, "", "Hệ thống quản lý LLTP", "", "", DateTime.Now, trangThai: data.trangThaiXuLy, dinhKem: dinhKemKetQua, thaoTac: "Hệ thống quản lý LLTP trả kết quả");
                    await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                    data.ketQuaXuLy.phieuLLTP = string.Empty;
                    await AddTrangThaiDVCLT(data.maHoSoMCDT, "9", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, loaiDuLieuKetNoi, JsonConvert.SerializeObject(data));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"{nameof(LLTPGetHandler)}_{data.maHoSoMCDT}_{ex.ToString()}");
                }
            }
        }
    }
    public async Task<Result> ThuHoiQuyetDinh(string maHoSo, ThuHoiQuyetDinhLLTP thuHoiQuyetDinhLLTP)
    {
        if (string.IsNullOrEmpty(_settings.AuthKeyLLTP) || string.IsNullOrEmpty(_settings.MaTinh) || string.IsNullOrEmpty(_settings.BaseUrl))
        {
            return (Result)Result.Fail("Cấu hình lỗi, vui lòng thử lại sau");
        }
        var req = new ScanBoParams.Request()
        {
            maHoSoMCDT = maHoSo,
            maTinh = _settings.MaTinh,
            authKey = _settings.AuthKeyLLTP
        };
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>($@"SELECT Id, TrangThaiHoSoId, LoaiDuLieuKetNoi FROM {SchemaNames.Business}.{TableNames.HoSos}
                            WHERE MaHoSo = @MaHoSo and DeletedOn is null and LoaiDuLieuKetNoi IN ('{LLTPVneid}', '{LLTPVneidUyQuyen}')",
        new
        {
            MaHoSo = maHoSo
        });
        if (hoSo == null)
        {
            throw new NotFoundException($"Hồ sơ với mã: {maHoSo} không tồn tại trên hệ thống hoặc không thuộc VNeID");
        }
        if (hoSo.TrangThaiHoSoId != "9" && hoSo.TrangThaiHoSoId != "10")
        {
            return (Result)Result.Fail("Hồ sơ không ở trạng thái chờ trả hoặc đã trả");
        }
        try
        {
            string tenNguoiGui = _currentUser.GetUserFullName();
            string nguoiGui = _currentUser.GetUserId().ToString();
            string groupName = _currentUser.GetUserGroupName();
            var res = await RequestHandler<ScanBoParams.Request, ScanBoParams.Response>(req, _settings.BaseUrl, "", HttpMethod.Post, _settings.LLTPConfig.UrlNhanTrangThai);
            if (res == null || res.value == null || res.value.Count == 0)
            {
                return (Result)Result.Fail("Không tìm thấy dữ liệu trên hệ thống quản lý LLTP tập chung");
            }
            for (int i = 0; i < res.value.Count; i++)
            {
                var data = res.value[i];
                if (data.trangThaiXuLy == "9" || data.trangThaiXuLy == "10")
                {
                    var dinhKemKetQua = string.Empty;
                    try
                    {
                        dinhKemKetQua = await _minioService.UploadFileAsBase64Async(data.ketQuaXuLy.phieuLLTP, "PhieuLLTP.pdf", null, "PhieuLLTP");
                        await UpdateTrangThaiHoSo(data.maHoSoMCDT, hoSo.TrangThaiHoSoId, dinhKemKetQua: dinhKemKetQua);
                        await _repositoryKetQuaLienQuan.AddAsync(new KetQuaLienQuan(maHoSo, null, thuHoiQuyetDinhLLTP.SoQuyetDinh, thuHoiQuyetDinhLLTP.TrichYeuQuyetDinh,
                        thuHoiQuyetDinhLLTP.NgayQuyetDinh, tenNguoiGui, groupName, null, null, null, thuHoiQuyetDinhLLTP.FileQuyetDinh));

                        var quaTrinhXuLy = new QuaTrinhXuLyHoSo(data.maHoSoMCDT, null, null, null, null, nguoiGui, tenNguoiGui, "", "Hệ thống quản lý LLTP tập chung", DateTime.Now, trangThai: data.trangThaiXuLy, dinhKem: dinhKemKetQua, thaoTac: "Lấy quyết định thu hồi phiếu LLTP", noiDung: thuHoiQuyetDinhLLTP.LyDoThuHoi);
                        await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                        data.ketQuaXuLy.phieuLLTP = string.Empty;
                        await AddTrangThaiDVCLT(maHoSo, hoSo.TrangThaiHoSoId, TrangThaiDongBoHoSoLLTPConstant.TrangThaiDongBo_ChuaDongBo, hoSo.LoaiDuLieuKetNoi, JsonConvert.SerializeObject(data), TrangThaiDongBoHoSoLLTPConstant.TrangThaiDongBo_Type_ThuHoi, thuHoiQuyetDinhLLTP.FileQuyetDinh);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"{nameof(ThuHoiQuyetDinh)}_{data.maHoSoMCDT}_req:{JsonConvert.SerializeObject(thuHoiQuyetDinhLLTP)}_{ex.ToString()}");
                    }
                }
            }
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError($"{nameof(ThuHoiQuyetDinh)}_{maHoSo}_req: {JsonConvert.SerializeObject(req)}_{ex.ToString()}");
            return (Result)Result.Fail(ex.Message ?? "Có lỗi xảy ra, vui lòng thử lại sau");
        }
    }

    public async Task<Result> GuiLienThongBo(string maHoSo)
    {
        var hoSo = await _hoSoRepository.GetBySpecAsync(new GetHoSoByMaHoSoSpec(maHoSo));
        string sqlGetHoSoLienThongLLTP = $"SELECT Top 1 DuongDanDuLieu, Id From {SchemaNames.Business}.{TableNames.HoSoLienThongLLTPs} WHERE MaHoSo = @MaHoSo";
        if (hoSo == null)
        {
            throw new NotFoundException("Không tìm thấy hồ sơ có mã: " + maHoSo);
        }
        if (hoSo.LoaiDuLieuKetNoi != LLTPVneid && hoSo.LoaiDuLieuKetNoi != LLTPVneidUyQuyen)
        {
            throw new Exception("Không phải hồ sơ nộp qua VNeID! Vui lòng không sử dụng chức năng này!");
        }
        var hoSoLienThongLLTP = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoLienThongLLTP>(sqlGetHoSoLienThongLLTP, new
        {
            MaHoSo = maHoSo
        });
        if (hoSoLienThongLLTP == null)
        {
            _logger.LogError($"{maHoSo}_{nameof(GuiLienThongBo)}_Không tìm thấy hồ sơ lltp");
            throw new Exception("Không tìm thấy dữ liệu hồ sơ");
        }
        var fileData = await _minioService.GetFileByKeyAsync(null, hoSoLienThongLLTP.DuongDanDuLieu);
        using (StreamReader reader = new StreamReader(fileData.StreamData, Encoding.UTF8))
        {
            string content = reader.ReadToEnd();
            var objHoSoLienThong = JsonConvert.DeserializeObject<LLTP_VNEIDParams.Request>(content);
            DataLGSP objHoSoLGSP = ConvertFromVNeID2LGSP(objHoSoLienThong, hoSo.NgayHenTra);
            var resultText = await RequestHandlerReturnPlainText(objHoSoLGSP, _settings.UrlAPIDVC_BTP);
            if (resultText.ToLower().Contains("gửi thông tin thành công") || resultText.ToLower().Contains("đã được tiếp nhận, không thể cập nhật thông tin"))
            {
                string userId = _currentUser.GetUserId().ToString();
                var quaTrinhXuLy = new QuaTrinhXuLyHoSo(maHoSo, null, null, null, null, userId, _currentUser.GetUserFullName(), "", "Hệ thống LLTP", DateTime.Now, trangThai: "4", thaoTac: "Liên thông BTP");
                await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                await UpdateTrangThaiHoSo(maHoSo, "4", nguoiDaXuLy: userId);
                await _nguoiXuLyHoSoService.SetNguoiDangXuLyAsNguoiDaXuLy(hoSo.Id);
                await AddTrangThaiDVCLT(maHoSo, "4", TrangThaiDongBoHoSoLLTPConstant.TrangThaiDongBo_ChuaDongBo, hoSo.LoaiDuLieuKetNoi, string.Empty);
                return (Result)Result.Success();
            } else
            {
                _logger.LogError($"{maHoSo}_{nameof(GuiLienThongBo)}_Thao tác thất bại, req: {JsonConvert.SerializeObject(objHoSoLGSP)}, res: {resultText}");
                try
                {
                    PushBTPResonse responseBTP = JsonConvert.DeserializeObject<PushBTPResonse>(resultText);
                    return (Result)Result.Fail(responseBTP.errorDescription);
                }
                catch (Exception ex) {
                    return (Result)Result.Fail("Thao tác thất bại");
                }
            }
        }
    }

    private class CapNhatTrangThaiDVCLT_HoSoSelect : TrangThaiDongBoHoSoLLTP
    {
        public string MaTTHC { get; set; }
        public string NgayTiepNhan { get; set; }
        public string NgayHenTra { get; set; }
        public string LoaiDuLieuKetNoi { get; set; }
        public string NgayNopHoSo { get; set; }
        public string LyDoBoSung { get; set; }
        public string LyDoTuChoi { get; set; }
        public string MaHoSo { get; set; }
        public string GroupName { get; set; }
        public string DinhKemKetQua { get; set; }
    }
    [DisableConcurrentExecution(timeoutInSeconds: 10 * 60)]
    public async Task CapNhatTrangThaiVNeID()
    {
        if (!_settings.EnableUpdateStatus)
        {
            return;
        }
        string sqlDanhSachTrangThaiHoSoLienThong =
           $@"SELECT TOP {_settings.VNeIDConfig.SoLuongCapNhat ?? "40"} tthslt.*, g.GroupName, hs.MaTTHC, hs.NgayTiepNhan, hs.LoaiDuLieuKetNoi, hs.NgayNopHoSo, hs.LyDoBoSung,
            hs.LyDoTuChoi,hs.DinhKemKetQua, hs.NgayHenTra FROM {SchemaNames.Business}.{TableNames.TrangThaiDongBoHoSoLLTPs} tthslt
            INNER JOIN {SchemaNames.Business}.{TableNames.HoSos} hs ON tthslt.MaHoSo = hs.MaHoSo
            INNER JOIN {SchemaNames.Catalog}.{TableNames.Groups} g ON hs.donViId = g.GroupCode
            WHERE tthslt.TrangThaiDongBoDVC = @TrangThaiDongBoDVC
            ORDER BY tthslt.CreatedOn";
        var danhSach = await _dapperRepository.QueryAsync<CapNhatTrangThaiDVCLT_HoSoSelect>(sqlDanhSachTrangThaiHoSoLienThong, new
        {
            TrangThaiDongBoDVC = TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo
        });
        for (int i = 0; i < danhSach?.Count; i++)
        {
            var data = danhSach[i];
            string? ngayHenTraKetQua = string.Empty;
            string type = data.TypeVneid;
            string maHoSoMCDT = data.MaHoSo;
            string lyDoTyChoi = string.Empty;
            string tenTinh = data.GroupName;
            string maTinh = _settings.MaTinh;
            string trangThaiXuLy = data.TrangThai;
            string tenTrangThaiXuLy = trangThaiDic[trangThaiXuLy];
            if (data.TrangThai == "3")
            {
                lyDoTyChoi = data.LyDoTuChoi;
            }
            else if (data.TrangThai == "5")
            {
                lyDoTyChoi = data.LyDoBoSung;
            }
            if (!string.IsNullOrEmpty(data.NgayHenTra))
            {
                try
                {
                    ngayHenTraKetQua = DateTime.Parse(data.NgayHenTra, CultureInfo.InvariantCulture).ToString("dd/MM/yyyy");
                }
                catch (Exception ex)
                {
                    _logger.LogError($"{nameof(CapNhatTrangThaiVNeID)}_{maHoSoMCDT}_data:{data}_error:{JsonConvert.SerializeObject(ex)}");
                }
            } else
            {
                ngayHenTraKetQua = null;
            }
            var req = new DongBoTrangThaiParam()
            {
                maTinh = maTinh,
                tenTinh = tenTinh,
                maHoSoMCDT = maHoSoMCDT,
                trangThaiXuLy = trangThaiXuLy,
                tenTrangThaiXuLy = tenTrangThaiXuLy,
            };
            if (trangThaiXuLy == "9" || trangThaiXuLy == "10")
            {
                if (!string.IsNullOrEmpty(data.DinhKemKetQua))
                {
                    var base64PhieuLLTP = await _minioService.GetFileByKeyAsBase64Async(null, data.DinhKemKetQua);
                    var duLieuLLTP = JsonConvert.DeserializeObject<LLTP_VNEIDParams.ScanBoParams.Value>(data.DuLieuLLTP);
                    if (duLieuLLTP != null)
                    {
                        req.ketQuaXuLy = new DongBoTrangThaiParam.KetQuaXuLy()
                        {
                            soPhieuLLTP = duLieuLLTP.ketQuaXuLy?.soPhieuLLTP ?? string.Empty,
                            ngayCapPhieu = duLieuLLTP.ketQuaXuLy?.ngayCapPhieu ?? string.Empty,
                            loaiPhieu = duLieuLLTP.ketQuaXuLy.loaiPhieu,
                            nguoiLapPhieu = duLieuLLTP.ketQuaXuLy.nguoiLapPhieu,
                            nguoiKy = duLieuLLTP.ketQuaXuLy.nguoiKy,
                            chucVu = duLieuLLTP.ketQuaXuLy.chucVu,
                            tinhTrangAnTich = duLieuLLTP.ketQuaXuLy.tinhTrangAnTich,
                            tenTinhTrangAnTich = duLieuLLTP.ketQuaXuLy.tenTinhTrangAnTich,
                            thongTinCDNCV = duLieuLLTP.ketQuaXuLy.thongTinCDNCV,
                            tenThongTinCDNCV = duLieuLLTP.ketQuaXuLy.tenThongTinCDNCV,
                            thongTinAn = duLieuLLTP.ketQuaXuLy.thongTinAn,
                            dsCDNCV = duLieuLLTP.ketQuaXuLy.dsCDNCV,
                            phieuLLTP = base64PhieuLLTP.Base64,
                        };
                    }
                }
            }
            if (type == TrangThaiDongBoHoSoLLTPConstant.TrangThaiDongBo_Type_ThuHoi)
            {
                var quyetDinhThuHoiFile = await _minioService.GetFileByKeyAsBase64Async(null, data.DinhKemThuHoi);
                req.ketQuaXuLy.quyetDinhThuHoi = quyetDinhThuHoiFile.Base64;
            }
            req.ngayHenTraKetQua = ngayHenTraKetQua;
            req.lyDoTuChoi = lyDoTyChoi;
            req.type = type;
            var res = await RequestHandler<DongBoTrangThaiParam, LLTP_VNEIDParams.Response>(req, _settings.BaseUrl, string.Empty, HttpMethod.Post, "/v2/lyLichTuPhap/traKetQuaHoSoLLTP");
            if (res.statusCode == "00")
            {
                if(req.ketQuaXuLy != null)
                {
                    if (!string.IsNullOrEmpty(req.ketQuaXuLy.phieuLLTP))
                    {
                        req.ketQuaXuLy.phieuLLTP = "";
                    }
                }
                _logger.LogError($"{nameof(CapNhatTrangThaiVNeID)}_success_{data.MaHoSo}_req:{JsonConvert.SerializeObject(req)}_res:{JsonConvert.SerializeObject(res)}");
                await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ThanhCong);
            }
            else if(res.statusCode == "01")
            {
                if (!string.IsNullOrEmpty(res.errorDetail) && res.errorDetail.ToLower().Contains("không thể cập nhật lên trạng thái"))
                {
                    if (req.ketQuaXuLy != null)
                    {
                        if (!string.IsNullOrEmpty(req.ketQuaXuLy.phieuLLTP))
                        {
                            req.ketQuaXuLy.phieuLLTP = "";
                        }
                    }
                    _logger.LogError($"{nameof(CapNhatTrangThaiVNeID)}_success_{data.MaHoSo}_req:{JsonConvert.SerializeObject(req)}_res:{JsonConvert.SerializeObject(res)}");
                    await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ThanhCong);
                }
                else
                {
                    if (req.ketQuaXuLy != null)
                    {
                        if (!string.IsNullOrEmpty(req.ketQuaXuLy.phieuLLTP))
                        {
                            req.ketQuaXuLy.phieuLLTP = "";
                        }
                    }
                    _logger.LogError($"{nameof(CapNhatTrangThaiVNeID)}_error_{data.MaHoSo}_req:{JsonConvert.SerializeObject(req)}_res:{JsonConvert.SerializeObject(res)}");
                    await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ThatBai);
                }
            }
            else if(res.statusCode == "03")
            {
                if (!string.IsNullOrEmpty(res.errorDetail) && res.errorDetail.ToLower().Contains("yêu cầu bị gián đoạn. vui lòng thử lại."))
                {
                    if (req.ketQuaXuLy != null)
                    {
                        if (!string.IsNullOrEmpty(req.ketQuaXuLy.phieuLLTP))
                        {
                            req.ketQuaXuLy.phieuLLTP = "";
                        }
                    }
                    _logger.LogError($"{nameof(CapNhatTrangThaiVNeID)}_error03_{data.MaHoSo}_req:{JsonConvert.SerializeObject(req)}_res:{JsonConvert.SerializeObject(res)}");
                    await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo);
                }
                else
                {
                    if (req.ketQuaXuLy != null)
                    {
                        if (!string.IsNullOrEmpty(req.ketQuaXuLy.phieuLLTP))
                        {
                            req.ketQuaXuLy.phieuLLTP = "";
                        }
                    }
                    _logger.LogError($"{nameof(CapNhatTrangThaiVNeID)}_error03_{data.MaHoSo}_req:{JsonConvert.SerializeObject(req)}_res:{JsonConvert.SerializeObject(res)}");
                    await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ThatBai);
                }
            }
            else
            {
                if (req.ketQuaXuLy != null)
                {
                    if (!string.IsNullOrEmpty(req.ketQuaXuLy.phieuLLTP))
                    {
                        req.ketQuaXuLy.phieuLLTP = "";
                    }
                }
                _logger.LogError($"{nameof(CapNhatTrangThaiVNeID)}_error1_{data.MaHoSo}_req:{JsonConvert.SerializeObject(req)}_res:{JsonConvert.SerializeObject(res)}");
                await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ThatBai);
            }
        }
    }
    private async Task<int> UpdateTrangThaiDVCLT(string Id, string trangThai)
    {
        return await _dapperRepository.ExcuteAsync($"Update {SchemaNames.Business}.{TableNames.TrangThaiDongBoHoSoLLTPs} SET TrangThaiDongBoDVC = @TrangThaiDongBoDVC WHERE Id = @Id", new
        {
            TrangThaiDongBoDVC = trangThai,
            Id = Id
        });
    }

    private async Task UpdateTrangThaiHoSo(string maHoSo, string trangThai, DateTime? ngayKetThucXuLy = null, string? dinhKemKetQua = null, string? nguoiDaXuLy = null,
        string? loaiDuLieuKetNoi = null, string? loaiVanBanKetQua = null, string? coQuanBanHanhKetQua = null, string? nguoiKyKetQua = null, string? soKyHieuKetQua = null,
        DateTime? ngayBanHanhKetQua = null, string? trichYeuKetQua = null)
    {
        string extraUpdateCols = string.Empty;
        if (trangThai == "5" || trangThai == "4")
        {
            extraUpdateCols += ", NguoiDangXuLy = ''";
        }
        else if (trangThai == "9" || trangThai == "3")
        {
            extraUpdateCols += ", NguoiDangXuLy = NguoiNhanHoSo";
        }
        if (ngayKetThucXuLy != null && ngayKetThucXuLy.HasValue && ngayKetThucXuLy != DateTime.MinValue)
        {
            extraUpdateCols += ", NgayKetThucXuLy = @NgayKetThucXuLy";
        }
        if (!string.IsNullOrEmpty(dinhKemKetQua))
        {
            extraUpdateCols += ", DinhKemKetQua = @DinhKemKetQua";
        }
        if (!string.IsNullOrEmpty(nguoiDaXuLy))
        {
            extraUpdateCols += ", NguoiDaXuLy = @NguoiDaXuLy";
        }
        if (!string.IsNullOrEmpty(loaiDuLieuKetNoi))
        {
            extraUpdateCols += ", LoaiDuLieuKetNoi = @LoaiDuLieuKetNoi";
        }
        if (!string.IsNullOrEmpty(loaiVanBanKetQua))
        {
            extraUpdateCols += ", LoaiVanBanKetQua = @LoaiVanBanKetQua";
        }
        if (!string.IsNullOrEmpty(coQuanBanHanhKetQua))
        {
            extraUpdateCols += ", CoQuanBanHanhKetQua = @CoQuanBanHanhKetQua";
        }
        if (!string.IsNullOrEmpty(nguoiKyKetQua))
        {
            extraUpdateCols += ", NguoiKyKetQua = @NguoiKyKetQua";
        }
        if (!string.IsNullOrEmpty(soKyHieuKetQua))
        {
            extraUpdateCols += ", SoKyHieuKetQua = @SoKyHieuKetQua";
        }
        if (ngayBanHanhKetQua != null)
        {
            extraUpdateCols += ", NgayBanHanhKetQua = @NgayBanHanhKetQua";
        }
        if (!string.IsNullOrEmpty(trichYeuKetQua))
        {
            trichYeuKetQua += ", TrichYeuKetQua = @TrichYeuKetQua + ' ' + ChuHoSo";
        }

        string sqlUpdateHoSo = $"UPDATE {SchemaNames.Business}.{TableNames.HoSos} SET TrangThaiHoSoId = @TrangThaiHoSoId, TrangThaiDongBoDVC = '0' {extraUpdateCols} WHERE MaHoSo = @MaHoSo";
        int updateCount = await _dapperRepository.ExcuteAsync(sqlUpdateHoSo, new
        {
            MaHoSo = maHoSo,
            TrangThaiHoSoId = trangThai,
            NgayKetThucXuLy = ngayKetThucXuLy,
            DinhKemKetQua = dinhKemKetQua,
            NguoiDaXuLy = nguoiDaXuLy,
            LoaiDuLieuKetNoi = loaiDuLieuKetNoi,
            LoaiVanBanKetQua = loaiVanBanKetQua,
            CoQuanBanHanhKetQua = coQuanBanHanhKetQua,
            NguoiKyKetQua = nguoiKyKetQua,
            SoKyHieuKetQua = soKyHieuKetQua,
            NgayBanHanhKetQua = ngayBanHanhKetQua,
            TrichYeuKetQua = trichYeuKetQua
        });
    }

    public async Task<int> AddTrangThaiDVCLT(string maHoSo, string trangThai, string trangThaiDongBoDVC, string loaiDuLieuKetNoi, string duLieuBTP = "", string type = TrangThaiDongBoHoSoLLTPConstant.TrangThaiDongBo_Type_KetQua, string dinhKemThuHoi = "")
    {
        if (loaiDuLieuKetNoi == LLTPVneid || loaiDuLieuKetNoi == LLTPVneidUyQuyen)
        {
            var trangThaiHoSoLienThong = new TrangThaiDongBoHoSoLLTP(maHoSo, trangThai, trangThaiDongBoDVC, duLieuBTP, type, dinhKemThuHoi);
            trangThaiHoSoLienThong.CreatedBy = _currentUser.GetUserId();
            var resInsert = await _dapperRepository.InsertEntityAsync<TrangThaiDongBoHoSoLLTP>(trangThaiHoSoLienThong, SchemaNames.Business + "." + TableNames.TrangThaiDongBoHoSoLLTPs);
            if(trangThai == "3") // tu choi
            {
                try
                {
                    var sqlGetYCTT = $@"SELECT Top 1 Id FROM {SchemaNames.Business}.{TableNames.YeuCauThanhToans} where MaHoSo = @MaHoSo and DoiTacThanhToan = '{YeuCauThanhToanConstant.DoiTacThanhToan_VNeID}' and deletedOn is null";
                    var yctt = await _dapperRepository.QueryFirstOrDefaultAsync<YeuCauThanhToan>(sqlGetYCTT, new
                    {
                        MaHoSo = maHoSo,
                    });
                    string sqlUpdateHoanPhi = $@"Update {SchemaNames.Business}.{TableNames.YeuCauThanhToans} SET
                    TrangThai = N'{_yeuCauThanhToanConstants.TRANG_THAI.HOAN_PHI}',
                    LyDoHoanPhi = N'Từ chối hồ sơ nộp qua VNeID'
                    where Id = @Id";
                    await _dapperRepository.ExcuteAsync(sqlUpdateHoanPhi, new
                    {
                        Id = yctt.Id,
                    });
                    var resPhi = await _mediator.Send(new CancelBienLaiDienTuCommand(yctt.Id, "phi"));
                }
                catch (Exception ex) {
                    _logger.LogError($"{maHoSo}_TuChoiLLTP_{ex.ToString()}");
                }
            }
            return resInsert;
        }
        return 0;
    }


    public async Task<Result> GuiLienThongBoMCDT(string maHoSo, string eformData, CancellationToken cancellationToken)
    {
        var hoSo = await _hoSoRepository.GetBySpecAsync(new GetHoSoByMaHoSoSpec(maHoSo), cancellationToken);
        if (hoSo == null)
        {
            throw new NotFoundException("Không tìm thấy hồ sơ có mã: " + maHoSo);
        }
        var tphs = await _repositoryThanhPhanHoSo.ListAsync(new SearchThanhPhanHoSoByMaHoSo(maHoSo), cancellationToken);
        RootDataEform eformDataObj = JsonConvert.DeserializeObject<RootDataEform>(eformData);
        DataLGSP data = ConvertFromEform2LGSP(eformDataObj.data);
        data.maHoSoMCDT = maHoSo;
        string loaiTiepNhan = hoSo.KenhThucHien;
        if (loaiTiepNhan != "2") // Truc tiep & BCCI
        {
            data.nguonDangKy = "3";
            data.tenNguonDangKy = "Hồ sơ nộp trực tiếp tại Sở Tư pháp";
        }
        else
        {
            data.nguonDangKy = "1";
            data.tenNguonDangKy = "Hồ sơ đăng ký trực tuyến qua cổng DVC của địa phương";
        }
        data.ngayTiepNhan = hoSo.NgayTiepNhan?.ToString("dd/MM/yyyy");
        data.toKhai.ngayHenTra = hoSo.NgayHenTra?.ToString("dd/MM/yyyy");
        data.toKhai.fileHoSo = new List<FileHoSoLGSP>();
        data.toKhai.fileHoSo.Clear();
        if(tphs?.Count > 0)
        {
            foreach (ThanhPhanHoSo itemThanhPhan in tphs)
            {
                string tenThanhPhan = itemThanhPhan.Ten;
                string? strThanhPhan = itemThanhPhan.DinhKem;
                string[] dsDinhKem = strThanhPhan?.Split(new string[] { "##" }, StringSplitOptions.None);
                if(dsDinhKem != null && dsDinhKem.Length > 0)
                {
                    foreach (string dinhKem in dsDinhKem)
                    {
                        if (!string.IsNullOrEmpty(dinhKem))
                        {
                            var fileData = await _minioService.GetFileByKeyAsBase64Async(string.Empty, dinhKem);
                            FileHoSoLGSP file = new FileHoSoLGSP();
                            file.tenLoaiFile = tenThanhPhan;
                            file.tenFile = fileData.Name;
                            file.noiDungFile = fileData.Base64;

                            data.toKhai.fileHoSo.Add(file);

                        }
                    }
                }
            }
        }
        var resultText = await RequestHandlerReturnPlainText(data, _settings.UrlAPIDVC_BTP);
        if (resultText.ToLower().Contains("gửi thông tin thành công") || resultText.ToLower().Contains("đã được tiếp nhận, không thể cập nhật thông tin"))
        {
            string userId = _currentUser.GetUserId().ToString();
            var quaTrinhXuLy = new QuaTrinhXuLyHoSo(maHoSo, null, null, null, null, userId, _currentUser.GetUserFullName(), "", "Hệ thống LLTP", DateTime.Now, trangThai: "4", thaoTac: "Liên thông BTP");
            await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
            await UpdateTrangThaiHoSo(maHoSo, "4", loaiDuLieuKetNoi: LLTPMCDT, nguoiDaXuLy: userId);
            await _nguoiXuLyHoSoService.SetNguoiDangXuLyAsNguoiDaXuLy(hoSo.Id);
            return (Result)Result.Success();
        }
        else
        {
            data.toKhai.fileHoSo = data.toKhai.fileHoSo?.Select(x => new FileHoSoLGSP()
            {
                tenLoaiFile = x.tenLoaiFile,
                tenFile = x.tenFile,
                noiDungFile = null,
            }).ToList();
            _logger.LogError($"{maHoSo}_{nameof(GuiLienThongBo)}_Thao tác thất bại, req: {JsonConvert.SerializeObject(data)}, res: {resultText}");
            try
            {
                PushBTPResonse responseBTP = JsonConvert.DeserializeObject<PushBTPResonse>(resultText);
                return (Result)Result.Fail(responseBTP.errorDescription);
            }
            catch (Exception ex)
            {
                return (Result)Result.Fail("Thao tác thất bại");
            }
        }
    }

    private static string GetMaDiaBan(string maDiaBan)
    {
        try
        {
            if (!string.IsNullOrEmpty(maDiaBan))
            {
                var diaBanList = maDiaBan.Split(".").ToList();
                if(diaBanList.Count > 1)
                {
                    return diaBanList[diaBanList.Count - 1];
                }
                return maDiaBan;
            }
            return maDiaBan;
        } catch (Exception ex)
        {
            return maDiaBan;
        }
    }

    public DataLGSP ConvertFromEform2LGSP(DataEform hosoObj)
    {
        DataLGSP data = new DataLGSP();
        data.authKey = _settings.AuthKeyLLTP;
        data.maTinh = _settings.MaTinh;
        data.tenTinh = _injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Ten_Tinh_Thanh");
        ToKhaiLGSP dataToKhai = new ToKhaiLGSP();
        dataToKhai.loaiPhieu = hosoObj.LoaiPhieuYeuCau.Code.Replace("So", "");
        dataToKhai.yeuCauCDNCV = (hosoObj.YeuCauXacNhanKhac.Code == "Co") ? "1" : "0";
        //dataToKhai.maMucDich = hosoObj.MucDichCapPhieu.Code;
        dataToKhai.mucDich = hosoObj.MucDichCapPhieu.Name;
        //dataToKhai.tenMucDich = hosoObj.MucDichCapPhieu.Name;
        dataToKhai.soLuongCap = hosoObj.SoLuongCapThem.Code;
        dataToKhai.nycHoTen = hosoObj.HoVaTen;
        dataToKhai.nycTenGoiKhac = hosoObj.TenGoiKhac;
        dataToKhai.nycGioiTinh = hosoObj.GioiTinh.Code;
        dataToKhai.nycTenGioiTinh = hosoObj.GioiTinh.Name;
        dataToKhai.nycTenLoaiGiayTo = hosoObj.GiayToTuyThan.Code;
        dataToKhai.nycNgaySinh = DateTime.Parse(hosoObj.NgaySinh).ToString("dd/MM/yyyy");
        dataToKhai.nycDienThoai = hosoObj.SoDienThoai;
        dataToKhai.nycEmail = hosoObj.Email?.Trim();
        dataToKhai.nycSoGiayTo = hosoObj.SoGiayTo;
        dataToKhai.nycLoaiGiayTo = hosoObj.GiayToTuyThan.Code;
        dataToKhai.nycNgayCapGiayTo = DateTime.Parse(hosoObj.NgayCapGiayTo).ToString("dd/MM/yyyy");
        dataToKhai.nycNoiCapGiayTo = hosoObj.NoiCapGiayTo.Name;
        dataToKhai.nycQuocTich = hosoObj.QuocTich.Code;
        dataToKhai.nycTenQuocTich = hosoObj.QuocTich.Name;
        dataToKhai.nycDanToc = hosoObj.DanToc.Code;
        dataToKhai.nycTenDanToc = hosoObj.DanToc.Name;
        dataToKhai.nycHoTenCha = hosoObj.HoVaTenCha;
        dataToKhai.chaNgaySinh = hosoObj.NgaySinhCha;
        dataToKhai.chaLoaiGiayTo = "";
        dataToKhai.chaSoGiayTo = "";
        dataToKhai.nycHoTenMe = hosoObj.HoVaTenMe;
        dataToKhai.meNgaySinh = hosoObj.NgaySinhMe;
        dataToKhai.meLoaiGiayTo = "";
        dataToKhai.meSoGiayTo = "";
        dataToKhai.nycHoTenVoChong = hosoObj.HoVaTenVoChong;
        dataToKhai.voChongNgaySinh = hosoObj.NgaySinhVoChong;
        dataToKhai.voChongLoaiGiayTo = "";
        dataToKhai.voChongSoGiayTo = "";

        dataToKhai.uyQuyen = (hosoObj.YeuCauXacNhanKhac.Code == "UyQuyen") ? "1" : "0";
        if (dataToKhai.uyQuyen == "1")
        {
            dataToKhai.uyQuyenHoTen = hosoObj.nycHoVaTen;
            dataToKhai.nuqTenGoiKhac = "";
            dataToKhai.nuqGioiTinh = hosoObj.nycGioiTinh.Code;
            dataToKhai.nuqNgaySinh = DateTime.Parse(hosoObj.nycNgaySinh).ToString("dd/MM/yyyy");
            dataToKhai.nuqTenDanToc = null;
            dataToKhai.nuqDanToc = null;
            dataToKhai.nuqTenQuocTich = null;
            dataToKhai.nuqQuocTich = null;
            dataToKhai.nuqEmail = hosoObj.nycEmail?.Trim();
            dataToKhai.nyqQuanHe = hosoObj.nycQuanHe.Code;

            dataToKhai.nuqDienThoai = hosoObj.nycSoDienThoai;
            dataToKhai.nuqLoaiGiayto = hosoObj.nycGiayToTuyThan.Code;
            dataToKhai.thongTinAnTich = hosoObj.KhaiAnTich;
            dataToKhai.nuqSoGiayTo = hosoObj.nycSoGiayTo;
            dataToKhai.nuqNgayCapGiayTo = DateTime.Parse(hosoObj.nycNgayCapGiayTo).ToString("dd/MM/yyyy");
            dataToKhai.nuqNoiCapGiayTo = hosoObj.nycNoiCapGiayTo.Name;

            DiaBanLGSP nuqThuongTruChiTiet = new DiaBanLGSP();
            if (!string.IsNullOrEmpty(hosoObj.nycNoiOHienTaiTinhThanh.maDiaBan))
            {
                nuqThuongTruChiTiet.maTinhThanh = GetMaDiaBan(hosoObj.nycNoiOHienTaiTinhThanh.maDiaBan);
                nuqThuongTruChiTiet.tenTinhThanh = hosoObj.nycNoiOHienTaiTinhThanh.tenDiaBan;
            }
            if (!string.IsNullOrEmpty(hosoObj.nycNoiOHienTaiQuanHuyen.maDiaBan))
            {
                nuqThuongTruChiTiet.maQuanHuyen = GetMaDiaBan(hosoObj.nycNoiOHienTaiQuanHuyen.maDiaBan);
                nuqThuongTruChiTiet.tenQuanHuyen = hosoObj.nycNoiOHienTaiQuanHuyen.tenDiaBan;
            }
            if (!string.IsNullOrEmpty(hosoObj.nycNoiOHienTaiXaPhuong.maDiaBan))
            {
                nuqThuongTruChiTiet.maPhuongXa = GetMaDiaBan(hosoObj.nycNoiOHienTaiXaPhuong.maDiaBan);
                nuqThuongTruChiTiet.tenPhuongXa = hosoObj.nycNoiOHienTaiXaPhuong.tenDiaBan;
            }
            if (!string.IsNullOrEmpty(hosoObj.nycNoiOHienTai))
            {
                nuqThuongTruChiTiet.dcChiTiet = hosoObj.nycNoiOHienTai;
            }
            dataToKhai.nuqThuongTruChiTiet = nuqThuongTruChiTiet;
        }

        DiaBanLGSP nycThuongTru = new DiaBanLGSP();
        if (!string.IsNullOrEmpty(hosoObj.NoiThuongTruTinhThanh.maDiaBan))
        {
            nycThuongTru.maTinhThanh = GetMaDiaBan(hosoObj.NoiThuongTruTinhThanh.maDiaBan);
            nycThuongTru.tenTinhThanh = hosoObj.NoiThuongTruTinhThanh.tenDiaBan;
        }
        if (!string.IsNullOrEmpty(hosoObj.NoiThuongTruQuanHuyen.maDiaBan))
        {
            nycThuongTru.maQuanHuyen = GetMaDiaBan(hosoObj.NoiThuongTruQuanHuyen.maDiaBan);
            nycThuongTru.tenQuanHuyen = hosoObj.NoiThuongTruQuanHuyen.tenDiaBan;
        }
        if (!string.IsNullOrEmpty(hosoObj.NoiThuongTruXaPhuong.maDiaBan))
        {
            nycThuongTru.maPhuongXa = GetMaDiaBan(hosoObj.NoiThuongTruXaPhuong.maDiaBan);
            nycThuongTru.tenPhuongXa = hosoObj.NoiThuongTruXaPhuong.tenDiaBan;
        }
        if (!string.IsNullOrEmpty(hosoObj.NoiThuongTru))
        {
            nycThuongTru.dcChiTiet = hosoObj.NoiThuongTru;
        }
        dataToKhai.nycThuongTru = nycThuongTru;

        DiaBanLGSP nycTamTru = new DiaBanLGSP();
        if (!string.IsNullOrEmpty(hosoObj.DiaChiTamTruTinhThanh.maDiaBan))
        {
            nycTamTru.maTinhThanh = GetMaDiaBan(hosoObj.DiaChiTamTruTinhThanh.maDiaBan);
            nycTamTru.tenTinhThanh = hosoObj.DiaChiTamTruTinhThanh.tenDiaBan;
        }
        if (!string.IsNullOrEmpty(hosoObj.DiaChiTamTruQuanHuyen.maDiaBan))
        {
            nycTamTru.maQuanHuyen = GetMaDiaBan(hosoObj.DiaChiTamTruQuanHuyen.maDiaBan);
            nycTamTru.tenQuanHuyen = hosoObj.DiaChiTamTruQuanHuyen.tenDiaBan;
        }
        if (!string.IsNullOrEmpty(hosoObj.DiaChiTamTruXaPhuong.maDiaBan))
        {
            nycTamTru.maPhuongXa = GetMaDiaBan(hosoObj.DiaChiTamTruXaPhuong.maDiaBan);
            nycTamTru.tenPhuongXa = hosoObj.DiaChiTamTruXaPhuong.tenDiaBan;
        }
        if (!string.IsNullOrEmpty(hosoObj.DiaChiTamTru))
        {
            nycTamTru.dcChiTiet = hosoObj.DiaChiTamTru;
        }
        dataToKhai.nycTamTru = nycTamTru;

        DiaBanLGSP nycNoiSinh = new DiaBanLGSP();
        if ((!hosoObj.NoiSinhNuocNgoai))
        {
            dataToKhai.nycNoiSinhNuocNgoai = "1";
            nycNoiSinh.maTinhThanh = hosoObj.NoiSinh.maDiaBan;
            nycNoiSinh.tenTinhThanh = hosoObj.NoiSinh.tenDiaBan;
        }
        else
        {
            dataToKhai.nycNoiSinhNuocNgoai = "2";
            nycNoiSinh.dcChiTiet = hosoObj.NoiSinhNuocNgoaiChiTiet;
        }
        dataToKhai.nycNoiSinh = nycNoiSinh;


        dataToKhai.nycCuTru = new List<NycCuTruLGSP>();
        dataToKhai.nycCuTru.Clear();
        if (hosoObj.QuaTrinhCuTru != null && hosoObj.QuaTrinhCuTru.Count > 0)
        {
            foreach (QuaTrinhCuTruEform quaTrinhCuTru in hosoObj.QuaTrinhCuTru)
            {
                NycCuTruLGSP dataCuTru = new NycCuTruLGSP()
                {
                    tuNgay = quaTrinhCuTru.TuNam,
                    denNgay = quaTrinhCuTru.DenNam,
                    noiCuTru = quaTrinhCuTru.NoiThuongTru,
                    ngheNghiep = quaTrinhCuTru.NgheNghiep,
                    noiLamViec = quaTrinhCuTru.NoiLamViec
                };
                dataToKhai.nycCuTru.Add(dataCuTru);
            }
        }
        dataToKhai.fileHoSo = new List<FileHoSoLGSP>();
        dataToKhai.fileHoSo.Clear();

        data.toKhai = dataToKhai;
        if (data.toKhai.nycQuocTich != null && data.toKhai.nycQuocTich == "3106")
        {
            data.toKhai.nycQuocTich = "VN";
        }
        if (data.toKhai.nycGioiTinh != null && data.toKhai.nycGioiTinh == "0")
        {
            data.toKhai.nycGioiTinh = "2";
        }
        if (data.toKhai.nuqGioiTinh != null && data.toKhai.nuqGioiTinh == "0")
        {
            data.toKhai.nuqGioiTinh = "2";
        }
        if (data.toKhai.nycDanToc != null && data.toKhai.nycDanToc == "55305")
        {
            data.toKhai.nycDanToc = "01";
        }
        return data;
    }

    public async Task<object> SendAsync(string maHoSo, string eFormData)
    {
        var hoSo = await _hoSoRepository.GetBySpecAsync(new GetHoSoByMaHoSoSpec(maHoSo));
        if (hoSo == null)
        {
            throw new NotFoundException("Không tìm thấy hồ sơ có mã: " + maHoSo);
        }
        Eform eformDataObj = JsonConvert.DeserializeObject<Eform>(eFormData);
        DeclarationForm declarationWsForm = new DeclarationForm();
        declarationWsForm.agencyRequestId = "-1";
        try
        {
            declarationWsForm.birthDateStr = DateTime.Parse(eformDataObj.data.NgaySinh).ToString("dd/MM/yyyy");
        }
        catch
        {
            declarationWsForm.birthDateStr = "";
        }
        declarationWsForm.birthPlace = eformDataObj.data.NoiSinh;

        try
        {
            declarationWsForm.dadDob = eformDataObj.data.NgaySinhCha;
        }
        catch
        {
            declarationWsForm.dadDob = "";
        }
        declarationWsForm.dadName = eformDataObj.data.HoVaTenCha;
        declarationWsForm.declareDate = hoSo.NgayTiepNhan?.ToString("dd/MM/yyyy");
        declarationWsForm.declareTypeId = 3846;
        //declarationWsForm.decStatusId = 3;//Trang thai So tu phap da tiep nhan
        //declarationWsForm.decStatusName = "STP đã tiếp nhận";//Tên trạng thái
        //Nhan Ket qua qua Buu dien
        declarationWsForm.delivery = 0;
        declarationWsForm.deliveryAddress = string.Empty;
        declarationWsForm.deliveryDistrict = 28;

        //declarationWsForm.email = SharepointCommonFunction.GetNodeValue(xDoc, "email");
        declarationWsForm.ethnicId = eformDataObj.data.DanToc.Code;
        if (eformDataObj.data.LoaiPhieuYeuCau.Code.Contains("2"))
            declarationWsForm.formType = "2";
        else
            declarationWsForm.formType = "1";
        declarationWsForm.fullName = eformDataObj.data.HoVaTen;
        declarationWsForm.otherName = eformDataObj.data.TenGoiKhac;
        declarationWsForm.genderId = eformDataObj.data.GioiTinh.Code;

        declarationWsForm.identifyNo = eformDataObj.data.SoGiayTo;
        try
        {
            declarationWsForm.idIssueDate = DateTime.Parse(eformDataObj.data.NgayCapGiayTo).ToString("dd/MM/yyyy");
        }
        catch
        {
            declarationWsForm.idIssueDate = "";
        }

        declarationWsForm.idIssuePlace = eformDataObj.data.NoiCapGiayTo.Name;
        //!!!!!eformDataObj.data.GiayToTuyThan
        try
        {
            declarationWsForm.idTypeId = eformDataObj.data.GiayToTuyThan?.Code;
        }
        catch { }

        declarationWsForm.isBanPosition = 0;
        // ID So tu phap Thanh hoa
        declarationWsForm.ministryJusticeId = _settings.IdCoQuanSoTuPhapHeThongBo;

        try
        {
            declarationWsForm.momDob = eformDataObj.data.NgaySinhMe;
        }
        catch
        {
            declarationWsForm.momDob = "";
        }

        declarationWsForm.momName = eformDataObj.data.HoVaTenMe;
        declarationWsForm.nationalityId = int.Parse(eformDataObj.data.QuocTich.Code);
        declarationWsForm.objectRequestId = 72;

        try
        {
            declarationWsForm.partnerDob = eformDataObj.data.NgaySinhVoChong;
        }
        catch
        {
            declarationWsForm.partnerDob = "";
        }
        declarationWsForm.partnerName = eformDataObj.data.HoVaTenVoChong;
        declarationWsForm.phone = eformDataObj.data.DienThoai;
        if (!string.IsNullOrEmpty(eformDataObj.data.Email))
        {
            declarationWsForm.email = eformDataObj.data.Email;
        }
        //declarationWsForm.receiveDate = SharepointCommonFunction.GetNodeValue(xDoc, "receiveDate");
        declarationWsForm.regionRequestId = _settings.IdDanhMucHanhChinhTinh;
        declarationWsForm.requestQty = 1;
        int soLuongPhieuCapThem = 1;
        try
        {
            soLuongPhieuCapThem = int.Parse(eformDataObj.data.SoLuongCapThem.Code);
        }
        catch { }
        declarationWsForm.requestQtyAdd = soLuongPhieuCapThem.ToString();
        declarationWsForm.reRegionId = "-1";
        declarationWsForm.residence = eformDataObj.data.DiaChiThuongTru ?? eformDataObj.data.NoiOHienTai;
        declarationWsForm.residenceTemporary = eformDataObj.data.DiaChiTamTru ?? eformDataObj.data.NoiOHienTai;
        declarationWsForm.rtRegionId = "-1";
        declarationWsForm.purpose = eformDataObj.data.MucDichCapPhieu.Name;
        declarationWsForm.declarationPortalID = "2201140828907";
        declarationWsForm.giveProfileDistrict = _settings.IdDanhMucHanhChinhTinh.ToString();
        MandatorForm mandatorForm = new MandatorForm();
        mandatorForm.fullName = declarationWsForm.fullName;
        mandatorForm.genderId = declarationWsForm.genderId;
        mandatorForm.birthDateStr = declarationWsForm.birthDateStr;
        mandatorForm.birthPlaceId = "-1";
        mandatorForm.residence = declarationWsForm.residence;
        mandatorForm.regionId = "-1";
        mandatorForm.idTypeId = declarationWsForm.idTypeId;
        mandatorForm.identifyNo = declarationWsForm.identifyNo;
        mandatorForm.idIssueDate = declarationWsForm.idIssueDate;
        mandatorForm.idIssuePlace = declarationWsForm.idIssuePlace;
        mandatorForm.mandatorRelation = "";
        mandatorForm.mandatorDate = "";

        List<ResidenceForm> listResidenceForm = new List<ResidenceForm>();
        if (eformDataObj.data.QuaTrinhCuTru != null && eformDataObj.data.QuaTrinhCuTru.Count > 0)
        {
            foreach (QuaTrinhCuTru cuTruItem in eformDataObj.data.QuaTrinhCuTru)
            {
                ResidenceForm residen = new ResidenceForm();
                residen.fromDateStr = cuTruItem.TuNam;
                residen.toDateStr = cuTruItem.DenNam;
                residen.jobName = cuTruItem.NgheNghiep;
                residen.residencePlace = cuTruItem.NoiThuongTru;
                listResidenceForm.Add(residen);
            }
        }
        LyLichTuPhapForm lyLichTuPhapForm = new LyLichTuPhapForm();
        lyLichTuPhapForm.declarationForm = declarationWsForm;
        lyLichTuPhapForm.residenceForm = listResidenceForm;
        lyLichTuPhapForm.mandatorForm = mandatorForm;
        string mahoso = hoSo.MaHoSo;
        string[] mahosoArr = mahoso.Split('-');
        lyLichTuPhapForm.idReceivedDec = mahosoArr[1] + mahosoArr[2];
        lyLichTuPhapForm.dateReceivedDec = hoSo.NgayTiepNhan?.ToString("dd/MM/yyyy");
        lyLichTuPhapForm.datePromissoryDec = hoSo.NgayHenTra?.ToString("dd/MM/yyyy");
        lyLichTuPhapForm.idMoneyReceipt = "0";

        using HttpClient client = new HttpClient();
        if (_settings.Token != null && string.IsNullOrEmpty(_settings.Token.StaticToken))
        {
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _settings.Token.StaticToken);
        }
        else if (_settings.Token != null && !string.IsNullOrEmpty(_settings.Token.DynamicToken.Url) && !string.IsNullOrEmpty(_settings.Token.DynamicToken.Password) && !string.IsNullOrEmpty(_settings.Token.DynamicToken.User))
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Common.GetDynamicToken(new Application.Common.KetNoi.Classes.DynamicTokenSettings()
            {
                Url = _settings.Token.DynamicToken.Url,
                Password = _settings.Token.DynamicToken.Password,
                User = _settings.Token.DynamicToken.User,
            }));
        }
        client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

        HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, _settings.UrlAPIDVC);
        var content = JsonConvert.SerializeObject(lyLichTuPhapForm);
        httpRequestMessage.Content = new StringContent(content, new System.Net.Http.Headers.MediaTypeHeaderValue("application/json"));

        try
        {
            var res = await client.SendAsync(httpRequestMessage);
            if (res.IsSuccessStatusCode)
            {
                var stringContent = await res.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject(stringContent);
                hoSo.UpdateLoaiDuLieuKetNoi("LTTP");
                await _hoSoRepository.UpdateAsync(hoSo);
                return jsonData;
            }
            _logger.LogError(JsonConvert.SerializeObject(res));
            return new GuiLienThongLLTPResponse()
            {
                status = res.StatusCode.ToString(),
                description = res.Content.ToString(),
                id = ""
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString(), ex);
            throw new Exception(ex.ToString());
        }
    }
}
