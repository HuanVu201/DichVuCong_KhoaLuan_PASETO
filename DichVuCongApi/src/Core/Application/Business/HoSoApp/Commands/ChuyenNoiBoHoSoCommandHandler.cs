using Newtonsoft.Json;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenNoiBoHoSoCommandHandler : ICommandHandler<ChuyenNoiBoHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IEMCService _eMCService;
    private readonly IJobService _jobService;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;

    public ChuyenNoiBoHoSoCommandHandler(IJobService jobService, IDapperRepository dapperRepository, ICurrentUser user, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,
        IRepository<HoSo> repositoryHoSo, IEMCService eMCService, INguoiXuLyHoSoService nguoiXuLyHoSoService)
    {
        _dapperRepository = dapperRepository;
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryHoSo = repositoryHoSo;
        _eMCService = eMCService;
        _jobService = jobService;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }
    public async Task<Result> Handle(ChuyenNoiBoHoSoCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _user.GetUserFullName();
        var userId = _user.GetUserId();
        var userName = _user.GetUserName();
        TimeZoneInfo vietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
        DateTime currentTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vietnamTimeZone);
        var sqlInsertQuyTrinhXuLyHoSo = @"INSERT INTO Business.QuaTrinhXuLyHoSos
        (Id, CreatedOn, CreatedBy, MaHoSo,NodeQuyTrinh,ThoiHanBuocXuLy,LoaiThoiHanBuocXuLy,ThaoTac,TrangThai,NgayHetHanBuocXuLy,NguoiGui,TenNguoiGui,NguoiNhan,TenNguoiNhan,ThoiGian,NoiDung,DinhKem)
        SELECT TOP 1 
        NEWID(), @CurrentTime, @NguoiTao, @MaHoSo, @BuocHienTai,ThoiHanBuocXuLy,LoaiThoiHanBuocXuLy,N'Chuyển nội bộ',TrangThai,NgayHetHanBuocXuLy,@NguoiGui,@TenNguoiGui,@ChuyenToiNguoiDungIds,'',@CurrentTime,@YKienNguoiChuyenXuLy,@DinhKemYKienNguoiChuyenXuLy
        FROM Business.QuaTrinhXuLyHoSos
        WHERE MaHoSo = @MaHoSo
        ORDER BY CreatedOn DESC";
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSo, new
        {
            request.Id
        });
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        try
        {
            var updatedHoSo = hoSo.ChuyenNoiBoHoSo(userId.ToString(), request.ChuyenToiNguoiDungIds, userId.ToString());
            await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
            await _nguoiXuLyHoSoService.UpdateAndRemoveOtherHandlers(hoSo.Id, request.ChuyenToiNguoiDungIds, cancellationToken);
            var rowEffect = await _dapperRepository.ExcuteAsync(sqlInsertQuyTrinhXuLyHoSo, new
            {
                hoSo.MaHoSo,
                hoSo.BuocHienTai,
                NguoiTao = userId,
                NguoiGui = userId.ToString(),
                TenNguoiGui = userFullName,
                request.ChuyenToiNguoiDungIds,
                CurrentTime = currentTime,
                request.YKienNguoiChuyenXuLy,
                request.DinhKemYKienNguoiChuyenXuLy
            });
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);

        }

        _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(userName, new Catalog.NotificationApp.Commands.CreateFirebaseNotificationCommand()
        {
            HoSoId = hoSo.Id,
            Content = "Hồ sơ với mã: " + hoSo.MaHoSo + " đã được chuyển tới đến từ " + userFullName,
            CreatedOn = DateTime.Now,
            Description = "",
            IsRead = false,
            MaHoSo = hoSo.MaHoSo,
            LoaiThongBao = NotificationLoaiThongBao.CanBo,
            Title = "",
            Topic = userName,
            Type = NotificationType.DangXuLy,
            FullPath = HoSoEventUtils.GetMenuFullPath(hoSo, null, hoSo.TrangThaiHoSoId, null)
        }, hoSo.Id, CancellationToken.None));
        await _eMCService.SendAction(new EMCRequestBody()
        {
            CodeProfile = hoSo.MaHoSo,
            CodeTTHC = hoSo.MaTTHC,
            NameTTHC = hoSo.TenTTHC,
            Status = hoSo.TrangThaiHoSoId,
            FormsReception = hoSo.KenhThucHien,
            Level = hoSo.MucDo,
            MaHoSo = hoSo.MaHoSo,
            IsFromDVCQG = hoSo.LoaiDuLieuKetNoi,
            IsDVCBC = hoSo.DangKyNhanHoSoQuaBCCIData,
            User = hoSo.SoGiayToChuHoSo,
        });
        return (Result)Result.Success();
    }
}
