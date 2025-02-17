

using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Commands;
public class DeleteHoSoNhapCommandHandler : ICommandHandler<DeleteHoSoNhapCommand>
{
    private readonly IUserService _user;
    private readonly IRepository<HoSoNhap> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    public DeleteHoSoNhapCommandHandler(IRepository<HoSoNhap> repositoryWithEvents, IUserService user, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _user = user;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> Handle(DeleteHoSoNhapCommand request, CancellationToken cancellationToken)
    {
        var user = await _user.GetCurrentUserAsync(cancellationToken);
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string sqlSoftDeleteHoSos = $"Update {SchemaNames.Business}.{TableNames.HoSoNhaps} Set DeletedOn = @currentTime, DeletedBy = @userId, LyDoXoa = @lyDoXoa WHERE  Id IN @Ids ";
        string sqlForceDeleteHoSos = $"Delete from {SchemaNames.Business}.{TableNames.HoSoNhaps} WHERE  Id IN @Ids ";

        if (request.ForceDelete)
        {
            //await _dapperRepository.ExcuteAsync(sqlForceDeleteHoSos, new
            //{
            //    Ids = request.Ids
            //});
        }
        else
        {
            await _dapperRepository.ExcuteAsync(sqlSoftDeleteHoSos, new
            {
                Ids = request.Ids,
                currentTime,
                userId = user.Id.ToString(),
                request.LyDoXoa
            });
            //var updatedItem = hoSo.SoftDelete(currentTime, userId, request.LyDoXoa);
            //await _repositoryWithEvents.UpdateAsync(updatedItem);
        }
        return (Result)Result.Success();
    }
}
