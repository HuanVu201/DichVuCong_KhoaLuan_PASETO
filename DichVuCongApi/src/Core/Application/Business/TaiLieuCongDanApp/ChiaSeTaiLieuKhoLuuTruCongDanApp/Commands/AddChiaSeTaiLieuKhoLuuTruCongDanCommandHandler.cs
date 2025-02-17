using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.ChiaSeTaiLieuKhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.ChiaSeChiaSeTaiLieuKhoLuuTruCongDanApp.Commands;
public class AddChiaSeTaiLieuKhoLuuTruCongDanCommandHandler : ICommandHandler<AddChiaSeTaiLieuKhoLuuTruCongDanCommand, Guid>
{
    private readonly IRepositoryWithEvents<ChiaSeTaiLieuKhoLuuTruCongDan> _repositoryWithEvents;
    private readonly ICurrentUser _currentUser;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    public AddChiaSeTaiLieuKhoLuuTruCongDanCommandHandler(IRepositoryWithEvents<ChiaSeTaiLieuKhoLuuTruCongDan> repositoryWithEvents, ICurrentUser currentUser, IDapperRepository dapperRepository, IMediator mediator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
        _dapperRepository = dapperRepository;
        _mediator = mediator;
    }

    public async Task<Result<DefaultIdType>> Handle(AddChiaSeTaiLieuKhoLuuTruCongDanCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUser.GetUserId();
        string soDinhDanhChiaSe = string.Empty;
        string sqlQueryUser = @"SELECT TOP (1) Id, SoDinhDanh
                                          FROM [Identity].[Users]
                                          WHERE Id= @Id";

        var resUser = await _dapperRepository.QueryFirstOrDefaultAsync<UserAppDto>(sqlQueryUser, new
        {
            Id = userId
        });

        if (resUser != null)
        {
            soDinhDanhChiaSe = resUser.SoDinhDanh ?? string.Empty;
        }

        if (string.IsNullOrEmpty(soDinhDanhChiaSe))
            return Result<Guid>.Fail("Không có thông tin số định danh của người dùng!");

        string sqlQueryNguoiNhan = @"SELECT TOP (1) FullName
                                          FROM [Identity].[Users]
                                          WHERE SoDinhDanh= @SoDinhDanh";
        var resCheckNguoiNhan = await _dapperRepository.QueryFirstOrDefaultAsync<UserAppDto>(sqlQueryNguoiNhan, new
        {
            SoDinhDanh = request.SoDinhDanhNhan
        });

        if (string.IsNullOrEmpty(resCheckNguoiNhan.FullName))
            return Result<Guid>.Fail("Tài khoản nhận không tồn tại!");

        var item = ChiaSeTaiLieuKhoLuuTruCongDan.Create(soDinhDanhChiaSe, request.SoDinhDanhNhan, request.TaiLieuLuuTruId);
        await _repositoryWithEvents.AddAsync(item, cancellationToken);
        return Result<Guid>.Success(data: item.Id, message: "Chia sẻ tài liệu thành công!");

    }
}