using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Commands;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Commands;
public class AddLoaiNhomGiayToCaNhanCommandHandler : ICommandHandler<AddLoaiNhomGiayToCaNhanCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<LoaiNhomGiayToCaNhan> _repositoryWithEvents;
    public AddLoaiNhomGiayToCaNhanCommandHandler(IRepositoryWithEvents<LoaiNhomGiayToCaNhan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddLoaiNhomGiayToCaNhanCommand request, CancellationToken cancellationToken)
    {
        var loaiNhomGiayToCaNhan = LoaiNhomGiayToCaNhan.Create(request.Ten, request.SoDinhDanh, request.GhiChu, request.Loai);
        await _repositoryWithEvents.AddAsync(loaiNhomGiayToCaNhan, cancellationToken);
        return Result<DefaultIdType>.Success(loaiNhomGiayToCaNhan.Id);
    }
}
