using Mapster;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenBuocXuLyNhieuHoSoCommandHandler : ICommandHandler<ChuyenBuocXuLyNhieuHoSoCommand, Dictionary<string, string>>
{
    private readonly IMediator _mediator;
    public ChuyenBuocXuLyNhieuHoSoCommandHandler(IMediator mediator)
    {
        _mediator = mediator;
    }
    public async Task<Result<Dictionary<string, string>>> Handle(ChuyenBuocXuLyNhieuHoSoCommand request, CancellationToken cancellationToken)
    {
        var listErrors = new Dictionary<string, string>();
        var result = new Result();
        for (int i = 0; i < request.Ids.Count; i++)
        {
            var id = request.Ids[i];
            ChuyenBuocXuLyHoSoCommand command = request.Adapt<ChuyenBuocXuLyHoSoCommand>();
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
