using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class ThongKeTrongNgayDto : IDto
{
    public string GroupName { get; set; }
    public string GroupCode { get; set; }
    public string GroupOrder { get; set; }
    public string MaDinhDanh { get; set; }
    public int TiepNhanTrongNgay { get; set; }
    public int TiepNhanTrucTiepTrongNgay { get; set; }
    public int TiepNhanTrucTuyenTrongNgay { get; set; }
    public int TiepNhanBCCITrongNgay { get; set; }
    public int CoKetQuaTrongNgay { get; set; }
    public int DaTraCongDanTrongNgay { get; set; }
    public int ThuPhiLePhiTrongNgay { get; set; }
    public int YeuCauBoSungTrongNgay { get; set; }
    public int YeuCauTraLaiXinRutTrongNgay { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
