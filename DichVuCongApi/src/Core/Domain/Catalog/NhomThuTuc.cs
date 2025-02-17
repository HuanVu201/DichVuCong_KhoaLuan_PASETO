using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Catalog
{
    // Lớp NhomThuTuc đại diện cho một nhóm thủ tục trong hệ thống
    public class NhomThuTuc : BaseEntity<DefaultIdType>, IAggregateRoot
    {
        [Required]
        [MaxLength(255)]
        public string Ten { get; private set; }

        [MaxLength(500)]
        public string? MoTa { get; private set; }

        [MaxLength(255)]
        public string? Icon { get; private set; }

        [MaxLength(50)]
        public string? MauSac { get; private set; }

        public string? DoiTuong { get; private set; }

        public int ThuTu { get; private set; }

        // Thời gian khi đối tượng bị xóa mềm
        public DateTime? DeletedOn { get; private set; }

        // ID của người dùng đã xóa đối tượng
        public DefaultIdType? DeletedBy { get; private set; }

        // Constructor để khởi tạo đối tượng NhomThuTuc
        public NhomThuTuc(string ten, string? moTa, string? icon, string? mauSac, string? doiTuong, int thuTu)
        {
            Ten = ten;
            MoTa = moTa;
            Icon = icon;
            MauSac = mauSac;
            DoiTuong = doiTuong;
            ThuTu = thuTu;
        }

        // Phương thức tạo đối tượng NhomThuTuc
        public static NhomThuTuc Create(string ten, string? moTa, string? icon, string? mauSac, string? doiTuong, int thuTu)
        {
            return new NhomThuTuc(ten, moTa, icon, mauSac, doiTuong, thuTu);
        }

        // Phương thức để cập nhật các thuộc tính của NhomThuTuc
        public NhomThuTuc Update(string? ten, string? moTa, string? icon, string? mauSac, string? doiTuong, int? thuTu)
        {
            if (!string.IsNullOrEmpty(ten) && !Ten.Equals(ten))
                Ten = ten;
            if (!string.IsNullOrEmpty(moTa) && !MoTa.Equals(moTa))
                MoTa = moTa;
            if (!string.IsNullOrEmpty(icon) && !Icon.Equals(icon))
                Icon = icon;
            if (!string.IsNullOrEmpty(mauSac) && !MauSac.Equals(mauSac))
                MauSac = mauSac;
            if (!string.IsNullOrEmpty(doiTuong) && !DoiTuong.Equals(doiTuong))
                DoiTuong = doiTuong;
            if (thuTu.HasValue && ThuTu != thuTu.Value)
                ThuTu = thuTu.Value;

            return this;
        }

        // Phương thức để xóa mềm đối tượng NhomThuTuc
        public NhomThuTuc SoftDelete()
        {
            DeletedOn = DateTime.UtcNow;
            return this;
        }

        // Phương thức để khôi phục đối tượng NhomThuTuc từ trạng thái bị xóa mềm
        public NhomThuTuc Restore()
        {
            DeletedOn = null;
            DeletedBy = null;
            return this;
        }
    }
}
