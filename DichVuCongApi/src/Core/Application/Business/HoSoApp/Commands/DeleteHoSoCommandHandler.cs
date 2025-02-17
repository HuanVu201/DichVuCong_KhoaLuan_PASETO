using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class DeleteHoSoCommandHandler : ICommandHandler<DeleteHoSoCommand>
{
    private readonly IUserService _user;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepositoryWithEvents<HoSo> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICommonServices _commonServices;
    public DeleteHoSoCommandHandler(IRepositoryWithEvents<HoSo> repositoryWithEvents, IUserService user, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IDapperRepository dapperRepository, ICommonServices commonServices)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _dapperRepository = dapperRepository;
        _commonServices = commonServices;
    }

    public async Task<Result> Handle(DeleteHoSoCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(request.DeleteSecurityCode)) throw new ArgumentNullException(nameof(request.DeleteSecurityCode));
        var deleteSecurityKeys = _commonServices.Get().DeleteSecurityCode;

        if (string.IsNullOrEmpty(deleteSecurityKeys)) throw new Exception("Không có cấu hình mã bảo mật");
        if (request.DeleteSecurityCode != deleteSecurityKeys) throw new Exception("Mã bảo mật không đúng");
        var user = await _user.GetCurrentUserAsync(cancellationToken);
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string sqlMaHoSo = "SELECT MaHoSo FROM [Business].[HoSos] WHERE Id IN @Ids ";
        string sqlSoftDeleteHoSos = "Update [Business].[HoSos] Set DeletedOn = @currentTime, DeletedBy = @userId, LyDoXoa = @lyDoXoa WHERE MaHoSo IN @MaHoSos";
        var hoSos = await _dapperRepository.QueryAsync<HoSo>(sqlMaHoSo, new
        {
            Ids = request.Ids.ToArray(),
        });

        if (request.ForceDelete)
        {
            //await _dapperRepository.ExcuteAsync(sqlForceDeleteHoSos, new
            //{
            //    MaHoSos = hoSos.Select(hoSo => hoSo.MaHoSo)
            //});
            //await _repositoryWithEvents.DeleteAsync(hoSo);
        }
        else
        {
            await _dapperRepository.ExcuteAsync(sqlSoftDeleteHoSos, new
            {
                MaHoSos = hoSos.Select(hoSo => hoSo.MaHoSo),
                currentTime,
                userId = user.Id.ToString(),
                request.LyDoXoa
            });
            //var updatedItem = hoSo.SoftDelete(currentTime, userId, request.LyDoXoa);
            //await _repositoryWithEvents.UpdateAsync(updatedItem);
        }
        var quaTrinhXuLyHoSos = new List<QuaTrinhXuLyHoSo>();
        hoSos.ToList().ForEach((hoSo) =>
        {
            var qtxl = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, user.Id.ToString(), user.FullName, "", null, currentTime, thaoTac: "Xóa hồ sơ", trangThai: "");
            qtxl.SoftDelete();
            quaTrinhXuLyHoSos.Add(qtxl);
        });
        await _repositoryQuaTrinhXuLyHoSo.AddRangeAsync(quaTrinhXuLyHoSos);
        return (Result)Result.Success();
    }
}
