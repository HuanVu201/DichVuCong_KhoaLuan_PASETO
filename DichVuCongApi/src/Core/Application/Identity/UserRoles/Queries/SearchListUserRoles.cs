using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Models;

namespace TD.DichVuCongApi.Application.Identity.UserRoles.Queries;
public class SearchListUserRoles : PaginationFilter, IRequest<PaginationResponse<UserRolesDetailDto>>
{
    public string? GroupCode { get; set; }
    public string? OfficeCode { get; set; }
    public bool? IsActive { get; set; }
    public string? PositionName { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? RoleId { get; set; }
    public bool? Removed { get; set; }
}
