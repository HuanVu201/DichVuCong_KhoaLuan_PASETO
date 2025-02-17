using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
public class DelMultiDonViThuTucHandler : ICommandHandler<DelMultiDonViThuTuc>
{
    private readonly string tableName = "[Catalog].[DonViThuTucs]";
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _user;
    private readonly IRepositoryWithEvents<DonViThuTuc> _repositoryWithEvents;
    public DelMultiDonViThuTucHandler(IDapperRepository dapperRepository,IRepositoryWithEvents<DonViThuTuc> repositoryWithEvents, IUserService user) {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _user = user;
    }  

    public async Task<Result> Handle(DelMultiDonViThuTuc request, CancellationToken cancellationToken)
    {
        var user = await _user.GetCurrentUserAsync(cancellationToken);
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string sqlSoftDonViThuTucs = $"Update {tableName} Set DeletedOn = @currentTime, DeletedBy = @userId WHERE  Id IN @Ids ";
        await _dapperRepository.ExcuteAsync(sqlSoftDonViThuTucs, new
        {
            Ids = request.Ids,
            currentTime,
            userId = user.Id.ToString(),
        });
        return (Result)Result.Success();
    }
}
