using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
public class BaseStatisticsWhereBuilder
{
    private readonly string _groupTableName = "Catalog.Groups";
    public string where { get; set; } = string.Empty;
    public BaseStatisticsWhereBuilder(BaseStatistisRequestModel request)
    {
        where = string.Empty;
        TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            if (request.ChiBaoGomDonViCon == true)
            {
                where += $" AND ({_groupTableName}.MaDinhDanh Like @MaDinhDanhCha +'%' AND {_groupTableName}.MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                where += $" AND {_groupTableName}.MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }

        if (!string.IsNullOrEmpty(request.Catalog) && string.IsNullOrEmpty(request.MaDinhDanhCha) && string.IsNullOrEmpty(request.MaDinhDanh))
        {
            if (request.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH && request.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN
                && request.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.CNVPDK && request.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG)
            {
                where += $" AND {_groupTableName}.DonViQuanLy = @Catalog ";
            }
            else
            {
                where += $" AND {_groupTableName}.Catalog = @Catalog ";
            }

        }

        if (!string.IsNullOrEmpty(request.MaDinhDanh))
            where += $" AND {_groupTableName}.MaDinhDanh = @MaDinhDanh ";
    }
}
