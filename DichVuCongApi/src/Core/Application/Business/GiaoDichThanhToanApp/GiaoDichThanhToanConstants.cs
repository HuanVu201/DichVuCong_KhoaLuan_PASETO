using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp;
public class GiaoDichThanhToanConstants
{
    public readonly TrangThaiGiaoDichThanhToan TRANG_THAI = new TrangThaiGiaoDichThanhToan();
    public readonly MaLoiGiaoDichThanhToan MA_LOI = new MaLoiGiaoDichThanhToan();
}
public class TrangThaiGiaoDichThanhToan
{
    public readonly string KHOI_TAO = "khoi-tao";
    public readonly string THANH_CONG = "thanh-cong";
    public readonly string THAT_BAI = "that-bai";
}
public class MaLoiGiaoDichThanhToan
{
   
    public readonly string THANH_CONG = "00";
   
}