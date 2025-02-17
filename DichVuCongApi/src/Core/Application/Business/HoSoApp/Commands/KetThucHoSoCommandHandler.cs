using Newtonsoft.Json;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class KetThucHoSoCommandHandler : ICommandHandler<KetThucHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly ISyncDVCQGService _syncDVCQGService;
    private readonly IMediator _mediator;
    private readonly IEventPublisher _eventPublisher;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private readonly TrangThaiTraKetQuaHoSoConstant _trangThaiTraHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();

    public KetThucHoSoCommandHandler(INguoiXuLyHoSoService nguoiXuLyHoSoService, IMediator mediator, ISyncDVCQGService syncDVCQGService, ICurrentUser user, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepository<HoSo> repositoryHoSo, IDapperRepository dapperRepository)
    {
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryHoSo = repositoryHoSo;
        _dapperRepository = dapperRepository;
        _syncDVCQGService = syncDVCQGService;
        _mediator = mediator;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }

    public async Task<Result> Handle(KetThucHoSoCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _user.GetUserFullName();
        var userOfficeCode = _user.GetUserOfficeCode();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _user.GetUserId();
        var sqlTruongHopThuTuc = "SELECT NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHien, LoaiThoiGianThucHien, Ten, Ma, Id FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSo, new
        {
            request.Id
        }, cancellationToken: cancellationToken);
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        if (hoSo.TrangThaiHoSoId == "4" || hoSo.TrangThaiHoSoId == "2")
        {
            string notificationType = null;
            var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
            {
                hoSo.MaTruongHop
            }, cancellationToken: cancellationToken);
            if (truongHopThuTuc == null)
            {
                throw new NotFoundException($"TruongHopThuTuc với mã: {hoSo.TruongHopId} chưa được thêm vào hệ thống");
            }
            var nodeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowNodeQuyTrinhXuLy>>(truongHopThuTuc.NodeQuyTrinh);
            var edgeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowEdgeQuyTrinhXuLy>>(truongHopThuTuc.EdgeQuyTrinh);
            var endNode = nodeQuyTrinhs.Find(node => node.type == "endNode");
            string trangThaiTraKq = "";
            string? donViTraKq = null;
            GroupDto groupInfo = null;
            if (!string.IsNullOrEmpty(hoSo.DonViId))
            {
                var groupsInfo = await _mediator.Send(new GetByGroupCodeQuery(hoSo.DonViId), cancellationToken);
                groupInfo = groupsInfo.Data;
                if (groupInfo?.YeuCauXacNhanCoKetQua == null || groupInfo?.YeuCauXacNhanCoKetQua == false)
                {
                    trangThaiTraKq = _trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ;
                    notificationType = NotificationType.DaTraKetQua;
                    //await _eventPublisher.PublishAsync(new ThongBaoTraKetQuaEvent(hoSo, hoSo.TenDonVi,hoSo.Catalog));
                }
                else
                {
                    trangThaiTraKq = _trangThaiTraHoSoConstant.CHO_XAC_NHAN;
                    notificationType = NotificationType.ChoXacNhanTraKetQua;

                }
                donViTraKq = !string.IsNullOrEmpty(groupInfo?.DonViQuanLy) && groupInfo.DonViQuanLyTraHoSo == true ? groupInfo?.DonViQuanLy : hoSo.DonViId;
            }
            
            try
            {
                hoSo.SetNgayKetThucXuLy(currentTime);
                var updatedHoSo = hoSo.ChuyenBuocXuLy(endNode.data.tenBuocXuLy, endNode.data.id.ToString(), "", "", //fix id 
                    userId.ToString(), hoSo.BuocHienTai, userId.ToString(), hoSo.NguoiNhanHoSo, request.TrichYeuKetQua, request.DinhKemKetQua,
                    "", "", endNode.data.maTrangThaiHoSo, null, null,null,null, currentTime, trangThaiTraKq,donViTraKq,null,null,null,null,null, null, userOfficeCode, currentTime, null);
                await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                await _nguoiXuLyHoSoService.SwapNguoiDangXuLyAndNguoiDaXuLy(hoSo.Id, hoSo.NguoiNhanHoSo);
                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, endNode.data.id.ToString(), null, null, (DateTime)hoSo.NgayHenTra, userId.ToString(), userFullName, hoSo.NguoiNhanHoSo, "", currentTime, null, null, endNode.data.tenBuocXuLy, "9");

                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
                    
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            if (hoSo.LoaiDuLieuKetNoi == "TBKM" || hoSo.LoaiDuLieuKetNoi == "TBKMBS")
            {
                await _syncDVCQGService.DongBoDVCQG(hoSo);
            }
            if (trangThaiTraKq == _trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ)
            {
                await _eventPublisher.PublishAsync(new ThongBaoTraKetQuaEvent(hoSo, hoSo.TenDonVi, hoSo.Catalog));
            }
            await _eventPublisher.PublishAsync(new ChuyenBuocNotificationEvent(hoSo, hoSo.NguoiNhanHoSo, userFullName + " " + endNode.data.tenBuocXuLy + " " + hoSo.MaHoSo, notificationType, hoSo.TrangThaiHoSoId, trangThaiTraKq));
            return (Result)Result.Success();
        }
        return (Result)Result.Fail("Trạng thái hồ sơ phải ở bước đang xử lý");
    }
}
