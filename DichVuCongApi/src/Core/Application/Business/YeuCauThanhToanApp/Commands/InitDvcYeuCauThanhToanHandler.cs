using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.DvcPayment;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class InitDvcYeuCauThanhToanHandler : ICommandHandler<InitDvcYeuCauThanhToanRequest, InitDvcYeuCauThanhToanResponse>
{
    private readonly IYeuCauThanhToanServices _yeuCauThanhToanServices;
    private readonly IDvcPaymentServices _dvcPaymentServices;
    public InitDvcYeuCauThanhToanHandler(IYeuCauThanhToanServices yeuCauThanhToanServices, IDvcPaymentServices dvcPaymentServices)
    {
        _yeuCauThanhToanServices = yeuCauThanhToanServices;
        _dvcPaymentServices = dvcPaymentServices;
    }

    public async Task<Result<InitDvcYeuCauThanhToanResponse>> Handle(InitDvcYeuCauThanhToanRequest request, CancellationToken cancellationToken)
    {
        if(request.Id == null) throw new ArgumentNullException(nameof(request.Id));
        var dvcPaymentSettings = await _yeuCauThanhToanServices.Get(request.Id);
        throw new NotImplementedException();
    }
}

