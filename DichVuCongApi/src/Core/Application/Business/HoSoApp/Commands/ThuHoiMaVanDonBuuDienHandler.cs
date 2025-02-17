using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ThuHoiMaVanDonBuuDienHandler : ICommandHandler<ThuHoiMaVanDonBuuDien>
{
    private readonly IMediator mediator;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<MaVanDonBuuDien> _repositoryWithEvents;
    private readonly IRepositoryWithEvents<HoSo> _repositoryWithEventsHoSo;
    private readonly IUserService _user;
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string maVanDonBuuDienTableName = "[Catalog].[MaVanDonBuuDiens]";
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    public ThuHoiMaVanDonBuuDienHandler(IMediator mediator, IDapperRepository dapperRepository, IRepositoryWithEvents<MaVanDonBuuDien> repositoryWithEvents, IUserService user,
        IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,IRepositoryWithEvents<HoSo> repositoryWithEvents1)
    {
        this.mediator = mediator;
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryWithEventsHoSo = repositoryWithEvents1;
    }
    public async Task<Result> Handle(ThuHoiMaVanDonBuuDien request, CancellationToken cancellationToken)
    {
        if(request == null) throw new ArgumentNullException(nameof(request));
        if(request.HoSoIds == null) throw new ArgumentNullException(nameof(request.HoSoIds));
        if (request.HoSoIds.Count == 0) throw new ArgumentNullException(nameof(request.HoSoIds));
        var _currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        var userId = _currentUser.Id.ToString();
        var userOfficeCode = _currentUser.OfficeCode;
        var userFullName = _currentUser.FullName;
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var sql = $"SELECT {hoSoTableName}.Id HoSoId, {maVanDonBuuDienTableName}.Id, {maVanDonBuuDienTableName}.HoSo,{maVanDonBuuDienTableName}.DeletedOn FROM " +
            $"{hoSoTableName} " +
            $"LEFT JOIN {maVanDonBuuDienTableName} " +
            $"ON {hoSoTableName}.MaHoSo = {maVanDonBuuDienTableName}.HoSo " +
            $"WHERE {hoSoTableName}.Id IN @HoSoIds";
        var maVanDons = await _dapperRepository.QueryAsync<MaVanDonBuuDienDto>(sql, request, null, cancellationToken);
        if (maVanDons == null) throw new Exception("Hồ sơ chưa được thêm vào hệ thống");
        var updateMaVanDon = new List<MaVanDonBuuDien>();
        var quaTrinhXuLyHoSos = new List<QuaTrinhXuLyHoSo>();
        foreach (var item in maVanDons)
        {
            var hoSo = await _repositoryWithEventsHoSo.GetByIdAsync(item.HoSoId, cancellationToken) ;
            var maVanDonBuuDien = await _repositoryWithEvents.GetByIdAsync(item.Id,cancellationToken);
            if(maVanDonBuuDien!= null)
            {
                var update = maVanDonBuuDien.ThuHoiMaVanDon(string.Empty);
                updateMaVanDon.Add(update);
               
            }
            if(hoSo != null)
            {
                var updateHoSo = hoSo.BCCIThuHoiKq();
                await _repositoryWithEventsHoSo.UpdateAsync(updateHoSo, cancellationToken);
                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "9", thaoTac: "Thu hồi kết quả BCCI");
                quaTrinhXuLyHoSos.Add(quaTrinhXuLyHoSo);

            }
            

        }
        if(updateMaVanDon.Count > 0) {
        await _repositoryWithEvents.UpdateRangeAsync(updateMaVanDon, cancellationToken);
        }
        if(quaTrinhXuLyHoSos.Count >0)
        {

        await _repositoryQuaTrinhXuLyHoSo.AddRangeAsync(quaTrinhXuLyHoSos,cancellationToken);
        }
        return (Result)Result.Success();
    }
}
