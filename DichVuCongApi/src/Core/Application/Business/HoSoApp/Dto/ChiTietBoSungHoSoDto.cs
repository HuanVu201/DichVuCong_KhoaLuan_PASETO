using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class ChiTietBoSungHoSoDto : HoSoPer, IDto
{

    public ChiTietBoSungHoSoDto()
    {
        ThanhPhanHoSos = new List<ThanhPhanHoSoDto>();
    }

    public Guid Id { get; set; }
    public string? NoiDungBoSung { get; set; }
    public string? LyDoBoSung { get; set; }
    public string? MaHoSo { get; set; }
    public int? ThoiHanBoSung { get; set; }
    public string? DinhKemBoSung { get; set; }
    public string? ThongTinTiepNhanBoSung { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? HanBoSung { get; set; }
    public List<ThanhPhanHoSoDto> ThanhPhanHoSos {get;set;}
}
