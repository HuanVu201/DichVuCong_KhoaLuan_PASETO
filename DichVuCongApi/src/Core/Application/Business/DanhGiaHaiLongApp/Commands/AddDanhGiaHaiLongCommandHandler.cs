using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Commands;
public class AddDanhGiaHaiLongCommandHandler : ICommandHandler<AddDanhGiaHaiLongCommand, DefaultIdType>
{
    private readonly IRepository<DanhGiaHaiLong> _repositoryWithEvents;
    private readonly IMediator _mediator;
    public AddDanhGiaHaiLongCommandHandler(IRepository<DanhGiaHaiLong> repositoryWithEvents, IMediator mediator)
    {
        _mediator = mediator;
        _repositoryWithEvents = repositoryWithEvents;
    }

    public async Task<Result<DefaultIdType>> Handle(AddDanhGiaHaiLongCommand request, CancellationToken cancellationToken)
    {
        var danhGiaHaiLong = DanhGiaHaiLong.Create(request.MaHoSo,request.LoaiDanhGia, request.NguoiDanhGia, request.ThoiGianDanhGia, request.DanhGia, request.NoiDungDanhGia);
        var existItem =  await _mediator.Send(new GetDanhGiaHaiLongByMaHoSo(request.MaHoSo));
        if (existItem.Data != null) throw new Exception($"Đã thực hiện đánh giá mã hồ sơ {request.MaHoSo}");
        await _repositoryWithEvents.AddAsync(danhGiaHaiLong, cancellationToken);
        return Result<DefaultIdType>.Success(danhGiaHaiLong.Id);
    }
}
