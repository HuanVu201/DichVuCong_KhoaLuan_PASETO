﻿using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ScreenApp.Queries;

public class GetScreenByIdSpec : Specification<Screen>, ISingleResultSpecification
{
    public GetScreenByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetScreenQueryHandler : IQueryHandler<GetScreenQuery, Screen>
{
    private readonly IReadRepository<Screen> _readRepository;
    public GetScreenQueryHandler(IReadRepository<Screen> readRepository) => _readRepository = readRepository;
    public async Task<Result<Screen>> Handle(GetScreenQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetScreenByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Screen với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<Screen>.Success(item);
    }
}
