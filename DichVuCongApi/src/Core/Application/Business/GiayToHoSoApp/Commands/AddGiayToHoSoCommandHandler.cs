using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Commands;

public class AddGiayToHoSoCommandHandler : ICommandHandler<AddGiayToHoSoCommand, DefaultIdType>
{
    private readonly IRepository<GiayToHoSo> _repositoryWithEvents;
    private readonly IMediator _mediator;
    public AddGiayToHoSoCommandHandler(IRepository<GiayToHoSo> repositoryWithEvents, IMediator mediator)
    {
        _mediator = mediator;
        _repositoryWithEvents = repositoryWithEvents;
    }

    public async Task<Result<DefaultIdType>> Handle(AddGiayToHoSoCommand request, CancellationToken cancellationToken)
    {
        var giayToHoSo = GiayToHoSo.Create(request.MaHoSo, request.LoaiGiayTo, request.NguoiXuatPhieu, request.NgayXuatPhieu, request.SuDung, request.MaGiayTo, request.DocxPhieu,
            request.PDFPhieu, request.HinhAnhChuKyCongDan, request.NgayKySo, request.NguoiKySo, request.NgayGuiCongDan, request.TrangThaiGuiCongDan, request.NguoiGuiCongDan);
        await _repositoryWithEvents.AddAsync(giayToHoSo, cancellationToken);
        return Result<DefaultIdType>.Success(giayToHoSo.Id);
    }
}
