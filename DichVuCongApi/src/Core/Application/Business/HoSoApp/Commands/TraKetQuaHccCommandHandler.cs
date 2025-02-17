using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class TraKetQuaHccCommandHandler : ICommandHandler<TraKetQuaHccCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IMediator _mediator;

    public TraKetQuaHccCommandHandler(IRepositoryWithEvents<HoSo> repositoryWithEvents, IDapperRepository dapperRepository, IMediator mediator)
    {
        _repositoryHoSo = repositoryWithEvents;
        _dapperRepository = dapperRepository;
        _mediator = mediator;
    }
    public async Task<Result> Handle(TraKetQuaHccCommand request, CancellationToken cancellationToken)
    {
        foreach (string id in request.Ids)
        {
            Guid guid = Guid.Parse(id);
            var res = await _mediator.Send(new TraKetQuaHoSoCommand() { Id = guid, DinhKemKetQua = request.DinhKemKetQua, TrichYeuKetQua = request.TrichYeuKetQua });
            if (res.Succeeded)
            {
                var itemExitst = await _repositoryHoSo.GetByIdAsync(guid, cancellationToken);
                var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
                if (itemExitst == null)
                    throw new NotFoundException($"HoSo với mã: {guid} chưa được thêm vào hệ thống");
                var updatedHoSo = itemExitst.UpdateTrKetQuaHCC(request.LoaiNguoiNhanKetQua, request.HoTenNguoiNhanKetQua, request.BanGocThuLai, request.SoLuongBanGocThuLai, request.DinhKemNhanKetQua, request.ChuKyNguoiNhanKetQua);
                await _repositoryHoSo.UpdateAsync(updatedHoSo);
            }
            else
            {
                return (Result)Result.Fail(res.Message);
            }
        }
        return (Result)Result.Success();
    }
}