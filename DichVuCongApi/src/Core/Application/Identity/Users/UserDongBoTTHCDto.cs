using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Identity.Users;
public class UserDongBoTTHCDto : IDto
{
    public string? Id { get; set; }

    public string? FullName { get; set; }
    public string? UserName { get; set; }
    public string? OfficeCode { get; set; }
    public string? UserOrder { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? OfficeName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
