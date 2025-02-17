using Google.Api.Gax.ResourceNames;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Org.BouncyCastle.Ocsp;
using System;
using System.Net.Http.Headers;
using System.Text;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.ServiceLogger;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Domain.Portal;
using TD.DichVuCongApi.Infrastructure.Auth;
using TD.DichVuCongApi.Infrastructure.Minio;
using static TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS.LienThongILISParams;
using static TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS.LienThongILISParams.TiepNhanHoSoRequest;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.LienThongILIS;
public class LienThongILISService : ILienThongILISService
{
    private readonly IRepository<ChungTuThue> _chungTuThue;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IRepository<ThongBaoThue> _thongBaoThue;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMinioService _minioService;
    private readonly IServiceLogger _serviceLogger;
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly string _user;
    private readonly string _pass;
    private readonly string _getTokenUrl;
    private readonly string _sendDataUrl;
    private readonly string _clientId;
    private readonly string _clientSecret;
    private readonly LienThongILISSettings _lienThongILISSettings;
    
    private readonly bool _hasValidConfig = false;

    public LienThongILISService(
        IOptions<LienThongILISSettings> options,
        IRepository<ChungTuThue> chungTuThue,
        IRepository<ThongBaoThue> thongBaoThue,
        IRepository<HoSo> repositoryHoSo,
        IDapperRepository dapperRepository,
        IMinioService minioService,
        IJobService jobService,
        IServiceLogger serviceLogger,
        IReadRepository<NgayNghi> repositoryNgayNghi
        )
    {
        LienThongILISSettings lienThongILISSettings = options.Value;
        _lienThongILISSettings = lienThongILISSettings;
        _user = lienThongILISSettings.user;
        _pass = lienThongILISSettings.pass;
        _getTokenUrl = lienThongILISSettings.urlGetToken;
        _sendDataUrl = lienThongILISSettings.urlSendData;
        _clientId = lienThongILISSettings.clientId;
        _clientSecret = lienThongILISSettings.clientSecret;
        _dapperRepository = dapperRepository;
        _minioService = minioService;
        _serviceLogger = serviceLogger;
        _repositoryHoSo = repositoryHoSo;
        _repositoryNgayNghi = repositoryNgayNghi;

        if (!string.IsNullOrEmpty(_user) && !string.IsNullOrEmpty(_pass) && !string.IsNullOrEmpty(_getTokenUrl) && !string.IsNullOrEmpty(_sendDataUrl) && !string.IsNullOrEmpty(_clientId) && !string.IsNullOrEmpty(_clientSecret))
        {
            _hasValidConfig = true;
        }

        _chungTuThue = chungTuThue;
        _thongBaoThue = thongBaoThue;
    }
    public string GetCodeGet()
    {
        return _lienThongILISSettings.codeGet;
    }
    public void CheckConfig()
    {
        if (!_hasValidConfig)
        {
            throw new ArgumentException("Hệ thống chưa cấu hình đầy đủ thông tin, Vui lòng liên hệ quản trị hệ thống");
        }

    }
    public async Task Log(ServiceLoggerRequestParams req)
    {
        await _serviceLogger.LogAsync<LienThongILISService>(req);
    }


    public async Task<GetTokenResponse> GetToken(CancellationToken cancellationToken = default)
    {
        CheckConfig();
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Post, _getTokenUrl);

            // Chuẩn bị dữ liệu dưới dạng x-www-form-urlencoded
            var reqContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("client_id", _clientId),
                new KeyValuePair<string, string>("client_secret", _clientSecret),
                new KeyValuePair<string, string>("username", _user),
                new KeyValuePair<string, string>("password", _pass),
                new KeyValuePair<string, string>("grant_type", "password")
            });

            httpRequest.Content = reqContent;

            var res = await httpClient.SendAsync(httpRequest, cancellationToken);
            var stringContent = await res.Content.ReadAsStringAsync();
            Console.WriteLine(await reqContent.ReadAsStringAsync()); // In nội dung gửi đi
            var jsonData = JsonConvert.DeserializeObject<LienThongILISParams.GetTokenResponse>(stringContent);
            return jsonData;
        }
    }

    public async Task<TiepNhanHoSoResponse> SendData(HoSo hoSo)
    {
        CheckConfig();

        string xaPhuongDiaBan = hoSo.XaPhuongDiaBan;
        string quanHuyenDiaBan = hoSo.QuanHuyenDiaBan;
        string tinhThanhDiaBan = hoSo.TinhThanhDiaBan;
        var xaPhuongDiaBanList = xaPhuongDiaBan?.Split(".").ToList();

        if (string.IsNullOrEmpty(xaPhuongDiaBan) || string.IsNullOrEmpty(quanHuyenDiaBan) || string.IsNullOrEmpty(tinhThanhDiaBan) || xaPhuongDiaBanList == null)
        {
            throw new Exception("Thiếu thông tin địa bàn hồ sơ, vui lòng kiểm tra lại");
        }
        if (xaPhuongDiaBanList != null)
        {
            if (xaPhuongDiaBanList.Count != 3)
            {
                throw new Exception("Thông tin địa bàn hồ sơ không hợp lệ");
            }
            if(xaPhuongDiaBanList.Count == 3)
            {
                if (xaPhuongDiaBanList[0] != tinhThanhDiaBan || xaPhuongDiaBanList[0] + "." + xaPhuongDiaBanList[1] != quanHuyenDiaBan)
                {
                    throw new Exception("Thông tin địa bàn hồ sơ không hợp lệ");
                }
            }
        }

        string tinhId = xaPhuongDiaBanList[0];
        string huyenId = xaPhuongDiaBanList[1];
        string xaId = xaPhuongDiaBanList[2];
        var sqlGetThanhPhanHoSos = $@"
            SELECT
            {nameof(ThanhPhanHoSo.DinhKem)},
            {nameof(ThanhPhanHoSo.Ten)},
            {nameof(ThanhPhanHoSo.SoBanChinh)},
            {nameof(ThanhPhanHoSo.SoBanSao)}
            FROM {SchemaNames.Business}.{TableNames.ThanhPhanHoSos}
            WHERE {nameof(ThanhPhanHoSo.HoSo)} = @MaHoSo AND {nameof(ThanhPhanHoSo.DeletedOn)} is null";
        string sqlTruongHopThuTuc =
            $@"SELECT TOP(1)
            thtt.{nameof(TruongHopThuTuc.Ma)} as {nameof(TruongHopThuTucSelect.MaQuyTrinh)},
            CONCAT(thtt.{nameof(TruongHopThuTuc.Ten)}, '_', tt.{nameof(ThuTuc.TenTTHC)}) as {nameof(TruongHopThuTucSelect.TenQuyTrinh)}
            FROM {SchemaNames.Business}.{TableNames.TruongHopThuTucs} thtt
            INNER JOIN {SchemaNames.Catalog}.{TableNames.ThuTucs} tt ON thtt.{nameof(TruongHopThuTuc.ThuTucId)} = tt.{nameof(ThuTuc.MaTTHC)}
            WHERE thtt.{nameof(TruongHopThuTuc.DeletedOn)} IS NULL AND tt.{nameof(ThuTuc.DeletedOn)} IS NULL AND {nameof(TruongHopThuTuc.Ma)} = @MaTruongHop ";

        var thanhPhanHoSos = await _dapperRepository.QueryAsync<ThanhPhanHoSoSelect>(sqlGetThanhPhanHoSos, new
        {
            MaHoSo = hoSo.MaHoSo
        });
        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTucSelect>(sqlTruongHopThuTuc, new
        {
            MaTruongHop = hoSo.MaTruongHop
        });
        List<ThongTinGiayToDinhKemData> thongTinGiayToDinhKems = new List<ThongTinGiayToDinhKemData>();
        if (thanhPhanHoSos != null && thanhPhanHoSos.Count > 0)
        {
            foreach (var thanhPhanHoSo in thanhPhanHoSos)
            {
                ThongTinGiayToDinhKemData thongTinGiayToDinhKem = new ThongTinGiayToDinhKemData();
                if (!string.IsNullOrEmpty(thanhPhanHoSo.DinhKem))
                {
                    var dinhKemArr = thanhPhanHoSo.DinhKem.Split(new[] { "##" }, StringSplitOptions.RemoveEmptyEntries);
                    foreach (string dinhKemstr in dinhKemArr)
                    {
                        Base64DataFile dinhKem = await _minioService.GetFileByKeyAsBase64Async(null, dinhKemstr);
                        thongTinGiayToDinhKem.TenGiayTo = thanhPhanHoSo.Ten;
                        thongTinGiayToDinhKem.SoBanChinh = thanhPhanHoSo.SoBanChinh;
                        thongTinGiayToDinhKem.SoBanSao = thanhPhanHoSo.SoBanSao;
                        thongTinGiayToDinhKem.TapTin = new ThongTinTapTinData(Path.GetFileName(dinhKem.Name), dinhKem.Base64);
                        thongTinGiayToDinhKems.Add(thongTinGiayToDinhKem);
                    }
                }
            }
        }
        ThongTinNguoiNopData thongTinNguoiNop = new ThongTinNguoiNopData(hoSo.ChuHoSo, hoSo.SoGiayToChuHoSo ?? string.Empty, hoSo.DiaChiChuHoSo ?? string.Empty, hoSo.SoDienThoaiChuHoSo ?? string.Empty, hoSo.EmailChuHoSo ?? string.Empty);
        ThongTinQuyTrinhData thongTinQuyTrinh = new ThongTinQuyTrinhData(truongHopThuTuc.MaQuyTrinh, truongHopThuTuc.TenQuyTrinh);
        TiepNhanHoSoRequest tiepNhanHoSoRequest = new TiepNhanHoSoRequest();
        tiepNhanHoSoRequest.SoBienNhan = hoSo.MaHoSo;
        tiepNhanHoSoRequest.NguoiTiepNhan = hoSo.NguoiNhanHoSo;
        tiepNhanHoSoRequest.NgayHenTra = hoSo.NgayHenTra;
        tiepNhanHoSoRequest.NgayTiepNhan = hoSo.NgayTiepNhan;
        tiepNhanHoSoRequest.TinhId = tinhId;
        tiepNhanHoSoRequest.HuyenId = huyenId;
        tiepNhanHoSoRequest.XaId = xaId;
        tiepNhanHoSoRequest.ThongTinNguoiNopDon = thongTinNguoiNop;
        tiepNhanHoSoRequest.ThongTinQuyTrinh = thongTinQuyTrinh;
        tiepNhanHoSoRequest.DanhSachGiayToDinhKem = thongTinGiayToDinhKems;
        var tokenData = await GetToken();
        using (var httpClient = new HttpClient())
        {
            try
            {
                // Tạo nội dung yêu cầu với "Content-Type" là "application/json"
                string strContent = JsonConvert.SerializeObject(tiepNhanHoSoRequest);
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenData.access_token);
                HttpContent content = new StringContent(strContent, Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, _sendDataUrl);

                request.Content = content; // Đặt nội dung vào yêu cầu

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<TiepNhanHoSoResponse>(data);
                bool succeed = jsonData.data == 1 || data.ToLower().Contains("đã tồn tại");
                if (!succeed)
                {
                    tiepNhanHoSoRequest.DanhSachGiayToDinhKem = tiepNhanHoSoRequest.DanhSachGiayToDinhKem?.Select(x => new ThongTinGiayToDinhKemData()
                    {
                        SoBanChinh = x.SoBanChinh,
                        SoBanSao = x.SoBanSao,
                        TapTin = null,
                        TenGiayTo = x.TenGiayTo
                    }).ToList();
                    await _serviceLogger.LogAsync<LienThongILISService>(
                    new ServiceLoggerRequestParams()
                    {
                        MaHoSo = hoSo.MaHoSo,
                        isSucceed = succeed,
                        Receiver = null,
                        Sender = null,
                        Request = JsonConvert.SerializeObject(tiepNhanHoSoRequest),
                        Response = data,
                        Service = ServiceLoggerServiceType.ILIS,
                    });
                }
                return jsonData;
            }
            catch (Exception ex)
            {
                tiepNhanHoSoRequest.DanhSachGiayToDinhKem = tiepNhanHoSoRequest.DanhSachGiayToDinhKem?.Select(x => new ThongTinGiayToDinhKemData()
                {
                    SoBanChinh = x.SoBanChinh,
                    SoBanSao = x.SoBanSao,
                    TapTin = null,
                    TenGiayTo = x.TenGiayTo
                }).ToList();
                await _serviceLogger.LogAsync<LienThongILISService>(
                    new ServiceLoggerRequestParams()
                    {
                        MaHoSo = hoSo.MaHoSo,
                        isSucceed = false,
                        Receiver = null,
                        Sender = null,
                        Request = JsonConvert.SerializeObject(tiepNhanHoSoRequest),
                        Response = JsonConvert.SerializeObject(ex),
                        Service = ServiceLoggerServiceType.ILIS,
                    });
                throw new Exception("Có lỗi xảy ra khi gửi ILIS, vui lòng thử lại sau");
            }
        }
    }
    public async Task CapNhatKetQua()
    {
        CheckConfig();
    }

    public async Task<string> DownloadFile(string fileUrl)
    {
        using (HttpClient client = new HttpClient())
        {
            try
            {
                string fileName = Path.GetFileName(fileUrl);
                // Tải xuống file dưới dạng byte array
                byte[] fileBytes = await client.GetByteArrayAsync(fileUrl);

                // Chuyển đổi byte array thành base64 string
                string base64String = Convert.ToBase64String(fileBytes);
                var dinhKem = await _minioService.UploadFileAsBase64Async(base64String, fileName, null, "ThongBaoThue");
                return dinhKem;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return string.Empty;
            }
        }
    }

    private class ThanhPhanHoSoSelect
    {
        public string? DinhKem { get; set; }
        public string? Ten { get; set; }
        public int? SoBanChinh { get; set; }
        public int? SoBanSao { get; set; }
    }
    private class TruongHopThuTucSelect
    {
        public string MaQuyTrinh { get; set; }
        public string TenQuyTrinh { get; set; }
    }
}
