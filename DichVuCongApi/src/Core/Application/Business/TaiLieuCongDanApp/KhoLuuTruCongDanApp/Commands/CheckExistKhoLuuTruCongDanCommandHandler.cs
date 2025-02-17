using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
public class CheckExistKhoLuuTruCongDanCommandHandler : ICommandHandler<CheckExistKhoLuuTruCongDanCommand, Guid>
{
    private readonly IRepositoryWithEvents<KhoLuuTruCongDan> _repositoryWithEvents;
    private readonly ICurrentUser _currentUser;
    private readonly IDapperRepository _dapperRepository;
    public CheckExistKhoLuuTruCongDanCommandHandler(IRepositoryWithEvents<KhoLuuTruCongDan> repositoryWithEvents, ICurrentUser currentUser, IDapperRepository dapperRepository = null)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<DefaultIdType>> Handle(CheckExistKhoLuuTruCongDanCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUser.GetUserId();
        string soDinhDanh = string.Empty;
        string sqlQueryUser = @"SELECT TOP (1) Id, SoDinhDanh
                                          FROM [Identity].[Users]
                                          WHERE Id= @Id";

        var resUser = await _dapperRepository.QueryFirstOrDefaultAsync<UserAppDto>(sqlQueryUser, new
        {
            Id = userId
        });
        if (resUser != null)
        {
            soDinhDanh = resUser.SoDinhDanh ?? string.Empty;
        }

        if (string.IsNullOrEmpty(soDinhDanh))
            return Result<Guid>.Fail("Không có thông tin số định danh của người dùng!");

        string sqlCheckExist = @"SELECT TOP (1) ID
                                    FROM [Business].[KhoLuuTruCongDans]
                                    WHERE SoDinhDanh = @SoDinhDanh AND DeletedOn is null";

        var res = await _dapperRepository.QueryFirstOrDefaultAsync<KhoLuuTruCongDanDto>(sqlCheckExist, new
        {
            SoDinhDanh = soDinhDanh
        });

        if (res == null)
        {
            var khoLuuTruCongDan = KhoLuuTruCongDan.Create(soDinhDanh, 0, 0);
            await _repositoryWithEvents.AddAsync(khoLuuTruCongDan, cancellationToken);
            return Result<Guid>.Success(message: "Đã tạo kho tài liệu mới cho người dùng", data: khoLuuTruCongDan.Id);
        }
        else
        {
            return Result<Guid>.Success(message: "Kho của người dùng đã tồn tại", data: res.Id);
        }

    }
}