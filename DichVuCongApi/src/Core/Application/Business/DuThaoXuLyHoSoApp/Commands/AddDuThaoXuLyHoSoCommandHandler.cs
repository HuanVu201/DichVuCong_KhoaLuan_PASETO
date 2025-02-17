using Newtonsoft.Json;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.LTQVLB;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Commands;

public class AddDuThaoXuLyHoSoValidator : CustomValidator<AddDuThaoXuLyHoSoCommand>
{
    public AddDuThaoXuLyHoSoValidator()
    {
        var loaiValidate = new List<string>() { DuThaoXuLyHoSoConstant.Loai_BoSung, DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut };
        RuleFor(x => loaiValidate.Contains(x.Loai));
    }
}

public class AddDuThaoXuLyHoSoCommandHandler : ICommandHandler<AddDuThaoXuLyHoSoCommand, DefaultIdType>
{
    private readonly IRepository<DuThaoXuLyHoSo> _repositoryDuThaoXuLyHoSo;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly IHoSoServices _hoSoServices;
    private readonly ILTQLVBService _lTQLVBService;
    private readonly IMediator _mediator;
    private readonly ILLTPService _lLTPService;
    public AddDuThaoXuLyHoSoCommandHandler(ILLTPService lLTPService, IRepository<DuThaoXuLyHoSo> repositoryDuThaoXuLyHoSo, IRepository<HoSo> repositoryHoSo, IDapperRepository dapperRepository, ICurrentUser currentUser, IHoSoServices hoSoServices, ILTQLVBService lTQLVBService, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IMediator mediator)
    {
        _repositoryDuThaoXuLyHoSo = repositoryDuThaoXuLyHoSo;
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _hoSoServices = hoSoServices;
        _repositoryHoSo = repositoryHoSo;
        _lTQLVBService = lTQLVBService;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _mediator = mediator;
        _lLTPService = lLTPService;
    }

    public async Task<Result<DefaultIdType>> Handle(AddDuThaoXuLyHoSoCommand request, CancellationToken cancellationToken)
    {
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var userId = _currentUser.GetUserId();
        var userName = _currentUser.GetUserName();
        var userFullName = _currentUser.GetUserFullName();
        //var sqlGetNguoiTiepNhan = hoSoQueryBuilder.select.GetNguoiTiepNhanSql;
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);

        var sqlTruongHopThuTuc = "SELECT Top 1 NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHien, LoaiThoiGianThucHien, Ten, Ma, Id FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";

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
            throw new Exception("Hồ sơ thuộc Dịch vụ công liên thông, vui lòng không sử dụng chức năng này");
        }
        _lLTPService.CheckThaoTac(hoSo.LoaiDuLieuKetNoi);

        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
        {
            hoSo.MaTruongHop
        });

        try
        {
            NguoiKyLienThongQLVB nguoiKy = new NguoiKyLienThongQLVB()
            {
                TaiKhoan = request.NguoiXuLy,
                Ten = request.TenNguoiXuLy,
            };
            NguoiKyLienThongQLVB nguoiTrinhKy = new NguoiKyLienThongQLVB()
            {
                TaiKhoan = userName,
                Ten = userFullName,
            };

            string sqlQueryNguoiDuyet = @"SELECT TOP (1) FullName
                                          FROM [Identity].[Users]
                                          WHERE Id= @Id";
            if (!string.IsNullOrEmpty(request.LanhDaoThongQua))
            {
                string tenLanhDaoThongQua = string.Empty;

                var res = await _dapperRepository.QueryFirstOrDefaultAsync<UserAppDto>(sqlQueryNguoiDuyet, new
                {
                    Id = request.LanhDaoThongQua
                });
                if (res != null)
                {
                    tenLanhDaoThongQua = res.FullName;
                }

                DuThaoXuLyHoSo duThaoXuLyHoSo = new DuThaoXuLyHoSo(hoSo.MaHoSo, request.Loai, request.FileDinhKem, userId.ToString(), request.LanhDaoThongQua, request.NguoiXuLy, request.TenNguoiXuLy, request.TrichYeu, _currentUser.GetUserId(), DuThaoXuLyHoSoConstant.TrangThai_ChoKyDuyet, request.TrangThaiLienThongQLVB, request.NgayHenTraMoi);
                await _repositoryDuThaoXuLyHoSo.AddAsync(duThaoXuLyHoSo);

                LienThongQLVB_ThamSoAn thamSoAn = new LienThongQLVB_ThamSoAn(true, request.Loai, duThaoXuLyHoSo.Id.ToString());

                // cập nhật chobanhanh = 1
                hoSo.SetDangChoBanHanh(true);
                await _repositoryHoSo.UpdateAsync(hoSo);

                string tenThaoTac = $"Trình lãnh đạo dự thảo {request.Loai}";
                if (!string.IsNullOrEmpty(request.Loai) && request.Loai == DuThaoXuLyHoSoConstant.Loai_BoSung)
                {
                    tenThaoTac = "Trình thông qua dự thảo yêu cầu bổ sung hồ sơ";
                }
                else if (!string.IsNullOrEmpty(request.Loai))
                {
                    tenThaoTac = $"Trình thông qua dự thảo {request.Loai}";
                }

                QuaTrinhXuLyHoSo quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, userId.ToString(), userFullName, request.LanhDaoThongQua, tenLanhDaoThongQua, currentTime, hoSo.TrangThaiHoSoId, tenThaoTac, false);
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);

                return Result<DefaultIdType>.Success("Gửi trình lãnh đạo thông qua thành công!");
            }
            else
            {
                DuThaoXuLyHoSo duThaoXuLyHoSo = new DuThaoXuLyHoSo(hoSo.MaHoSo, request.Loai, request.FileDinhKem, userId.ToString(), request.LanhDaoThongQua, request.NguoiXuLy, request.TenNguoiXuLy, request.TrichYeu, _currentUser.GetUserId(), DuThaoXuLyHoSoConstant.TrangThai_ChoXuLy, request.TrangThaiLienThongQLVB, request.NgayHenTraMoi);
                await _repositoryDuThaoXuLyHoSo.AddAsync(duThaoXuLyHoSo);

                LienThongQLVB_ThamSoAn thamSoAn = new LienThongQLVB_ThamSoAn(true, request.Loai, duThaoXuLyHoSo.Id.ToString());
                if (request.Loai == DuThaoXuLyHoSoConstant.Loai_XinLoi)
                {
                    if (request.NgayHenTraMoi == null || request.NgayHenTraMoi == DateTime.MinValue)
                    {
                        return Result<DefaultIdType>.Fail("Vui chọn ngày hẹn trả mới");
                    }

                    thamSoAn.NgayHenTraMoi = (DateTime)request.NgayHenTraMoi;
                }

                LienThongTrucDVCQLVB lienThongTrucDVCQLVB = await _hoSoServices.GuiHoSoLTQLVB(hoSo, nguoiKy, nguoiTrinhKy, request.FileDinhKem, null, _currentUser.GetUserOfficeName(), request.MaDinhDanhOfficeCode, thamSoAn, request.TrichYeu, null);
                var responseLienThongQLVB = await _lTQLVBService.PostData(JsonConvert.SerializeObject(lienThongTrucDVCQLVB));
                if (responseLienThongQLVB.error.code == 200)
                {
                    if (request.Loai == DuThaoXuLyHoSoConstant.Loai_BoSung)
                    {
                        var firstNode = _hoSoServices.GetFirstNode(truongHopThuTuc);
                        hoSo.ThemMoiDuThaoBoSung(firstNode.id, firstNode.data.tenBuocXuLy, hoSo.NguoiNhanHoSo, userId.ToString());
                        await _repositoryHoSo.UpdateAsync(hoSo);
                    }
                    else if (request.Loai == DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut)
                    {
                        var nodeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowNodeQuyTrinhXuLy>>(truongHopThuTuc.NodeQuyTrinh);
                        var edgeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowEdgeQuyTrinhXuLy>>(truongHopThuTuc.EdgeQuyTrinh);
                        var lastNode = nodeQuyTrinhs.Find(x => x.data.maTrangThaiHoSo == "9");
                        hoSo.ThemMoiDuThaoBoSung(lastNode.id, lastNode.data.tenBuocXuLy, hoSo.NguoiNhanHoSo, userId.ToString());
                        await _repositoryHoSo.UpdateAsync(hoSo);
                    }

                    string idNguoiKy = string.Empty;
                    var nguoiNhan = await _dapperRepository.QueryFirstOrDefaultAsync<UserAppDto>(sqlQueryNguoiDuyet, new
                    {
                        Id = duThaoXuLyHoSo.NguoiXuLy
                    });
                    if (nguoiNhan != null)
                        idNguoiKy = nguoiNhan.Id;

                    QuaTrinhXuLyHoSo quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, userId.ToString(), userFullName, idNguoiKy, nguoiKy.Ten, currentTime, hoSo.TrangThaiHoSoId, $"Trình ký duyệt dự thảo {request.Loai} hồ sơ", false);
                    await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);

                    return Result<DefaultIdType>.Success(duThaoXuLyHoSo.Id);
                }

                return Result<DefaultIdType>.Fail("Gửi hồ sơ QLVB thất bại");

            }
        }
        catch (Exception ex)
        {
            return Result<DefaultIdType>.Fail(ex.ToString());
        }
    }
}
