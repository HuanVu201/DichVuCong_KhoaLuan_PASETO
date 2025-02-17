using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan.Command;
public class DeleteDinhDanhUserCommandHandler : ICommandHandler<DeleteDinhDanhUserCommand>
{
    private readonly IDapperRepository _dapperRepository;

    public DeleteDinhDanhUserCommandHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

    public async Task<Result> Handle(DeleteDinhDanhUserCommand request, CancellationToken cancellationToken)
    {
        var sqlGetUser = @"Select Id FROM [Identity].[Users] WHERE Id = @Id";
        var res = await _dapperRepository.QueryAsync<UserAppDto>(sqlGetUser, new { Id = request.Id });
        if (res == null)
            throw new NotFoundException($"Người dùng với Id: {request.Id} chưa được thêm vào hệ thống hoặc đã bị xóa!");
        var sqlDeleteDinhDanh = @"UPDATE [Identity].[Users]
                                    SET SoDinhDanh = NULL
                                    WHERE Id = @Id;";
        await _dapperRepository.ExcuteAsync(sqlDeleteDinhDanh, new { Id = request.Id });

        return (Result)Result.Success();
    }
}