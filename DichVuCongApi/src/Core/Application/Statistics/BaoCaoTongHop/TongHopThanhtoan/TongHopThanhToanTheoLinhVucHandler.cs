using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeNguoiNopHoSo;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeThanhToan;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;
using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopThanhtoan;
public class TongHopThanhToanTheoLinhVucHandler : IRequestHandler<TongHopThanhToanTheoLinhVucRequest, BaoCaoSo06Response<TongHopThanhToanElementResponse>>
{
    private readonly string yeuCauThanhToanTableName = $"Business.YeuCauThanhToans";
    private readonly string hoSoTableName = $"Business.HoSos";
    private readonly string thuTucTableName = $"Catalog.ThuTucs";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly TongHopThanhToanWhereBuilder _whereBuilder;
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants;
    public TongHopThanhToanTheoLinhVucHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _whereBuilder = new TongHopThanhToanWhereBuilder();
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    }
    public async Task<BaoCaoSo06Response<TongHopThanhToanElementResponse>> Handle(TongHopThanhToanTheoLinhVucRequest request, CancellationToken cancellationToken)
    {
        string where = string.Empty;
        string tiepNhanTuNgay = string.Empty;
        string tiepNhanDenNgay = string.Empty;
        string thanhToanTuNgay = string.Empty;
        string thanhToanDenNgay = string.Empty;
        if (request.TiepNhanTuNgay.HasValue) {
            tiepNhanTuNgay = request.TiepNhanTuNgay.Value.ToString("yyyy-MM-dd");
            where += $" AND {hoSoTableName}.[NgayTiepNhan] >= @TiepNhanTuNgay ";
        }
        if (request.TiepNhanDenNgay.HasValue) {
            tiepNhanDenNgay = request.TiepNhanDenNgay.Value.ToString("yyyy-MM-dd");
            where += $" AND {hoSoTableName}.[NgayTiepNhan] <= @TiepNhanDenNgay ";
        }
        if (request.ThanhToanTuNgay.HasValue)
        {
            thanhToanTuNgay = request.ThanhToanTuNgay.Value.ToString("yyyy-MM-dd");
            where += $" AND {yeuCauThanhToanTableName}.NgayThuPhi >= @ThanhToanTuNgay";
        }
        if (request.ThanhToanDenNgay.HasValue)
        {
            thanhToanDenNgay = request.ThanhToanDenNgay.Value.ToString("yyyy-MM-dd");
            where += $" AND {yeuCauThanhToanTableName}.NgayThuPhi <= @ThanhToanDenNgay";
        }
        List<TongHopThanhToanElementResponse> result = new List<TongHopThanhToanElementResponse>();
        string sql = $"SELECT {thuTucTableName}.MaLinhVucChinh MaThongKe, " +
            $"SUM({yeuCauThanhToanTableName}.Phi) Phi, " +
            $"SUM({yeuCauThanhToanTableName}.LePhi) LePhi, " +
            $"SUM({yeuCauThanhToanTableName}.Phi + {yeuCauThanhToanTableName}.LePhi) TongSo, " +
            $"SUM(CASE WHEN {_whereBuilder.TongTienMat} THEN {yeuCauThanhToanTableName}.Phi + {yeuCauThanhToanTableName}.LePhi END) TongTienMat, " +
            $"SUM(CASE WHEN {_whereBuilder.TongTrucTuyen} THEN {yeuCauThanhToanTableName}.Phi + {yeuCauThanhToanTableName}.LePhi END) TongTrucTuyen, " +
            $"SUM(CASE WHEN {_whereBuilder.TongHinhThucThanhToanKhac} THEN {yeuCauThanhToanTableName}.Phi + {yeuCauThanhToanTableName}.LePhi END) TongHinhThucThanhToanKhac, " +
            $"COUNT(DISTINCT {yeuCauThanhToanTableName}.MaHoSo) HoSoDaThuPhi " +
            $"FROM {yeuCauThanhToanTableName} " +
            $"INNER JOIN {hoSoTableName} " +
            $"ON {yeuCauThanhToanTableName}.MaHoSo = {hoSoTableName}.MaHoSo " +
             $"INNER JOIN {thuTucTableName} " +
            $"ON {thuTucTableName}.MaTTHC = {hoSoTableName}.MaTTHC " +
            $"WHERE {yeuCauThanhToanTableName}.TrangThai = N'{_yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN}' " +
            $"AND {yeuCauThanhToanTableName}.DeletedOn IS NULL {where} " +
            $"GROUP BY {thuTucTableName}.MaLinhVucChinh";
        var resBaoCao = await _dapperRepository.QueryAsync<TongHopThanhToanElementResponse>(sql, new
        {
            request.MaDonViCha,
            TiepNhanTuNgay = tiepNhanTuNgay,
            TiepNhanDenNgay = tiepNhanDenNgay,
            ThanhToanTuNgay = thanhToanTuNgay,
            ThanhToanDenNgay = thanhToanDenNgay
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchLinhVucTheoBaoCaoTongHopQuery queryLinhVucs = new SearchLinhVucTheoBaoCaoTongHopQuery();
      
       
        queryLinhVucs.PageNumber = request.PageNumber;
        queryLinhVucs.PageSize = request.PageSize;
        queryLinhVucs.MaDinhDanh = request.MaDinhDanh;
       
       
        var linhVucsDto = await _mediator.Send(queryLinhVucs);
        if (linhVucsDto.Data == null) throw new Exception("LinhVucs not found");
        List<LinhVucDto> linhVucs = linhVucsDto.Data;
        foreach (var group in linhVucs)
        {
            TongHopThanhToanElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.Ma);
            if (res != null)
            {
                res.TenThongKe = group.Ten;
               
                if(request.DaThuPhi != false) result.Add(res);
            }
            else
            {
                res = new TongHopThanhToanElementResponse();
                res.MaThongKe = group.Ten;
                res.TenThongKe = group.Ten;
        
                if (request.DaThuPhi != true) result.Add(res);
            }
        }
        return new BaoCaoSo06Response<TongHopThanhToanElementResponse>(result);
      
    }
}
