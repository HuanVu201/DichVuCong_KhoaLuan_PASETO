using Mapster;
using MapsterMapper;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ActionApp.Dtos;
using TD.DichVuCongApi.Application.Business.ScreenActionApp;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.ActionApp.Queries;

public class GetActionByIdSpec : Specification<Domain.Business.Action>, ISingleResultSpecification
{
    public GetActionByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetActionQueryHandler : IQueryHandler<GetActionQuery, DetailActionDto>
{
    private readonly IReadRepository<Domain.Business.Action> _readRepository;
    private readonly IDapperRepository _dapperRepository;
    public GetActionQueryHandler(IDapperRepository dapperRepository, IReadRepository<Domain.Business.Action> readRepository)
    {
         _readRepository = readRepository;
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<DetailActionDto>> Handle(GetActionQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetActionByIdSpec(request.Id), cancellationToken);
        string sqlGetNguoiTiepNhan = "SELECT Id, UserName FROM [Identity].[Users] WHERE @NguoiTiepNhan LIKE '%' + Id + '%'";
        if (item == null)
            throw new NotFoundException($"Action với mã: {request.Id} chưa được thêm vào hệ thống");
        var nguoiTiepNhan = await _dapperRepository.QueryAsync<NguoiTiepNhanSelect>(sqlGetNguoiTiepNhan, new
        {
            NguoiTiepNhan = item.ApplyForUsers
        });
        Mapper mapper = new Mapper();
        mapper.Config.Default.MapToConstructor(true);
        var dto =  mapper.Map<DetailActionDto>(item);
        dto.ApplyForUserData = nguoiTiepNhan;
        return Result<DetailActionDto>.Success(dto);
    }
}
