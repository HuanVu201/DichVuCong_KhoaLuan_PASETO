using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Commands;
public class AddTaiLieuKhoLuuTruCongDanCommandHandler : ICommandHandler<AddTaiLieuKhoLuuTruCongDanCommand, Guid>
{
    private readonly IRepository<TaiLieuKhoLuuTruCongDan> _repositoryWithEvents;
    private readonly ICurrentUser _currentUser;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    public AddTaiLieuKhoLuuTruCongDanCommandHandler(IRepository<TaiLieuKhoLuuTruCongDan> repositoryWithEvents, ICurrentUser currentUser, IDapperRepository dapperRepository, IMediator mediator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
        _dapperRepository = dapperRepository;
        _mediator = mediator;
    }

    public async Task<Result<DefaultIdType>> Handle(AddTaiLieuKhoLuuTruCongDanCommand request, CancellationToken cancellationToken)
    {
        var res = await _mediator.Send(new UpdateKhoLuuTruCongDanCommand()
        {
            DungLuong = request.DungLuong,
            SoLuong = 1
        });

        if (res.Succeeded && !string.IsNullOrEmpty(res.Data.ToString()))
        {
            var taiLieuKhoLuuTruCongDan = TaiLieuKhoLuuTruCongDan.Create(res.Data, request.TenGiayTo, request.DuongDan, request.DungLuong, request.Nguon ?? string.Empty, request.SoLuotTaiSuDung, request.LoaiGiayToId, request.EformData, request.Type, request.LoaiNhomGiayToCaNhanId, request.MaLinhVuc);
            await _repositoryWithEvents.AddAsync(taiLieuKhoLuuTruCongDan, cancellationToken);
            return Result<Guid>.Success(message: "Đã thêm tài liệu vào kho!", data: taiLieuKhoLuuTruCongDan.Id);
        }
        else
        {
            return Result<Guid>.Fail(message: res.Message);
        }
    }
}