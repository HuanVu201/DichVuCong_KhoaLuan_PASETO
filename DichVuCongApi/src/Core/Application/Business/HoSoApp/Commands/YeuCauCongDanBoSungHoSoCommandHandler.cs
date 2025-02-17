using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class YeuCauCongDanBoSungHoSoCommandHandler : ICommandHandler<YeuCauCongDanBoSungHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IEventPublisher _eventPublisher;
    private readonly string tenTinhThanh;
    public YeuCauCongDanBoSungHoSoCommandHandler(IInjectConfiguration injectConfiguration, IEventPublisher eventPublisher, ICurrentUser user, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepositoryWithEvents<HoSo> repositoryHoSo, IDapperRepository dapperRepository)
    {
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryHoSo = repositoryHoSo;
        _dapperRepository = dapperRepository;
        _eventPublisher = eventPublisher;
        tenTinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
    }
    public async Task<Result> Handle(YeuCauCongDanBoSungHoSoCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _user.GetUserFullName();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _user.GetUserId();
        var userOfficeName = _user.GetUserOfficeName();
        var sqlGetHoSoBoSung = @"SELECT TOP 1 Id FROM Business.HoSoBoSungs WHERE MaHoSo = @MaHoSo AND DeletedOn is null ORDER BY CreatedOn DESC";
        var sqlUpdateHoSoBoSung = $"UPDATE Business.HoSoBoSungs SET TrangThaiBoSung = N'{HoSoConstant.TrangThaiBoSungCongDan}' WHERE Id = @Id";

        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSo, new
        {
            request.Id
        });
        //var hoSo = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        //if (hoSo == null)
        //{
        //    throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        //}
        var hoSoBoSung = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoBoSung_Select>(sqlGetHoSoBoSung, new
        {
            hoSo.MaHoSo,
        });
        if (hoSoBoSung == null)
        {
            throw new NotFoundException($"HoSoBoSung với mã: {hoSoBoSung.Id} chưa được thêm vào hệ thống");
        }
        if (hoSo.TrangThaiHoSoId == "5" && hoSo.NguoiDangXuLy == userId.ToString())
        {
            //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
            //{
            //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
            //}, TransactionScopeAsyncFlowOption.Enabled))
            //{
            try
            {
                var updatedHoSo = hoSo.YeuCauCongDanhBoSung(HoSoConstant.TrangThaiBoSungCongDan);
                await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                var updatedHoSoBoSungRows = await _dapperRepository.ExcuteAsync(sqlUpdateHoSoBoSung, new
                {
                    hoSoBoSung.Id
                });
                if (updatedHoSoBoSungRows == 0)
                {
                    return (Result)Result.Fail("Cập nhật hồ sơ bổ sung thất bại");
                }
                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, "", null, null, null, userId.ToString(), userFullName, "", "", currentTime, null, null, HoSoConstant.TrangThaiBoSungCongDan, "5");
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
                //transactionScope.Complete();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            //}
            await _eventPublisher.PublishAsync(new YeuCauCongDanBoSungEvent(hoSo, userFullName, userOfficeName, hoSo.TrichYeuHoSo, hoSo.SoDienThoai, hoSo.Catalog, tenTinhThanh));
            return (Result)Result.Success();
        }
        return (Result)Result.Fail("Hồ sơ không ở trạng thái bổ sung hoặc bạn không phải người xử lý hồ sơ!");
    }
}
