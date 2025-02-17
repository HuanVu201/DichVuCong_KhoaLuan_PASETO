using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
public class GetKetQuaXuLyExpandApiQuery : ICommand<GetKetQuaXuLyExpandApiDto>
{
    public Guid? Id { get; set; }
    public string? ApiEx { get; set; } = "DetailKetQuaXuLyEx";
}

public class GetKetQuaXuLyExpandApiDto
{
    public string? MaHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? MaTTHC { get; set; }
    public string? LoaiVanBanKetQua { get; set; }
    public string? SoKyHieuKetQua { get; set; }
    public string? NguoiKyKetQua { get; set; }
    public string? CoQuanBanHanhKetQua { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public string? DinhKemKetQua { get; set; }
    public string? NgayBanHanhKetQua { get; set; }
    public string? NgayKyKetQua { get; set; }

    public string? CoQuanBanHanh { get; set; }
    public string? SoKyHieu { get; set; }
    public string? TrichYeu { get; set; }
    public string? NguoiKy { get; set; }
    public string? NgayKy { get; set; }
    public string? NgayCoHieuLuc { get; set; }
    public string? NgayHetHieuLuc { get; set; }
    public string? DinhKem { get; set; }
}
