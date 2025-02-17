using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class KhongTiepNhanQuaHanBoSungHoSoCommandHandler : ICommandHandler<KhongTiepNhanQuaHanBoSungHoSoCommand>
{
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IJobService _jobService;
    private readonly IUserService _user;

    public KhongTiepNhanQuaHanBoSungHoSoCommandHandler(IRepositoryWithEvents<HoSo> repositoryHoSo, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IUserService user)
    {
        _repositoryHoSo = repositoryHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _user = user;
    }

    public async Task<Result> Handle(KhongTiepNhanQuaHanBoSungHoSoCommand request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var user = await _user.GetCurrentUserAsync(cancellationToken);
        var hoSo = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        if(hoSo.TrangThaiHoSoId != "5")
        {
            return (Result)Result.Fail("Hồ sơ không ở trạng thái chờ bổ sung");
        }
        if(!CaculateTime.CalculateDaHetHanBoSung(hoSo.ThoiHanBoSung, hoSo.NgayYeuCauBoSung))
        {
            return (Result)Result.Fail("Hồ sơ còn hạn bổ sung hồ sơ");
        }
        //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
        //{
        //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
        //}, TransactionScopeAsyncFlowOption.Enabled))
        //{
            try
            {
                var updatedHoSo = hoSo.TuChoiTiepNhanHoSoTrucTuyen("3", currentTime, request.LyDoTuChoi, request.DinhKemTuChoi, user.Id.ToString());
                await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);

                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, user.Id.ToString(), user.FullName, "", "", currentTime, request.LyDoTuChoi, request.DinhKemTuChoi, trangThai: "3");
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
                //transactionScope.Complete();
                return (Result)Result.Success();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        //}
    }
}
