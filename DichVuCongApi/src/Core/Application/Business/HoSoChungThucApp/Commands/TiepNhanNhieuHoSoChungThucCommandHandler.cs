using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;
public class TiepNhanNhieuHoSoChungThucCommandHandler : ICommandHandler<TiepNhanNhieuHoSoChungThucCommand, Dictionary<string, string>>
{
    private readonly IMediator _mediator;
    public TiepNhanNhieuHoSoChungThucCommandHandler(IMediator mediator)
    {
        _mediator = mediator;
    }
    public async Task<Result<Dictionary<string, string>>> Handle(TiepNhanNhieuHoSoChungThucCommand request, CancellationToken cancellationToken)
    {
        var listErrors = new Dictionary<string, string>();
        var result = new Result();
        for (int i = 0; i < request.Ids.Count; i++)
        {
            var id = request.Ids[i];
            TiepNhanHoSoChungThucCommand command = request.Adapt<TiepNhanHoSoChungThucCommand>();
            command.Id = id;
            command.IsMultiple = request.ThanhPhanHoSos == null; // tiếp nhận nhiều hồ sơ thì trên giao diện đang xử lý là k gửi tphs
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
