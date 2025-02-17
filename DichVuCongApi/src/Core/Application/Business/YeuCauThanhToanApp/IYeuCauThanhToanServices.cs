using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Common.Interfaces;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
public interface IYeuCauThanhToanServices : ITransientService
{
    Task<YeuCauThanhToanDetailDto> Get(DefaultIdType id);
    Task<InitDvcYeuCauThanhToanResponse> InitDvcPayment(InitDvcYeuCauThanhToanRequest request);
}
