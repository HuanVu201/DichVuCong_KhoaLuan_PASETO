namespace TD.DichVuCongApi.Infrastructure.Common.ApplicationServices;

using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Interfaces;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Constant;

public class GiayToSoHoaService : IGiayToSoHoaService
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly IRepository<GiayToSoHoa> _giayToSoHoaRepo;
    private readonly bool _suDungTuDongThemGiayToSoHoa = false;

    public GiayToSoHoaService(
        IDapperRepository dapperRepository,
        ICurrentUser currentUser,
        IRepository<GiayToSoHoa> giayToSoHoaRepo,
        IInjectConfiguration injectConfiguration)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _giayToSoHoaRepo = giayToSoHoaRepo;
        bool? suDungTuDongThemGiayToSoHoa = injectConfiguration.GetValue<bool?>("GLOBAL_CONFIG:TuDongThemGiayToSoHoa");
        _suDungTuDongThemGiayToSoHoa = (suDungTuDongThemGiayToSoHoa == false || suDungTuDongThemGiayToSoHoa == null) ? false : true;
    }
    private class SuffixMaGiayTo
    {
        public int Count { get; set; }
    }
    private class JsonOCR
    {
        public string? LoaiKetQua { get; set; }
    }

    public async Task<string> GetMaSuffix(string ma)
    {
        string sqlGetSuffixMaGiayToSoHoa = @"SELECT Count (Ma) + 1 as Count FROM Business.GiayToSoHoas where Ma like @Ma + '%'";
        var queryResponse = await _dapperRepository.QueryFirstOrDefaultAsync<SuffixMaGiayTo>(sqlGetSuffixMaGiayToSoHoa, new
        {
            Ma = ma
        });
        return ma + "." + queryResponse.Count.ToString().PadLeft(2, '0');
    }

    public async Task ThemGiayToSoHoaKetQua(AddGiayToSoHoaCommand request, string ma)
    {
        string sqlUpdateTrichXuatHoSo = @"UPDATE Business.HoSos SET NgayBanHanhKetQua = @NgayBanHanhKetQua, NguoiKyKetQua= @NguoiKyKetQua, SoKyHieuKetQua = @SoKyHieuKetQua, CoQuanBanHanhKetQua = @CoQuanBanHanhKetQua, LoaiVanBanKetQua = @LoaiVanBanKetQua, SoDinhDanh = @SoDinhDanh, TrichYeuKetQua = @TrichYeuKetQua, EFormKetQuaData = @EFormKetQuaData, DinhKemSoHoa = CONCAT(DinhKemSoHoa, '##', @DinhKemSoHoa), DinhKemKetQua = @DinhKem WHERE Id = @HoSoId";
        string sqlUpdateSoHoaHoSo = @"UPDATE Business.HoSos SET NgayBanHanhKetQua = @NgayBanHanhKetQua, NguoiKyKetQua= @NguoiKyKetQua, SoKyHieuKetQua = @SoKyHieuKetQua, CoQuanBanHanhKetQua = @CoQuanBanHanhKetQua, LoaiVanBanKetQua = @LoaiVanBanKetQua, SoDinhDanh = @SoDinhDanh, TrichYeuKetQua = @TrichYeuKetQua, DinhKemSoHoa = CONCAT(DinhKemSoHoa, '##', @DinhKemSoHoa), DinhKemKetQua = @DinhKem WHERE Id = @HoSoId";

        if (!string.IsNullOrEmpty(request.JsonOcr) && request.HoSoId != Guid.Empty && request.HoSoId != null) // số hóa kết quả với trích xuất ocr
        {
            var jsonOCR = new JsonOCR() { };
            try
            {
                jsonOCR = JsonConvert.DeserializeObject<JsonOCR>(request.JsonOcr);
            }
            catch (Exception ex)
            {

            }
            await _dapperRepository.ExcuteAsync(sqlUpdateTrichXuatHoSo, new
            {
                TrichYeuKetQua = request.TrichYeuKetQua,
                SoDinhDanh = request.MaDinhDanh,
                EFormKetQuaData = request.JsonOcr,
                DinhKemSoHoa = request.DinhKemSoHoa,
                HoSoId = request.HoSoId.ToString(),
                DinhKem = request.DinhKem,
                NguoiKyKetQua = request.NguoiKy,
                SoKyHieuKetQua = request.SoKyHieu,
                CoQuanBanHanhKetQua = request.CoQuanBanHanh,
                LoaiVanBanKetQua = jsonOCR?.LoaiKetQua ?? string.Empty,
                NgayBanHanhKetQua = request.NgayBanHanh,
            });
        }
        else if (string.IsNullOrEmpty(request.JsonOcr) && request.HoSoId != Guid.Empty && request.HoSoId != null)// số hóa kết quả
        {
            await _dapperRepository.ExcuteAsync(sqlUpdateSoHoaHoSo, new
            {
                TrichYeuKetQua = request.TrichYeuKetQua,
                DinhKemSoHoa = request.DinhKemSoHoa,
                SoDinhDanh = request.MaDinhDanh,
                HoSoId = request.HoSoId.ToString(),
                DinhKem = request.DinhKem,
                NguoiKyKetQua = request.NguoiKy,
                SoKyHieuKetQua = request.SoKyHieu,
                CoQuanBanHanhKetQua = request.CoQuanBanHanh,
                NgayBanHanhKetQua = request.NgayBanHanh,
                LoaiVanBanKetQua = string.Empty,
            });
        }

    }

    public async Task ThemGiayToSoHoaThanhPhan(AddGiayToSoHoaCommand request, string ma)
    {
        string extraSet = string.Empty;
        if(!string.IsNullOrEmpty(request.DinhKem))
        {
            extraSet += ",DinhKem = @DinhKem";
        }
        string sqlUpdateThanhPhanHoSo = $"UPDATE Business.ThanhPhanHoSos SET TrangThaiSoHoa = @TrangThaiSoHoa, MaGiayToSoHoa = @MaGiayToSoHoa {extraSet} WHERE Id = @Id";
        
        if (request.ThanhPhanHoSoId != Guid.Empty && request.ThanhPhanHoSoId != null) // số hóa thành phần
        {
            await _dapperRepository.ExcuteAsync(sqlUpdateThanhPhanHoSo, new
            {
                Id = request.ThanhPhanHoSoId.ToString(),
                TrangThaiSoHoa = TrangThaiSoHoaConstant.DuocSoHoa,
                MaGiayToSoHoa = ma,
                DinhKem = request.DinhKem
            });
        }
    }

    public async Task ThemGiayToSoHoaKetQuaByDinhKems(string? dinhKems, string maHoSo, string maTTHC, string maLinhVuc, string? coQuanBanHanh,
        string soDinhDanhChuHoSo, CancellationToken cancellationToken = default)
    {
        if (!_suDungTuDongThemGiayToSoHoa) // cấu hình cho tỉnh nào chạy cái này
        {
            return;
        }
        if (string.IsNullOrEmpty(dinhKems))
        {
            return;
        }
        string sqlCheckDinhKem = $"SELECT {nameof(GiayToSoHoa.MaHoSo)} FROM {SchemaNames.Business}.{TableNames.GiayToSoHoas} WHERE {nameof(GiayToSoHoa.DinhKem)} = @DinhKem And {nameof(GiayToSoHoa.DeletedOn)} IS NULL AND {nameof(GiayToSoHoa.LoaiSoHoa)} = {GiayToSoHoa.GiayToSoHoa_LoaiSoHoa.KetQua}";
        var danhSachDinhKems = dinhKems.Split("##", StringSplitOptions.RemoveEmptyEntries);
        var danhSachGiayToSoHoas = new List<GiayToSoHoa>();
        foreach (string dinhKem in danhSachDinhKems)
        {
            var giayToSoHoa = GiayToSoHoa.Create(Path.GetFileName(dinhKem), null, null, soDinhDanhChuHoSo, null, _currentUser.GetUserMaDinhDanh(), _currentUser.GetUserId().ToString(),
            DateTime.Now, null, null, null, null, coQuanBanHanh, null,
            GiayToSoHoa.GiayToSoHoa_LoaiSoHoa.KetQua, dinhKem, null, null, null, maHoSo, true);
            giayToSoHoa.SetThongTinSoHoaKetQua(GiayToSoHoa.TrangThaiSoHoaHoSo.ChoDuyet, maTTHC, maLinhVuc);
            var daTonTai = await _dapperRepository.QueryFirstOrDefaultAsync<GiayToSoHoa>(sqlCheckDinhKem, new
            {
                DinhKem = dinhKem
            }, cancellationToken: cancellationToken);
            if(daTonTai == null)
            {
                danhSachGiayToSoHoas.Add(giayToSoHoa);
            }
        }
        if(danhSachGiayToSoHoas.Count > 0)
        {
            await _giayToSoHoaRepo.AddRangeAsync(danhSachGiayToSoHoas);
        }
    }
    public async Task<bool> CapNhatTrangThaiSoHoa(CapNhatTrangThaiSoHoaReq req)
    {
        if (req.TrangThaiSoHoa != GiayToSoHoa.TrangThaiSoHoaHoSo.DaDuyet && req.TrangThaiSoHoa != GiayToSoHoa.TrangThaiSoHoaHoSo.ChoDuyet && req.TrangThaiSoHoa != GiayToSoHoa.TrangThaiSoHoaHoSo.KhongDuyet)
        {
            throw new ArgumentException("Trạng thái số hóa không hợp lệ");
        }
        string updateSql = $@"UPDATE {SchemaNames.Business}.{TableNames.GiayToSoHoas} SET {nameof(GiayToSoHoa.TrangThaiSoHoa)} = @TrangThaiSoHoa WHERE ID = @Id";
        int res = await _dapperRepository.ExcuteAsync(updateSql, req);
        return res == 1;
    }
}
