namespace TD.DichVuCongApi.Domain.Business;
public class DuLieuThongKeHoSo : BaseEntity<DefaultIdType>, IAggregateRoot
{
    public int TongSoHoSo { get; private set; }
    public int HoSoTuKyTruoc { get; private set; }
    public int HoSoMoiTiepNhan { get; private set; }
    public int TongSoHoSoDaXuLy { get; private set; }
    public int HoSoDaXuLyDungHan { get; private set; }
    public int HoSoDaXuLyQuaHan { get; private set; }
    public int Thang { get; private set; }
    public int Nam { get; private set; }

    public DuLieuThongKeHoSo () { }


    public DuLieuThongKeHoSo(int tongSoHoSo, int hoSoTuKyTruoc, int hoSoMoiTiepNhan, int tongSoHoSoDaXuLy, int hoSoDaXuLyDungHan, int hoSoDaXuLyQuaHan)
    {
        TongSoHoSo = tongSoHoSo;
        HoSoTuKyTruoc = hoSoTuKyTruoc;
        HoSoMoiTiepNhan = hoSoMoiTiepNhan;
        TongSoHoSoDaXuLy = tongSoHoSoDaXuLy;
        HoSoDaXuLyDungHan = hoSoDaXuLyDungHan;
        HoSoDaXuLyQuaHan = hoSoDaXuLyQuaHan;
        Thang = DateTime.Now.Month;
        Nam = DateTime.Now.Year;
    }

    public DuLieuThongKeHoSo Update(int? tongSoHoSo, int? hoSoTuKyTruoc, int? hoSoMoiTiepNhan, int? tongSoHoSoDaXuLy, int? hoSoDaXuLyDungHan, int? hoSoDaXuLyQuaHan)
    {
        if(tongSoHoSo != null)
            TongSoHoSo = (int)tongSoHoSo;
        if(hoSoTuKyTruoc != null)
            HoSoTuKyTruoc = (int)hoSoTuKyTruoc;
        if (hoSoMoiTiepNhan != null)
            HoSoMoiTiepNhan = (int)hoSoMoiTiepNhan;
        if (tongSoHoSoDaXuLy != null)
            TongSoHoSoDaXuLy = (int)tongSoHoSoDaXuLy;
        if (hoSoDaXuLyDungHan != null)
            HoSoDaXuLyDungHan = (int)hoSoDaXuLyDungHan;
        if (hoSoDaXuLyQuaHan != null)
            HoSoDaXuLyQuaHan = (int)hoSoDaXuLyQuaHan;
        return this;
    }

}
