using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.QuanLyLienKetApp.Commands;
public class AddQuanLyLienKetCommandHandler : ICommandHandler<AddQuanLyLienKetCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<QuanLyLienKet> _repositoryWithEvents;
    public AddQuanLyLienKetCommandHandler(IRepositoryWithEvents<QuanLyLienKet> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddQuanLyLienKetCommand request, CancellationToken cancellationToken)
    {
        var quanLyLienKet = QuanLyLienKet.Create(request.Ten,request.Ma,request.LinkLienKet,request.SuDung, request.ThuTu);
        await _repositoryWithEvents.AddAsync(quanLyLienKet, cancellationToken);
        return Result<DefaultIdType>.Success(quanLyLienKet.Id);
    }
}
