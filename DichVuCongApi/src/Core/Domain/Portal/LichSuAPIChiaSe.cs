using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Portal;
public class LichSuAPIChiaSe : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string ApiChiaSe { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string IP { get; set; }
    public LichSuAPIChiaSe() { }
    public LichSuAPIChiaSe(string? apiChiaSe, string? ip)
    {
        ApiChiaSe = apiChiaSe;
        IP = ip;
    }

    public static LichSuAPIChiaSe Create(string? apiChiaSe, string? ip)
    {
        return new LichSuAPIChiaSe(apiChiaSe, ip);
    }
}
