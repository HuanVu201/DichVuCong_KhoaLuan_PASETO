using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Commands;
public class AddQuyTrinhXuLyCommandHandler : ICommandHandler<AddQuyTrinhXuLyCommand>
{
    private readonly IRepository<QuyTrinhXuLy> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    public AddQuyTrinhXuLyCommandHandler(IRepository<QuyTrinhXuLy> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> Handle(AddQuyTrinhXuLyCommand request, CancellationToken cancellationToken)
    {
        var quyTrinhs = new List<QuyTrinhXuLy>();
        var buocXuLys = new List<BuocXuLy>();
        string sqlGetBuocXuLy = $"SELECT TenBuoc From Catalog.BuocXuLys where TenBuoc IN @TenBuoc";
        var sqlUpdateBuocXuLy = @"
        CREATE TABLE #TempTableBuocXuLy (TenBuoc nvarchar(200), Id uniqueidentifier);
        INSERT INTO #TempTableBuocXuLy VALUES (@TenBuoc, @Id);
        INSERT INTO Catalog.BuocXuLys (TenBuoc, Id) SELECT temp.TenBuoc, temp.Id FROM #TempTableBuocXuLy temp WHERE temp.TenBuoc NOT IN (SELECT TenBuoc FROM Catalog.BuocXuLys)
        ";
        request.QuyTrinhs.ForEach(item =>
        {
            var quyTrinh = QuyTrinhXuLy.Create(item.Id, item.TruongHopId, item.TenBuocXuLy, item.ThoiGianXuLy, item.LoaiThoiGian, item.LoaiBuoc, item.TenNhomNguoiDung,
            item.NhomNguoiDungId, item.TenTrangThaiHoSo, item.MaTrangThaiHoSo, item.YeuCauCoKetQuaBuocTruoc, item.ChoPhepChuyenLaiBuocTruoc, item.GuiLienThongQLVB,
            item.GuiEmail, item.BieuMauEmail, item.GuiSMS, item.BieuMauSMS, item.ThoiGianThucHienTrucTuyen);

            buocXuLys.Add(BuocXuLy.Create(item.TenBuocXuLy));
            quyTrinhs.Add(quyTrinh);

        });
        var insertTempValues = buocXuLys.Select(x => new { x.TenBuoc, Id = Guid.NewGuid() }).ToList();
        var updatedBuocXuLyRows = await _dapperRepository.ExcuteAsync(sqlUpdateBuocXuLy, insertTempValues);
        
        await _repositoryWithEvents.AddRangeAsync(quyTrinhs, cancellationToken);
        return (Result)Result.Success();
    }
}
