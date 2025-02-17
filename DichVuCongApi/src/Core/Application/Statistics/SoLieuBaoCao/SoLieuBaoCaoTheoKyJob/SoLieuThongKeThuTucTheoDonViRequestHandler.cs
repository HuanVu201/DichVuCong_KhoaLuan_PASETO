using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using Mapster;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoTheoKyJob;
public class SoLieuThongKeThuTucTheoDonViRequestHandler : IRequestHandler<SoLieuThongKeThuTucTheoDonViRequest, Result<SoLieuThongKeTheoDonViElement>>
{
    private readonly string _hoSoTableName = "Business.HoSos";
    private readonly string _groupsTableName = "[Catalog].[Groups]";
    private readonly string _donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants;

    public SoLieuThongKeThuTucTheoDonViRequestHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    }

    private async Task<SoLieuThongKeTheoDonViElement> GetThongKeThuTuc(SoLieuThongKeThuTucTheoDonViRequest request, CancellationToken cancellationToken)
    {
        var resultThongKeThuTuc = new SoLieuThongKeTheoDonViElement();
        string tuNgay = request.TuNgay.HasValue ? request.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = request.DenNgay.HasValue ? request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;
        string totalWhereDOnViThuTuc = $"WHERE tt.DeletedOn IS NULL ";
        string totalWhereHoSo = $"WHERE hs.DeletedOn IS NULL AND CONVERT(DATE, hs.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE, hs.NgayTiepNhan,23)  <= @DenNgay AND hs.TrangThaiHoSoId NOT IN ('1')";

        if (!string.IsNullOrEmpty(request.MaDinhDanh))
        {
            totalWhereDOnViThuTuc += " AND gr.MaDinhDanh = @MaDinhDanh";
            totalWhereHoSo += " AND gr.MaDinhDanh = @MaDinhDanh";
        }

        if (request.Catalogs != null && request.Catalogs.Count > 0)
        {
            totalWhereDOnViThuTuc += " AND gr.Catalog in @Catalogs ";
            totalWhereHoSo += " AND gr.Catalog in @Catalogs ";

        }

        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            if (request.ChiBaoGomDonViCon == true)
            {
                totalWhereDOnViThuTuc += $" AND (gr.MaDinhDanh Like @MaDinhDanhCha +'%' AND gr.MaDinhDanh != @MaDinhDanhCha) ";
                totalWhereHoSo += $" AND (gr.MaDinhDanh Like @MaDinhDanhCha +'%' AND gr.MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                totalWhereDOnViThuTuc += $" AND gr.MaDinhDanh Like @MaDinhDanhCha +'%' ";
                totalWhereHoSo += $" AND gr.MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }

        string sqlDonViThuTuc = $"SELECT " +
                    $"COUNT(DISTINCT tt.MaTTHC) ThuTuc, " +
                    $"COUNT(DISTINCT CASE WHEN tt.MucDo = '3' OR tt.MucDo = '4' THEN tt.MaTTHC END) ThuTucTrucTuyen " +
                    $"FROM {_donViThuTucTableName} tt " +
                    $"INNER JOIN {_groupsTableName} gr ON gr.GroupCode = tt.DonViId " +
                    $"{totalWhereDOnViThuTuc} ";

        var resDonViThuTuc = await _dapperRepository.QueryAsync<SoLieuThongKeTheoDonViElement>(sqlDonViThuTuc, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.MaDinhDanh,
            request.Catalogs,
            request.MaDinhDanhCha,
            request.ChiBaoGomDonViCon,
        }, null, cancellationToken);

        string sqlHoSo = $"SELECT " +
                   $"COUNT(DISTINCT hs.MaTTHC ) ThuTucPhatSinhHoSo, " +
                   $"COUNT(DISTINCT CASE WHEN hs.KenhThucHien = '2' THEN hs.MaTTHC END) ThuTucTrucTuyenPhatSinhHoSo " +
                   $"FROM {_hoSoTableName} hs " +
                   $"INNER JOIN {_groupsTableName} gr ON gr.GroupCode = hs.DonViId " +
                   $"{totalWhereHoSo} ";

        var resHoSo = await _dapperRepository.QueryAsync<SoLieuThongKeTheoDonViElement>(sqlHoSo, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.MaDinhDanh,
            request.Catalogs,
            request.MaDinhDanhCha,
            request.ChiBaoGomDonViCon,
        }, null, cancellationToken);

        if (resDonViThuTuc == null || resHoSo == null || resDonViThuTuc.Count == 0 || resHoSo.Count == 0)
        {
            throw new Exception("GetThongKeThuTuc not found");
        }
        else
        {
            resultThongKeThuTuc.ThuTuc = resDonViThuTuc[0].ThuTuc;
            resultThongKeThuTuc.ThuTucPhatSinhHoSo = resHoSo[0].ThuTucPhatSinhHoSo;
            resultThongKeThuTuc.ThuTucTrucTuyen = resDonViThuTuc[0].ThuTucTrucTuyen;
            resultThongKeThuTuc.ThuTucTrucTuyenPhatSinhHoSo = resHoSo[0].ThuTucTrucTuyenPhatSinhHoSo;

            if (resultThongKeThuTuc.ThuTucPhatSinhHoSo > 0 && resultThongKeThuTuc.ThuTuc > 0)
                resultThongKeThuTuc.ThuTucPhatSinhHoSoTyLe = ((double)resultThongKeThuTuc.ThuTucPhatSinhHoSo / (double)resultThongKeThuTuc.ThuTuc) * 100;

            if (resultThongKeThuTuc.ThuTucTrucTuyenPhatSinhHoSo > 0 && resultThongKeThuTuc.ThuTucTrucTuyen > 0)
                resultThongKeThuTuc.ThuTucTrucTuyenPhatSinhHoSoTyLe = ((double)resultThongKeThuTuc.ThuTucTrucTuyenPhatSinhHoSo / (double)resultThongKeThuTuc.ThuTucTrucTuyen) * 100;
        }

        return resultThongKeThuTuc;
    }

    public async Task<Result<SoLieuThongKeTheoDonViElement>> Handle(SoLieuThongKeThuTucTheoDonViRequest request, CancellationToken cancellationToken)
    {
        SoLieuThongKeTheoDonViElement result = new SoLieuThongKeTheoDonViElement();
        var resultThongKeThuTuc = await GetThongKeThuTuc(request, cancellationToken);

        result = resultThongKeThuTuc.Adapt(result);

        return Result<SoLieuThongKeTheoDonViElement>.Success(data: result);

    }
}
