using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Catalog
{
    // Lớp LoaiThuTuc đại diện cho một loại thủ tục trong hệ thống
    public class LoaiThuTuc : BaseEntity<DefaultIdType>, IAggregateRoot
    {
        // ID của nhóm thủ tục mà loại thủ tục thuộc về
        public Guid NhomThuTucId { get; private set; }

        [Required]
        [MaxLength(255)]
        public string Ten { get; private set; }

        [MaxLength(500)]
        public string? MoTa { get; private set; }

        public int ThuTu { get; private set; }

        // Thời gian khi đối tượng bị xóa mềm
        public DateTime? DeletedOn { get; private set; }

        // ID của người dùng đã xóa đối tượng
        public Guid? DeletedBy { get; private set; }

        // Constructor để khởi tạo đối tượng LoaiThuTuc
        public LoaiThuTuc(Guid nhomThuTucId, string ten, string? moTa, int thuTu)
        {
            NhomThuTucId = nhomThuTucId;
            Ten = ten;
            MoTa = moTa;
            ThuTu = thuTu;
        }

        // Phương thức tạo đối tượng LoaiThuTuc
        public static LoaiThuTuc Create(Guid nhomThuTucId, string ten, string? moTa, int thuTu)
        {
            return new LoaiThuTuc(nhomThuTucId, ten, moTa, thuTu);
        }

        // Phương thức để cập nhật các thuộc tính của LoaiThuTuc
        public LoaiThuTuc Update(string? ten, string? moTa, int? thuTu)
        {
            if (!string.IsNullOrEmpty(ten) && !Ten.Equals(ten))
                Ten = ten;
            if (!string.IsNullOrEmpty(moTa) && !MoTa.Equals(moTa))
                MoTa = moTa;
            if (thuTu.HasValue && ThuTu != thuTu.Value)
                ThuTu = thuTu.Value;

            return this;
        }

        // Phương thức để xóa mềm đối tượng LoaiThuTuc
        public LoaiThuTuc SoftDelete()
        {
            DeletedOn = DateTime.UtcNow;
            return this;
        }

        // Phương thức để khôi phục đối tượng LoaiThuTuc từ trạng thái bị xóa mềm
        public LoaiThuTuc Restore()
        {
            DeletedOn = null;
            return this;
        }
    }
}
