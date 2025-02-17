using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Commands;
public class AddTruongHopThuTucCommandHandler : ICommandHandler<AddTruongHopThuTucCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<TruongHopThuTuc> _repositoryTHTT;
    private readonly IRepositoryWithEvents<QuyTrinhXuLy> _repositoryQTXL;
    public AddTruongHopThuTucCommandHandler(IRepositoryWithEvents<TruongHopThuTuc> repositoryTHTT, IRepositoryWithEvents<QuyTrinhXuLy> repositoryQTXL)
        => (_repositoryTHTT, _repositoryQTXL) = (repositoryTHTT, repositoryQTXL);

    public async Task<Result<DefaultIdType>> Handle(AddTruongHopThuTucCommand request, CancellationToken cancellationToken)
    {
        var ma = request.ThuTucId + "_" + Guid.NewGuid().ToString().Substring(0, 5);

        var truongHopThuTuc = TruongHopThuTuc.Create(request.Ten, request.Ma != null ? request.Ma : ma, request.ThuTucId, request.ThoiGianThucHien, request.LoaiThoiGianThucHien,
        request.BatBuocDinhKemKetQua, request.YeuCauNopPhiTrucTuyen, request.DonViTiepNhanRieng, request.EForm, request.EFormTemplate, request.BatBuocKySoKetQua,
        request.AnThongTinLienHeNopTrucTuyen, request.KhongCoNgayHenTra, request.KhongThuBanGiay, request.ChoChuyenPhiDiaGioi, request.ThoiGianThucHienTrucTuyen,
         null, null, request.ChoPhepNopUyQuyen, request.MaSoBieuMau, null, request.NoteNgayLamViec, request.NoteTraKetQua);
        truongHopThuTuc.SetLoaiBaoTroXaHoi(request.LoaiBaoTroXaHoi);
        truongHopThuTuc.SetKhongNopTrucTuyen(request.KhongNopTrucTuyen);
        await _repositoryTHTT.AddAsync(truongHopThuTuc, cancellationToken);

        var quyTrinhStart = new QuyTrinhXuLy(truongHopThuTuc.Id, "Tiếp nhận hồ sơ", 4, 0, "Ngày làm việc", "2");
        var quyTrinhEnd = new QuyTrinhXuLy(truongHopThuTuc.Id, "Chờ trả kết quả", 0, 0, "Ngày làm việc", "9");
        var quytrinhs = new List<QuyTrinhXuLy> { quyTrinhStart, quyTrinhEnd };
        await _repositoryQTXL.AddRangeAsync(quytrinhs);

        var startNode = new
        {
            id = quyTrinhStart.Id,
            position = new { x = 500, y = 50 },
            data = new
            {
                tenBuocXuLy = quyTrinhStart.TenBuocXuLy,
                thoiGianXuLy = quyTrinhStart.ThoiGianXuLy,
                loaiThoiGian = quyTrinhStart.LoaiThoiGian,
                thoiGianThucHienTrucTuyen = quyTrinhStart.ThoiGianThucHienTrucTuyen,
                maTrangThaiHoSo = quyTrinhStart.MaTrangThaiHoSo,
            },
            type = "startNode",
            deletable = false
        };
        var endNode = new
        {
            id = quyTrinhEnd.Id,
            position = new { x = 500, y = 700 },
            data = new
            {
                tenBuocXuLy = quyTrinhEnd.TenBuocXuLy,
                thoiGianXuLy = quyTrinhEnd.ThoiGianXuLy,
                loaiThoiGian = quyTrinhEnd.LoaiThoiGian,
                thoiGianThucHienTrucTuyen = quyTrinhStart.ThoiGianThucHienTrucTuyen,
                maTrangThaiHoSo = quyTrinhEnd.MaTrangThaiHoSo,
            },
            type = "endNode",
            deletable = false
        };
        var nodes = new List<dynamic> { startNode, endNode };
        //var edge = new List<dynamic>{ new
        //{
        //    id = quyTrinhStart.Id.ToString() + quyTrinhEnd.Id.ToString(),
        //    source = quyTrinhStart.Id.ToString(),
        //    target = quyTrinhEnd.Id.ToString(),
        //    label = "Trả kết quả",
        //    sourceHandle = "source-right",
        //    targetHandle = "target-left",
        //} };
        truongHopThuTuc.Update(null, null, null, null, null, null, null, null, null, null, JsonConvert.SerializeObject(nodes), JsonConvert.SerializeObject(new List<dynamic>()), null, null, null, null, null, null, null, request.ChoPhepNopUyQuyen, null, request.MaSoBieuMau, request.KhongNopTrucTuyen, null, null, request.NoteNgayLamViec, request.NoteTraKetQua);
        await _repositoryTHTT.UpdateAsync(truongHopThuTuc, cancellationToken);
        return Result<DefaultIdType>.Success(truongHopThuTuc.Id);
    }
}
