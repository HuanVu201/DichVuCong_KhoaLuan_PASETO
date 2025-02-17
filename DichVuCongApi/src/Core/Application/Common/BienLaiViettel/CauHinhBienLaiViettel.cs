namespace TD.DichVuCongApi.Application.Common.BienLaiViettel;
public class CauHinhBienLaiViettel
{
    public string username { get; set; }
    public string password { get; set; }
    public string serial { get; set; }
    public string pattern { get; set; }
    public bool? isCache { get; set; } = true;
}
