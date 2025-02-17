using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Commands;
public class AddKhoTaiLieuDienTuCommandHandler : ICommandHandler<AddKhoTaiLieuDienTuCommand, Guid>
{
    private readonly IRepositoryWithEvents<KhoTaiLieuDienTu> _repositoryWithEvents;
    public AddKhoTaiLieuDienTuCommandHandler(IRepositoryWithEvents<KhoTaiLieuDienTu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddKhoTaiLieuDienTuCommand request, CancellationToken cancellationToken)
    {
        var khoTaiLieuDienTu = KhoTaiLieuDienTu.Create(request.SoDinhDanh, request.TenKhoTaiLieu, request.MoTa, request.DungLuong, request.SoLuong);
        await _repositoryWithEvents.AddAsync(khoTaiLieuDienTu, cancellationToken);
        return Result<Guid>.Success(khoTaiLieuDienTu.Id);

    }
}