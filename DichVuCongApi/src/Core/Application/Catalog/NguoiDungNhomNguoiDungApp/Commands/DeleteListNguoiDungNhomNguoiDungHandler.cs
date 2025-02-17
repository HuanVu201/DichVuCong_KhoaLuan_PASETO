using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Commands;
public class DeleteListNguoiDungNhomNguoiDungCommandHandler : ICommandHandler<DeleteListNguoiDungNhomNguoiDungCommand>
{
    private readonly IRepositoryWithEvents<NguoiDungNhomNguoiDung> _repositoryWithEvents;
    private readonly IReadRepository<NguoiDungNhomNguoiDung> _readRepository;
    public DeleteListNguoiDungNhomNguoiDungCommandHandler(IRepositoryWithEvents<NguoiDungNhomNguoiDung> repositoryWithEvents, IReadRepository<NguoiDungNhomNguoiDung> readRepository)
    {
         _repositoryWithEvents = repositoryWithEvents;
        _readRepository = readRepository;
    } 

    public async Task<Result> Handle(DeleteListNguoiDungNhomNguoiDungCommand request, CancellationToken cancellationToken)
    {
        List<NguoiDungNhomNguoiDung> delNguoiDungNhomNguoiDungs = new List<NguoiDungNhomNguoiDung>();
        if(request.Ids == null ) throw new ArgumentNullException(nameof(request.Ids));
        if (request.Ids.Count == 0) throw new ArgumentNullException(nameof(request.Ids));
        var existNguoiDungNhomNguoiDungs = _readRepository.ListAsync().Result;
        existNguoiDungNhomNguoiDungs.ForEach(item =>
        {
            if (request.Ids.IndexOf(item.Id) != -1)
            {
                delNguoiDungNhomNguoiDungs.Add(item);
            }
        });
       if(delNguoiDungNhomNguoiDungs.Count> 0)
        {
            await _repositoryWithEvents.DeleteRangeAsync(delNguoiDungNhomNguoiDungs, cancellationToken);
            //await _repositoryWithEvents.SaveChangesAsync(cancellationToken);
        }
        return (Result)Result.Success();
    }
}
