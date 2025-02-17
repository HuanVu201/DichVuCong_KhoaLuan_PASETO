using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp;
public class KhoLuuTruCongDanDto : IDto
{
    public Guid Id { get; set; }
    public string? SoDinhDanh { get; set; }
    public double TongDungLuong { get; set; }
    public int SoLuong { get; set; }

}
