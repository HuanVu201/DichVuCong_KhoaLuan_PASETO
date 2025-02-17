using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.QrCodeServive;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class ThongTinTraKetQuaHcc
{
    public string? MaHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public string? LoaiNguoiNhanKetQua { get; set; }
    public string? HoTenNguoiNhanKetQua { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public string? DinhKemKetQua { get; set; }
    public string? BanGocThuLai { get; set; }
    public string? SoLuongBanGocThuLai { get; set; }
    public string? DinhKemNhanKetQua { get; set; }
    public string? ChuKyNguoiNhanKetQua { get; set; }
    public DateTime? NgayTra { get; set; }
}

public class GetThongTinTraKetQuaHccQueryHandler : IQueryHandler<GetThongTinTraKetQuaHccQuery, object>
{
    private readonly IDapperRepository _dapperRepository;
    public GetThongTinTraKetQuaHccQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<object>> Handle(GetThongTinTraKetQuaHccQuery request, CancellationToken cancellationToken)
    {
        var data = new ThongTinTraKetQuaHcc();
        string sqlQueryHoSo = $@"SELECT MaHoSo, ChuHoSo, TrangThaiHoSoId, LoaiNguoiNhanKetQua, HoTenNguoiNhanKetQua, DinhKemKetQua,
                                TrichYeuKetQua, BanGocThuLai, SoLuongBanGocThuLai, DinhKemNhanKetQua, ChuKyNguoiNhanKetQua, NgayTra, NguoiDangXuLy, NguoiDaXuLy, NguoiNhanHoSo, DonViId, NguoiGui, DonViDaChuyenXuLy
                                FROM Business.HoSos Where Id=@Id";
        var hoSoQuery = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoDto>(sqlQueryHoSo, new { Id = request.Id }, null, cancellationToken);
        if (hoSoQuery != null)
        {
            data.MaHoSo = hoSoQuery.MaHoSo;
            data.ChuHoSo = hoSoQuery.ChuHoSo;
            data.TrangThaiHoSoId = hoSoQuery.TrangThaiHoSoId;
            data.LoaiNguoiNhanKetQua = hoSoQuery.LoaiNguoiNhanKetQua;
            data.HoTenNguoiNhanKetQua = hoSoQuery.HoTenNguoiNhanKetQua;
            data.DinhKemKetQua = hoSoQuery.DinhKemKetQua;
            data.TrichYeuKetQua = hoSoQuery.TrichYeuKetQua;
            data.BanGocThuLai = hoSoQuery.BanGocThuLai;
            data.SoLuongBanGocThuLai = hoSoQuery.SoLuongBanGocThuLai;
            data.DinhKemNhanKetQua = hoSoQuery.DinhKemNhanKetQua;
            data.ChuKyNguoiNhanKetQua = hoSoQuery.ChuKyNguoiNhanKetQua;
            data.NgayTra = hoSoQuery.NgayTra;

        }

        if (data is not null)
            return Result<object>.Success(data);
        throw new NotFoundException($"Hồ sơ với id: {request.Id} chưa được thêm trên hệ thống hoặc đã bị xóa");
    }

}