using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.DvcPayment;
using Mapster;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;
using System.Net.Sockets;
using System.Net;
using System.Security.Cryptography;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
using DocumentFormat.OpenXml.Spreadsheet;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
using Microsoft.Extensions.Configuration;
using System.Configuration;

namespace TD.DichVuCongApi.Infrastructure.DvcPayment;
public class DvcPaymentService : IDvcPaymentServices
{
    private DvcPaymentSettings _settings;
    private IConfiguration _configuration;
    public DvcPaymentService(IOptions<DvcPaymentSettings> settings, IConfiguration configuration)
    {
        _settings = settings.Value;
        _configuration = configuration;
    }

    public DvcPaymentSettings Get()
    {
        return _settings;
    }
    public async Task<BienLaiDvcPaymentResponse> GetBienLaiDvcPayment(string maThamChieu, DateTime thoiGianGD, string? existUrl = null)
    {
        string filepath = _configuration.GetValue<string>("FileConfig:FileUploadLocalPath");
        BienLaiDvcPaymentRequest bienLaiDvcPaymentRequest = new BienLaiDvcPaymentRequest();
        BienLaiDvcPaymentResponse objResDvcqgMessage = new BienLaiDvcPaymentResponse();
        if (!string.IsNullOrEmpty(existUrl) && File.Exists(existUrl))
        {
            objResDvcqgMessage.UrlBienLai = existUrl;
            return objResDvcqgMessage;
        }
        bienLaiDvcPaymentRequest.MaDoiTac = _settings.InitPayMentParnerCode;
        bienLaiDvcPaymentRequest.MaThamChieu = maThamChieu;
        bienLaiDvcPaymentRequest.ThoiGianGD = thoiGianGD.ToString("yyyyMMddhhmmss");
        //loaiBanTin|PhienBan|MaDoiTac|MaThamChieu|ThoiGianGD|MaBiMat
        string maXacThucStr = $"{bienLaiDvcPaymentRequest.LoaiBanTin}|{bienLaiDvcPaymentRequest.PhienBan}|{bienLaiDvcPaymentRequest.MaDoiTac}" +
            $"|{bienLaiDvcPaymentRequest.MaThamChieu}|{bienLaiDvcPaymentRequest.ThoiGianGD}|{_settings.InitPaymentSecretKey}";
        bienLaiDvcPaymentRequest.MaXacThuc = CreateMaXacThuc(maXacThucStr);
        using (HttpClient httpClient = new HttpClient())
        {
            if (!string.IsNullOrEmpty(_settings.AccessToken))
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _settings.AccessToken);
            string textContent = JsonConvert.SerializeObject(bienLaiDvcPaymentRequest);
            var content = new StringContent(textContent, Encoding.UTF8, "application/json");
            var res = await httpClient.PostAsync(_settings.InitReceiptUrl, content);
            var resDvcqg = await res.Content.ReadAsStreamAsync();
            if (!string.IsNullOrEmpty(_settings.ReceiptFolder))
            {
                string dir = Path.Combine(!string.IsNullOrEmpty(filepath) ? filepath : AppDomain.CurrentDomain.BaseDirectory+ "Files", _settings.ReceiptFolder);
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                if (resDvcqg.Length > 0)
                {
                    string fileName = maThamChieu + "_" + DateTime.UtcNow.ToString("yyyyMMddhhmmss") + ".pdf";
                    string url = Path.Combine("Files", _settings.ReceiptFolder, fileName);
                    string filePath = Path.Combine(dir, fileName);
                    using(Stream fileStream = File.Create(filePath))
                    {
                        await resDvcqg.CopyToAsync(fileStream);
                        objResDvcqgMessage.UrlBienLai = $"/{url}";
                    }
                }
            }

            return objResDvcqgMessage;
        }
    }

    public async Task<InitDvcPaymentResponse> InitPayment(YeuCauThanhToanDetailDto yeuCauThanhToanDetail)
    {
        try
        {
            string maDvc = yeuCauThanhToanDetail.MaTTHC + ".01";
            string thongTinGiaoDich = $"THANH TOAN HO SO {yeuCauThanhToanDetail.MaHoSo}";
            PhiLePhiDetail phiLePhiDetail = new PhiLePhiDetail("Phi", maDvc, thongTinGiaoDich, yeuCauThanhToanDetail.SoTien.ToString());
            DSKhoanNopDetail dSKhoanNop = new DSKhoanNopDetail(thongTinGiaoDich, yeuCauThanhToanDetail.SoTien.ToString());
            string tenTTHC = string.Empty;
            if(!string.IsNullOrEmpty(yeuCauThanhToanDetail.TenTTHC))
            {
                tenTTHC = yeuCauThanhToanDetail.TenTTHC.Length > 250 ? yeuCauThanhToanDetail.TenTTHC.Substring(0, 200) + "..." : yeuCauThanhToanDetail.TenTTHC;
            }

            var now = DateTime.Now;
            string nowSpan = now.ToString("yyyyMMddhhmmss");

            InitDvcPaymentRequest initDvcPaymentRequest = new InitDvcPaymentRequest();
            initDvcPaymentRequest.MaDoiTac = _settings.InitPayMentParnerCode;
            initDvcPaymentRequest.SoTien = yeuCauThanhToanDetail.SoTien.ToString();
            initDvcPaymentRequest.MaThamChieu = CreateMaThamChieu("dvc" + yeuCauThanhToanDetail.MaHoSo, nowSpan);
            initDvcPaymentRequest.Ip = GetLocalIPAddress();
            initDvcPaymentRequest.ThoiGianGD = now.ToString("yyyyMMddhhmmss");
            initDvcPaymentRequest.ThongTinGiaoDich = thongTinGiaoDich;
            initDvcPaymentRequest.ThongTinBienLai.MaTTHC = yeuCauThanhToanDetail.MaTTHC ?? string.Empty;
            initDvcPaymentRequest.ThongTinBienLai.TenTTHC = tenTTHC;
            initDvcPaymentRequest.ThongTinBienLai.MaDVC = maDvc ?? string.Empty;
            initDvcPaymentRequest.ThongTinBienLai.TenDVC = tenTTHC;
            initDvcPaymentRequest.ThongTinBienLai.MaDonVi = yeuCauThanhToanDetail.MaDinhDanh ?? string.Empty;
            initDvcPaymentRequest.ThongTinBienLai.TenDonVi = yeuCauThanhToanDetail.TenDonViThucHienHoSo ?? string.Empty;
            //initDvcPaymentRequest.ThongTinBienLai.TenDonVi = yeuCauThanhToanDetail.TenDonViThucHienHoSo ?? string.Empty;
            initDvcPaymentRequest.ThongTinBienLai.MaHoSo = yeuCauThanhToanDetail.MaHoSo ?? string.Empty;
            initDvcPaymentRequest.ThongTinBienLai.TenTKThuHuong = yeuCauThanhToanDetail.TenTaiKhoanThuHuong ?? string.Empty;
            initDvcPaymentRequest.ThongTinBienLai.TKThuHuong = yeuCauThanhToanDetail.TaiKhoanThuHuong ?? string.Empty;
            initDvcPaymentRequest.ThongTinBienLai.MaNHThuHuong = yeuCauThanhToanDetail.MaNganHang ?? string.Empty;
            initDvcPaymentRequest.ThongTinBienLai.HoTenNguoiNop = yeuCauThanhToanDetail.NguoiNopTienBienLai ?? string.Empty;
            initDvcPaymentRequest.ThongTinBienLai.SoCMNDNguoiNop = yeuCauThanhToanDetail.SoGiayToChuHoSo ?? "000000000";
            initDvcPaymentRequest.ThongTinBienLai.DiaChiNguoiNop = yeuCauThanhToanDetail.DiaChiBienLai ?? string.Empty;
            initDvcPaymentRequest.ThongTinBienLai.NoiDungThanhToan = thongTinGiaoDich;
            initDvcPaymentRequest.ThongTinBienLai.PhiLePhi.Add(phiLePhiDetail);
            initDvcPaymentRequest.ThongTinBienLai.DSKhoanNop.Add(dSKhoanNop);
            var maXacThucStr = $"{initDvcPaymentRequest.LoaiBanTin}|{initDvcPaymentRequest.PhienBan}" +
                $"|{initDvcPaymentRequest.MaDoiTac}|{initDvcPaymentRequest.MaThamChieu}|{initDvcPaymentRequest.SoTien}" +
                $"|{initDvcPaymentRequest.LoaiHinhThanhToan}|{initDvcPaymentRequest.MaKenhThanhToan}|{initDvcPaymentRequest.MaThietBi}" +
                $"|{initDvcPaymentRequest.NgonNgu}|{initDvcPaymentRequest.MaTienTe}|{initDvcPaymentRequest.MaNganHang}" +
                $"|{initDvcPaymentRequest.ThongTinGiaoDich}|{initDvcPaymentRequest.ThoiGianGD}" +
                $"|{initDvcPaymentRequest.Ip}|{_settings.InitPaymentSecretKey}";
            initDvcPaymentRequest.MaXacThuc = CreateMaXacThuc(maXacThucStr);
            using(HttpClient httpClient = new HttpClient())
            {
                if(!string.IsNullOrEmpty(_settings.AccessToken)) httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _settings.AccessToken);
                string textContent = JsonConvert.SerializeObject(initDvcPaymentRequest);
                var content = new StringContent(textContent, Encoding.UTF8, "application/json");
                var res = await httpClient.PostAsync(_settings.InitUrl, content);
                string resDvcqg = await res.Content.ReadAsStringAsync();
                InitDvcPaymentResponseMessage objResDvcqgMessage = JsonConvert.DeserializeObject<InitDvcPaymentResponseMessage>(resDvcqg);
                InitDvcPaymentResponse req = new InitDvcPaymentResponse();
                req.ThongTinGiaoDich = initDvcPaymentRequest.ThongTinGiaoDich;
                req.MaThamChieu = initDvcPaymentRequest.MaThamChieu;
                req.HoSo = initDvcPaymentRequest.ThongTinBienLai.MaHoSo;
                req.TenTKThuHuong = initDvcPaymentRequest.ThongTinBienLai.TenTKThuHuong;
                req.TKThuHuong = initDvcPaymentRequest.ThongTinBienLai.TKThuHuong;
                req.MaDonVi = yeuCauThanhToanDetail.MaDonViThucHienHoSo;
                req.TenDonVi = initDvcPaymentRequest.ThongTinBienLai.TenDonVi;
                req.MaThuTucDVCQG = initDvcPaymentRequest.ThongTinBienLai.MaTTHC;
                req.MaDVCThuTucDVCQuocGia = initDvcPaymentRequest.ThongTinBienLai.MaDVC;
                req.TenThuTucDVCQG = initDvcPaymentRequest.ThongTinBienLai.TenTTHC;
                req.TenDVCThuTucDVCQuocGia = initDvcPaymentRequest.ThongTinBienLai.TenDVC;
                req.HoTenNguoiNop = initDvcPaymentRequest.ThongTinBienLai.HoTenNguoiNop;
                req.SoCMNDNguoiNop = initDvcPaymentRequest.ThongTinBienLai.SoCMNDNguoiNop;
                req.Ip = initDvcPaymentRequest.Ip;
                req.MaDoiTac = initDvcPaymentRequest.MaDoiTac;
                req.ThoiGianGD = now;
                req.NgayTao = now;
                req.YeuCauThanhToan = yeuCauThanhToanDetail.Ma;
                req.SoTien = yeuCauThanhToanDetail.SoTien;
                req.LoaiHinhThanhToan = yeuCauThanhToanDetail.HinhThucThanhToan;
                if (objResDvcqgMessage.error_code == "0")
                {
                    InitDvcPaymentResponse objResDvcqg = JsonConvert.DeserializeObject<InitDvcPaymentResponse>(objResDvcqgMessage.message);
                    req.TrangThai = "khoi-tao";
                    req.ThoiGianGDThanhCong = now;
                    req.UrlThanhToan = objResDvcqg.UrlThanhToan;
                }
                else{
                    req.TrangThai = "that-bai";
                }

                req.BodyKetQua = objResDvcqgMessage.message;

                return req;
            }

        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<ConfirmDvcPaymentResponse> CheckPaymentStatus(CheckPaymentStatusRequest req)
    {
        req.MaDoiTac = _settings.InitPayMentParnerCode;
        string maXacThucStr = $"{req.LoaiBanTin}|{req.PhienBan}|{req.MaDoiTac}|{req.MaThamChieu}|{req.ThoiGianGD}|{_settings.InitPaymentSecretKey}";
        req.MaXacThuc = CreateMaXacThuc(maXacThucStr);
        using (HttpClient httpClient = new HttpClient())
        {
            if (!string.IsNullOrEmpty(_settings.AccessToken)) httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _settings.AccessToken);
            string textContent = JsonConvert.SerializeObject(req);
            var content = new StringContent(textContent, Encoding.UTF8, "application/json");
            var res = await httpClient.PostAsync(_settings.CheckConfirmUrl, content);
            string resDvcqg = await res.Content.ReadAsStringAsync();
            ConfirmDvcPaymentResponse objResDvcqgMessage = JsonConvert.DeserializeObject<ConfirmDvcPaymentResponse>(resDvcqg);
            return objResDvcqgMessage;
        }

    }

    private double TotimeStamp(DateTime input)
    {
        return input.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
    }

    public string CreateMaXacThuc(string rawData)
    {
        using (SHA256 sha256Hash = SHA256.Create())
        {
            // ComputeHash - returns byte array
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

            // Convert byte array to a string
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }

            return builder.ToString();
        }
    }

    private string CreateMaThamChieu (string maHoSo ="", string sub = "")
    {
        if(string.IsNullOrEmpty(maHoSo)) return string.Empty;
        string maXacNhan = Regex.Replace(maHoSo, "\\W", string.Empty) + sub;
        return maXacNhan;
    }

    private string GetLocalIPAddress()
    {
        var host = Dns.GetHostEntry(Dns.GetHostName());
        foreach (var ip in host.AddressList)
        {
            if (ip.AddressFamily == AddressFamily.InterNetwork)
            {
                return ip.ToString();
            }
        }

        throw new Exception("No network adapters with an IPv4 address in the system!");
    }

}
