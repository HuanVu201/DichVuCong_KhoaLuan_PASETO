using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Commands;

public class UpdateQuyTrinhXuLyCommandHandler : ICommandHandler<UpdateQuyTrinhXuLyCommand>
{
    private readonly IRepository<QuyTrinhXuLy> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;

    public UpdateQuyTrinhXuLyCommandHandler(IRepository<QuyTrinhXuLy> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> Handle(UpdateQuyTrinhXuLyCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        var sqlUpdateBuocXuLy = @"
        CREATE TABLE #TempTableBuocXuLy (TenBuoc nvarchar(200), Id uniqueidentifier);
        INSERT INTO #TempTableBuocXuLy VALUES (@TenBuoc, @Id);
        INSERT INTO Catalog.BuocXuLys (TenBuoc, Id) SELECT temp.TenBuoc, temp.Id FROM #TempTableBuocXuLy temp WHERE temp.TenBuoc NOT IN (SELECT TenBuoc FROM Catalog.BuocXuLys)
        ";
        if (itemExitst == null)
            throw new NotFoundException($"QuyTrinhXuLy với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedQuyTrinhXuLy = itemExitst.Update(request.TruongHopId, request.TenBuocXuLy, request.ThoiGianXuLy, request.LoaiThoiGian, request.LoaiBuoc, request.TenNhomNguoiDung,
            request.NhomNguoiDungId, request.TenTrangThaiHoSo, request.MaTrangThaiHoSo, request.YeuCauCoKetQuaBuocTruoc, request.ChoPhepChuyenLaiBuocTruoc, request.GuiLienThongQLVB,
            request.GuiEmail, request.BieuMauEmail, request.GuiSMS, request.BieuMauSMS, request.ThoiGianThucHienTrucTuyen);

        var updatedBuocXuLyRows = await _dapperRepository.ExcuteAsync(sqlUpdateBuocXuLy, new
        {
            TenBuoc = request.TenBuocXuLy,
            Id = Guid.NewGuid()
        });

        await _repositoryWithEvents.UpdateAsync(updatedQuyTrinhXuLy, cancellationToken);
        return (Result)Result.Success();
    }
}
