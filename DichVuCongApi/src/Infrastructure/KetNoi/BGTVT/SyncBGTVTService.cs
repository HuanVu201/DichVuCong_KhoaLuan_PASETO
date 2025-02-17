using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Web;
using TD.DichVuCongApi.Application.Common.KetNoi.BGTVT;
using TD.DichVuCongApi.Application.Common.Persistence;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Infrastructure.Persistence.Repository;
using Amazon.Runtime.Internal.Transform;
using Dapper;
using System.Reflection;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using DocumentFormat.OpenXml.VariantTypes;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Common.KetNoi.SLD;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Domain.Business.Events;
using System.Globalization;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.BGTVT;
public class SyncBGTVTService : ISyncBGTVTService
{
    private readonly KetNoiBGTVTSettings _settings;
    private readonly IDapperRepository _dapperRepository;
    private readonly string HoSoTableName = SchemaNames.Business + "." + TableNames.HoSos;
    private readonly string LoaiDuLieuKetNoi = "SyncGPLXBGT";
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IInjectConfiguration _injectConfiguration;
    private readonly IHoSoServices _hoSoServices;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;

    private ILogger<HoSo> _logger;
    public SyncBGTVTService(
        IReadRepository<NgayNghi> repositoryNgayNghi,
        IInjectConfiguration injectConfiguration,
        IOptions<KetNoiBGTVTSettings> options,
        IDapperRepository dapperRepository,
        ILogger<HoSo> logger,
        IHoSoServices hoSoServices,
        INguoiXuLyHoSoService nguoiXuLyHoSoService)
    {
        _repositoryNgayNghi = repositoryNgayNghi;
        _injectConfiguration = injectConfiguration;
        _settings = options.Value;
        _dapperRepository = dapperRepository;
        _logger = logger;
        _hoSoServices = hoSoServices;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }

    private async Task UpdateOrAddHoSo(HoSoBGTVTResponsePagination response)
    {
        if (response == null || response.data.Count == 0)
        {
            return;
        }
        string sqlCheckHoSoExists = $"SELECT TOP 1 MaHoSo FROM {HoSoTableName} WHERE LoaiDuLieuKetNoi = '{LoaiDuLieuKetNoi}' AND MaHoSo = @MaHoSo And DeletedOn is null";

        #region lấy mã thủ tục trong db
        var maThuTucParams = new Dictionary<string, object>();
        var maThuTucDVCQGs = response.data.DistinctBy(x => x.MaTTHC).Select(x => x.MaTTHC).ToList();
        var thuTucWhere = new List<string>() { };
        for (int i = 0; i < maThuTucDVCQGs.Count; i++)
        {
            var maTTHC = maThuTucDVCQGs[i];
            thuTucWhere.Add($"MaTTHC LIKE @MaTTHC{i} +'%'");
            maThuTucParams.Add($"MaTTHC{i}", maTTHC);
        }
        var sqlThuTuc = $@"SELECT tt.MaTTHC, tt.MucDo, tt.LinhVucChinh, tt.MaLinhVucChinh FROM Catalog.ThuTucs tt WHERE {string.Join(" OR ", thuTucWhere)}";
        var thuTucs = await _dapperRepository.QueryAsync<ThuTuc>(sqlThuTuc, new DynamicParameters(maThuTucParams));
        #endregion
        for (int i = 0; i < response.data.Count; i++)
        {
            List<string> valueList = new();
            var hoSoReq = response.data[i];
            var hoSoExists = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlCheckHoSoExists, new
            {
                MaHoSo = hoSoReq.MaHoSo
            });
            if (hoSoExists == null)
            {
                try
                {
                    await AddHoSo(hoSoReq, thuTucs);
                }
                catch (Exception ex)
                {
                    //var errorDictionary = new Dictionary<int, string>
                    //{
                    //    {-300, "Mã đơn vị rỗng hoặc null"},
                    //    {-301, "ApiKey rỗng hoặc null"},
                    //    {-302, "ApiKey không đúng"},
                    //    {-303, "Mã đơn vị không đúng"},
                    //    {-304, "ApiKey lỗi"}
                    //};
                    _logger.LogError($"{hoSoReq.MaHoSo}_AddHoSo_SyncBGTVTService_req:{JsonConvert.SerializeObject(hoSoReq)}_res:{ex.ToString()}");
                }
            }
        }
    }

    private async Task AddHoSo(HoSoBGTVTResponse request, IReadOnlyList<ThuTuc> thuTucs)
    {
        string sqlGetTruongHopThuTuc = $"SELECT TOP 1 Ten, Ma, Id, ThoiGianThucHienTrucTuyen, ThoiGianThucHien, LoaiThoiGianThucHien, NodeQuyTrinh, EdgeQuyTrinh From {SchemaNames.Business}.{TableNames.TruongHopThuTucs} WHERE DeletedOn is null and ThuTucId = @ThuTucId";
        string sqlGetNguoiTiepNhan = @"SELECT STRING_AGG (CONVERT(NVARCHAR(1000),NguoiTiepNhanId) , '##') as TaiKhoanTiepNhan FROM [Catalog].[DonViThuTucs]
            where MaTTHC = @MaTTHC and DeletedOn is null and DonViId = @DonViId";
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string maTinh = request.MaTinh;
        string maHuyen = request.MaHuyen;
        string maXa = request.MaXa;
        string formatDate = "dd/MM/yyyy";
        string formatDatetime = "dd/MM/yyyy HH:mm:ss";
        string tinhThanhChuHoSo = maTinh;
        string quanHuyenChuHoSo = string.IsNullOrEmpty(maTinh) ? string.Empty : maTinh + "." + maHuyen;
        string xaPhuongChuHoSo = string.IsNullOrEmpty(quanHuyenChuHoSo) ? string.Empty : maTinh + "." + maHuyen + "." + maXa;
        string diaChiChuHoSo = request.DiaChi;
        var thuTuc = thuTucs.FirstOrDefault(x => x.MaTTHC.Contains(request.MaTTHC));

        var nguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<TaiKhoanNguoiTiepNhan_Select>(sqlGetNguoiTiepNhan, new
        {
            MaTTHC = thuTuc.MaTTHC,
            DonViId = _settings.MaDonVi
        });
        DateTime? ngayTiepNhan = null;
        DateTime? ngayNopHoSo = null;
        DateTime? ngayHenTra = null;
        if (!string.IsNullOrEmpty(request.NgayTiepNhan))
        {
            ngayTiepNhan = DateTime.ParseExact(request.NgayTiepNhan, formatDatetime, CultureInfo.InvariantCulture);
        }

        if (!string.IsNullOrEmpty(request.NgayGuiHoSo))
        {
            ngayNopHoSo = DateTime.ParseExact(request.NgayGuiHoSo, formatDatetime, CultureInfo.InvariantCulture);
        }

        if (!string.IsNullOrEmpty(request.NgayHenTra))
        {
            ngayHenTra = DateTime.ParseExact(request.NgayHenTra, formatDatetime, CultureInfo.InvariantCulture);
        }

        if (nguoiTiepNhan == null)
        {
            _logger.LogError($"{request.MaHoSo}_SyncBGTVTService_không có người tiếp nhận");
            return;
        }
        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlGetTruongHopThuTuc, new
        {
            ThuTucId = thuTuc.MaTTHC
        });
        if (truongHopThuTuc == null)
        {
            _logger.LogError($"{request.MaHoSo}_SyncBGTVTService_không có trường hợp thủ tục");
            return;
        }
        bool uyQuyen = !string.IsNullOrEmpty(request.MaNguoiNop);
        string kenhThucHien = "2";
        if (_settings.LaTrucTuyen == false || _settings.LaTrucTuyen == null)
        {
            if (request.KenhThucHien == "0")
            {
                kenhThucHien = "1";
            }
            else if (request.KenhThucHien == "1")
            {
                kenhThucHien = "2";
            }
        }
        var firstNode = _hoSoServices.GetFirstNode(truongHopThuTuc);

        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year));
        var caculateTime = new CaculateTime(_injectConfiguration);
        double thoiGianHanTraCaNhan = caculateTime.GetThoiGianXuLy(firstNode, "1");
        double thoiGianHenTra = caculateTime.GetThoiGianXuLy(truongHopThuTuc, request.KenhThucHien);

        var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianHanTraCaNhan, firstNode.data.loaiThoiGian);
        var ngayHenTraMC = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianHenTra, truongHopThuTuc.LoaiThoiGianThucHien);
        string? soDienThoai = request.SoDienThoai?.Replace(".", string.Empty);
        string? dienThoaiNguoiNop = request.DienThoaiNguoiNop?.Replace(".", string.Empty);

        HoSo hoSo = new HoSo(_settings.MaDonVi, request.MaHoSo, LoaiChuHoSoConstant.CongDan, request.ChuHoSo, soDienThoai, request.Email, request.MaDoiTuong,
            null, null, tinhThanhChuHoSo, quanHuyenChuHoSo,
            xaPhuongChuHoSo, request.DiaChi, request.MaDoiTuong, thuTuc.MaTTHC, truongHopThuTuc.Ma,
            truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(), null, null, nguoiTiepNhan.TaiKhoanTiepNhan,
            request.TrichYeuHoSo, ngayTiepNhan, uyQuyen, request.NguoiNop, dienThoaiNguoiNop, request.EmaiNguoiNop, request.MaNguoiNop,
            null, null, null, null, thuTuc.MaTTHC, ngayNopHoSo, ngayHenTraCaNhan, thuTuc.MucDo, "0");
        hoSo.SetLinhVuc(thuTuc.MaLinhVucChinh, thuTuc.LinhVucChinh);
        hoSo.SetNgayHenTra(ngayHenTra ?? ngayHenTraMC);
        hoSo.SetTrangThaiHoSoId("2");
        hoSo.SetKenhThucHien(kenhThucHien);
        hoSo.SetLoaiDuLieuKetNoi(LoaiDuLieuKetNoi);
        hoSo.SetBuocHienTai(firstNode.id);
        var taiKhoanTiepNhan = nguoiTiepNhan.TaiKhoanTiepNhan.Contains("##") ? nguoiTiepNhan.TaiKhoanTiepNhan.Split("##")[0] : nguoiTiepNhan.TaiKhoanTiepNhan;
        hoSo.SetNguoiNhanHoSo(taiKhoanTiepNhan);
        hoSo.SetThoiGianThucHien(truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.ThoiGianThucHienTrucTuyen, truongHopThuTuc.LoaiThoiGianThucHien);
        var hoSoId = Guid.NewGuid();
        hoSo.SetId(hoSoId);

        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(request.MaHoSo, null, null, null, null, "", "", nguoiTiepNhan.TaiKhoanTiepNhan, null, currentTime, trangThai: "2");
        int insetedHoSoCount = await _dapperRepository.InsertEntityAsync<HoSo>(hoSo, SchemaNames.Business + "." + TableNames.HoSos);
        if (insetedHoSoCount != 1)
        {
            return;
        }
        await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(nguoiTiepNhan.TaiKhoanTiepNhan, hoSoId);
        int insertedQTXLCount = await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLyHoSo, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
        if (insertedQTXLCount != 1)
        {
            return;
        }
    }
    public async Task SyncData()
    {
        if (!_settings.Enable)
        {
            return;
        }
        using HttpClient client = new HttpClient();
        DateTime now = DateTime.Now;
        string dateTimeToStr = now.ToString("dd/MM/yyyy");
        string dateTimeFromStr = now.Subtract(TimeSpan.FromDays(3)).ToString("dd/MM/yyyy");
        string queryString = $"?Start=-1&End=-1&GovAgencyCode={_settings.MaDonViDVCQG}&APIKey={_settings.ApiKey}&ReceiveToDate={dateTimeToStr}&ReceiveFromDate={dateTimeFromStr}";
        string segment = "/apiGTVT/danhsachhoso";
        string url = $"https://{_settings.URLEndPoint}{segment}{queryString}";
        HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, url);
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _settings.ApiKey);
        httpRequestMessage.Headers.Add("MaDonVi", _settings.MaDonViDVCQG);
        httpRequestMessage.Headers.Add("ApiKey", _settings.ApiKey);
        try
        {
            HttpResponseMessage httpResponseMessage = await client.SendAsync(httpRequestMessage);
            if (httpResponseMessage.IsSuccessStatusCode)
            {
                string responseBodyStr = await httpResponseMessage.Content.ReadAsStringAsync();
                HoSoBGTVTResponsePagination hoSoBGTVTResponse = JsonConvert.DeserializeObject<HoSoBGTVTResponsePagination>(responseBodyStr);
                await UpdateOrAddHoSo(hoSoBGTVTResponse);
            }

        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
        }
    }
    public async Task SyncDataManual(SyncDataManualRequest req)
    {
        if (string.IsNullOrEmpty(req.From) || string.IsNullOrEmpty(req.To))
        {
            return;
        }
        using HttpClient client = new HttpClient();
        string queryString = $"?Start=-1&End=-1&GovAgencyCode={_settings.MaDonViDVCQG}&APIKey={_settings.ApiKey}&ReceiveToDate={req.To}&ReceiveFromDate={req.From}";
        string segment = "/apiGTVT/danhsachhoso";
        string url = $"https://{_settings.URLEndPoint}{segment}{queryString}";
        HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, url);
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _settings.ApiKey);
        httpRequestMessage.Headers.Add("MaDonVi", _settings.MaDonViDVCQG);
        httpRequestMessage.Headers.Add("ApiKey", _settings.ApiKey);
        try
        {
            HttpResponseMessage httpResponseMessage = await client.SendAsync(httpRequestMessage);
            if (httpResponseMessage.IsSuccessStatusCode)
            {
                string responseBodyStr = await httpResponseMessage.Content.ReadAsStringAsync();
                HoSoBGTVTResponsePagination hoSoBGTVTResponse = JsonConvert.DeserializeObject<HoSoBGTVTResponsePagination>(responseBodyStr);
                await UpdateOrAddHoSo(hoSoBGTVTResponse);
            }

        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
        }
    }
    
}
