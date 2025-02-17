using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.HuongDanSuDungApp.Commands;
public class AddHuongDanSuDungCommandHandler : ICommandHandler<AddHuongDanSuDungCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<HuongDanSuDung> _repositoryWithEvents;
    public AddHuongDanSuDungCommandHandler(IRepositoryWithEvents<HuongDanSuDung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddHuongDanSuDungCommand request, CancellationToken cancellationToken)
    {
        var huongDanSuDung = HuongDanSuDung.Create(request.TenHuongDanSuDung,request.NoiDungHuongDanSuDung,request.ThuTu);
        await _repositoryWithEvents.AddAsync(huongDanSuDung, cancellationToken);
        return Result<DefaultIdType>.Success(huongDanSuDung.Id);
    }
}
