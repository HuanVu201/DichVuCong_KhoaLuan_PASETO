using Mapster;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class TiepNhanTrucTuyenNhieuHoSoCommandHandler : ICommandHandler<TiepNhanTrucTuyenNhieuHoSoCommand, Dictionary<string, string>>
{
    private readonly IMediator _mediator;
    public TiepNhanTrucTuyenNhieuHoSoCommandHandler(IMediator mediator)
    {
        _mediator = mediator;
    }
    public async Task<Result<Dictionary<string, string>>> Handle(TiepNhanTrucTuyenNhieuHoSoCommand request, CancellationToken cancellationToken)
    {
        var listErrors = new Dictionary<string, string>();
        var result = new Result();
        for (int i = 0; i < request.Ids.Count; i++)
        {
            var id = request.Ids[i];
            TiepNhanTrucTuyenCommand command = request.Adapt<TiepNhanTrucTuyenCommand>();
            command.Id = id;
            command.IsMultiple = request.ThanhPhanHoSos == null; // tiếp nhận nhiều hồ sơ thì trên giao diện đang xử lý là k gửi tphs
            try
            {
                var res = await _mediator.Send(command, cancellationToken);
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
