using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Catalog
{
    // Lớp ThuTucThuocLoai đại diện cho mối quan hệ giữa thủ tục và loại thủ tục trong hệ thống
    public class ThuTucThuocLoai : BaseEntity<DefaultIdType>, IAggregateRoot
    {
        // ID của thủ tục
        public Guid? ThuTucID { get; private set; }

        // Thứ tự của thủ tục trong loại thủ tục
        public int ThuTu { get; private set; }

        // ID của loại thủ tục mà thủ tục thuộc về
        public Guid? LoaiThuTucId { get; private set; }

        // Thời gian khi đối tượng bị xóa mềm
        public DateTime? DeletedOn { get; private set; }



        // Constructor để khởi tạo đối tượng ThuTucThuocLoai
        public ThuTucThuocLoai() { }
        public ThuTucThuocLoai(Guid thuTucID, int thuTu, Guid loaiThuTucId)
        {
            ThuTucID = thuTucID;
            ThuTu = thuTu;
            LoaiThuTucId = loaiThuTucId;
        }

        // Phương thức tạo đối tượng ThuTucThuocLoai
        public static ThuTucThuocLoai Create(DefaultIdType thuTucID, int thuTu, DefaultIdType loaiThuTucId)
        {
            return new ThuTucThuocLoai(thuTucID, thuTu, loaiThuTucId);
        }

        // Phương thức để cập nhật các thuộc tính của ThuTucThuocLoai
        public ThuTucThuocLoai Update(int? thuTu)
        {
            if (thuTu.HasValue && ThuTu != thuTu.Value)
                ThuTu = thuTu.Value;

            return this;
        }

        // Phương thức để xóa mềm đối tượng ThuTucThuocLoai
        public ThuTucThuocLoai SoftDelete()
        {
            DeletedOn = DateTime.UtcNow;
            return this;
        }

        // Phương thức để khôi phục đối tượng ThuTucThuocLoai từ trạng thái bị xóa mềm
        public ThuTucThuocLoai Restore()
        {
            DeletedOn = null;
            return this;
        }
    }
}
