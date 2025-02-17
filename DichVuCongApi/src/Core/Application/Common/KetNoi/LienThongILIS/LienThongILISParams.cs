using TD.DichVuCongApi.Application.Business.VBDLIS.Services;

namespace TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS;
public class LienThongILISParams
{
    public class GetTokenRequest
    {
        public string username { get; set; }
        public string password { get; set; }
        public string grant_type { get; set; }
        public string client_id { get; set; }
        public string client_secret { get; set; }
    }
    public class GetTokenResponse
    {
        public string access_token { get; set; }
        public int expires_in { get; set; }
        public string token_type { get; set; }
        public string refresh_token { get; set; }
        public string scope { get; set; }
    }
    public class TiepNhanHoSoRequest
    {
        public bool LaQuyTrinhCapTinh { get; set; } = true;
        public string TinhId { get; set; }
        public string HuyenId { get; set; }
        public string XaId { get; set; }
        public string SoBienNhan { get; set; }
        public string? MaHoSoMotCua { get; set; }
        public string NguoiTiepNhan { get; set; }
        public DateTime? NgayTiepNhan { get; set; }
        public DateTime? NgayHenTra { get; set; }
        public string? DiaChiTaiSan { get; set; }
        public ThongTinNguoiNopData ThongTinNguoiNopDon { get; set; }
        public ThongTinQuyTrinhData ThongTinQuyTrinh { get; set; }
        public List<ThongTinThuaDatData>? ThongTinThuaDat { get; set; }
        public List<ThongTinGiayToDinhKemData> DanhSachGiayToDinhKem { get; set; }



        public class ThongTinNguoiNopData
        {
            public ThongTinNguoiNopData(string hoTen, string? soChungMinh, string? diaChiChiTiet, string? soDienThoai, string? email)
            {
                HoTen = hoTen;
                SoChungMinh = soChungMinh;
                DiaChiChiTiet = diaChiChiTiet;
                SoDienThoai = soDienThoai;
                Email = email;
            }

            public string? HoTen { get; set; }
            public string? SoChungMinh { get; set; }
            public string? DiaChiChiTiet { get; set; }
            public string? SoDienThoai { get; set; }
            public string? Email { get; set; }
        }

        public class ThongTinQuyTrinhData
        {
            public ThongTinQuyTrinhData(string maQuyTrinh, string tenQuyTrinh)
            {
                MaQuyTrinh = maQuyTrinh;
                TenQuyTrinh = tenQuyTrinh;
            }

            public string MaQuyTrinh { get; set; }
            public string TenQuyTrinh { get; set; }
        }

        public class ThongTinThuaDatData
        {
            public string? SoThuTuThua { get; set; }
            public string? SoHieuBanDo { get; set; }
            public string? DienTich { get; set; }
            public string? DiaChiChiTiet { get; set; }
        }

        public class ThongTinGiayToDinhKemData
        {
            public string TenGiayTo { get; set; }
            public int? SoBanChinh { get; set; }
            public int? SoBanSao { get; set; }
            public ThongTinTapTinData? TapTin { get; set; }
        }
        public class ThongTinTapTinData
        {
            public ThongTinTapTinData(string? name, string? data)
            {
                this.name = name;
                this.data = data;
            }

            public string? name { get; set; }
            public string? data { get; set; }
        }
    }
    public class TiepNhanHoSoResponse
    {
        public int data { get; set; }
        public BaseStatusResponse status { get; set; }
        public class BaseStatusResponse
        {
            public bool? success { get; set; }
            public int? code { get; set; }
            public string? type { get; set; }
            public DateTime? time { get; set; }
            public string? message { get; set; }
        }
    }
    public class CapNhatKetQuaThongBaoThueRequest
    {
        public string SoBienNhan { get; set; }
        public string? NguoiXuLy { get; set; }
        public DateTime NgayCoKetQuaThue { get; set; }
        public string? GhiChu { get; set; }
        public List<DanhSachThongBaoThue> DanhSachThongBaoThue { get; set; }
    }
    public class CapNhatKetQuaThongBaoThueQueryString
    {
        public string? CodeGet { get; set; }
    }
    public class DanhSachThongBaoThue
    {
        public string HoVaChu { get; set; }
        public string? LoaiThue { get; set; }
        public string? SoThongBaoThue { get; set; }
        public string? DuongDanTBT { get; set; }
    }
    public class CapNhatKetQuaThongBaoThueResponse
    {
        public int Result { get; set; }
        public string Message { get; set; }
    }
}
