using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Business;
public class NguoiXuLyHoSo : BaseEntity, IAggregateRoot
{
    public DefaultIdType NguoiXuLy { get; private set; }
    public DefaultIdType HoSoId { get; private set; }
    [MaxLength(2)]
    [Column(TypeName = "VARCHAR")]
    public string TrangThai { get; private set; }
    public NguoiXuLyHoSo () { }

    public NguoiXuLyHoSo(DefaultIdType nguoiXuLy, DefaultIdType hoSoId, string trangThai = NguoiXuLyHoSo_TrangThai.DangXuLy)
    {
        NguoiXuLy = nguoiXuLy;
        HoSoId = hoSoId;
        TrangThai = trangThai;
    }

    public void ChuyenTrangThai(string trangThai)
    {
        if (string.IsNullOrEmpty(trangThai))
        {
            throw new ArgumentException("Trang thái xử lý không được để trống");
        } else if(trangThai != NguoiXuLyHoSo_TrangThai.DangXuLy && trangThai != NguoiXuLyHoSo_TrangThai.DaXuLy)
        {
            throw new ArgumentException("Trang thái xử lý không hợp lệ");
        }
        TrangThai = trangThai;
    }

    public static class NguoiXuLyHoSo_TrangThai
    {
        public const string DangXuLy = "1";
        public const string DaXuLy = "2";
        public const string TrungGian = "3";
    }
}
