using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KetQuaLienQuanApp.Commands;
public class DeleteKetQuaLienQuanCommandHandler : ICommandHandler<DeleteKetQuaLienQuanCommand>
{
    private readonly IRepository<KetQuaLienQuan> _repositoryWithEvents;
    private readonly ICurrentUser _currentUser;
    private readonly IUserService _user;


    public DeleteKetQuaLienQuanCommandHandler(IRepository<KetQuaLienQuan> repositoryWithEvents, ICurrentUser currentUser, IUserService user)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
        _user = user;
    }

    public async Task<Result> Handle(DeleteKetQuaLienQuanCommand request, CancellationToken cancellationToken)
    {
        var user = await _user.GetCurrentUserAsync(cancellationToken);
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KetQuaLienQuan với mã: {request.Id} chưa được thêm vào hệ thống");
        if (user.Id != itemExitst.CreatedBy)
            throw new NotFoundException("Không phải là người tạo kết quả liên quan này nên không thể xóa !");
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
