using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class DatLaiNhieuHoSoQuaHanCommandHandler : ICommandHandler<DatLaiNhieuHoSoQuaHanCommand, Dictionary<string, string>>
{
    private readonly IMediator _mediator;
    public DatLaiNhieuHoSoQuaHanCommandHandler(IMediator mediator)
    {
        _mediator = mediator;
    }
    public async Task<Result<Dictionary<string, string>>> Handle(DatLaiNhieuHoSoQuaHanCommand request, CancellationToken cancellationToken)
    {
        var listErrors = new Dictionary<string, string>();
        var result = new Result();
        for (int i = 0; i < request.Ids.Count; i++)
        {
            var id = request.Ids[i];
            DatLaiHoSoQuaHanCommand command = request.Adapt<DatLaiHoSoQuaHanCommand>();
            command.Id = id;
            try
            {
                var res = await _mediator.Send(command);
                if (!res.Succeeded)
                {
                    listErrors.Add(id.ToString(), res.Message);
                }
            }
            catch (Exception ex)
            {
                listErrors.Add(id.ToString(), ex.Message);
            }
        }
        return Result<Dictionary<string, string>>.Success(listErrors);
    }
}
