using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuDvcTrucTuyen;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.SoLuongThuTucTheoDonVi;
public class ThongKeLuongThuTucTheoDonViHandler : IRequestHandler<ThongKeSoLuongThuTucTheoDonViRequest, BaoCaoSo06Response<ThongKeSoLuongThuTucTheoDonViResponse>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public ThongKeLuongThuTucTheoDonViHandler()
    {

    }
    public Task<BaoCaoSo06Response<ThongKeSoLuongThuTucTheoDonViResponse>> Handle(ThongKeSoLuongThuTucTheoDonViRequest request, CancellationToken cancellationToken)
    {
        //var ThuTucDvcTrucTuyen = $"{donViThuTucTableName}.MucDo IN ('{tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}','{tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}') ";
        //var ThuTucDvcTrucTuyenMotPhan = $"{donViThuTucTableName}.MucDo = '{tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}' ";
        //var ThuTucDvcTrucTuyenToanTrinh = $"{donViThuTucTableName}.MucDo = '{tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}' ";
        //if (string.IsNullOrEmpty(request.MaDinhDanh) && string.IsNullOrEmpty(request.MaDinhDanhCha) && string.IsNullOrEmpty(request.DonViQuanLy))
        //{


        //    string sqlTHHC = $"SELECT {donViThuTucTableName}.DonViId MaThongKe, " +
        //  $"COUNT(DISTINCT {donViThuTucTableName}.MaTTHC) TongSoThuTuc, " +
        //  $"COUNT(CASE WHEN {whereBuilder.ThuTucDvcTrucTuyen} THEN {donViThuTucTableName}.MaTTHC END ) ThuTucDvcTrucTuyen, " +
        //  $"COUNT(CASE WHEN {whereBuilder.ThuTucDvcTrucTuyenMotPhan} THEN {donViThuTucTableName}.MaTTHC END ) ThuTucMotPhan, " +
        //  $"COUNT(CASE WHEN {whereBuilder.ThuTucDvcTrucTuyenToanTrinh} THEN {donViThuTucTableName}.MaTTHC END ) ThuTucToanTrinh, " +
        //  $"COUNT (CASE WHEN {whereBuilder.ThuTucDvc} THEN {donViThuTucTableName}.MaTTHC END) ThuTucDvc " +
        //  $"FROM {donViThuTucTableName} " +
        //  $"INNER JOIN {groupTableName} ON {groupTableName}.GroupCode = {donViThuTucTableName}.DonViId " +
        //  $"WHERE {donViThuTucTableName}.DeletedOn IS NULL {whereDVTT} " +
        //  $"GROUP BY {donViThuTucTableName}.DonViId";

        //}
        //else
        //{

        //}
        throw new NotImplementedException();
    }
}
