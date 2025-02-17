using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
using TD.DichVuCongApi.Domain.Business;


namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
public class UpdateThanhPhanThuTucCSDLCommand : ICommand
{
    public string TruongHopId { get; set; }    
    public string ThuTucId { get; set; }    
    public List<AddThanhPhanThuTucParams> dataAdd { get; set; }

}

public class AddThanhPhanThuTucParams
{
    public string TenGiayTo { get; set; }
    public string? MaGiayTo { get; set; }
    public string? MaGiayToKhoQuocGia { get; set; }
    public string? TenMauDon { get; set; }
    public bool BatBuoc { get; set; } = false;
    public int? SoBanChinh { get; set; }
    public int? SoBanSao { get; set; }
    public int? STT { get; set; }
    public bool? ChoPhepThemToKhai { get; set; }
}
