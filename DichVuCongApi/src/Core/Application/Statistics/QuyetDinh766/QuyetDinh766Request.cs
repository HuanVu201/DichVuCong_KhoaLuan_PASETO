using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
public class QuyetDinh766Request 
{
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? Catalog { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public bool? cache { get; set; } = true;
}
