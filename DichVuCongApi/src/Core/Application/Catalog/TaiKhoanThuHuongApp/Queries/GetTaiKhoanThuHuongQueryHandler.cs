using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.TaiKhoanThuHuongApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.TaiKhoanThuHuongApp.Queries;

public class GetTaiKhoanThuHuongByIdSpec : Specification<TaiKhoanThuHuong>, ISingleResultSpecification
{
    public GetTaiKhoanThuHuongByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetTaiKhoanThuHuongQueryHandler : IQueryHandler<GetTaiKhoanThuHuongQuery, TaiKhoanThuHuong>
{
    private readonly IReadRepository<TaiKhoanThuHuong> _readRepository;
    public GetTaiKhoanThuHuongQueryHandler(IReadRepository<TaiKhoanThuHuong> readRepository) => _readRepository = readRepository;
    public async Task<Result<TaiKhoanThuHuong>> Handle(GetTaiKhoanThuHuongQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetTaiKhoanThuHuongByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"TaiKhoanThuHuong với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<TaiKhoanThuHuong>.Success(item);
    }
}
