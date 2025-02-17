using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;
public class UpdateAddGTSHVaoKhoTaiLieuCommandHandler : ICommandHandler<UpdateAddGTSHVaoKhoTaiLieuCommand>
{
    private readonly IRepository<GiayToSoHoa> _repositoryWithEvents;
    private readonly IMediator _mediator;
    public UpdateAddGTSHVaoKhoTaiLieuCommandHandler(IRepository<GiayToSoHoa> repositoryWithEvents, IMediator mediator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
    }
    public async Task<Result> Handle(UpdateAddGTSHVaoKhoTaiLieuCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"GiayToSoHoa với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedGiayToSoHoa = itemExitst.UpdateKhoTaiLieuDienTu(request.KhoTaiLieuDienTuId, request.DungLuong, request.NgayCapNhatKho);


        var tmp = new AddPhienBanGiayToSoHoaKhoTaiLieuDienTuCommand();
        if (!string.IsNullOrEmpty(itemExitst.MaDinhDanh))
        {
            tmp.SoDinhDanh = itemExitst.MaDinhDanh;

        }
        if (!string.IsNullOrEmpty(request.KhoTaiLieuDienTuId))
        {
            tmp.KhoTaiLieuDienTuId = request.KhoTaiLieuDienTuId;

        }
        if (!string.IsNullOrEmpty(itemExitst.MaHoSo))
        {
            tmp.MaHoSo = itemExitst.MaHoSo;

        }
        if (!string.IsNullOrEmpty(itemExitst.DinhKem))
        {
            tmp.DinhKem = itemExitst.DinhKem;

        }
        if (!string.IsNullOrEmpty(itemExitst.MaGiayTo))
        {
            tmp.MaGiayTo = itemExitst.MaGiayTo;

        }
        if (request.DungLuong.HasValue)
        {
            tmp.DungLuong = request.DungLuong;

        }


        //Thêm mới Phiên bản giấy tờ số hóa
        await _mediator.Send(tmp);

        await _repositoryWithEvents.UpdateAsync(updatedGiayToSoHoa, cancellationToken);


        return (Result)Result.Success();
    }
}
