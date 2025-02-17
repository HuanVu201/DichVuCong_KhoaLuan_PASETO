using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.QuanLyLienKetApp.Commands;

public class UpdateQuanLyLienKetCommandHandler : ICommandHandler<UpdateQuanLyLienKetCommand>
{
    private readonly IRepositoryWithEvents<QuanLyLienKet> _repositoryWithEvents;

    public UpdateQuanLyLienKetCommandHandler(IRepositoryWithEvents<QuanLyLienKet> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateQuanLyLienKetCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuanLyLienKet với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.Ten,request.Ma,request.LinkLienKet,request.SuDung,request.ThuTu);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
