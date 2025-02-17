using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;
public class GetDiaBanByMaQueryHandler : ICommandHandler<GetDiaBanByMa, IReadOnlyList<DiaChiNguoiDung>>
{
    private readonly IDapperRepository _dapperRepository;
    public GetDiaBanByMaQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<IReadOnlyList<DiaChiNguoiDung>>> Handle(GetDiaBanByMa request, CancellationToken cancellationToken)
    {
        string sql = @"SELECT MaDiaBan, TenDiaBan FROM Catalog.DiaBans WHERE MaDiaBan IN @MaDiaBan";
        var data = await _dapperRepository.QueryAsync<DiaChiNguoiDung>(sql, request);
        return Result<IReadOnlyList<DiaChiNguoiDung>>.Success(data);
    }
}
