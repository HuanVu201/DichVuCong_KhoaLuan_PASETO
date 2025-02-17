namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Dto;
public class DetailThuTucDto : IDto
{
    public Guid Id { get; set; }
    public string TenTTHC { get; set; }
    public string MaTTHC { get; set; }
    public string GoiTinThuTucQG { get; set; }
    public bool LaThuTucChungThuc { get; set; }
    public string LinhVucChinh { get; set; }
    public string CapThucHien { get; set; }
    public string MaKetQuaChinh { get; set; }
    public string MucDo { get; set; }
    public string HoSoPhatSinhTrongNam { get; set; }
    public bool ChoPhepLayFileTuTHPS { get; set; }
}
