using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.TinBaiApp.Commands;
public class UpdateTinBaiCommandHandler : ICommandHandler<UpdateTinBaiCommand>
{
    private readonly IRepositoryWithEvents<TinBai> _repositoryWithEvents;
    public UpdateTinBaiCommandHandler(IRepositoryWithEvents<TinBai> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateTinBaiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Tin bài với mã: {request.Id} chưa được thêm vào hệ thống");
        try
        {
            var updatedTinBai = itemExitst.Update(request.TieuDe, request.NgayBanHanh, request.NgayKetThuc, request.TrichYeu, request.NoiDung,
          request.NguonTin, request.KenhTin, request.TrangThai, request.AnhDaiDien, request.FileDinhKem, request.Tacgia, request.ChoPhepBinhLuan,
          request.HienThiLenTrangChu, request.TinNoiBat);
            await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        }
        catch (Exception ex) {
            throw new Exception("Có lỗi xảy ra: " + ex.Message, ex);
        }


        return (Result)Result.Success();
    }
}
