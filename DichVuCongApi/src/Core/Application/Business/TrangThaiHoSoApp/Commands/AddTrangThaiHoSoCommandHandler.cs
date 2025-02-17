using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TrangThaiHoSoApp.Commands;
public class AddTrangThaiHoSoCommandHandler : ICommandHandler<AddTrangThaiHoSoCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<TrangThaiHoSo> _repositoryWithEvents;
    public AddTrangThaiHoSoCommandHandler(IRepositoryWithEvents<TrangThaiHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddTrangThaiHoSoCommand request, CancellationToken cancellationToken)
    {
        var trangThaiHoSo = TrangThaiHoSo.Create(request.Ten, request.Ma, request.MoTa, request.LaTrangThaiQuyTrinh);
        await _repositoryWithEvents.AddAsync(trangThaiHoSo, cancellationToken);
        return Result<DefaultIdType>.Success(trangThaiHoSo.Id);
    }
}
