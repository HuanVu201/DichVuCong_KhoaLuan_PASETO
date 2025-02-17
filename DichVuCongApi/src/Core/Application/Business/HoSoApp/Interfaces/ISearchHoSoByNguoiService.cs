using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using static TD.DichVuCongApi.Application.Business.HoSoApp.Interfaces.SearchHoSoByNguoiParams;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Interfaces;
public interface ISearchHoSoByNguoiService : ITransientService
{
    public Task<PaginationResponse<HoSoByNguoiGuiResponse>> SearchHoSoByNguoiGui(SearchHoSoQuery req, CancellationToken cancellationToken = default);
    public Task<PaginationResponse<HoSoDto>> SearchHoSoByNguoiDangXuLy(SearchHoSoQuery req, CancellationToken cancellationToken = default);
    public Task<PaginationResponse<HoSoDto>> SearchHoSoByNguoiDaXuLy(SearchHoSoQuery req, CancellationToken cancellationToken = default);
    public Task<PaginationResponse<HoSoDto>> SearchHoSoByNguoiNhanHoSo(SearchHoSoQuery req, CancellationToken cancellationToken = default);
}

public class SearchHoSoByNguoiParams
{
    public class SearchHoSoQueryWithCurrentUser : SearchHoSoQuery
    {
        public string CurrentUser { get; set; }
        public string SoDinhDanhCongDan { get; set; }
        public string TrangThaiNguoiXuLyHoSo { get; set; }
        public string CurrentTime { get; set; }
    }

    public class HoSoByNguoiGuiResponse {
        public DefaultIdType Id { get; set; }
        public string TrangThaiHoSoId { get; set; }
        public string NgayTiepNhan { get; set; }
        public string NgayHenTra { get; set; }
        public string MaHoSo { get; set; }
        public string DonViId { get; set; }
        public string NgayNopHoSo { get; set; }
        public string DangKyNhanHoSoQuaBCCIData { get; set; }
        public string DinhKemTuChoi { get; set; }
        public string TrangThaiBoSung { get; set; }
        public string ThuTuc { get; set; }
        public string TenDonVi { get; set; }
        public string TrangThaiThuPhi { get; set; }
        public string HoanThanhDanhGia { get; set; }

        [JsonIgnore]
        public int TotalCount { get; set; }
    }
}