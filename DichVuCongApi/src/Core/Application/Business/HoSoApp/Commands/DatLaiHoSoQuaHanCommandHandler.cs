using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class DatLaiHoSoQuaHanCommandHandler : ICommandHandler<DatLaiHoSoQuaHanCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currUser;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly ICommonServices _commonServices;
    public DatLaiHoSoQuaHanCommandHandler(ICurrentUser currUser, IRepositoryWithEvents<HoSo> repositoryHoSo, IDapperRepository dapperRepository, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,
        ICommonServices commonServices)
    {
        _repositoryHoSo = repositoryHoSo;
        _dapperRepository = dapperRepository;
        _currUser = currUser;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _commonServices = commonServices;
    }

    public async Task<Result> Handle(DatLaiHoSoQuaHanCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _currUser.GetUserFullName();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var sqlExitst = "select top 1 * from Business.HoSos where Id = @Id and DeletedOn is null";
        var itemExitst = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlExitst, new
        {
            Id = request.Id,
        });
        if (itemExitst == null)
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : string.Empty;
        var datLaiHoSoQuaHan = new HoSo();
        if(itemExitst.NgayHenTra.Value.Date > currentTime.Date)
        {
            datLaiHoSoQuaHan = itemExitst.DatLaiHoSoQuaHan(currentTime);
        }
        else
        {
            datLaiHoSoQuaHan = itemExitst.DatLaiHoSoQuaHan(itemExitst.NgayHenTra);
        }

        try
        {
            if (!string.IsNullOrEmpty(hoSoTableName))
            {
                string updateSqlThongKeTable = $"UPDATE {hoSoTableName} SET NgayKetThucXuLy = @NgayKetThucXuLy, LastModifiedOn = '{currentTime}' WHERE MaHoSo = @MaHoSo ";
                var resUpdate = await _dapperRepository.ExcuteAsync(updateSqlThongKeTable, new { NgayKetThucXuLy = datLaiHoSoQuaHan.NgayKetThucXuLy, MaHoSo = datLaiHoSoQuaHan.MaHoSo });
            }
        }
        catch (Exception ex)
        {

        }
        await _repositoryHoSo.UpdateAsync(datLaiHoSoQuaHan, cancellationToken);
        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(itemExitst.MaHoSo,  userFullName, currentTime, "Đặt lại hồ sơ quá hạn",true);
        await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
        return (Result)Result.Success();
    }
}
