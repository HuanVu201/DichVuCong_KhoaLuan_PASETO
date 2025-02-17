using Mapster;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.DvcPayment;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Queries;
public class GetByMaThamChieuSpec : Specification<GiaoDichThanhToan>, ISingleResultSpecification
{
    public GetByMaThamChieuSpec(string maThamChieu)
    {
        Query.Where(x => x.MaThamChieu == maThamChieu);
    }
}

public class GetByMaThamChieuQueryHandler : IQueryHandler<GetByMaThamChieuQuery, GiaoDichThanhToanDto>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string tableName = "[Business].[GiaoDichThanhToans]";

    private readonly IReadRepository<GiaoDichThanhToan> _readRepository;
    private readonly IRepositoryWithEvents<GiaoDichThanhToan> _repositoryWithEvents;
    private readonly IDvcPaymentServices _dvcPaymentServices;
    private readonly IDapperRepository _dapperRepository;
    public GetByMaThamChieuQueryHandler(IReadRepository<GiaoDichThanhToan> readRepository, IRepositoryWithEvents<GiaoDichThanhToan> repositoryWithEvents, IDvcPaymentServices dvcPaymentServices, IDapperRepository dapperRepository)
    {
        _readRepository = readRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _dvcPaymentServices = dvcPaymentServices;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<GiaoDichThanhToanDto>> Handle(GetByMaThamChieuQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(request.maThamChieu)) throw new ArgumentNullException("maThamChieu is null");
        var item = await _readRepository.FirstOrDefaultAsync(new GetByMaThamChieuSpec(request.maThamChieu), cancellationToken);
        if (item == null)
            throw new NotFoundException($"GiaoDichThanhToan với mã: {request.maThamChieu} chưa được thêm vào hệ thống");
        GiaoDichThanhToanDto result = item.Adapt<GiaoDichThanhToanDto>();
        var bienLaiDvcPayment = await _dvcPaymentServices.GetBienLaiDvcPayment(item.MaThamChieu, item.ThoiGianGD, item.DuongDanBienLai);
        if (!string.IsNullOrEmpty(bienLaiDvcPayment.UrlBienLai) && item.DuongDanBienLai != bienLaiDvcPayment.UrlBienLai)
        {
            result.DuongDanBienLai = bienLaiDvcPayment.UrlBienLai;
            item.UpdateGiaoDich(duongDanBienLai: bienLaiDvcPayment.UrlBienLai);
            await _repositoryWithEvents.UpdateAsync(item);
        }

        return Result<GiaoDichThanhToanDto>.Success(result);
    }
}