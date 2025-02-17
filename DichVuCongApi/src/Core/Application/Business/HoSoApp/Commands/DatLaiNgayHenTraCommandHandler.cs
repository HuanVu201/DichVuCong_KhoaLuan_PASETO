using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class DatLaiNgayHenTraCommandHandler : ICommandHandler<DatLaiNgayHenTraCommand>
{
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly ICurrentUser _user;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly ICommonServices _commonServices;
    private readonly IDapperRepository _dapperRepository;
    public DatLaiNgayHenTraCommandHandler(IRepositoryWithEvents<HoSo> repositoryHoSo, ICurrentUser user, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, ICommonServices commonServices, IDapperRepository dapperRepository)
    {
        _repositoryHoSo = repositoryHoSo;
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _commonServices = commonServices;
        _dapperRepository = dapperRepository;
    }
    public async Task<Result> Handle(DatLaiNgayHenTraCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _user.GetUserFullName();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _user.GetUserId();
        if (request.Id == null) throw new ArgumentNullException(nameof(request.Id));
        if (request.NgayHenTra == null) throw new ArgumentNullException(nameof(request.NgayHenTra));
        var itemExitst = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : string.Empty;
        try
        {
            var updatedHoSo = itemExitst.DatLaiNgayHenTra(request.NgayHenTra);
            await _repositoryHoSo.UpdateAsync(updatedHoSo);
            try
            {
                if (!string.IsNullOrEmpty(hoSoTableName))
                {
                    string updateSqlThongKeTable = $"UPDATE {hoSoTableName} SET NgayKetThucXuLy = @NgayKetThucXuLy, LastModifiedOn = '{currentTime}' WHERE MaHoSo = @MaHoSo ";
                    var resUpdate = await _dapperRepository.ExcuteAsync(updateSqlThongKeTable, new { NgayKetThucXuLy = updatedHoSo.NgayKetThucXuLy, MaHoSo = updatedHoSo.MaHoSo });
                }
            }
            catch (Exception ex)
            {

            }
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(itemExitst.MaHoSo, userId.ToString(), userFullName, null, null, currentTime,"", "Đặt lại ngày hẹn trả", true);
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            return (Result)Result.Fail(ex.Message);
        }
      
    }
}
