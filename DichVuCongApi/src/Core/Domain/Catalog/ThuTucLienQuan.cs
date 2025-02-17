using System;
using System.ComponentModel.DataAnnotations;

namespace TD.DichVuCongApi.Domain.Catalog
{
    public class ThuTucLienQuan : AuditableEntity<DefaultIdType>, IAggregateRoot
    {
        // Các thuộc tính cần thiết
        public Guid ThuTucid { get; set; } 
        public Guid ThuTucLienQuanId { get;  set; } 
        public int ThuTu { get; set; }

        public ThuTucLienQuan() { }

        public ThuTucLienQuan(int thuTu, Guid thuTucid, Guid thuTucLienQuanId)
        {
            ThuTu = thuTu;
            ThuTucid = thuTucid;
            ThuTucLienQuanId = thuTucLienQuanId;
        }

        public static ThuTucLienQuan Create(int thuTu, Guid thuTucid, Guid thuTucLienQuanId)
        {
            return new(thuTu, thuTucid, thuTucLienQuanId);
        }

        public ThuTucLienQuan Update(int thuTu, Guid? thuTucid = null, Guid? thuTucLienQuanId = null)
        {
            if (thuTu != null)
                ThuTu = thuTu;
            if (thuTucid != null)
                ThuTucid = (Guid)thuTucid;
            if (thuTucLienQuanId != null)
                ThuTucLienQuanId = (Guid)thuTucLienQuanId;

            return this;
        }

        public ThuTucLienQuan SoftDelete()
        {
            DeletedOn = DateTime.UtcNow;
            return this;
        }

        public ThuTucLienQuan Restore()
        {
            DeletedOn = null;
            return this;
        }
    }
}
