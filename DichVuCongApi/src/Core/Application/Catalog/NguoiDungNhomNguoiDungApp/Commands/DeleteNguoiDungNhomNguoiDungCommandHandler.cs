using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Commands;
public class DeleteNguoiDungNhomNguoiDungCommandHandler : ICommandHandler<DeleteNguoiDungNhomNguoiDungCommand>
{
    private readonly IRepositoryWithEvents<NguoiDungNhomNguoiDung> _repositoryWithEvents;
    public DeleteNguoiDungNhomNguoiDungCommandHandler(IRepositoryWithEvents<NguoiDungNhomNguoiDung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteNguoiDungNhomNguoiDungCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"NguoiDungNhomNguoiDung với mã: {request.Id} chưa được thêm vào hệ thống");
        await _repositoryWithEvents.DeleteAsync(itemExitst);
        return (Result)Result.Success();
    }
}
