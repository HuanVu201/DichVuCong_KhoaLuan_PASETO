using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.VBDLIS.CapNhatTrangThaiBoSungHoSo;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class MotCuaGuiBoSungCommandHandler : ICommandHandler<MotCuaGuiBoSungCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepositoryWithEvents<ThanhPhanHoSoBoSung> _repositoryThanhPhanHoSoBoSung;
    private readonly IRepositoryWithEvents<ThanhPhanHoSo> _repositoryThanhPhanHoSo;

    private readonly IInjectConfiguration _injectConfiguration;
    private readonly IReadRepository<NgayNghi> _ngayNghiRepository;
    private readonly IMediator _mediator;
    private readonly IHoSoServices _hoSoServices;
    private readonly bool _suDungYeuCauBoSungTheoNghiDinh = false;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    public MotCuaGuiBoSungCommandHandler(INguoiXuLyHoSoService nguoiXuLyHoSoService, IHoSoServices hoSoServices, IRepositoryWithEvents<ThanhPhanHoSo> repositoryThanhPhanHoSo, IReadRepository<NgayNghi> ngayNghiRepository, IInjectConfiguration injectConfiguration, IDapperRepository dapperRepository, ICurrentUser user
        , IRepositoryWithEvents<HoSo> repositoryHoSo, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepositoryWithEvents<ThanhPhanHoSoBoSung> repositoryThanhPhanHoSoBoSung, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _user = user;
        _repositoryHoSo = repositoryHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryThanhPhanHoSoBoSung = repositoryThanhPhanHoSoBoSung;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _injectConfiguration = injectConfiguration;
        _ngayNghiRepository = ngayNghiRepository;
        _mediator = mediator;
        _hoSoServices = hoSoServices;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
        bool? suDungYeuCauBoSungTheoNghiDinh = _injectConfiguration.GetValue<bool?>("GLOBAL_CONFIG:SuDungYeuCauBoSungTheoNghiDinh");
        _suDungYeuCauBoSungTheoNghiDinh = (suDungYeuCauBoSungTheoNghiDinh == false || suDungYeuCauBoSungTheoNghiDinh == null) ? false : true;
    }

    public async Task<Result> Handle(MotCuaGuiBoSungCommand request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _user.GetUserId();
        var userFullName = _user.GetUserFullName();
        var hoSo = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        var maTrangThaiHienTai = hoSo.TrangThaiHoSoId;
        var sqlGetHoSoBoSung = @"SELECT TOP 1 Id FROM Business.HoSoBoSungs WHERE MaHoSo = @MaHoSo AND DeletedOn is null
                    AND TrangThaiBoSung IN @TrangThaiBoSungList ORDER BY CreatedOn DESC";
        var sqlUpdateHoSoBoSung = @"UPDATE Business.HoSoBoSungs SET TrangThaiBoSung= @TrangThaiBoSung, ThongTinTiepNhan = @ThongTinTiepNhan,
                                    DanhSachGiayToBoSung = @DanhSachGiayToBoSung, NguoiTiepNhanBoSung = @NguoiTiepNhanBoSung,
                                    NgayTiepNhanBoSung = @NgayTiepNhanBoSung, NgayHenTraMoi = @NgayHenTraMoi
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
        var trangThaiBoSungList = new List<string> { "Yêu cầu một cửa bổ sung", "Yêu cầu công dân bổ sung", "Công dân đã gửi bổ sung" };
        var hoSoBoSung = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoBoSung_Select>(sqlGetHoSoBoSung, new
        {
            hoSo.MaHoSo,
            TrangThaiBoSungList = trangThaiBoSungList
        });
        if (hoSoBoSung == null)
        {
            throw new NotFoundException($"HoSoBoSung với mã: {hoSoBoSung.Id} chưa được thêm vào hệ thống");
        }
        var ngayNghis = await _ngayNghiRepository.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year));
        if (maTrangThaiHienTai == "5" && hoSo.NguoiDangXuLy.ToLower().Contains(userId.ToString().ToLower()))
        {
            //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
            //{
            //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
            //}, TransactionScopeAsyncFlowOption.Enabled))
            //{
            try
            {
                //var trangThaiBoSungList = new List<string> { "Yêu cầu một cửa bổ sung", "", "Yêu cầu công dân bổ sung", "Công dân đã gửi bổ sung" };
                //var hoSoBoSung = await _repositoryHoSoBoSung.FirstOrDefaultAsync(new GetHoSoBoSungQuerySpec(hoSo.MaHoSo, trangThaiBoSungList));

                var danhSachGiayToBoSungStr = String.Join("##", request.DanhSachGiayToBoSung.Select(x => x.FileDinhKemMoi));
                var caculateTime = new CaculateTime(_injectConfiguration);
                var ngayHenTra = caculateTime.GetNgayHenTraBoSung(hoSo.NgayHenTra, (DateTime)hoSo.NgayYeuCauBoSung, ngayNghis, currentTime);
                var ngayHenTraCaNhan = caculateTime.GetNgayHenTraBoSung(hoSo.NgayHenTraCaNhan, (DateTime)hoSo.NgayYeuCauBoSung, ngayNghis, currentTime);

                // Đồng bộ dữ liệu gửi hệ thống VBDLIS
                if (hoSo.LoaiDuLieuKetNoi == "VBDLIS")
                {
                    CapNhatTrangThaiBoSungHoSoGuiVBDLISRequest capNhatTrangThaiBoSungGuiVBDLIS = new CapNhatTrangThaiBoSungHoSoGuiVBDLISRequest();
                    capNhatTrangThaiBoSungGuiVBDLIS.MaHoSo = hoSo.MaHoSo;
                    capNhatTrangThaiBoSungGuiVBDLIS.NgayHenTraMoi = ngayHenTra.Value;
                    var responseCapNhatTrangThaiBoSung = await _mediator.Send(capNhatTrangThaiBoSungGuiVBDLIS, cancellationToken);
                    if (responseCapNhatTrangThaiBoSung.Failed)
                    {
                        return responseCapNhatTrangThaiBoSung;
                    }
                }
                else
                {
                    var nguoiDangXuLy = hoSo.NguoiXuLyTruoc;
                    var updatedHoSo = hoSo.MotCuaGuiBoSung(userId.ToString(), HoSoConstant.HoanThanhBoSung, hoSo.TrangThaiTruoc, hoSo.NguoiXuLyTruoc,
                    userId.ToString(), ngayHenTra, ngayHenTraCaNhan, request.ThongTinTiepNhanBoSung, danhSachGiayToBoSungStr);
                    if (_suDungYeuCauBoSungTheoNghiDinh)
                    {
                        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>($"SElECT TOP 1 {nameof(TruongHopThuTuc.ThoiGianThucHienTrucTuyen)}, {nameof(TruongHopThuTuc.ThoiGianThucHien)}, {nameof(TruongHopThuTuc.LoaiThoiGianThucHien)}, {nameof(TruongHopThuTuc.KhongCoNgayHenTra)}, {nameof(TruongHopThuTuc.EdgeQuyTrinh)}, {nameof(TruongHopThuTuc.NodeQuyTrinh)} FROM {SchemaNames.Business}.{TableNames.TruongHopThuTucs} WHERE DeletedOn is null AND Ma = @MaTruongHop", new
                        {
                            MaTruongHop = hoSo.MaTruongHop
                        });
                        if (truongHopThuTuc != null)
                        {
                            //-- tính lại hẹn trả từ đầu
                            var buocDauTien = _hoSoServices.GetFirstNode(truongHopThuTuc);
                            var currentNode = _hoSoServices.GetCurrentNode(truongHopThuTuc, buocDauTien.id);
                            double thoiGianThucHien = caculateTime.GetThoiGianXuLy(truongHopThuTuc, hoSo.KenhThucHien);
                            double thoiGianHenTraCaNhan = caculateTime.GetThoiGianXuLy(currentNode, hoSo.KenhThucHien);
                            if (truongHopThuTuc.KhongCoNgayHenTra == false || truongHopThuTuc.KhongCoNgayHenTra == null)
                            {
                                ngayHenTra = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianThucHien, truongHopThuTuc.LoaiThoiGianThucHien);
                            }
                            ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianHenTraCaNhan, currentNode.data.loaiThoiGian);
                            //--
                            nguoiDangXuLy = hoSo.NguoiNhanHoSo;
                            updatedHoSo.HoanThanhBoSungTheoNghiDinh(ngayHenTra, ngayHenTraCaNhan, buocDauTien.id);
                        }
                    }

                    await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                    if (!_suDungYeuCauBoSungTheoNghiDinh)
                    {
                        await _nguoiXuLyHoSoService.OverrideNguoiDangXuLy(updatedHoSo.Id, nguoiDangXuLy, NguoiXuLyHoSo.NguoiXuLyHoSo_TrangThai.DaXuLy);
                    }

                }
                var updatedHoSoBoSungRows = await _dapperRepository.ExcuteAsync(sqlUpdateHoSoBoSung, new
                {
                    TrangThaiBoSung = HoSoConstant.HoanThanhBoSung,
                    ThongTinTiepNhan = request.ThongTinTiepNhanBoSung,
                    DanhSachGiayToBoSung = danhSachGiayToBoSungStr,
                    NguoiTiepNhanBoSung = userId.ToString(),
                    NgayTiepNhanBoSung = currentTime,
                    NgayHenTraMoi = ngayHenTra,
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
                await _repositoryThanhPhanHoSoBoSung.AddRangeAsync(thanhPhanHoSoBoSungs, cancellationToken);
                //var updatedHoSoBoSung = hoSoBoSung.MotCuaGuiBoSung(trangthaiBoSung, request.ThongTinTiepNhanBoSung, danhSachGiayToBoSungStr,
                //    userId.ToString(), currentTime, updatedHoSo.NgayHenTra);
                if (hoSo.LoaiDuLieuKetNoi != "VBDLIS")
                {
                    var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, "", null, null, null, userId.ToString(), userFullName, "", "", currentTime, "", "", "Hoàn thành bổ sung hồ sơ", "5");
                    await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
                    //transactionScope.Complete();
                }
                return (Result)Result.Success();
            }
            catch (Exception ex)
            {
                return (Result)Result.Fail(ex.Message);
            }
        }
        //}
        else
        {
            return (Result)Result.Fail("Hồ sơ không ở trạng thái bổ sung hoặc bạn không phải người xử lý hồ sơ!");
        }
    }
}
