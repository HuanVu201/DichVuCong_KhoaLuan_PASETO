using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.LienThongNVTCDVCQG;
public class AddLienThongNVTCDVCQuocGiaCommandHandler : ICommandHandler<AddLienThongNVTCDVCQuocGiaCommand, Guid>
{
    private readonly IRepositoryWithEvents<LienThongNVTCDVCQuocGia> _repositoryWithEvents;
    public AddLienThongNVTCDVCQuocGiaCommandHandler(IRepositoryWithEvents<LienThongNVTCDVCQuocGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddLienThongNVTCDVCQuocGiaCommand request, CancellationToken cancellationToken)
    {
        var lienThongNVTCDVCQuocGia = LienThongNVTCDVCQuocGia.Create(request.File, request.TrangThai, request.Loai);
        await _repositoryWithEvents.AddAsync(lienThongNVTCDVCQuocGia, cancellationToken);
        return Result<Guid>.Success(lienThongNVTCDVCQuocGia.Id);

    }
}