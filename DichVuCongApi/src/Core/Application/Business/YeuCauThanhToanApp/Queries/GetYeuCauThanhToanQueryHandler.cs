using Mapster;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.PhiLePhiApp.Queries;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;

public class GetYeuCauThanhToanByIdSpec : Specification<YeuCauThanhToan, YeuCauThanhToanDetailDto>, ISingleResultSpecification
{
    public GetYeuCauThanhToanByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id).Where(x => x.DeletedOn == null);
    }
}

public class GetYeuCauThuTruocChuaThanhToanSpec : Specification<YeuCauThanhToan, YeuCauThanhToanDetailDto>, ISingleResultSpecification
{
    public GetYeuCauThuTruocChuaThanhToanSpec(string maHoSo)
    {
        var trangThai = new TrangThaiYeuCauThanhToanConstants();
        Query.Where(x => x.MaHoSo == maHoSo).Where(x => x.DeletedOn == null).Where(x => trangThai.CHO_THANH_TOAN == x.TrangThai);
    }
}

public class GetYeuCauThanhToanQueryHandler : IQueryHandler<GetYeuCauThanhToanQuery, YeuCauThanhToanDetailDto>
{
    private readonly IMediator _mediator;
    private readonly IReadRepository<YeuCauThanhToan> _readRepository;
    private readonly IUserService _userServices;
    private readonly IDapperRepository _dapperRepository;

    public GetYeuCauThanhToanQueryHandler(IReadRepository<YeuCauThanhToan> readRepository, IMediator mediator, IUserService userService, IDapperRepository dapperRepository)
    {
        _readRepository = readRepository;
        _mediator = mediator;
        _userServices = userService;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<YeuCauThanhToanDetailDto>> Handle(GetYeuCauThanhToanQuery request, CancellationToken cancellationToken)
    {
        YeuCauThanhToanDetailDto result = new YeuCauThanhToanDetailDto();
        var item = await _readRepository.FirstOrDefaultAsync(new GetYeuCauThanhToanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"YeuCauThanhToan với mã: {request.Id} chưa được thêm vào hệ thống");
        var hoSoDetail = await _mediator.Send(new GetHoSoByMaQuery(item.MaHoSo));
        result = item.Adapt<YeuCauThanhToanDetailDto>();
        if (hoSoDetail.Data != null)
        {
            result.MaTTHC = hoSoDetail.Data.MaTTHC;
            result.ChuHoSo = hoSoDetail.Data.ChuHoSo;
            result.SoGiayToChuHoSo = hoSoDetail.Data.SoGiayToChuHoSo;
            result.DiaChiChuHoSo = hoSoDetail.Data.DiaChiChuHoSo;
            result.NguoiUyQuyen = hoSoDetail.Data.NguoiUyQuyen;
            result.SoDienThoaiNguoiUyQuyen = hoSoDetail.Data.SoDienThoaiNguoiUyQuyen;
            result.TenTTHC = hoSoDetail.Data.TenTTHC;
            result.NoiDung = hoSoDetail.Data.TrichYeuHoSo;
            result.DiaChiNguoiUyQuyen = hoSoDetail.Data.DiaChiNguoiUyQuyen;
            result.LoaiDoiTuong = hoSoDetail.Data.LoaiDoiTuong;
            result.EmailChuHoSo = hoSoDetail.Data.EmailChuHoSo;
            result.SoDienThoaiChuHoSo = hoSoDetail.Data.SoDienThoaiChuHoSo;
        }

        if (!string.IsNullOrEmpty(item.NguoiYeuCau))
        {
            var nguoiYeuCauDetail = await _userServices.GetAsync(item.NguoiYeuCau, cancellationToken);
            if (nguoiYeuCauDetail != null)
            {
                result.TaiKhoanNguoiYeuCau = nguoiYeuCauDetail.UserName;
                result.TenNguoiYeuCau = nguoiYeuCauDetail.FullName;
            }
        }

        SearchPhiLePhiQuery searchPhiLePhi = new SearchPhiLePhiQuery();
        searchPhiLePhi.ThuTucId = result.MaTTHC;
        var phiLePhiDetail = await _mediator.Send(searchPhiLePhi);
        if (phiLePhiDetail != null && phiLePhiDetail.Data != null)
        {
            foreach (var phiLePhi in phiLePhiDetail.Data)
            {
                if (phiLePhi.Loai == "Phí") result.PhiTheoTTHC = phiLePhi.SoTien;
                if (phiLePhi.Loai == "Lệ phí") result.LePhiTheoTTHC = phiLePhi.SoTien;
            }
        }

        return Result<YeuCauThanhToanDetailDto>.Success(result);
    }
}
