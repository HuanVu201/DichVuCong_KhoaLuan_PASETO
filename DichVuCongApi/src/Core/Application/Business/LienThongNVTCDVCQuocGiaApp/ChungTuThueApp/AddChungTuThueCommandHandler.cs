using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.ChungTuThueApp;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.ChungTuThueApp;

public class AddChungTuThueCommandHandler : ICommandHandler<AddChungTuThueCommand, Guid>
{
    private readonly IRepositoryWithEvents<ChungTuThue> _repositoryWithEvents;
    public AddChungTuThueCommandHandler(IRepositoryWithEvents<ChungTuThue> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddChungTuThueCommand request, CancellationToken cancellationToken)
    {
        var chungTuThue = new ChungTuThue(request.HoSoId, request.Nguon, request.MaSoThue, request.SoTien, request.NoiDungThanhToan,
            request.ThoiGianThanhToan, request.MaThongBaoThue, request.TrangThaiThanhToan, request.BienLai, request.SoCMTNguoiNopTien,
            request.HoTenNguoiNopTien, request.TinhNguoiNopTien, request.HuyenNguoiNopTien, request.XaNguoiNopTien, request.DiaChiNguoiNopTien);
        await _repositoryWithEvents.AddAsync(chungTuThue, cancellationToken);
        return Result<Guid>.Success(chungTuThue.Id);
    }
}
