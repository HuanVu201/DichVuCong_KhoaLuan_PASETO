namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class ThongBaoNopPhiThanhCongTrucTiepEvent : DomainEvent
{
    public DefaultIdType HoSoId { get; set; }
    public string NguoiNopTienBienLai { get; set; }
    public string SoDienThoaiNguoiNopTienBienLai { get; set; }
    public string MaHoSo { get; set; }
    public string TrichYeuHoSo { get; set; }
    public string SoGiayToNguoiNopTienBienLai { get; set; }
    public string SoGiayToChuHoSo { get; set; }
    public string? HinhThucThanhToan { get; set; }

    public ThongBaoNopPhiThanhCongTrucTiepEvent(DefaultIdType hoSoId, string maHoSo, string nguoiNopTienBienLai, string soGiayTo,
    string soDienThoaiNguoiNopTienBienLai, string trichYeuHoSo, string soGiayToChuHoSo, string? hinhThucThanhToan = null )
    {
        HoSoId = hoSoId;
        MaHoSo = maHoSo;
        NguoiNopTienBienLai = nguoiNopTienBienLai;
        TrichYeuHoSo = trichYeuHoSo;
        SoGiayToNguoiNopTienBienLai = soGiayTo;
        SoDienThoaiNguoiNopTienBienLai = soDienThoaiNguoiNopTienBienLai;
        SoGiayToChuHoSo = soGiayToChuHoSo;
        HinhThucThanhToan = hinhThucThanhToan;
    }
}
