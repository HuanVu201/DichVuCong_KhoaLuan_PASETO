using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class CongDanGuiBoSungCommandHandler : ICommandHandler<CongDanGuiBoSungCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _user;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<ThanhPhanHoSoBoSung> _repositoryThanhPhanHoSoBoSung;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IRepository<HoSoBoSung> _repositoryHoSoBoSung;
    private readonly ILLTPService _lLTPService;
    private readonly ILogger<CongDanGuiBoSungCommandHandler> _logger;
    public CongDanGuiBoSungCommandHandler(ILLTPService lLTPService, IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo, ILogger<CongDanGuiBoSungCommandHandler> logger, IDapperRepository dapperRepository, IUserService user, IRepositoryWithEvents<HoSo> repositoryHoSo, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepository<HoSoBoSung> repositoryHoSoBoSung, IRepository<ThanhPhanHoSoBoSung> repositoryThanhPhanHoSoBoSung)
    {
        _dapperRepository = dapperRepository;
        _user = user;
        _repositoryHoSo = repositoryHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryHoSoBoSung = repositoryHoSoBoSung;
        _repositoryThanhPhanHoSoBoSung = repositoryThanhPhanHoSoBoSung;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _logger = logger;
        _lLTPService = lLTPService;
    }
    public async Task<Result> Handle(CongDanGuiBoSungCommand request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var user = await _user.GetCurrentUserAsync(cancellationToken);
        var hoSo = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        var sqlGetHoSoBoSung = @"SELECT TOP 1 Id FROM Business.HoSoBoSungs WHERE MaHoSo = @MaHoSo AND DeletedOn is null
                    AND TrangThaiBoSung = N'Yêu cầu công dân bổ sung' ORDER BY CreatedOn DESC";
        var sqlUpdateHoSoBoSung = @"UPDATE Business.HoSoBoSungs SET TrangThaiBoSung= @TrangThaiBoSung, ThongTinTiepNhan = @ThongTinTiepNhan,
                                    DanhSachGiayToBoSung = @DanhSachGiayToBoSung
                                    WHERE Id = @Id";
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
                var danhSachGiayToBoSungStr = String.Join("##", request.DanhSachGiayToBoSung.Select(x => x.FileDinhKemMoi));
                if (hoSo.TrangThaiTruoc == "1")
                {
                    var updatedHoSo = hoSo.CongDanGuiBoSung(hoSo.TrangThaiTruoc, "5", "", "", request.ThongTinTiepNhanBoSung, danhSachGiayToBoSungStr, currentTime);
                    await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                    var insertTempValues = request.DanhSachGiayToBoSung.Select(x => new { DinhKem = x.FileDinhKemMoi, Id = x.ThanhPhanHoSoId }).ToList();
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
                    var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, "", null, null, null, user.Id.ToString(), user.FullName, "", "", currentTime, "", "", "Công dân gửi bổ sung hồ sơ", "");
                    await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
                    //transactionScope.Complete();
                    return (Result)Result.Success();
                }
                else
                {
                    var hoSoBoSung = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoBoSung_Select>(sqlGetHoSoBoSung, new
                    {
                        hoSo.MaHoSo,
                    });
                    if (hoSoBoSung == null)
                    {
                        throw new NotFoundException($"Hồ sơ không ở trạng thái yêu cầu công dân bổ sung");
                    }
                    var updatedHoSo = hoSo.CongDanGuiBoSung(null, null, null, HoSoConstant.TrangThaiDaBoSungCongDan, request.ThongTinTiepNhanBoSung, danhSachGiayToBoSungStr, currentTime);
                    await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                    var updatedHoSoBoSungRows = await _dapperRepository.ExcuteAsync(sqlUpdateHoSoBoSung, new
                    {
                        TrangThaiBoSung = HoSoConstant.TrangThaiDaBoSungCongDan,
                        ThongTinTiepNhan = request.ThongTinTiepNhanBoSung,
                        DanhSachGiayToBoSung = danhSachGiayToBoSungStr,
                        Id = hoSoBoSung.Id,
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
                    var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, "", null, null, null, user.Id.ToString(), user.FullName, "", "", currentTime, "", "", "Công dân gửi bổ sung hồ sơ", "");
                    await _repositoryThanhPhanHoSoBoSung.AddRangeAsync(thanhPhanHoSoBoSungs, cancellationToken);
                    await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);

                    //transactionScope.Complete();
                    return (Result)Result.Success();
                }
            }
            else
            {
                return (Result)Result.Fail("Hồ sơ không ở trạng thái bổ sung hoặc bạn không phải gửi hồ sơ!");
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
