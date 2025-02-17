namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Common;
public static class HoSoChungThucCommonSql
{
    public static readonly string KySoChungThucHoSo = @"CREATE TABLE #TempTableThanhPhanHoSo (DinhKem nvarchar(MAX), Id uniqueidentifier, TrangThaiDuyet nvarchar(30));
        INSERT INTO #TempTableThanhPhanHoSo VALUES (@DinhKem, @Id, @TrangThaiDuyet);
        UPDATE tphs SET tphs.DinhKem = (CASE WHEN temp.DinhKem is null or temp.DinhKem = '' THEN tphs.DinhKem ELSE temp.DinhKem END), tphs.TrangThaiDuyet = temp.TrangThaiDuyet 
        FROM Business.ThanhPhanHoSos tphs INNER JOIN
        #TempTableThanhPhanHoSo temp ON tphs.Id = temp.Id";

    public static readonly string CapSoVaDongDauThanhPhanHoSos = @"CREATE TABLE #TempTableThanhPhanHoSo (Id uniqueidentifier, TrangThaiDuyet nvarchar(30), SoChungThucDT varchar(50), SoChungThucDienTu int);
        INSERT INTO #TempTableThanhPhanHoSo VALUES (@Id, @TrangThaiDuyet, @SoChungThucDT, @SoChungThucDienTu);
        UPDATE tphs SET tphs.TrangThaiDuyet = temp.TrangThaiDuyet, tphs.SoChungThucDT = temp.SoChungThucDT, tphs.SoChungThucDienTu = temp.SoChungThucDienTu
        FROM Business.ThanhPhanHoSos tphs INNER JOIN
        #TempTableThanhPhanHoSo temp ON tphs.Id = temp.Id";
}