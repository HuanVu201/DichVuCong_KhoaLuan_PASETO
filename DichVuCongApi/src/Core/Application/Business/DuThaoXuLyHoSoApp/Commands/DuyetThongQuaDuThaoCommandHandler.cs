using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.LTQVLB;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Commands;
public class DuyetThongQuaDuThaoCommandHandler : ICommandHandler<DuyetThongQuaDuThaoCommand, DefaultIdType>
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
    public DuyetThongQuaDuThaoCommandHandler(ILLTPService lLTPService, IRepository<DuThaoXuLyHoSo> repositoryDuThaoXuLyHoSo, IRepository<HoSo> repositoryHoSo, IDapperRepository dapperRepository, ICurrentUser currentUser, IHoSoServices hoSoServices, ILTQLVBService lTQLVBService, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IMediator mediator)
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
    public async Task<Result<DefaultIdType>> Handle(DuyetThongQuaDuThaoCommand request, CancellationToken cancellationToken)
    {
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var userId = _currentUser.GetUserId();
        var userName = _currentUser.GetUserName();
        var userFullName = _currentUser.GetUserFullName();

        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);


        string sqlQueryDuThao = @"SELECT TOP (1) 
	                                Id, MaHoSo, Loai, FileDinhKem, NguoiXuLy, TrichYeu, TrangThai, TrangThaiLienThongQLVB,
	                                NgayHenTraMoi, LanhDaoThongQua, TenLanhDaoKy, TaiKhoanLanhDaoKy
                                  FROM [Business].[DuThaoXuLyHoSos]
                                  where Id= @Id";

        var duThaoXuLyHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<DuThaoXuLyHoSo>(sqlQueryDuThao, new
        {
            Id = request.Id
        });

        if (duThaoXuLyHoSo != null)
        {
            Result<DefaultIdType>.Fail("Không có thông dự thảo cần duyệt!");
        }


        var sqlTruongHopThuTuc = "SELECT Top 1 NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHien, LoaiThoiGianThucHien, Ten, Ma, Id FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";

        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSoByMaHoSoSql, new
        {
            MaHoSo = duThaoXuLyHoSo.MaHoSo
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




        string sqlQueryNguoiTrinhKy = @"SELECT TOP (1) Id, UserName, FullName, OfficeName, MaDinhDanhOfficeCode
                                          FROM [Identity].[Users]
                                          WHERE Id= @Id";

        string sqlQueryNguoiNhan = @"SELECT TOP (1) Id, UserName, FullName, OfficeName, MaDinhDanhOfficeCode
                                          FROM [Identity].[Users]
                                          WHERE UserName= @UserName";

        var user = await _dapperRepository.QueryFirstOrDefaultAsync<UserAppDto>(sqlQueryNguoiTrinhKy, new
        {
            Id = duThaoXuLyHoSo.NguoiXuLy
        });

       

        if (user != null)
        {
            Result<DefaultIdType>.Fail("Không có thông tin người trình ký");
        }

        try
        {
            NguoiKyLienThongQLVB nguoiKy = new NguoiKyLienThongQLVB()
            {
                TaiKhoan = duThaoXuLyHoSo.TaiKhoanLanhDaoKy,
                Ten = duThaoXuLyHoSo.TenLanhDaoKy,
            };
            if (!string.IsNullOrEmpty(nguoiKy.TaiKhoan))
            {
                var nguoiNhan = await _dapperRepository.QueryFirstOrDefaultAsync<UserAppDto>(sqlQueryNguoiNhan, new
                {
                    UserName = nguoiKy.TaiKhoan
                });
                if (nguoiNhan != null)
                {
                    nguoiKy.Id = nguoiNhan.Id;
                }

            }

            NguoiKyLienThongQLVB nguoiTrinhKy = new NguoiKyLienThongQLVB()
            {
                TaiKhoan = user.UserName ?? string.Empty,
                Ten = user.FullName ?? string.Empty,
            };

            LienThongQLVB_ThamSoAn thamSoAn = new LienThongQLVB_ThamSoAn(true, duThaoXuLyHoSo.Loai, duThaoXuLyHoSo.Id.ToString());
            LienThongTrucDVCQLVB lienThongTrucDVCQLVB = await _hoSoServices.GuiHoSoLTQLVB(hoSo, nguoiKy, nguoiTrinhKy, duThaoXuLyHoSo.FileDinhKem, null, user.OfficeName, user.MaDinhDanhOfficeCode, thamSoAn, duThaoXuLyHoSo.TrichYeu, null);
            var responseLienThongQLVB = await _lTQLVBService.PostData(JsonConvert.SerializeObject(lienThongTrucDVCQLVB));
            if (responseLienThongQLVB.error.code == 200)
            {
                if (duThaoXuLyHoSo.Loai == DuThaoXuLyHoSoConstant.Loai_BoSung)
                {
                    var firstNode = _hoSoServices.GetFirstNode(truongHopThuTuc);
                    hoSo.ThemMoiDuThaoBoSung(firstNode.id, firstNode.data.tenBuocXuLy, hoSo.NguoiNhanHoSo, duThaoXuLyHoSo.NguoiXuLy);
                    await _repositoryHoSo.UpdateAsync(hoSo);
                }
                else if (duThaoXuLyHoSo.Loai == DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut)
                {
                    var nodeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowNodeQuyTrinhXuLy>>(truongHopThuTuc.NodeQuyTrinh);
                    var edgeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowEdgeQuyTrinhXuLy>>(truongHopThuTuc.EdgeQuyTrinh);
                    var lastNode = nodeQuyTrinhs.Find(x => x.data.maTrangThaiHoSo == "9");
                    hoSo.ThemMoiDuThaoBoSung(lastNode.id, lastNode.data.tenBuocXuLy, hoSo.NguoiNhanHoSo, duThaoXuLyHoSo.NguoiXuLy);
                    await _repositoryHoSo.UpdateAsync(hoSo);
                }

                duThaoXuLyHoSo.UpdateTrangThai(DuThaoXuLyHoSoConstant.TrangThai_ChoXuLy);

                QuaTrinhXuLyHoSo quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, userId.ToString(), userFullName, nguoiKy.Id, nguoiKy.Ten, currentTime, hoSo.TrangThaiHoSoId, $"Trình ký duyệt dự thảo {duThaoXuLyHoSo.Loai} hồ sơ", false);
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
                await _repositoryDuThaoXuLyHoSo.UpdateAsync(duThaoXuLyHoSo);

                return Result<DefaultIdType>.Success(request.Id);
            }

            return Result<DefaultIdType>.Fail("Gửi hồ sơ QLVB thất bại");

        }
        catch (Exception ex)
        {
            return Result<DefaultIdType>.Fail(ex.ToString());
        }
    }
}
