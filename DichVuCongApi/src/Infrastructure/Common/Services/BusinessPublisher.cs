using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Common.Publisher;

namespace TD.DichVuCongApi.Infrastructure.Common.Services;
public partial class BusinessPublisher : IBusinessPublisher
{
    private readonly IHoSoServices _hoSoServices;

    public BusinessPublisher(IHoSoServices hoSoServices)
    {
        _hoSoServices = hoSoServices;
    }

    public Task PublishAsync<TBusinessEvent>(TBusinessEvent bussinessEvent)
    {
        throw new NotImplementedException();
    }
}
