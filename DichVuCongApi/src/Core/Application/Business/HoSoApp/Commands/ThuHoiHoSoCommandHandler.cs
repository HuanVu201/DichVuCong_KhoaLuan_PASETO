using Newtonsoft.Json;
using System.Linq;
using System.Transactions;
using System.Xml.Linq;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ThuHoiHoSoCommandHandler : ICommandHandler<ThuHoiHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IEMCService _eMCService;
    private readonly ISyncDVCQGService _syncDVCQGService;
    private readonly ILLTPService _lLTPService;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;

    public ThuHoiHoSoCommandHandler(INguoiXuLyHoSoService nguoiXuLyHoSoService, ILLTPService lLTPService, ISyncDVCQGService syncDVCQGService, ICurrentUser user, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepositoryWithEvents<HoSo> repositoryHoSo, IDapperRepository dapperRepository, IEMCService eMCService)
    {
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryHoSo = repositoryHoSo;
        _dapperRepository = dapperRepository;
        _eMCService = eMCService;
        _syncDVCQGService = syncDVCQGService;
        _lLTPService = lLTPService;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }
    public async Task<Result> Handle(ThuHoiHoSoCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _user.GetUserFullName();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _user.GetUserId();
        var sqlTruongHopThuTuc = "SELECT NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHien, LoaiThoiGianThucHien, Ten, Ma, Id FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";
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
        if (hoSo.LoaiDuLieuKetNoi == "LTKS" || hoSo.LoaiDuLieuKetNoi == "LTKT")
        {
            return (Result)Result.Fail("Hồ sơ thuộc Dịch vụ công liên thông, vui lòng không sử dụng chức năng này");
        }
        _lLTPService.CheckThaoTac(hoSo.LoaiDuLieuKetNoi);

        if (hoSo.TrangThaiHoSoId == "4" || hoSo.TrangThaiHoSoId == "8" || hoSo.TrangThaiHoSoId == "6")
        {
            if (hoSo.ChuyenNoiBo == false)
            {
                if (string.IsNullOrEmpty(hoSo.NguoiXuLyTruoc))
                {
                    return (Result)Result.Fail("Hồ sơ không thể thu hồi!");
                }

                if (!hoSo.NguoiXuLyTruoc.ToLower().Contains(userId.ToString().ToLower()) || string.IsNullOrEmpty(hoSo.BuocXuLyTruoc))
                {
                    return (Result)Result.Fail("Hồ sơ không thể thu hồi!");
                }
                else
                {
                    var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
                    {
                        hoSo.MaTruongHop
                    });
                    var nodeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowNodeQuyTrinhXuLy>>(truongHopThuTuc.NodeQuyTrinh);
                    var edgeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowEdgeQuyTrinhXuLy>>(truongHopThuTuc.EdgeQuyTrinh);
                    var currentNode = nodeQuyTrinhs.Find(node => node.id == hoSo.BuocHienTai);
                    var beforeCurrentNode = nodeQuyTrinhs.Find(node => node.id == hoSo.BuocXuLyTruoc);
                    if(currentNode.data.guiLienThongQLVB == true)
                    {
                        return (Result)Result.Fail("Thu hồi không thành công");
                    }
                    try
                    {
                        var updatedHoSo = hoSo.ThuHoiHoSo(userId.ToString(), "", beforeCurrentNode.data.maTrangThaiHoSo, hoSo.BuocXuLyTruoc, beforeCurrentNode.data.tenBuocXuLy, currentTime);
                        await _nguoiXuLyHoSoService.SwapNguoiDangXuLyAndNguoiDaXuLy(hoSo.Id, userId.ToString(), NguoiXuLyHoSo.NguoiXuLyHoSo_TrangThai.TrungGian);
                        await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, null, null, "Thu hồi hồ sơ", "");
                        await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);

                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message);
                    }
                    return (Result)Result.Success();
                }
            }
            else
            {
                try
                {
                    var updatedHoSo = hoSo.ThuHoiHoSo(userId.ToString(), "", hoSo.TrangThaiHoSoId, null, null, null);
                    await _nguoiXuLyHoSoService.SwapNguoiDangXuLyAndNguoiDaXuLy(hoSo.Id, userId.ToString());
                    await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                    var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, null, null, "Thu hồi hồ sơ", "");
                    await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
                    //transactionScope.Complete();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }

            await _eMCService.SendAction(new EMCRequestBody()
            {
                CodeProfile = hoSo.MaHoSo,
                CodeTTHC = hoSo.MaTTHC,
                NameTTHC = hoSo.TenTTHC,
                Status = "0",
                FormsReception = hoSo.KenhThucHien,
                Level = hoSo.MucDo,
                MaHoSo = hoSo.MaHoSo,
                IsFromDVCQG = hoSo.LoaiDuLieuKetNoi,
                IsDVCBC = hoSo.DangKyNhanHoSoQuaBCCIData,
                User = hoSo.SoGiayToChuHoSo,
            });
            if (hoSo.LoaiDuLieuKetNoi == "TBKM" || hoSo.LoaiDuLieuKetNoi == "TBKMBS")
            {
                await _syncDVCQGService.DongBoDVCQG(hoSo);
            }
            return (Result)Result.Success();
        }
        else
        {
            return (Result)Result.Fail("Chỉ thu hồi hồ sơ đang xử lý!");
        }
    }
}
