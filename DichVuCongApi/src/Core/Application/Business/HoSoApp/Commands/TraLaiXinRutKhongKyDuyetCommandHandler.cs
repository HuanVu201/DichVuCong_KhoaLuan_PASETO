using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.KetNoi.KhaiSinhKhaiTu;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class TraLaiXinRutKhongKyDuyetCommandHandler : ICommandHandler<TraLaiXinRutKhongKyDuyetCommand>
{
    private readonly IHoSoServices _hoSoServices;
    private readonly ILogger<TraLaiXinRutKhongKyDuyetCommand> _logger;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly ILLTPService _lLTPService;
    private readonly IKhaiSinhKhaiTuService _khaiSinhKhaiTuService;
    public TraLaiXinRutKhongKyDuyetCommandHandler(
        IHoSoServices hoSoServices,
        ILogger<TraLaiXinRutKhongKyDuyetCommand> logger,
        IDapperRepository dapperRepository,
        ICurrentUser currentUser,
        ILLTPService lLTPService,
        IKhaiSinhKhaiTuService khaiSinhKhaiTuService
        )
    {
        _hoSoServices = hoSoServices;
        _logger = logger;
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _lLTPService = lLTPService;
        _khaiSinhKhaiTuService = khaiSinhKhaiTuService;
    }
    public async Task<Result> Handle(TraLaiXinRutKhongKyDuyetCommand request, CancellationToken cancellationToken)
    {
        var trangThaiThanhToan = new YeuCauThanhToanConstants();
        string userFullName = _currentUser.GetUserFullName();
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string sqlUpdateYcct = $@"Update {SchemaNames.Business}.{TableNames.YeuCauThanhToans} SET TrangThai = N'{trangThaiThanhToan.TRANG_THAI.HUY}'
                                WHERE (TrangThai = N'{trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN}' OR TrangThai = N'{trangThaiThanhToan.TRANG_THAI.CHUA_THANH_TOAN}')
                                AND MaHoSo = @MaHoSo And DeletedOn is null";
        string sqlGetHoSo = $"SElect Top 1 * From {SchemaNames.Business}.{TableNames.HoSos} WHERE Id = @Id and DeletedOn Is null";
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlGetHoSo, new
        {
            Id = request.Id,
        });
        _lLTPService.CheckThaoTac(hoSo.LoaiDuLieuKetNoi);
        _khaiSinhKhaiTuService.CheckThaoTac(hoSo.LoaiDuLieuKetNoi);

        var dinhKemKetQuaCu = hoSo.DinhKemKetQua;
        var trichYeuKetQuaCu = hoSo.TrichYeuKetQua;
        var soKyHieuKetQuaCu = hoSo.SoKyHieuKetQua;
        var loaiVanBanKetQuaCu = hoSo.LoaiVanBanKetQua;
        var nguoiKyKetQuaCu = hoSo.NguoiKyKetQua;
        var coQuanBanHanhKetQuaCu = hoSo.CoQuanBanHanhKetQua;
        var ngayBanHanhKetQuaCu = hoSo.NgayBanHanhKetQua;
        var ngayKyKetQuaCu = hoSo.NgayKyKetQua;
        //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
        //{
        //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
        //}, TransactionScopeAsyncFlowOption.Enabled))
        //{
            try
            {
                await _dapperRepository.ExcuteAsync(sqlUpdateYcct, new
                {
                    MaHoSo = hoSo.MaHoSo
                });
                var chuyenTraHoSoCommand = new ChuyenTraHoSoCommand()
                {
                    Id = hoSo.Id,
                    DinhKemYKienNguoiChuyenXuLy = request.FileDinhKem,
                    YKienNguoiChuyenXuLy = request.TrichYeu,
                };
                if (!string.IsNullOrEmpty(request.FileDinhKem))
                {
                    var ketQuaLienQuan = new KetQuaLienQuan(hoSo.MaHoSo, loaiVanBanKetQuaCu, soKyHieuKetQuaCu, trichYeuKetQuaCu, ngayKyKetQuaCu, nguoiKyKetQuaCu, coQuanBanHanhKetQuaCu, ngayBanHanhKetQuaCu, null, null, dinhKemKetQuaCu);
                    int updatedRows = await _dapperRepository.InsertEntityAsync<KetQuaLienQuan>(ketQuaLienQuan, SchemaNames.Business + "." + TableNames.KetQuaLienQuans);
                    if(updatedRows == 0)
                    {
                        //transactionScope.Dispose();
                        return (Result)Result.Fail("Cập nhật kết quả liên quan thất bại");
                    }
                    hoSo.SetDataDuThao(request.TrichYeu, request.FileDinhKem, null, null, null, null, null, null);
                }
                await _hoSoServices.ChuyenTraHoSo(chuyenTraHoSoCommand, hoSo, currentTime, userFullName, "Xin rút/trả lại hồ sơ");
                //transactionScope.Complete();
                return (Result)Result.Success("Thao tác thành công");
            } catch (Exception ex)
            {
                _logger.LogError($"{hoSo.MaHoSo}_TraLaiXinRutKhongKyDuyet_{ex.ToString()}");
                return (Result)Result.Fail(ex.ToString());
            }
        //}
    }
}
