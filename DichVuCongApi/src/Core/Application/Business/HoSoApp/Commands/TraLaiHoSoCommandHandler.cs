using Newtonsoft.Json;
using System.Transactions;
using System.Xml.Linq;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class TraLaiHoSoCommandHandler : ICommandHandler<TraLaiHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IEMCService _eMCService;
    private readonly ISyncDVCQGService _syncDVCQGService;
    private readonly IZaloService _zaloService;
    private readonly IJobService _jobService;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private readonly bool usingZaloTemplate = false;

    public TraLaiHoSoCommandHandler(INguoiXuLyHoSoService nguoiXuLyHoSoService, ISyncDVCQGService syncDVCQGService, ICurrentUser user, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepositoryWithEvents<HoSo> repositoryHoSo, IDapperRepository dapperRepository, IEMCService eMCService, IZaloService zaloService, IJobService jobService, IInjectConfiguration configuration)
    {
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryHoSo = repositoryHoSo;
        _dapperRepository = dapperRepository;
        _eMCService = eMCService;
        _syncDVCQGService = syncDVCQGService;
        usingZaloTemplate = configuration.GetValue<bool>("ZaloSetting:usingTemplate");
        _zaloService = zaloService;
        _jobService = jobService;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }

    //private void SendZalo(HoSoQLVB hoSo, CancellationToken cancellationToken)
    //{
    //    try
    //    {
    //        if ((!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
    //        {
    //            string loiNhan = $"Hồ sơ của ông bà đã được chuyển cho cán bộ chuyên viên xử lý";
    //            if (usingZaloTemplate)
    //            {
    //                SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(
    //                    null,
    //                    hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo,
    //                    hoSo.TrichYeuHoSo,
    //                    hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo,
    //                    hoSo.MaHoSo,
    //                    "Đang xử lý",
    //                    hoSo.TrichYeuHoSo,
    //                    loiNhan,
    //                    _zaloService.GetZaloCtaLink(hoSo.MaHoSo),
    //                    null,
    //                    "Xem quá trình xử lý");
    //                _jobService.Enqueue<IZaloService>(x => x.SendTemplateAsync(sendTemplateZalo, cancellationToken));
    //            }
    //            else
    //            {
    //                ZaloRequest zaloRequest = new ZaloRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, loiNhan);
    //                _jobService.Enqueue<IZaloService>(x => x.SendTextAsync(zaloRequest, cancellationToken));
    //            }
    //        }
    //    }
    //    catch (Exception ex)
    //    {

    //    }
    //}

    public async Task<Result> Handle(TraLaiHoSoCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _user.GetUserFullName();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _user.GetUserId();
        var sqlTruongHopThuTuc = "SELECT Ten,Ma, Id, NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHien, LoaiThoiGianThucHien FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";
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
        var nguoiXuLyTruoc = hoSo.NguoiXuLyTruoc;

        if (string.IsNullOrEmpty(hoSo.BuocXuLyTruoc))
        {
            return (Result)Result.Fail("Hồ sơ không thể trả lại!");
        }
        if (hoSo.TrangThaiHoSoId == "4" || hoSo.TrangThaiHoSoId == "8" || hoSo.TrangThaiHoSoId == "6" || hoSo.TrangThaiHoSoId == "9")
        {
            if (hoSo.ChuyenNoiBo == false)
            {
                if (!hoSo.NguoiDangXuLy.ToLower().Contains(userId.ToString().ToLower()) || string.IsNullOrEmpty(hoSo.BuocXuLyTruoc))
                {
                    return (Result)Result.Fail("Hồ sơ không thể trả lại!");
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
                    if (beforeCurrentNode.data.guiLienThongQLVB == true)
                    {
                        return (Result)Result.Fail("Trả lại không thành công");
                    }

                    try
                    {
                        string trangThaiHoSoId = beforeCurrentNode.data.maTrangThaiHoSo;
                        if (hoSo.TrangThaiHoSoId == "4" && hoSo.NguoiXuLyTruoc.ToLower() == hoSo.NguoiNhanHoSo.ToLower() && hoSo.LaHoSoChungThuc == true)
                        {
                            trangThaiHoSoId = "2";
                        }
                        var updatedHoSo = hoSo.TraLaiHoSo(hoSo.NguoiXuLyTruoc, userId.ToString(), "", trangThaiHoSoId, hoSo.BuocXuLyTruoc, beforeCurrentNode.data.tenBuocXuLy, currentTime);
                        await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                        await _nguoiXuLyHoSoService.SwapNguoiDangXuLyAndNguoiDaXuLy(hoSo.Id, nguoiXuLyTruoc, NguoiXuLyHoSo.NguoiXuLyHoSo_TrangThai.TrungGian);
                        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, userId.ToString(), userFullName, nguoiXuLyTruoc, "", currentTime, request.NoiDungTraLai, request.DinhKemChuyenXuLy, "Trả lại người xử lý trước", beforeCurrentNode.data.maTrangThaiHoSo);
                        await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message);
                    }
                    if (hoSo.LoaiDuLieuKetNoi == "TBKM" || hoSo.LoaiDuLieuKetNoi == "TBKMBS")
                    {
                        await _syncDVCQGService.DongBoDVCQG(hoSo);
                    }
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
            else
            {
                try
                {
                    var updatedHoSo = hoSo.TraLaiHoSo(hoSo.NguoiXuLyTruoc, userId.ToString(), null, hoSo.TrangThaiHoSoId, "", "", null);
                    await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                    await _nguoiXuLyHoSoService.SwapNguoiDangXuLyAndNguoiDaXuLy(hoSo.Id, nguoiXuLyTruoc, NguoiXuLyHoSo.NguoiXuLyHoSo_TrangThai.TrungGian);
                    var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, userId.ToString(), userFullName, nguoiXuLyTruoc, "", currentTime, request.NoiDungTraLai, request.DinhKemChuyenXuLy, "Trả lại người xử lý trước", "");
                    await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
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
                    User = hoSo.SoGiayToChuHoSo
                });
                return (Result)Result.Success();
            }
        }
        else
        {
            return (Result)Result.Fail("Chỉ thu hồi hồ sơ đang xử lý!");
        }

    }
}
