namespace TD.DichVuCongApi.Application.Common.Sms;
public class SMSRequest
{
    public string soDienThoai { get; set; }
    public string noiDungthamSo { get; set; }
    public string? idMauTin { get; set; }
    public string? gioGui { get; set; }
    public string? maPhanMem { get; set; }
    public string? nhaMang { get; set; }
    public string MaHoSo { get; init; }
    public string DonVi { get; init; }
    public SMSRequest() { }
    public SMSRequest(string _soDienThoai, string _noiDungthamSo, string maHoSo, string donVi)
    {
        soDienThoai = _soDienThoai;
        noiDungthamSo = _noiDungthamSo;
        MaHoSo = maHoSo;
        DonVi = donVi;
    }
    public SMSRequest(string _soDienThoai, string _noiDungthamSo, string? _idMauTin, string? _gioGui, string? _maPhanMem, string? _nhaMang)
    {
        soDienThoai = _soDienThoai;
        noiDungthamSo = _noiDungthamSo;
        idMauTin = _idMauTin;
        gioGui = _gioGui;
        maPhanMem = _maPhanMem;
        nhaMang = _nhaMang;
    }
}
