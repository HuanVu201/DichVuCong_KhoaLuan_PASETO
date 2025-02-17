using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
public class SearchThuTucTheoCanBoQuery : PaginationFilter, IRequest<PaginationResponse<ThuTucDto>>
{
    public bool? LaTieuBieu { get; set; }

    public string? LinhVucThucHien { get; set; }
    public string? TenTTHC { get; set; }
    public string? MaTTHC { get; set; }
    public string? LoaiTTHC { get; set; }
    public string? TuKhoa { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public bool? QuyetDinh { get; set; }
    public string? CapThucHien { get; set; }
    public string? DonVi { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? NguoiTiepNhanId { get; set; }
    public bool? ThuTucNoiBat { get; set; }
    public bool? SuDung { get; set; }
    public bool? TrangThaiPhiLePhi { get; set; }
    public bool? LaPhiDiaGioi { get; set; }
    public bool? LaThuTucChungThuc { get; set; }
    public bool? ThucHienTaiBoPhanMotCua { get; set; }
    public bool? currentDonVi { get; set; }
    public string? MucDo { get; set; }
    public bool? Removed { get; set; } = false;

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
