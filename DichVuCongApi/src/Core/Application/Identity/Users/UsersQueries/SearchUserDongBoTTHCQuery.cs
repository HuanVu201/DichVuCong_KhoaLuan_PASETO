using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.Identity.Users.UsersQueries;
public class SearchUserDongBoTTHCQuery : PaginationFilter, IRequest<PaginationResponse<UserDongBoTTHCDto>>
{
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? DonViQuanLy { get; set; }
    public string? GroupCode { get; set; }
    public string? TypeUser { get; set; }
    public bool? LaCanBoTiepNhan { get; set; }
    public string? OfficeCode { get; set; }
    public bool? Removed { get; set; } = false;

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 50;
    public new int PageNumber { get; set; } = 1;
}
