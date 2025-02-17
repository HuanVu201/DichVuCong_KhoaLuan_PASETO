using MediatR;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Common.Business;
public class CaculateTime
{
    private readonly double _gioLamViecBuoiSang;
    private readonly double _gioNghiBuoiSang;
    private readonly double _gioLamViecBuoiChieu;
    private readonly double _gioNghiBuoiChieu;
    private readonly IInjectConfiguration _injectConfiguration;
    private readonly bool _tinhNgayHenTraLoaiThoiGianNgayBoQuaNgayLe = false;

    public CaculateTime(IInjectConfiguration injectConfiguration)
    {
        _gioLamViecBuoiSang = injectConfiguration.GetValue<double?>("DEFAULT_GIOLAMVIECBUOISANG") ?? 7;
        _gioNghiBuoiSang = injectConfiguration.GetValue<double?>("DEFAULT_GIONGHIBUOISANG") ?? 11.5;
        _gioLamViecBuoiChieu = injectConfiguration.GetValue<double?>("DEFAULT_GIOLAMVIECBUOICHIEU") ?? 13.5;
        _gioNghiBuoiChieu = injectConfiguration.GetValue<double?>("DEFAULT_GIONGHIBUOICHIEU") ?? 17;

        bool? tinhNgayHenTraLoaiThoiGianNgayBoQuaNgayLe = injectConfiguration.GetValue<bool?>("GLOBAL_CONFIG:TinhNgayHenTraLoaiThoiGianNgayBoQuaNgayLe");
        _tinhNgayHenTraLoaiThoiGianNgayBoQuaNgayLe = (tinhNgayHenTraLoaiThoiGianNgayBoQuaNgayLe == false || tinhNgayHenTraLoaiThoiGianNgayBoQuaNgayLe == null) ? false : true;

    }
    public DateTime? GetNgayHenTraBoSung(DateTime? ngayHenTra, DateTime? ngayYeuCauBoSung, IReadOnlyList<NgayNghi> ngayNghis, DateTime currentTime)
    {
        if(!ngayHenTra.HasValue || ngayHenTra == default || !ngayYeuCauBoSung.HasValue || ngayYeuCauBoSung == default)
        {
            return null;
        }
        try
        {
            var ngayHenTraNotNull = (DateTime)ngayHenTra;
            ngayHenTra = ngayHenTraNotNull.AddDays(currentTime.Subtract((DateTime)ngayYeuCauBoSung).TotalDays - 1);
            //if (ngayHenTraNotNull.DayOfWeek == DayOfWeek.Saturday) ngayHenTra = ngayHenTraNotNull.AddDays(2);
            //else if (ngayHenTraNotNull.DayOfWeek == DayOfWeek.Sunday) ngayHenTra = ngayHenTraNotNull.AddDays(1);
            //return ngayHenTra;
            ngayHenTra = TinhNgayHenTra(ngayNghis, (DateTime)ngayHenTra, 8, "Ngày làm việc");
            return ngayHenTra;
        }
        catch
        {
            return null;
        }
    }

    public double GetThoiGianXuLy(ReactFlowNodeQuyTrinhXuLy node, string kenhThucHien)
    {
        double thoiGianXuLy = node.data.thoiGianXuLy;
        if (kenhThucHien == "2")
        {
            thoiGianXuLy = (double)(node.data.thoiGianThucHienTrucTuyen != null ? node.data.thoiGianThucHienTrucTuyen : 0);
        }
        return thoiGianXuLy;
    }
    public double GetThoiGianXuLy(TruongHopThuTuc truongHopThuTuc, string kenhThucHien)
    {

        double thoiGianXuLy = truongHopThuTuc.ThoiGianThucHien ?? 2;
        if (kenhThucHien == "2")
        {
            thoiGianXuLy = (double)(truongHopThuTuc.ThoiGianThucHienTrucTuyen != null ? truongHopThuTuc.ThoiGianThucHienTrucTuyen : 2);
        }
        return thoiGianXuLy;
    }

    public DateTime TinhNgayHenTra(IReadOnlyList<NgayNghi> ngayNghis, DateTime NgayTiepNhan, double ThoiGianXuLy, string LoaiThoiGian)
    {

        return TinhNgayHenTra(ngayNghis, NgayTiepNhan, ThoiGianXuLy, LoaiThoiGian, _gioLamViecBuoiSang, _gioNghiBuoiSang, _gioLamViecBuoiChieu, _gioNghiBuoiChieu);
    }
    public DateTime TinhNgayHenTra(IReadOnlyList<NgayNghi> ngayNghis, DateTime NgayTiepNhan, double ThoiGianXuLy, string LoaiThoiGian, double GioLamViecBuoiSang, double GioNghiBuoiSang, double GioLamViecBuoiChieu, double GioNghiBuoiChieu)
    {
        DateTime res = new DateTime();
        try
        {
            //LogDVC.Debug("NgayTiepNhan_TinhHenTra" + NgayTiepNhan);

            //DataTable dtNgayNghi = null;
            //if (colNgayNghi.Count > 0) dtNgayNghi = colNgayNghi.GetDataTable();
            //Tính số ngày làm việc
            int thoiGianXL_Ngay = (int)ThoiGianXuLy / 8;
            var thoiGianXL_Gio = ThoiGianXuLy % 8;

            //Cộng với ngày tiếp nhận
            var dtNgayTiepNhan = new DateTime();
            var dtNgayHenTra = new DateTime();
            double gioTiepNhan = 0;
            double gioHenTra = 0;
            dtNgayTiepNhan = NgayTiepNhan;
            dtNgayHenTra = dtNgayTiepNhan;

            //Giờ tiếp nhận					
            gioTiepNhan = dtNgayTiepNhan.Hour + (double)dtNgayTiepNhan.Minute / 60;
            if (gioTiepNhan > GioNghiBuoiChieu) //Nếu sau giờ nghỉ buổi chiều tính vào giờ làm việc buổi sáng hôm sau 
            {
                dtNgayTiepNhan = dtNgayTiepNhan.Date.AddHours(GioLamViecBuoiSang);
                thoiGianXL_Ngay += 1;
            }
            else if (gioTiepNhan < GioLamViecBuoiSang) //Nếu trước giờ làm việc buổi sáng tính vào giờ làm việc buổi sáng
            {
                dtNgayTiepNhan = dtNgayTiepNhan.Date.AddHours(GioLamViecBuoiSang);
            }
            else if (gioTiepNhan < GioLamViecBuoiChieu && gioTiepNhan > GioNghiBuoiSang) //Nếu sau giờ nghỉ trưa và trước giờ làm việc buổi chiều tính vào giờ làm việc buổi chiều
            {
                dtNgayTiepNhan = dtNgayTiepNhan.Date.AddHours(GioLamViecBuoiChieu);
            }


            gioTiepNhan = dtNgayTiepNhan.Hour + (double)dtNgayTiepNhan.Minute / 60;
            //Giờ xử lý
            if (thoiGianXL_Gio > 0)
            {
                double gioXuLy = gioTiepNhan + thoiGianXL_Gio;

                //Trường hợp qua buổi trưa thì cộng thời gian buổi trưa
                if (gioXuLy > GioNghiBuoiSang && gioTiepNhan < GioNghiBuoiSang)
                {
                    gioXuLy = gioXuLy + GioLamViecBuoiChieu - GioNghiBuoiSang;
                }

                if (gioXuLy > GioNghiBuoiChieu) //Qua ngày hôm sau
                {
                    gioHenTra = gioXuLy - GioNghiBuoiChieu + GioLamViecBuoiSang;
                    thoiGianXL_Ngay++;
                }
                else if (GioLamViecBuoiChieu > gioXuLy && gioXuLy > GioNghiBuoiSang) // trong giờ nghỉ trưa
                {
                    gioHenTra += GioLamViecBuoiChieu - GioNghiBuoiSang + thoiGianXL_Gio;
                }
                else
                    gioHenTra = gioXuLy;
            }
            else
                gioHenTra = gioTiepNhan;
            //Ngày xử lý
            if (thoiGianXL_Ngay > 0)
            {
                while (thoiGianXL_Ngay > 0)
                {
                    dtNgayHenTra = dtNgayHenTra.AddDays(1);
                    if (LoaiThoiGian.ToLower() == "ngày")
                    {
                        if (_tinhNgayHenTraLoaiThoiGianNgayBoQuaNgayLe)
                        {
                            thoiGianXL_Ngay += KiemTraNgayLeDVC(dtNgayHenTra, ngayNghis);
                        }
                    }
                    else
                    {
                        thoiGianXL_Ngay += KiemTraNgayNghiDVC(dtNgayHenTra, ngayNghis);
                    }
                    thoiGianXL_Ngay -= 1;
                }
            }
            dtNgayHenTra = dtNgayHenTra.Date.AddHours(gioHenTra);

            // trả về kết quả
            res = dtNgayHenTra;
            if(LoaiThoiGian.ToLower() == "ngày")
            {
                // không trả vào ngày nghỉ
                while (res.DayOfWeek == DayOfWeek.Saturday || res.DayOfWeek == DayOfWeek.Sunday || ngayNghis.Any(x => x.Date.LocalDateTime.Date == res.Date && x.Date.LocalDateTime.Month == res.Month && x.Date.LocalDateTime.Year == res.Year))
                {
                    res = res.AddDays(1);
                }
            }
        }
        catch (Exception ex)
        {
        }
        return res;
    }
    public static int KiemTraNgayNghiDVC(DateTime ngay, IReadOnlyList<NgayNghi> ngayNghis)
    {
        try
        {
            if (ngay.DayOfWeek == DayOfWeek.Saturday || ngay.DayOfWeek == DayOfWeek.Sunday)
            {
                return 1;
            }
            else
            {
                bool checkNgayghi = false;
                if (ngayNghis != null)
                {
                    var isNgayNghi = ngayNghis.Any(x => x.Date.LocalDateTime.Date == ngay.Date && x.Date.LocalDateTime.Month == ngay.Month && x.Date.LocalDateTime.Year == ngay.Year);
                    checkNgayghi = isNgayNghi;
                }
                if (checkNgayghi) return 1;
                else return 0;
            }
        }
        catch
        {
        }
        return 0;
    }

    public static int KiemTraNgayLeDVC(DateTime ngay, IReadOnlyList<NgayNghi> ngayNghis)
    {
        try
        {
            bool checkNgayghi = false;
            if (ngayNghis != null)
            {
                var isNgayNghi = ngayNghis.Any(x => x.Date.LocalDateTime.Date == ngay.Date && x.Date.LocalDateTime.Month == ngay.Month && x.Date.LocalDateTime.Year == ngay.Year);
                checkNgayghi = isNgayNghi;
            }
            if (checkNgayghi) return 1;
            else return 0;
        }
        catch
        {
        }
        return 0;
    }


    /// <summary>
    /// Trả về true nếu hồ sơ đã hết hạn bổ sung
    /// </summary>
    /// <param name="ThoiHanBoSung"></param>
    /// <param name="NgayYeuCauBoSung"></param>
    /// <returns></returns>
    public static bool CalculateDaHetHanBoSung(int? ThoiHanBoSung, DateTime? NgayYeuCauBoSung)
    {
        if(ThoiHanBoSung == null) return true;
        if(NgayYeuCauBoSung == null) return false;
        // Lấy thời điểm hiện tại
        DateTime currentDate = DateTime.Now;
        var _NgayYeuCauBoSung = (DateTime)NgayYeuCauBoSung;
        var _ThoiHanBoSung = (int)ThoiHanBoSung;
        // Thực hiện logic kiểm tra
        bool result = (currentDate - _NgayYeuCauBoSung.AddDays(_ThoiHanBoSung)).Days > 0 ? true : false;

        return result;
    }
}
