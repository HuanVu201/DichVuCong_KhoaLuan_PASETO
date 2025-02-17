using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;

public class UpdateThuTucCommandHandler : ICommandHandler<UpdateThuTucCommand>
{
    private readonly IRepositoryWithEvents<ThuTuc> _repositoryWithEvents;

    public UpdateThuTucCommandHandler(IRepositoryWithEvents<ThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Thủ tục với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedThuTuc = itemExitst.Update(request.IDQG, request.GoiTinThuTucQG, request.SuDung,
         request.LinhVucChinh, request.MaLinhVucChinh, request.CoQuanThucHienChinh, request.CapThucHien, request.MaKetQuaChinh, request.TenKetQuaChinh,
        request.NgayCapNhat, request.TrangThaiPhiLePhi, request.MucDo, request.HoSoPhatSinhTrongNam, request.ThuTu, request.LaTieuBieu, request.ChoPhepLayFileTuTHPS,
        request.LaThuTucChungThuc, request.UrlVideoTutorial, request.QuyetDinh, request.ThucHienTaiBoPhanMotCua, request.DinhKemQuyetDinh, request.LaPhiDiaGioi,
        request.ThuTucKhongCoKetQua, request.LaThuTucLienThongDatDai);
        await _repositoryWithEvents.UpdateAsync(updatedThuTuc, cancellationToken);
        return (Result)Result.Success();
    }
}
