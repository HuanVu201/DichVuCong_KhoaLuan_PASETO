using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Org.BouncyCastle.Ocsp;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using TD.DichVuCongApi.Application.Common.KetNoi.BGTVT;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.DVCQG;
public class SyncDVCQGService : ISyncDVCQGService
{
    private readonly IConfiguration _configuration;
    private readonly string _urlDownloadDVC;
    private readonly ILogger<SyncDVCQGService> _logger;
    private readonly TBKM_Config _settings;
    public SyncDVCQGService(IOptions<TBKM_Config> settings, IConfiguration configuration, ILogger<SyncDVCQGService> logger)
    {
        _configuration = configuration;
        _settings = settings.Value;
        _urlDownloadDVC = configuration.GetValue<string>("FileConfig:KETNOIMOTCUAQUOCGIA_DOWNLOAD_URL");
        _logger = logger;
    }
    private ThongBaoKhuyenMaiSettings? GetSetting(string maDonVi, TBKM_Config config)
    {
        ThongBaoKhuyenMaiSettings? settingTBKMs = null;
        foreach(PropertyInfo property in typeof(TBKM_Config).GetProperties())
        {
            if (property.PropertyType == typeof(ThongBaoKhuyenMaiSettings))
            {
                var value = property.GetValue(config) as ThongBaoKhuyenMaiSettings;
                if (value != null && value.MaDonVi == maDonVi)
                {
                    settingTBKMs = value;
                }
            }
        }
        if(settingTBKMs != null)
        {
            return settingTBKMs;
        }
        return null;
    }
    public async Task DongBoDVCQG(HoSo hoSoQuaMang)
    {
        //var _settings = _configuration.GetSection("TBKM_Config");
        //if (_settings is not TBKM_Config config)
        //{
        //    throw new Exception("Can not get configuration from generic type of class SyncDVCQGService");
        //}
        var setting = GetSetting(hoSoQuaMang.DonViId, _settings);
        string url = setting.Url_ConnectApiDVC + "/KetNoiMotCuaQuocGia/DongBoTrangThaiHoSoKM";
        BoDyKetQuaThongBaoThucHienKhuyenMai bodyKetQuaThongBaoThucHienKhuyenMai = new BoDyKetQuaThongBaoThucHienKhuyenMai();
        bodyKetQuaThongBaoThucHienKhuyenMai.madonvi = setting.MaDonVi;
        bodyKetQuaThongBaoThucHienKhuyenMai.service = "DongBoTrangThaiHoSo";
        bodyKetQuaThongBaoThucHienKhuyenMai.type = "2";
        KetQuaThongBaoThucHienKhuyenMai ketqua = new KetQuaThongBaoThucHienKhuyenMai();
        string danhsachFileDinhKem = hoSoQuaMang.DinhKemKetQua;
        ketqua.MaHoSo = hoSoQuaMang.MaHoSo;
        ketqua.TrangThai = hoSoQuaMang.TrangThaiHoSoId == "3" ? "11" : hoSoQuaMang.TrangThaiHoSoId;
        ketqua.MaHoSoDonVi = hoSoQuaMang.MaHoSo;
        ketqua.MaDoiTuong = "";
        ketqua.NoiDung = hoSoQuaMang.YKienNguoiChuyenXuLy;
        ketqua.NgayXuLy = hoSoQuaMang.NgayTra?.ToString("yyyyMMddHHmmss");
        List<TaiLieuKetQuaThongBaoThucHienKhuyenMai> dsTaiLieu = new List<TaiLieuKetQuaThongBaoThucHienKhuyenMai>();
        string[]? arrFileDinhKem = danhsachFileDinhKem?.Split(new string[] { "##" }, StringSplitOptions.None);
        if(arrFileDinhKem != null && arrFileDinhKem.Length > 0)
        {
            foreach (string linkFileDinhKem in arrFileDinhKem)
            {
                if (linkFileDinhKem != null && linkFileDinhKem != "")
                {
                    TaiLieuKetQuaThongBaoThucHienKhuyenMai tailieu = new TaiLieuKetQuaThongBaoThucHienKhuyenMai();
                    tailieu.IsDeleted = "False";
                    tailieu.MaThanhPhanHoSo = "";
                    tailieu.TenTepDinhKem = linkFileDinhKem.Substring(linkFileDinhKem.LastIndexOf("/") + 1);
                    tailieu.TepDinhKemId = null;
                    tailieu.DuongDanTaiTepTin = _urlDownloadDVC + linkFileDinhKem;
                    dsTaiLieu.Add(tailieu);
                }
            }
        }
        ketqua.TaiLieuXuLy = dsTaiLieu;
        bodyKetQuaThongBaoThucHienKhuyenMai.data = ketqua;

        using HttpClient client = new HttpClient();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, setting.Url_ConnectApiDVC + "/KetNoiMotCuaQuocGia/DongBoTrangThaiHoSoKM");
        httpRequestMessage.Content = new StringContent(JsonConvert.SerializeObject(ketqua), Encoding.UTF8, new MediaTypeHeaderValue("application/json"));
        try
        {
            HttpResponseMessage httpResponseMessage = await client.SendAsync(httpRequestMessage);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
        }
    }
}
