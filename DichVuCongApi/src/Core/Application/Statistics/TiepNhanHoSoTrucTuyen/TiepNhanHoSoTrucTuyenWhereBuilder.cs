using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
public class TiepNhanHoSoTrucTuyenWhereBuilder
{
    private readonly string hoSoTableName = "[Business].[HoSos]";
    private readonly string groupTableName = "[Catalog].[Groups]";
    public string? tongSo { get; private set; }
    public string? tongBCCI { get; private set; }
    public string? tongTrucTuyen { get; private set; }
    public string? tongTrucTiep { get; private set; }
    public string? tongMotPhan { get; private set; }
    public string? tongToanTrinh { get; private set; }
    public string? tongDvc { get;private set; }
    public string? tongMotPhanBCCI { get; private set; }
    public string? tongMotPhanTrucTiep { get; private set; }
    public string? tongMotPhanTrucTuyen { get; private set; }
    public string? tongToanTrinhBCCI { get; private set; }
    public string? tongToanTrinhTrucTiep { get; private set; }
    public string? tongToanTrinhTrucTuyen { get; private set; }
    public string? tongDvcBCCI { get; private set; }
    public string? tongDvcTrucTiep { get; private set; }
    public string? tongDvcTrucTuyen { get; private set; }
    public TiepNhanHoSoTrucTuyenWhereBuilder(string tableName)
    {
        hoSoTableName = tableName ?? hoSoTableName;
        tongSo = $" CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay ";
        tongBCCI = $"{tongSo} AND {hoSoTableName}.KenhThucHien = @BCCI ";
        tongTrucTuyen = $"{tongSo} AND {hoSoTableName}.KenhThucHien = @TrucTuyen ";
        tongTrucTiep = $"{tongSo} AND {hoSoTableName}.KenhThucHien = @TrucTiep ";
        tongDvc = $"{tongSo} AND {hoSoTableName}.MucDo = @Dvc ";
        tongMotPhan = $"{tongSo} AND {hoSoTableName}.MucDo = @MotPhan";
        tongToanTrinh = $"{tongSo} AND {hoSoTableName}.MucDo = @ToanTrinh";
        tongMotPhanBCCI = $"{tongSo} AND {hoSoTableName}.MucDo = @MotPhan AND {hoSoTableName}.KenhThucHien= @BCCI";
        tongMotPhanTrucTiep = $"{tongSo} AND {hoSoTableName}.MucDo = @MotPhan AND {hoSoTableName}.KenhThucHien = @TrucTiep";
        tongMotPhanTrucTuyen = $"{tongSo} AND {hoSoTableName}.MucDo = @MotPhan AND {hoSoTableName}.KenhThucHien = @TrucTuyen";
        tongToanTrinhBCCI = $"{tongSo} AND {hoSoTableName}.MucDo = @ToanTrinh AND {hoSoTableName}.KenhThucHien = @BCCI";
        tongToanTrinhTrucTiep = $"{tongSo} AND {hoSoTableName}.MucDo = @ToanTrinh AND {hoSoTableName}.KenhThucHien = @TrucTiep";
        tongToanTrinhTrucTuyen = $"{tongSo} AND {hoSoTableName}.MucDo = @ToanTrinh AND {hoSoTableName}.KenhThucHien = @TrucTuyen";
        tongDvcBCCI = $"{tongDvc} AND {hoSoTableName}.KenhThucHien= @BCCI ";
        tongDvcTrucTiep = $"{tongDvc} AND {hoSoTableName}.KenhThucHien= @TrucTiep ";
        tongDvcTrucTuyen = $"{tongDvc} AND {hoSoTableName}.KenhThucHien= @TrucTuyen ";
    }

}
