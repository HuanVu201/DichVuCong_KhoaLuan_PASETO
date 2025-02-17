using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class ChiTietHoSoPublicQueryHandler : IQueryHandler<ChiTietHoSoPublicQuery, ChiTietHoSoPublicDto>
{
    private readonly IDapperRepository _dapperRepository;
    public ChiTietHoSoPublicQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<Result<ChiTietHoSoPublicDto>> Handle(ChiTietHoSoPublicQuery request, CancellationToken cancellationToken)
    {
        string sqlQuaTrinhXuLy = @$"select ThaoTac as BuocXuLy,gr.GroupName as DonViXuLy,qtxl.TenNguoiNhan as NguoiXuLy,qtxl.NoiDung as YKien,qtxl.ThoiGian from Business.QuaTrinhXuLyHoSos qtxl
                                    left join Business.HoSos hs on qtxl.MaHoSo = hs.MaHoSo
                                    inner join Catalog.Groups gr on hs.DonViId = gr.GroupCode
                                    where qtxl.MaHoSo = @MaHoSo";

        string sqlHoSo = $@"select tt.TenTTHC,KenhThucHien as KieuTiepNhan,TenTruongHop,NgayTiepNhan,NgayHenTra,NgayKetThucXuLy as NgayKetThucHoSo,NgayTra as NgayTraKetQua,tths.Ten as TrangThaiHoSo
                            from Business.HoSos hs
                            left join Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                            inner join Business.TrangThaiHoSos tths on hs.TrangThaiHoSoId = tths.Ma
                            where MaHoSo = @MaHoSo";
        var dataQuaTrinhXuLy = await _dapperRepository.QueryAsync<QuaTrinhXuLyHoSoPublicDto>(sqlQuaTrinhXuLy, new { MaHoSo = request.MaHoSo });
        var dataHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<ChiTietHoSoPublicDto>(sqlHoSo, new { MaHoSo = request.MaHoSo });
        if (dataHoSo == null)
        {
            throw new Exception($"Hồ sơ với mã :{request.MaHoSo} không tồn tại!");
        }
        ChiTietHoSoPublicDto chiTietHoSo = new ChiTietHoSoPublicDto();
        chiTietHoSo.ThongTinTienTrinh = new List<QuaTrinhXuLyHoSoPublicDto>();

        if (dataHoSo.KieuTiepNhan == "1")
        {
            chiTietHoSo.KieuTiepNhan = "Trực tiếp";
        }
        else if (dataHoSo.KieuTiepNhan == "2")
        {
            chiTietHoSo.KieuTiepNhan = "Trực tuyến";
        }
        else if (dataHoSo.KieuTiepNhan == "3")
        {
            chiTietHoSo.KieuTiepNhan = "Qua bưu chính công ích";
        }
        else
        {
            chiTietHoSo.KieuTiepNhan = "";
        }
        chiTietHoSo.TenTTHC = dataHoSo.TenTTHC ?? string.Empty;
        chiTietHoSo.TenTruongHop = dataHoSo.TenTruongHop ?? string.Empty;
        chiTietHoSo.TrangThaiHoSo = dataHoSo.TrangThaiHoSo ?? string.Empty;
        chiTietHoSo.NgayTiepNhan = dataHoSo.NgayTiepNhan ;
        chiTietHoSo.NgayHenTra = dataHoSo.NgayHenTra;
        chiTietHoSo.NgayKetThucHoSo = dataHoSo.NgayKetThucHoSo;
        chiTietHoSo.NgayTraKetQua = dataHoSo.NgayTraKetQua;

        foreach (var item in dataQuaTrinhXuLy)
        {
            QuaTrinhXuLyHoSoPublicDto thongTinTienTrinh = new QuaTrinhXuLyHoSoPublicDto
            {
                BuocXuLy = item.BuocXuLy ?? string.Empty,
                DonViXuLy = item.DonViXuLy ?? string.Empty,
                NguoiXuLy = item.NguoiXuLy ?? string.Empty,
                ThoiGian = item.ThoiGian,
                YKien = item.YKien ?? string.Empty
            };
            chiTietHoSo.ThongTinTienTrinh.Add(thongTinTienTrinh);
        }
        return Result<ChiTietHoSoPublicDto>.Success(chiTietHoSo);

    }
}
