using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class CongDanCapNhatBoSungCommandHandler : ICommandHandler<CongDanCapNhatBoSungCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _user;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepository<HoSoBoSung> _repositoryHoSoBoSung;
    private readonly IRepository    <ThanhPhanHoSoBoSung> _repositoryThanhPhanHoSoBoSung;
    private readonly ILogger<CongDanCapNhatBoSungCommandHandler> _logger;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly ILLTPService _lLTPService;

    public CongDanCapNhatBoSungCommandHandler(ILLTPService lLTPService, IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo, ILogger<CongDanCapNhatBoSungCommandHandler> logger, IDapperRepository dapperRepository, IUserService user, IRepositoryWithEvents<HoSo> repositoryHoSo, IRepository<HoSoBoSung> repositoryHoSoBoSung, IRepository<ThanhPhanHoSoBoSung> repositoryThanhPhanHoSoBoSung)
    {
        _dapperRepository = dapperRepository;
        _user = user;
        _repositoryHoSo = repositoryHoSo;
        _repositoryHoSoBoSung = repositoryHoSoBoSung;
        _repositoryThanhPhanHoSoBoSung = repositoryThanhPhanHoSoBoSung;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _logger = logger;
        _lLTPService = lLTPService;
    }
    public async Task<Result> Handle(CongDanCapNhatBoSungCommand request, CancellationToken cancellationToken)
    {
        var user = await _user.GetCurrentUserAsync(cancellationToken);
        var hoSo = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        var sqlGetHoSoBoSung = @"SELECT TOP 1 Id FROM Business.HoSoBoSungs WHERE MaHoSo = @MaHoSo AND DeletedOn is null
                    AND TrangThaiBoSung = N'Yêu cầu công dân bổ sung' ORDER BY CreatedOn DESC";
        var sqlUpdateHoSoBoSung = "UPDATE Business.HoSoBoSungs SET ThongTinTiepNhan = @ThongTinTiepNhanBoSung WHERE Id = @Id";
        var sqlUpdateThanhPhanHoSo = @"
        CREATE TABLE #TempTableThanhPhanHoSo (DinhKem nvarchar(MAX), Id uniqueidentifier);
        INSERT INTO #TempTableThanhPhanHoSo VALUES (@DinhKem, @Id);
        UPDATE tphs SET tphs.DinhKem = (CASE WHEN temp.DinhKem is null or temp.DinhKem = '' THEN tphs.DinhKem ELSE temp.DinhKem END) FROM Business.ThanhPhanHoSos tphs INNER JOIN
        #TempTableThanhPhanHoSo temp ON tphs.Id = temp.Id";
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        _lLTPService.CheckThaoTac(hoSo.LoaiDuLieuKetNoi);

        var maTrangThaiHienTai = hoSo.TrangThaiHoSoId;


        //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
        //{
        //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
        //}, TransactionScopeAsyncFlowOption.Enabled))
        //{
        try
        {
            if (maTrangThaiHienTai == "5" && hoSo.NguoiGui.ToLower() == user.UserName.ToLower())
            {
                if (hoSo.TrangThaiTruoc == "1")
                {
                    var insertTempValues = request.DanhSachGiayToBoSung.Select(x => new { DinhKem = x.FileDinhKemMoi, Id = x.ThanhPhanHoSoId }).ToList();
                    var updatedThanhPhanHoSoRows = await _dapperRepository.ExcuteAsync(sqlUpdateThanhPhanHoSo, insertTempValues);
                    if (updatedThanhPhanHoSoRows == 0)
                    {
                        return (Result)Result.Fail("Cập nhật thành phần hồ sơ thất bại");
                    }
                    var updatedHoSo = hoSo.MotCuaCapNhatBoSung(request.ThongTinTiepNhanBoSung);
                    if (request.DanhSachGiayToBoSungMoi != null && request.DanhSachGiayToBoSungMoi.Count > 0)
                    {
                        List<ThanhPhanHoSo> thanhPhanHoSos = new List<ThanhPhanHoSo>();
                        for (int i = 0; i < request.DanhSachGiayToBoSungMoi.Count; i++)
                        {
                            MotCuaCapNhatBoSung_ThanhPhanHoSo currTPHS = request.DanhSachGiayToBoSungMoi[i];
                            var thanhPhanHoSo = new ThanhPhanHoSo(currTPHS.TenThanhPhan, hoSo.MaHoSo, null, null, null, currTPHS.FileDinhKemMoi, null, null, null, null, null, null, null, null, null, null);
                            thanhPhanHoSo.SetNoiDungBoSung(currTPHS.NoiDungBoSung);
                            thanhPhanHoSos.Add(thanhPhanHoSo);
                        }
                        await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos);
                    }
                    await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                }
                else
                {
                    var hoSoBoSung = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoBoSung_Select>(sqlGetHoSoBoSung, new
                    {
                        hoSo.MaHoSo,
                    });
                    if (hoSoBoSung == null)
                    {
                        return (Result)Result.Fail("Hồ sơ không ở trạng thái yêu cầu công dân bổ sung");
                    }
                    var updatedHoSoBoSungRows = await _dapperRepository.ExcuteAsync(sqlUpdateHoSoBoSung, new
                    {
                        hoSoBoSung.Id,
                        request.ThongTinTiepNhanBoSung
                    });
                    if (updatedHoSoBoSungRows == 0)
                    {
                        return (Result)Result.Fail("Cập nhật hồ sơ bổ sung thất bại");
                    }
                    var insertTempValues = request.DanhSachGiayToBoSung.Select(x => new { DinhKem = x.FileDinhKemMoi, Id = x.ThanhPhanHoSoId }).ToList();
                    var thanhPhanHoSoBoSungs = new List<ThanhPhanHoSoBoSung>() { };
                    foreach (var thanhPhanHoSo in request.DanhSachGiayToBoSung)
                    {
                        var thanhPhanHoSoBoSung = new ThanhPhanHoSoBoSung(hoSoBoSung.Id.ToString(), thanhPhanHoSo.ThanhPhanHoSoId, thanhPhanHoSo.FileDinhKemCu, thanhPhanHoSo.FileDinhKemMoi, thanhPhanHoSo.NoiDungBoSung);
                        thanhPhanHoSoBoSungs.Add(thanhPhanHoSoBoSung);
                    }
                    var updatedThanhPhanHoSoRows = await _dapperRepository.ExcuteAsync(sqlUpdateThanhPhanHoSo, insertTempValues);
                    if (updatedThanhPhanHoSoRows == 0)
                    {
                        return (Result)Result.Fail("Cập nhật thành phần hồ sơ thất bại");
                    }
                    if (request.DanhSachGiayToBoSungMoi != null && request.DanhSachGiayToBoSungMoi.Count > 0)
                    {
                        List<ThanhPhanHoSo> thanhPhanHoSos = new List<ThanhPhanHoSo>();
                        for (int i = 0; i < request.DanhSachGiayToBoSungMoi.Count; i++)
                        {
                            MotCuaCapNhatBoSung_ThanhPhanHoSo currTPHS = request.DanhSachGiayToBoSungMoi[i];
                            var thanhPhanHoSo = new ThanhPhanHoSo(currTPHS.TenThanhPhan, hoSo.MaHoSo, null, null, null, currTPHS.FileDinhKemMoi, null, null, null, null, null, null, null, null, null, null);
                            thanhPhanHoSo.SetNoiDungBoSung(currTPHS.NoiDungBoSung);
                            thanhPhanHoSos.Add(thanhPhanHoSo);
                        }
                        await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos);
                    }
                    await _repositoryThanhPhanHoSoBoSung.AddRangeAsync(thanhPhanHoSoBoSungs, cancellationToken);
                    //var hoSoBoSung = await _repositoryHoSoBoSung.FirstOrDefaultAsync(new GetHoSoBoSungQuerySpec(hoSo.MaHoSo, trangThaiBoSungList));
                    var updatedHoSo = hoSo.MotCuaCapNhatBoSung(request.ThongTinTiepNhanBoSung);
                    await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                    //var updatedHoSoBoSung = hoSoBoSung.MotCuaCapNhatBoSung(request.ThongTinTiepNhanBoSung, String.Join("##", request.DanhSachGiayToBoSung));
                    //await _repositoryHoSoBoSung.UpdateAsync(updatedHoSoBoSung, cancellationToken);
                }
                //transactionScope.Complete();
                return (Result)Result.Success();
            }
            else
            {
                return (Result)Result.Fail("Hồ sơ không ở trạng thái bổ sung hoặc bạn không phải người gửi hồ sơ!");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError($"{hoSo.MaHoSo}_CongDanCapNhatBoSung_{user.UserName}_{ex.ToString()}");
            return (Result)Result.Fail(ex.Message);
        }
        //}
    }
}
