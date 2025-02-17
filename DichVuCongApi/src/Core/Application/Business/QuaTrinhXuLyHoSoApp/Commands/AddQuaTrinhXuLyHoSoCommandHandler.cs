using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp.Commands;
public class AddQuaTrinhXuLyHoSoCommandHandler : ICommandHandler<AddQuaTrinhXuLyHoSoCommand, DefaultIdType>
{
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryWithEvents;
    public AddQuaTrinhXuLyHoSoCommandHandler(IRepository<QuaTrinhXuLyHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddQuaTrinhXuLyHoSoCommand request, CancellationToken cancellationToken)
    {
        var QuaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(request.MaHoSo, request.ThoiGian, request.TrangThai, request.NodeQuyTrinh, request.NguoiGui, request.NguoiNhan,
            request.ThoiHanBuocXuLy, request.LoaiThoiHanBuocXuLy, request.NgayHetHanBuocXuLy, request.ThaoTac, request.NoiDung, request.DinhKem, request.TrangThaiDongBoDVCQuocGia,
            request.TenNguoiGui, request.TenNguoiNhan);

        await _repositoryWithEvents.AddAsync(QuaTrinhXuLyHoSo, cancellationToken);
        return Result<DefaultIdType>.Success(QuaTrinhXuLyHoSo.Id);
    }
}
