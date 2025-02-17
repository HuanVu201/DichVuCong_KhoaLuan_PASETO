using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp.Commands;

public class UpdateQuaTrinhXuLyHoSoCommandHandler : ICommandHandler<UpdateQuaTrinhXuLyHoSoCommand>
{
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryWithEvents;

    public UpdateQuaTrinhXuLyHoSoCommandHandler(IRepository<QuaTrinhXuLyHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateQuaTrinhXuLyHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuaTrinhXuLyHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedQuaTrinhXuLyHoSo = itemExitst.Update(request.MaHoSo, request.ThoiGian, request.TrangThai, request.NodeQuyTrinh, request.NguoiGui, request.NguoiNhan,
            request.ThoiHanBuocXuLy, request.LoaiThoiHanBuocXuLy, request.NgayHetHanBuocXuLy, request.ThaoTac, request.NoiDung, request.DinhKem, request.TrangThaiDongBoDVCQuocGia,
            request.TenNguoiGui, request.TenNguoiNhan);
        await _repositoryWithEvents.UpdateAsync(updatedQuaTrinhXuLyHoSo, cancellationToken);
        return (Result)Result.Success();
    }
}
