using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;

public class GetApiChiaSeByMaApiSpec : Specification<APIChiaSe, APIChiaSe>, ISingleResultSpecification
{
    public GetApiChiaSeByMaApiSpec(string maApiChiaSe)
    {
        Query.Where(x => x.MaApiChiaSe == maApiChiaSe);
    }
}


public class UpdateLuotGoiApiChiaSeCommandHandler : ICommandHandler<UpdateLuotGoiApiChiaSeCommand>
{
    private readonly IRepositoryWithEvents<APIChiaSe> _repositoryWithEvents;
    private readonly IMediator _mediator;

    public UpdateLuotGoiApiChiaSeCommandHandler(IRepositoryWithEvents<APIChiaSe> repositoryWithEvents, IMediator mediator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
    }

    public async Task<Result> Handle(UpdateLuotGoiApiChiaSeCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetBySpecAsync(new GetApiChiaSeByMaApiSpec(request.MaApiChiaSe));

        if (itemExitst == null)
            throw new NotFoundException($"APIChiaSe với mã: {request.MaApiChiaSe} chưa được thêm vào hệ thống");

        var currentTime = GetCurrentTime.Get(DateTime.UtcNow).ToString("dd/MM/yyyy");

        if (itemExitst.NgayGoi == currentTime)
        {
            if (itemExitst.GioiHan == itemExitst.SoLuotGoiTrongNgay)
            {
                return (Result)Result.Fail($"Số lượt truy cập API đã đạt giới hạn {itemExitst.GioiHan} lần/ngày!");
            }
            else
            {
                var updatedApiChiaSe = itemExitst.Update(null, null, null, null, null, null, itemExitst.SoLuotGoiTrongNgay + 1, null, null, null);
                await _repositoryWithEvents.UpdateAsync(updatedApiChiaSe, cancellationToken);
                await _mediator.Send(new AddLichSuAPIChiaSeCommand()
                {
                    ApiChiaSe = request.MaApiChiaSe,
                });

                return (Result)Result.Success();
            }
        }
        else
        {
            var updatedApiChiaSe = itemExitst.Update(null, null, null, null, null, currentTime, 1, null, null, null);
            await _repositoryWithEvents.UpdateAsync(updatedApiChiaSe, cancellationToken);
            await _mediator.Send(new AddLichSuAPIChiaSeCommand()
            {
                ApiChiaSe = request.MaApiChiaSe,
            });
            return (Result)Result.Success();
        }
    }
}