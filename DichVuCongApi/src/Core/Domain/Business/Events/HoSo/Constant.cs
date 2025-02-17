using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business.Events;
public static class HoSoConstant
{
    public static readonly string TrangThaiBoSungMotCua = "Yêu cầu một cửa bổ sung";
    public static readonly string TrangThaiBoSungCongDan = "Yêu cầu công dân bổ sung";
    public static readonly string TrangThaiDaBoSungCongDan = "Công dân đã gửi bổ sung";
    public static readonly string HoanThanhBoSung = "Hoàn thành bổ sung";
    public static readonly string TrangThaiBoSungChoTiepNhan = "Chờ bổ sung tiếp nhận";

}

public static class TrangThaiSoHoaConstant
{
    public static readonly string ChuaSoHoa = "0";
    public static readonly string DuocSoHoa = "1";
    public static readonly string TaiSuDungTuThanhPhanHoSoKhac = "2";
    public static readonly string TaiSuDungTuKetQuaHoSoKhac = "3";
}

public static class LoaiChuHoSoConstant
{
    public static readonly string CongDan = "Công dân";
    public static readonly string DoanhNghiep = "Doanh nghiệp";
    public static readonly string CoQuanNhaNuoc = "Cơ quan nhà nước";
    public static readonly string ToChuc = "Tổ chức";
    public static readonly string Khac = "Khác";
}
public class TrangThaiTraKetQuaHoSoConstant
{
    public readonly string CHO_XAC_NHAN = "1";
    public readonly string CO_KET_QUA = "2";
    public readonly string DA_CHUYEN_TRA_KQ = "3";
}
public class TrangThaiTraKetQuaHBCCIConstant
{
    public readonly string DA_CHUYEN_TRA_KQ = "1";
}
public static class TrangThaiTheoDoiHoSoConstant
{
    public static readonly string CHO_TIEP_NHAN = "cho-tiep-nhan";
    public static readonly string DA_TIEP_NHAN = "da-tiep-nhan";
    public static readonly string DA_NOP_PHI_CHO_TIEP_NHAN = "da-nop-phi-cho-tiep-nhan";
    public static readonly string KHONG_DU_DIEU_KIEN_TIEP_NHAN = "khong-du-dieu-kien-tiep-nhan";
    public static readonly string CHO_NOP_PHI_THU_TRUOC_CHO_TIEP_NHAN = "cho-nop-phi-thu-truoc-cho-tiep-nhan";
    public static readonly string DA_VA_DANG_XU_LY = "da-va-dang-xu-ly";

}
public static class TrangThaiHoSoConstants
{
    public static readonly string CHO_TIEP_NHAN = "'1'";
    public static readonly string KHONG_DU_DIEU_KIEN_TIEP_NHAN = "'3'";
    public static readonly string DA_TIEP_NHAN = "'4','5','6','7'";
    public static readonly string DA_VA_DANG_XU_LY = "'4','9'";
}