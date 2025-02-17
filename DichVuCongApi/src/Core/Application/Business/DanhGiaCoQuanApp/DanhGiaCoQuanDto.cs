using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp;
public class DanhGiaCoQuanDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string? DonVi { get; private set; }
    public string? DonViText { get; private set; }
    public string? MaNhomCha { get; private set; }
    public string? GroupCode { get; private set; }
    public string? MaNhomChaText { get; private set; }
    public bool? DongBo { get; private set; }
    public string? Quy { get; private set; }
    public string? Nam { get; private set; }
    public string? TraLoi1 { get; private set; }
    public string? TraLoi2 { get; private set; }
    public string? TraLoi3 { get; private set; }
    public string? TraLoi4 { get; private set; }
    public string? TraLoi5 { get; private set; }
    public string? TraLoi6 { get; private set; }
    public string? TraLoi7 { get; private set; }
    public string? TraLoi8 { get; private set; }
    public string? TraLoi9 { get; private set; }
    public string? TraLoi10 { get; private set; }
    public string? TraLoi11 { get; private set; }
    public string? SoPhieu { get; private set; }    
    public string? KHLChiSo10 { get; private set; }    
    public string? HLChiSo10 { get; private set; }    
    public string? RHLChiSo10 { get; private set; }    
    public string? KHLChiSo11 { get; private set; }    
    public string? HLChiSo11 { get; private set; }    
    public string? RHLChiSo11 { get; private set; }    
    public string? TongDiem { get; private set; }
    public string? PhongBan { get; private set; }
    public string? LyDoTruDiem { get; private set; }
    public string? MaHoSo { get; private set; }
    public string? HinhThucDanhGia { get; private set; }
    public string? MucDoRHL { get; private set; }
    public string? MucDoHL { get; private set; }
    public string? MucDoBT { get; private set; }
    public string? MucDoKHL { get; private set; }
    public string? MucDoRKHL { get; private set; }
    public string? ThamDinhTraLoi1 { get; private set; }
    public string? ThamDinhTraLoi2 { get; private set; }
    public string? ThamDinhTraLoi3 { get; private set; }
    public string? ThamDinhTraLoi4 { get; private set; }
    public string? ThamDinhTraLoi5 { get; private set; }
    public string? ThamDinhTraLoi6 { get; private set; }
    public string? ThamDinhTraLoi7 { get; private set; }
    public string? ThamDinhTraLoi8 { get; private set; }
    public string? ThamDinhTraLoi9 { get; private set; }
    public string? ThamDinhTraLoi10 { get; private set; }
    public string? ThamDinhTraLoi11 { get; private set; }
    public string? XepLoai { get; private set; }
    public string? XepHang { get; private set; }
    public string? OfGroupCode { get; private set; }
    public string? OfGroupName { get; private set; }
    public string? GroupName { get; private set; }
    public bool? TongDonViCon { get; private set; }



    [JsonIgnore]
    public int TotalCount { get; set; }
}
