using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
public class ChatBotSearchGroup : PaginationFilter, IRequest<PaginationResponse<PortalGroupDto>>
{
    public DefaultIdType? ID { get; set; }
    public string SearchKeys { get; set; }
    public string? Catalog { get; set; }
    public bool? Removed { get; set; } = false;

}
