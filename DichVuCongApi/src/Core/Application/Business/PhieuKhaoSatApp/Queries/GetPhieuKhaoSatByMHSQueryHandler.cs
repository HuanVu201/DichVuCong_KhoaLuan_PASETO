using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;

public class GetPhieuKhaoSatByMHSSpec : Specification<PhieuKhaoSat>, ISingleResultSpecification
{
    public GetPhieuKhaoSatByMHSSpec(string maHoSo)
    {
        Query.Where(x => x.MaHoSo == maHoSo);
    }
}
public class GetPhieuKhaoSatByMHSQueryHandler : IQueryHandler<GetPhieuKhaoSatByMHS, PhieuKhaoSat>
{
    private readonly IReadRepository<PhieuKhaoSat> _readRepository;
    public GetPhieuKhaoSatByMHSQueryHandler(IReadRepository<PhieuKhaoSat> readRepository) => _readRepository = readRepository;
    public async Task<Result<PhieuKhaoSat>> Handle(GetPhieuKhaoSatByMHS request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetPhieuKhaoSatByMHSSpec(request.maHoSo), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Phiếu Khảo Sát với mã: {request.maHoSo} chưa được thêm vào hệ thống");
        return Result<PhieuKhaoSat>.Success(item);
    }
}
