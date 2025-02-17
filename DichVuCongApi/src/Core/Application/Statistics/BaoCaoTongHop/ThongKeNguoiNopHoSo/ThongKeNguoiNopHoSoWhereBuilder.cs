using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeNguoiNopHoSo;
public class ThongKeNguoiNopHoSoWhereBuilder
{
    private readonly string hoSoTableName = $"Business.HoSos";
    private readonly TiepNhanHoSoTrucTuyenConstants tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    public string CongDan { get; set; }
    public string ToChuc { get; set; }
    public string DoanhNghiep { get; set; }
    public ThongKeNguoiNopHoSoWhereBuilder()
    {
        CongDan = $"{hoSoTableName}.LoaiDoiTuong != N'{tiepNhanHoSoTrucTuyenConstants.LOAIDOITUONG.DOANH_NGHIEP}' AND {hoSoTableName}.LoaiDoiTuong != N'{tiepNhanHoSoTrucTuyenConstants.LOAIDOITUONG.TO_CHUC}'";
        ToChuc = $"{hoSoTableName}.LoaiDoiTuong = N'{tiepNhanHoSoTrucTuyenConstants.LOAIDOITUONG.TO_CHUC}'";
        DoanhNghiep = $"{hoSoTableName}.LoaiDoiTuong = N'{tiepNhanHoSoTrucTuyenConstants.LOAIDOITUONG.DOANH_NGHIEP}'";
    }
}
