using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Business.LogDeletedUserApp;
public class LogDeletedUserDto : IDto
{
    public DefaultIdType Id { get; set; }
   public string FullName { get; set; }
   public string NgayThangNamSinh { get; set; }
   public string OfficeName { get; set; }
   public string UserName { get; set; }
   public string GroupName { get; set; }
   public string GroupCode { get; set; }
   public string ThoiGianXoa { get; set; }
   public string PositionName { get; set; }
   public string MaDinhDanhOfficeCode { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
