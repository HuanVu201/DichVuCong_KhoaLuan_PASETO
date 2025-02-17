using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ThuHoiChuyenTraKetQuaHandler : ICommandHandler<ThuHoiChuyenTraKetQua>
{
    private readonly string hoSoTableName = "[Business].[HoSos]";
    private readonly IMediator _mediator;
    private readonly ICurrentUser _currentUser;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly TrangThaiTraKetQuaHoSoConstant _trangThaiTraHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    public ThuHoiChuyenTraKetQuaHandler(IMediator mediator, ICurrentUser currentUser, IRepository<HoSo> repositoryHoSo, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IDapperRepository dapperRepository)
    {
        _mediator = mediator;
        _currentUser = currentUser;
        _repositoryHoSo = repositoryHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _dapperRepository = dapperRepository;
    }
    public async Task<Result> Handle(ThuHoiChuyenTraKetQua request, CancellationToken cancellationToken)
    {
        if (request.Ids == null) throw new ArgumentNullException(nameof(request.Ids));
        string sql = $"SELECT * FROM {hoSoTableName} WHERE {hoSoTableName}.Id IN @Id ";
        var itemsExitst = await _dapperRepository.QueryAsync<HoSo>(sql, new { Id = request.Ids }, null, cancellationToken);


        if (itemsExitst == null) throw new NotFoundException($"Hồ sơ {request.Ids} chưa được thêm vào hệ thống");
        List<HoSo> UpdateHoSo = new List<HoSo>();
        var quaTrinhXuLyHoSos = new List<QuaTrinhXuLyHoSo>();
        var userId = _currentUser.GetUserId().ToString();
        var userOfficeCode = _currentUser.GetUserOfficeCode();
        var userFullName = _currentUser.GetUserFullName();
        var thaoTac = "Thu hồi xác nhận kết quả";

        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        foreach (var item in itemsExitst)
        {
            if(item.TrangThaiHoSoId == "9")
            {
                item.XacNhanKetQua(_trangThaiTraHoSoConstant.CHO_XAC_NHAN, null, null, currentTime);

                UpdateHoSo.Add(item);
                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(item.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "9", thaoTac: thaoTac);
                quaTrinhXuLyHoSos.Add(quaTrinhXuLyHoSo);
            }
        }

        var sqlUpdateHoSo = $"UPDATE {hoSoTableName} SET TrangThaiTraKq = @TrangThaiTraKq, NgayXacNhanKetQua = @NgayXacNhanKetQua, " +
                  $"LastModifiedBy = '{userId.ToString()}', LastModifiedOn = '{currentTime}' WHERE Id = @Id ";
        await _dapperRepository.ExcuteAsync(sqlUpdateHoSo, UpdateHoSo);
        await _repositoryQuaTrinhXuLyHoSo.AddRangeAsync(quaTrinhXuLyHoSos, cancellationToken);
        return (Result)Result.Success();
    }
}
