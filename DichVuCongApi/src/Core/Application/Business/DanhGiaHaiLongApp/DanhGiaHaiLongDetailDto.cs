using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp;
public class DanhGiaHaiLongDetailDto
{
    public string MaHoSo { get;  set; }
    public string NguoiDanhGia { get;  set; }
    public DateTime? ThoiGianDanhGia { get;  set; }
    public string? DanhGia { get;  set; }
    public string? LoaiDanhGia { get; private set; }
  
}
