using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
public class DeleteKhoLuuTruCongDanCommandHandler : ICommandHandler<DeleteKhoLuuTruCongDanCommand>
{
    private readonly IRepository<KhoLuuTruCongDan> _khoLuuTruRepo;
    public DeleteKhoLuuTruCongDanCommandHandler(
         IRepository<KhoLuuTruCongDan> khoLuuTruRepo)
    {
        _khoLuuTruRepo = khoLuuTruRepo;
    }
    public async Task<Result> Handle(DeleteKhoLuuTruCongDanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _khoLuuTruRepo.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"GiayToSoHoa với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedItem = itemExitst.SoftDelete();
        await _khoLuuTruRepo.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
