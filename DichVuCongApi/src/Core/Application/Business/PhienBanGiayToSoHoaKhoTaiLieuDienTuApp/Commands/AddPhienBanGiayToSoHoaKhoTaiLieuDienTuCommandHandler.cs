using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaPhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Commands;


public class AddPhienBanGiayToSoHoaKhoTaiLieuDienTuCommandHandler : ICommandHandler<AddPhienBanGiayToSoHoaKhoTaiLieuDienTuCommand, Guid>
{
    private readonly IRepositoryWithEvents<PhienBanGiayToSoHoaKhoTaiLieuDienTu> _repositoryWithEvents;
    public AddPhienBanGiayToSoHoaKhoTaiLieuDienTuCommandHandler(IRepositoryWithEvents<PhienBanGiayToSoHoaKhoTaiLieuDienTu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddPhienBanGiayToSoHoaKhoTaiLieuDienTuCommand request, CancellationToken cancellationToken)
    {
        var phienBanGiayToSoHoaKhoTaiLieuDienTu = PhienBanGiayToSoHoaKhoTaiLieuDienTu.Create(request.SoDinhDanh, request.KhoTaiLieuDienTuId, request.MaHoSo, request.DinhKem, request.MaGiayTo, request.DungLuong);
        await _repositoryWithEvents.AddAsync(phienBanGiayToSoHoaKhoTaiLieuDienTu, cancellationToken);
        return Result<Guid>.Success(phienBanGiayToSoHoaKhoTaiLieuDienTu.Id);
    }
}