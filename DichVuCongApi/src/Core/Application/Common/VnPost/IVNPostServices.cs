using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.VnPost;
public interface IVNPostServices : ITransientService
{
    Task<RespondLGSP> Create(OrderLGSPWithItemCode orderLGSPWithItemCode);
    Task<RespondLGSP> CreateWithoutItemCode(OrderLGSPWithItemCode orderLGSPWithItemCode);
    VNPostSettings Get();
}
