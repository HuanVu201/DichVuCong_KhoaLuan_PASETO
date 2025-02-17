using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan.Command;
public class LockoutUserCommandHandler : ICommandHandler<LockoutUserCommand>
{
    private readonly IDapperRepository _dapperRepository;

    public LockoutUserCommandHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

    public async Task<Result> Handle(LockoutUserCommand request, CancellationToken cancellationToken)
    {
        var sqlGetUser = @"Select Id FROM [Identity].[Users] WHERE Id = @Id";
        var res = await _dapperRepository.QueryAsync<UserAppDto>(sqlGetUser, new { Id = request.Id });
        if (res == null)
            throw new NotFoundException($"Người dùng với Id: {request.Id} chưa được thêm vào hệ thống hoặc đã bị xóa!");

        var sqlToggleLockoutUser = @"UPDATE [Identity].[Users]
                                    SET LockoutEnabled = CASE WHEN LockoutEnabled = 0 THEN 1 ELSE 0 END
                                    WHERE Id = @Id;";
        await _dapperRepository.ExcuteAsync(sqlToggleLockoutUser, new { Id = request.Id });

        return (Result)Result.Success();
    }
}