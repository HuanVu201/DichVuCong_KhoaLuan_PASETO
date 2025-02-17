using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.ThongBaoThueApp;
public class AddThongBaoThueCommandHandler : ICommandHandler<AddThongBaoThueCommand, Guid>
{
    private readonly IRepositoryWithEvents<ThongBaoThue> _repositoryWithEvents;
    public AddThongBaoThueCommandHandler(IRepositoryWithEvents<ThongBaoThue> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddThongBaoThueCommand request, CancellationToken cancellationToken)
    {
        var thongBaoThue = new ThongBaoThue(request.HoSoId, request.Nguon, request.MaSoThue, request.SoQuyetDinh, request.NgayQuyetDinh, request.TenTieuMuc, request.SoTien);
        await _repositoryWithEvents.AddAsync(thongBaoThue, cancellationToken);
        return Result<Guid>.Success(thongBaoThue.Id);

    }
}