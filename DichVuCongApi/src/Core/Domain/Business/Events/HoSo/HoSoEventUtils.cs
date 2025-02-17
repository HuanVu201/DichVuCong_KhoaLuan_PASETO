
using System.Globalization;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Shared.Events;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public static class HoSoEventUtils
{
    public static string BoPhanTiepNhanVaTraKetQua = "Bộ phận tiếp nhận và trả kết quả ";
    public static string TrungTamPhucVuHanhChinhCong = "Trung tâm Phục vụ hành chính công";
    public static string ChiNhanhVanPhongDangKyDatDai = "Chi Nhánh Văn Phòng Đăng Ký Đất Đai ";
    public const string sqlPhoneNumberHoTro = @$"select top 1 gr.SoDienThoai as PhoneNumber from Business.HoSos hs INNER JOIN [Catalog].[Groups] gr on hs.DonViId = gr.GroupCode where hs.NguoiNhanHoSo is not null
                        AND hs.MaHoSo = @MaHoSo";
    public const string sqlPhoneNumberHoTroEmailTrucTuyen = @"SELECT SoDienThoai FROM Catalog.Groups WHERE GroupName = @GroupName";
    public const string sqlPhoneNumberNguoiTiepNhan = @$"select top 1 u.PhoneNumber, u.UserName from Business.HoSos hs INNER JOIN [Identity].[Users] u on hs.NguoiNhanHoSo = u.Id where hs.NguoiNhanHoSo is not null
                        AND hs.MaHoSo = @MaHoSo";
    public const string sqlPhoneNumberNguoiTiepNhanHienTai = @$"select UserName,PhoneNumber from [Identity].[Users] where TypeUser = 'CanBo' and id = @id";
    public static string BoPhanTraKetQuaCua = "Bộ phận trả kết quả của";
    public static string DangXuLyFullPath = "/dvc/xu-ly-ho-so/dang-xu-ly";
    public static string ChoXacNhanTraKetQua = "/dvc/tra-ket-qua/cho-xac-nhan-tra-kq";
    public static string ChoXacNhanTraKetQuaCoThuPhi = "/dvc/tra-ket-qua/cho-xac-nhan-chua-thu-phi";
    public static string ChoTraKetQua = "/dvc/tra-ket-qua/cho-tra-ket-qua";
    public static string DungXuLyFullPath = "/dvc/xu-ly-ho-so/dung-xu-ly";
    public static string YeuCauBoSungFullPath = "/dvc/bo-sung-ho-so/yeu-cau-bo-sung";
    public static string ChoTiepNhanTrucTuyenFullPath = "/dvc/tiep-nhan-ho-so/cho-tiep-nhan-truc-tuyen";
    public static string YeuCauThucHienNghiaVuTaiChinhFullPath = "/dvc/xu-ly-ho-so/yeu-cau-thuc-hien-nghia-vu-tai-chinh";
    public static string MoiTiepNhanFullPath = "/dvc/tiep-nhan-ho-so/moi-tiep-nhan";
    public static string DaThuPhiFullPath = "/dvc/thu-phi-le-phi/da-thu-phi";
    public static string LoiNhanDuThaoXinLoi = @"#TenDonVi gửi ông bà phiếu xin lỗi và hẹn lại ngày trả kết quả theo tệp đính kèm";


    public class NguoiTiepNhan
    {
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
    }
    public class SoDienThoaiHoTro
    {
        public string PhoneNumber { get; set; }
    }
    public class SoDienThoaiHoTroTrucTuyen
    {
        public string SoDienThoai { get; set; }
    }


    public static string GetMenuFullPath(Business.HoSo hoSo, bool? choXacNhanCoThuPhi, string maTrangThaiMoi, string? trangThaiTraKQ)
    {
        TrangThaiTraKetQuaHoSoConstant _trangThaiTraHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();

        string fullPath = string.Empty;
        if (hoSo.TrangThaiHoSoId == "2")
        {
            fullPath = MoiTiepNhanFullPath;
        }
        else if (hoSo.TrangThaiHoSoId == "4")
        {
            fullPath = DangXuLyFullPath;
        }
        else if (hoSo.TrangThaiHoSoId == "5" && hoSo.TrangThaiBoSung == HoSoConstant.TrangThaiBoSungMotCua)
        {
            fullPath = YeuCauBoSungFullPath;
        }
        else if (hoSo.TrangThaiHoSoId == "1")
        {
            fullPath = ChoTiepNhanTrucTuyenFullPath;
        }
        else if (hoSo.TrangThaiHoSoId == "6")
        {
            fullPath = YeuCauThucHienNghiaVuTaiChinhFullPath;
        }
        else if (hoSo.TrangThaiHoSoId == "9" && hoSo.TrangThaiTraKq == _trangThaiTraHoSoConstant.CHO_XAC_NHAN && choXacNhanCoThuPhi == false)
        {
            fullPath = ChoXacNhanTraKetQua;
        }
        else if (hoSo.TrangThaiHoSoId == "9" && hoSo.TrangThaiTraKq == _trangThaiTraHoSoConstant.CHO_XAC_NHAN && choXacNhanCoThuPhi == true)
            if (maTrangThaiMoi == "2")
            {
                fullPath = MoiTiepNhanFullPath;
            }
            else if (maTrangThaiMoi == "4")
            {
                fullPath = DangXuLyFullPath;
            }
            else if (maTrangThaiMoi == "5" && hoSo.TrangThaiBoSung == HoSoConstant.TrangThaiBoSungMotCua)
            {
                fullPath = YeuCauBoSungFullPath;
            }
            else if (maTrangThaiMoi == "1")
            {
                fullPath = ChoTiepNhanTrucTuyenFullPath;
            }
            else if (maTrangThaiMoi == "6")
            {
                fullPath = YeuCauThucHienNghiaVuTaiChinhFullPath;
            }
            else if (maTrangThaiMoi == "9" && trangThaiTraKQ == _trangThaiTraHoSoConstant.CHO_XAC_NHAN && choXacNhanCoThuPhi == false)
            {
                fullPath = ChoXacNhanTraKetQua;
            }
            else if (maTrangThaiMoi == "9" && trangThaiTraKQ == _trangThaiTraHoSoConstant.CHO_XAC_NHAN && choXacNhanCoThuPhi == true)
            {
                fullPath = ChoXacNhanTraKetQuaCoThuPhi;
            }
        return fullPath;
    }

    public static string GetLinkTraCuu(string domainName, string maHoSo, string soGiayTo)
    {
        if (!string.IsNullOrEmpty(soGiayTo))
        {
            return domainName + $"/portaldvc/tra-cuu?MHS={maHoSo}&SGT={soGiayTo}";
        }
        else
        {
            return domainName + $"/portaldvc/tra-cuu?MHS={maHoSo}";
        }
    }

    public static string GetLinkAccessFile(string domainName, string file)
    {
        return domainName + $"/files?path={file}";
    }

    public static string GetLinkBienLaiThuPhi(string domainName, string maHoSo, string soGiayToChuHoSo)
    {
        return domainName + $"/portaldvc/tra-cuu-bien-lai-dien-tu?MaHoSo={maHoSo}&SoDinhDanh={soGiayToChuHoSo} ";
    }

    public static string GetLinkThanhToan(string domainName, string maHoSo)
    {
        return domainName + $"/portaldvc/thanh-toan?maHoSo={maHoSo}";
    }

    public static string GetLinkPublicFileTuChoiTiepNhanHoSo(string domainName, string path)
    {
        return domainName + $"/portaldvc/filepublic?filepublic={path}";
    }

    public static string GetLinkChiTietHoSo(string domainName, string maHoSo)
    {
        return domainName + $"/portaldvc/ho-so-ca-nhan/dvc-dich-vu-cong-cua-toi?showDetail=true&MaHoSo={maHoSo}";
    }

    public static string GetLinkChiTietHoSoDaXuLyXong(string domainName, string maHoSo)
    {
        return domainName + $"/portaldvc/ho-so-ca-nhan/dvc-dich-vu-cong-cua-toi?trangThaiHoSo=9&MaHoSo={maHoSo}&viewDetail=true";
    }

    public static string GetFormatedNgayThangNam(DateTime? NgayThangNam)
    {
        if (NgayThangNam == null || NgayThangNam == default)
        {
            return "ngày....tháng....năm....";
        }

        var notNullNgayThangNam = (DateTime)NgayThangNam;

        string day = notNullNgayThangNam.Day.ToString().PadLeft(2, '0');
        string month = notNullNgayThangNam.Month.ToString();
        string year = notNullNgayThangNam.Year.ToString();

        if (notNullNgayThangNam.Month >= 3) // Từ tháng 3 trở đi
        {
            // Không thêm số 0 vào trước tháng
        }
        else // Tháng 1 và 2
        {
            month = month.PadLeft(2, '0');
        }

        return "ngày " + day + " tháng " + month + " năm " + year;
    }

    public static string GetFormatedNgayThangNamFirstLetterUpperCase(DateTime? NgayThangNam)
    {
        if (NgayThangNam == null || NgayThangNam == default)
        {
            return "ngày ... tháng ... năm ...";
        }

        var notNullNgayThangNam = (DateTime)NgayThangNam;

        string day = notNullNgayThangNam.Day.ToString().PadLeft(2, '0');
        string month = notNullNgayThangNam.Month.ToString();
        string year = notNullNgayThangNam.Year.ToString();

        if (notNullNgayThangNam.Month >= 3) // Từ tháng 3 trở đi
        {
            // Không thêm số 0 vào trước tháng
        }
        else // Tháng 1 và 2
        {
            month = month.PadLeft(2, '0');
        }

        return "Ngày " + day + " tháng " + month + " năm " + year;
    }

    public static string GetThoiGianThucHien(double? thoiGianThucHien, string loaiThoiGianThucHien)
    {
        string loaiThoiGian = "ngày làm việc";
        if (!string.IsNullOrEmpty(loaiThoiGianThucHien))
        {
            loaiThoiGian = loaiThoiGianThucHien.ToLower();
        }
        if (thoiGianThucHien == null)
        {
            return string.Empty;
        }

        double soNgay = (double)thoiGianThucHien / 8;
        return $"{soNgay} {loaiThoiGian}";
    }

    public static string GetFormatedNgayGio(DateTime? NgayGio)
    {

        if (NgayGio == null || NgayGio == default)
        {
            return string.Empty;
        }

        var notNullNgayGio = (DateTime)NgayGio;

        return notNullNgayGio.Hour.ToString().PadLeft(2, '0') + " giờ " + notNullNgayGio.Minute.ToString().PadLeft(2, '0') + " phút";
    }

    private static string ToTitleCase(string input)
    {
        return CultureInfo.CurrentCulture.TextInfo.ToTitleCase(input.ToLower());
    }

    public static string GetTenDiaDanh(string tenDonVi, string catalog, string? catalogDonVi)
    {
        if (catalog == "so-ban-nganh")
        {
            return ToTitleCase(catalogDonVi ?? string.Empty);
        }

        List<string> removeCharacters = new List<string>() { "UBND xã", "UBND phường", "UBND thị trấn", "UBND huyện", "UBND thị xã", "UBND thành phố", "Chi nhánh VPĐKĐĐ huyện", "Chi nhánh VPĐKĐĐ TP", "Ủy ban nhân dân phường", "Ủy ban nhân dân xã", "Ủy ban nhân dân thị trấn" };
        string res = string.Empty;
        for (int i = 0; i < removeCharacters.Count; i++)
        {
            string removeCharacter = removeCharacters[i];
            if (tenDonVi.ToLower().Contains(removeCharacter.ToLower()))
            {
                res = tenDonVi.Substring(removeCharacter.Length);
            }
        }

        return ToTitleCase(res.Trim());
    }

    public static string GetTenDonVi(string tenDonVi, string catalog)
    {
        if (catalog == "so-ban-nganh")
        {
            return "TỈNH THANH HÓA";
        }

        List<string> removeCharacters = new List<string>() { "UBND xã", "UBND phường", "UBND thị trấn", "UBND huyện", "UBND thị xã", "UBND thành phố", "Chi nhánh VPĐKĐĐ huyện", "Chi nhánh VPĐKĐĐ TP", "Ủy ban nhân dân phường", "Ủy ban nhân dân xã", "Ủy ban nhân dân thị trấn" };
        string res = string.Empty;
        for (int i = 0; i < removeCharacters.Count; i++)
        {
            string removeCharacter = removeCharacters[i];
            if (tenDonVi.ToLower().Contains(removeCharacter.ToLower()))
            {
                res = tenDonVi.Substring(removeCharacter.Length);
            }
        }

        return res.Trim();
    }

    public static string GetTenDonViTraKetQua(string groupCatalog, string tenDonVi)
    {
        if (groupCatalog == GroupContants.XA_PHUONG || groupCatalog == GroupContants.QUAN_HUYEN)
        {
            return BoPhanTiepNhanVaTraKetQua + tenDonVi;
        }
        else if (groupCatalog == GroupContants.SO_BAN_NGANH)
        {
            return BoPhanTraKetQuaCua + " " + TrungTamPhucVuHanhChinhCong;
        }

        return string.Empty;
    }

    public static string GetTenTrangThaiHoSo(string trangThaiHoSoId)
    {
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
        {
            if (trangThaiHoSoId == "1")
                return "Mới đăng ký";
            if (trangThaiHoSoId == "2")
                return "Được tiếp nhận";
            if (trangThaiHoSoId == "3")
                return "Không được tiếp nhận";
            if (trangThaiHoSoId == "4")
                return "Đang xử lý";
            if (trangThaiHoSoId == "5")
                return "Yêu cầu bổ sung giấy tờ";
            if (trangThaiHoSoId == "6")
                return "Yêu cầu thực hiện nghĩa vụ tài chính";
            if (trangThaiHoSoId == "7")
                return "Công dân yêu cầu rút hồ sơ";
            if (trangThaiHoSoId == "8")
                return "Dừng xử lý";
            if (trangThaiHoSoId == "9")
                return "Đã xử lý xong";
            if (trangThaiHoSoId == "10")
                return "Đã trả kết quả";
        }

        return string.Empty;
    }
}
