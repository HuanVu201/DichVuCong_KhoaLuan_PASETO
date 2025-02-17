using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;
using TD.DichVuCongApi.Domain.Portal;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Queries;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Portal.LichSuAPIChiaSeApp.Commands;



public class AddLichSuAPIChiaSeCommandHandler : ICommandHandler<AddLichSuAPIChiaSeCommand, Guid>
{
    private readonly IRepositoryWithEvents<LichSuAPIChiaSe> _repositoryWithEvents;
    private readonly IReadRepository<APIChiaSe> _readRepository;
    private readonly IMediator _mediator;
    public AddLichSuAPIChiaSeCommandHandler(IRepositoryWithEvents<LichSuAPIChiaSe> repositoryWithEvents, IReadRepository<APIChiaSe> readRepository, IMediator mediator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _readRepository = readRepository;
        _mediator = mediator;
    }

    public class GetApiChiaSeByMaSpec : Specification<APIChiaSe>, ISingleResultSpecification
    {
        public GetApiChiaSeByMaSpec(string ApiChiaSe)
        {
            Query.Where(x => x.MaApiChiaSe == ApiChiaSe);
        }
    }

    internal string GetLocalIPAddress()
    {
        var host = Dns.GetHostEntry(Dns.GetHostName());
        foreach (var ip in host.AddressList)
        {
            if (ip.AddressFamily == AddressFamily.InterNetwork)
            {
                return ip.ToString();
            }
        }

        throw new Exception("No network adapters with an IPv4 address in the system!");
    }


    public async Task<Result<DefaultIdType>> Handle(AddLichSuAPIChiaSeCommand request, CancellationToken cancellationToken)
    {
        if (!string.IsNullOrEmpty(GetLocalIPAddress()))
        {
            var lichSuAPIChiaSe = LichSuAPIChiaSe.Create(request.ApiChiaSe, GetLocalIPAddress());
            await _repositoryWithEvents.AddAsync(lichSuAPIChiaSe, cancellationToken);
            return Result<Guid>.Success(lichSuAPIChiaSe.Id);
        }
        else
        {
            return Result<Guid>.Fail("Lỗi lấy thông tin IP truy cập!");
        }
    }
}