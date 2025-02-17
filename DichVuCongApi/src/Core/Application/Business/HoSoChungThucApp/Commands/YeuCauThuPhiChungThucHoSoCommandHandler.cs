using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Domain.Business;
using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Common.Business;
using System.Net.WebSockets;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Common;
using TD.DichVuCongApi.Application.Common.Zalo;
using MediatR;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Common.Persistence;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;

public class GetYeuCauThanhToanChungThucSpec : Specification<YeuCauThanhToan>, ISingleResultSpecification
{
    public GetYeuCauThanhToanChungThucSpec(string maHoSo)
    {
        Query.Where(x => x.MaHoSo == maHoSo).Where(x => x.DeletedOn == null);
    }
}
public class GetThanhPhanHoSoChungThucTraKetQuaSpec : Specification<ThanhPhanHoSo>
{
    public GetThanhPhanHoSoChungThucTraKetQuaSpec(string maHoSo)
    {
        Query.Where(x => x.HoSo == maHoSo).Where(x => x.DeletedOn == null);
    }
}

public class YeuCauThuPhiChungThucHoSoCommandHandler : ICommandHandler<YeuCauThuPhiChungThucHoSoCommand>
{
    private readonly IRepository<YeuCauThanhToan> _repositoryYeuCauThanhToan;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly ICurrentUser _currentUser;
    private readonly IMediator _mediator;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IEventPublisher _eventPublisher;
    private readonly IDapperRepository _dapperRepository;
    private readonly string tenTinhThanh;
    public YeuCauThuPhiChungThucHoSoCommandHandler(
        IRepository<YeuCauThanhToan> repositoryYeuCauThanhToan,
        IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo,
        ICurrentUser currentUser,
        IMediator mediator,
        IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,
        IDapperRepository dapperRepository,
        IEventPublisher eventPublisher,
        IInjectConfiguration injectConfiguration
        )
    {
        _repositoryYeuCauThanhToan = repositoryYeuCauThanhToan;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _currentUser = currentUser;
        _mediator = mediator;
        _dapperRepository = dapperRepository;
        _eventPublisher = eventPublisher;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        tenTinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
    }
    private async Task<int> GetTongTien(string maHoSo)
    {
        var thanhPhanHoSos = await _repositoryThanhPhanHoSo.ListAsync(new GetThanhPhanHoSoChungThucTraKetQuaSpec(maHoSo));
        var tongTien = 0;
        try
        {
            foreach (var item in thanhPhanHoSos)
            {
                var tien = TinhTien.GetTongTienThanhPhanChungThuc(new HoSoApp.Dto.HoSoKySoChungThucDetail_ThanhPhanHoSo()
                {
                    KyDienTuBanGiay = item.KyDienTuBanGiay ?? false,
                    SoBanGiay = (int)item.SoBanGiay,
                    SoTrang = (int)item.SoTrang
                });
                tongTien += tien.TongTien;
            }
            return tongTien;
        }
        catch (Exception ex)
        {
            throw new Exception("Có lỗi xảy ra khi thực hiện tính tiền");
        }
    }
    public async Task<Result> Handle(YeuCauThuPhiChungThucHoSoCommand request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userOfficeCode = _currentUser.GetUserOfficeCode();
        var userOfficeName = _currentUser.GetUserOfficeName();
        var userFullName = _currentUser.GetUserFullName();
        var userId = _currentUser.GetUserId();
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSoByMaHoSoSql, new
        {
            request.MaHoSo
        });
        if (hoSo == null)
        {
            return (Result)Result.Fail("Hồ sơ không tồn tại hoặc đã bị xóa");
        }
        if (hoSo.LaHoSoChungThuc == null || hoSo.LaHoSoChungThuc == false)
        {
            return (Result)Result.Fail("Hồ sơ không phải hồ sơ chứng thực, vui lòng không thực hiện chức năng này");
        }
        if (hoSo.TrangThaiHoSoId != "9")
        {
            return (Result)Result.Fail("Hồ sơ không ở trạng thái chờ trả kết quả!");
        }
        //var yeuCauThanhToan = await _repositoryYeuCauThanhToan.GetBySpecAsync(new GetYeuCauThanhToanChungThucSpec(request.MaHoSo));
        var trangThaiThanhToan = new YeuCauThanhToanConstants();
        var yeuCauThanhToan = await _repositoryYeuCauThanhToan.FirstOrDefaultAsync(new ChuaThanhToanYeuCauPhiLePhiSpec(request.MaHoSo));
        if (yeuCauThanhToan != null) // có yêu cầu chưa thanh toán
        {
            if (yeuCauThanhToan.TrangThai == trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN)
            {
                return (Result)Result.Fail("Hồ sơ có yêu cầu thanh toán chưa thực hiện!");
            } else 
            {
                try
                {
                    int tongTien = await GetTongTien(request.MaHoSo);
                    yeuCauThanhToan.CapNhatThuSauChungThucHoSo(tongTien, tongTien, trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN);
                    await _repositoryYeuCauThanhToan.UpdateAsync(yeuCauThanhToan);
                    var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(request.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "", thaoTac: "Yêu cầu thu phí lệ phí");
                    await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
                    await _eventPublisher.PublishAsync(new ThongBaoNopPhiEvent(hoSo, trangThaiThanhToan.HINH_THUC_THU.THU_SAU, tongTien, 0, userFullName, userOfficeName, hoSo.Catalog, tenTinhThanh, hoSo.SoDienThoai, yeuCauThanhToan.Id.ToString()));
                    return (Result)Result.Success("Tạo yêu cầu thu phí thành công");
                }
                catch (Exception ex) {
                    return (Result)Result.Fail(ex.Message);
                }
            }
        } else // thêm 1 yêu cầu mới
        {
            try
            {
                int tongTien = await GetTongTien(request.MaHoSo);
                //yeuCauThanhToan.CapNhatThuSauChungThucHoSo(tongTien, tongTien, trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN);
                GroupDto groupInfo = null;
                string donViQuanLyThuPhi = userOfficeCode;
                string donViQuanLy = userOfficeCode;
                if (!string.IsNullOrEmpty(userOfficeCode))
                {
                    var groupsInfo = await _mediator.Send(new GetByGroupCodeQuery(userOfficeCode));
                    if (groupsInfo != null) groupInfo = groupsInfo.Data;
                }
                if (groupInfo != null && groupInfo.DonViQuanLyThuPhi == true && !string.IsNullOrEmpty(groupInfo?.DonViQuanLy))
                {
                    donViQuanLyThuPhi = groupInfo.DonViQuanLy;
                }
                if (groupInfo != null && !string.IsNullOrEmpty(groupInfo?.DonViQuanLy))
                {
                    donViQuanLy = groupInfo.DonViQuanLy;
                }
                var newYeuCauThanhToan = new YeuCauThanhToan(request.MaHoSo, tongTien, tongTien, 0, trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN, currentTime, userId.ToString(), donViQuanLyThuPhi, "Thu sau", null, donVi: userOfficeCode);
                await _repositoryYeuCauThanhToan.AddAsync(newYeuCauThanhToan);
                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(request.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "", thaoTac: "Yêu cầu thu phí lệ phí");
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
                await _eventPublisher.PublishAsync(new ThongBaoNopPhiEvent(hoSo, trangThaiThanhToan.HINH_THUC_THU.THU_SAU, tongTien, 0, userFullName, userOfficeName, hoSo.Catalog, tenTinhThanh, hoSo.SoDienThoai, newYeuCauThanhToan.Id.ToString()));
                return (Result)Result.Success("Tạo yêu cầu thu phí thành công");
            }
            catch (Exception ex)
            {
                return (Result)Result.Fail(ex.Message);
            }
        }
    }
}
