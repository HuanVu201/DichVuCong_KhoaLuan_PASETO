using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.TrangThaiApp.Commands;

public class UpdateTrangThaiCommandValidator: CustomValidator<UpdateTrangThaiCommand>
{
    public UpdateTrangThaiCommandValidator()
    {
        RuleFor(x => x.ThuTu).NotEmpty().GreaterThan(0).WithMessage($"Thứ tự phải lớn hơn 0");
    }
}

public class UpdateTrangThaiCommandHandler : ICommandHandler<UpdateTrangThaiCommand>
{
    private readonly IRepositoryWithEvents<TrangThai> _repositoryWithEvents;
    public UpdateTrangThaiCommandHandler(IRepositoryWithEvents<TrangThai> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateTrangThaiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Trạng thái với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.TenTrangThai, request.ThuTu, request.HienThiTrangChu);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
